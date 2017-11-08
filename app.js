'use strict'
const Koa = require('koa');
//generator函数
const wechat = require('./weixin/g.js');
const config=require('./weixin/config.js')
//微信操作类
const Wechat=require('./weixin/wechat.js');
//模板
const ejs=require('ejs');
const heredoc=require('heredoc');
//加密
const crypto=require('crypto');
const app = new Koa();
const Route =require("koa-router");
const router =new Route();
const weixin =require('./weixin/weixin');
//const logger =require("Koa-logger");
router.get("/sendmsg",weixin.send);
router.post("/sendmsg",weixin.send);
router.get("/",function*(){
	console.log("首页路由");
});

app
  .use(router.routes())
  .use(router.allowedMethods());
app.use(wechat(config.Wechat));
//app.use(logger()); koa1版本不兼容
app.listen(3002);
console.log('listening,端口号:3002');