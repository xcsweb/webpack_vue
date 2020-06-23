const fs = require('fs')
const { resolve } = require('path')

const privateKey = fs.readFileSync(resolve(__dirname, '../自己填路径地址'))
module.exports = {
  test: {
    name: 'test',
    host: '',
    port: 22, // 端口
    username: 'root', // 登录服务器的账号
    // password: '', // 登录服务器的密码
    privateKey: privateKey, // 秘钥
    passphrase: 'private_key_password',
    path: '自己填路径地址'// 发布至静态服务器的项目路径
  },
  prod: {
    name: 'prod',
    host: '',
    port: 22, // 端口
    username: '', // 登录服务器的账号    
    password: '', // 登录服务器的密码
    path: '自己填路径地址'// 发布至静态服务器的项目路径
  }
}