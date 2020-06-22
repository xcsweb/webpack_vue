import Vue from "vue";
import App from "./app";
import "@/css/index.css";
import "@/css/a.scss";
import "./js/index";
let obj={a:1};
console.log(obj?.a)
new Vue({  render: h => h(App)}).$mount("#app");