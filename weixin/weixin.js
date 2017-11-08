'use strict'
const config=require('./config.js');
const Wechat=require('./wechat.js');
const wechatApi=new Wechat(config.Wechat);
const menu=require('./menu.js');
const path =require("path");
const transliteration =require('transliteration');
const userController =require("../app/controller/initUser");
const querystring =require("querystring");
//创建部门
//wechatApi.createDep(config.Dep).then(function(){
//	console.log("创建成功");
//})

//初始化成员列表
/*userController.initusers().then(function(data){
	let json ={
		"userid": "zhangsan",
		"name": "张三",
		"mobile": "15913215421",
		 "department": [3],
		 "position": "产品经理",
	}
	let arr =[];
	for(let item of data){
	    arr.push({
	    	userid:transliteration.slugify(item.UserName,{separator:''}),
	    	name:item.UserCode,
	    	mobile:item.Phone,
	    	department:3,
	    	position:item.RoleCode
	    })
	}
	console.log(arr.length);
	for(let item in arr){
            
	}
})*/
exports.reply=function*(next){
	var message=this.weixin;
	let reply ='sorry';
	console.log();
	if(message.MsgType==='event'){
		if(message.Event==="subscribe"){
		    let msg =`欢迎使用建股项目管理哦!!!`;
		}
	}else if(message.MsgType==='text'){
		var content=message.Content;
		console.log(content);
		//var reply='您说的'+content+'太复杂了';
        if (content=="1") {
        	reply="Hi,你想搞点什么";
        	wechatApi.sendMessgae(message.FromUserName,"你好");
        }else if(content=="2"){
            wechatApi.sendMessgae(message.FromUserName,"Hi,你想搞点什么");
        }else{
        	wechatApi.sendMessgae(message.FromUserName,"你说的"+content+"我不太懂...");
        }
        //将消息挂载到全局
        this.reply =reply;
	}else if(message.MsgType==='voice'){
         //语音识别功能没有开放
	}
	yield next;
}
exports.send =function*(next){
     if (!this.req._parsedUrl.query) {
     	this.body ="参数错误";
     	return ;
     }
     let params =querystring.parse(this.req._parsedUrl.query);
     let msg =params.msg;
     let username =params.username;
     console.log(msg);
     console.log(username);
     if (msg ===''||username===''||typeof msg==='undefined'||typeof username==='undefined') {
     	  this.body ="参数不合法";
     	  return ;
     }

     if (msg.length>100||username.length>5) {
     	 this.body ="参数长度过大";
     	 return;
     }

     wechatApi.sendMessgae(username,msg);
}