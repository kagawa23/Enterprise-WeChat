'use strict'

const sha1 = require('sha1');
const Wechat = require('./wechat.js');
const getRawBody=require('raw-body');
const util=require('./util');
const wx=require('./weixin.js');
const xml2js=require('xml2js');



module.exports=function(opts){
	var wechat=new Wechat(opts);
	//执行中间件
	return 	function* (next){
				var that=this;
				//验证URL
				var token = opts.token;
				//消息体签名
			    var msg_signature =that.query.msg_signature;
				//随机数
				var nonce = that.query.nonce;
				//加密的密文
				var encodingaeskey ='qajOt6CT9Kshq1XkPMNpnUtEJQLR4CzRvA407HoVcQi';
				//时间戳
				var timestamp = that.query.timestamp;
				//随机
				var echostr = that.query.echostr;
				//1加密
				var str = [token,timestamp,nonce,encodingaeskey].sort().join('');
			    if (this.method==='GET') {
			    	if (wechat.verifyURL(msg_signature,token,timestamp,nonce,echostr)) {
				    	console.log("本次请求来自微信");
				    	var a =wechat.decrypr(echostr);
				    	that.body =a;
				    }else{
				    	console.log("不是微信的请求");
				    	that.body ="wang";//不是wx的服务器
				    }
			    }else if(this.method==='POST'){
			    	var nonceMsg =this.query.nonce;
			    	var msg_signatureMsg =this.query.msg_signature;
			    	var timestampMsg =this.query.timestamp;
			    	//验证是否是微信的服务器
			    	/*if (wechat.verifyURL(msg_signature,token,timestampMsg,nonce,echostr)) {
			    		
			    	}*/
			    	console.log(nonceMsg);
			    	console.log(timestampMsg);
                    var data =yield getRawBody(this.req,{
                    		length:this.length,
							limit:"1mb",
							encoding:this.charset
                    });

                    var content=yield util.parseXMLAsync(data);
                    //对消息解密 Encrypt
                   // console.log(content.xml.Encrypt[0]);
                    var xmlmsg = wechat.decrypr(content.xml.Encrypt[0]);
                   //console.log(xmlmsg);
                    var json="";
                    xml2js.parseString(xmlmsg,{trim:true},function(err,content){
						json =content;
					});
					var message=util.formatMessage(json.xml);//把用户消息抓转为json
					this.weixin =message;//挂载到this上
					console.log(message);
					yield wx.reply.call(this,next);
					var content =this.reply;
					var xml =util.tpl(content,message);//响应用户明文xml
					var opt={
						nonce:nonceMsg
					};
					console.log(xml);
					//加密消息后的xml
					var msgEncrypt =wechat.encryptMsgs(xml,opt);
                    that.status =200;
                    that.res.type='application/xml';
                    that.res.body=msgEncrypt;
                    console.log(msgEncrypt);
			    }
	};
};


