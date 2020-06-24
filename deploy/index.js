const scpClient = require("scp2");
const ora = require("ora");
const chalk = require("chalk"); //命令行样式控制器
const Client = require("ssh2").Client;
const servers = require("./servers");
const envChannel = process.env.NODE_ENV;
const spinner = ora(
  `正在发布到${envChannel === "prod" ? "生产" : "测试"}服务器....`
);
const serverHost = servers[envChannel];
const conn = new Client();
if (envChannel === "test") {
  connect("test")
} else if (envChannel === "prod") {
  connect("prod")
}

function connect(envChannel){
  conn
    .on("ready", function () {
      /**
       * 描述：执行shell命令
       * 参数：cmd,要执行的命令；
       *       then,回调函数
       * 回调：then(err, data):data 运行命令之后的返回信息
       */
      conn.exec(`rm -rf ${servers[envChannel].path}`, function (
        error,
        stream
      ) {
        if (error) throw error;
        stream
          .on("close", function (code, signal) {
            // 在执行shell命令后，把开始上传部署项目代码放到这里面
            spinner.start();

            scpClient.scp(
              servers[envChannel].clientPath,
              {
                host: serverHost.host,
                port: serverHost.port,
                username: serverHost.username,
                password:serverHost.password,
                privateKey: serverHost.privateKey,
                passphrase: serverHost.passphrase,
                path: serverHost.path,
              },
              function (err) {
                spinner.stop();
                if (err) {
                  console.log(chalk.red("发布失败.\n"));
                  throw err;
                } else {
                  console.log(
                    chalk.green(
                      `success！成功发布到${
                        process.env.NODE_ENV === "test" ? "测试" : "生产"
                      }环境！\n`
                    )
                  );
                }
              }
            );
            conn.end();
          })
          .on("data", function (data) {
            console.log("stdout:" + data);
          })
          .stderr.on("data", function (data) {
            console.log("stderr:" + data);
          });
      });
    })
    .connect({
      host: serverHost.host,
      port: serverHost.port,
      username: serverHost.username,
      password:serverHost.password,
      privateKey: serverHost.privateKey,
      passphrase: serverHost.passphrase
    });
}