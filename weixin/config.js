'use strict'
/**
 * 企业微信的配置信息
 */
var path=require('path');
var wechat_file=path.join(__dirname,'.././config/wechat.txt');
var wechat_ticket_file=path.join(__dirname,'.././config/wechat_ticket.txt');
var util=require('.././libs/util.js')

var config = {
	Wechat:{
		corpid:'',
		secret:'',
		appsecret:'',
		token:'',
		encodingaeskey:'',
		agentId:,
		getAccessToken:function(){
			return util.readFileAsync(wechat_file);
		},
		saveAccessToken:function(data){
			data=JSON.stringify(data)
			return util.writeFileAsync(wechat_file,data);
		},
		getTicket:function(){
			return util.readFileAsync(wechat_ticket_file);
		},
		saveTicket:function(data){
			data=JSON.stringify(data)
			return util.writeFileAsync(wechat_ticket_file,data);
		}
	},
	Dep:{
       "name": "销售部",
	   "parentid": 1,
	   "order": 1,
	   "id": 3
	}
};
module.exports=config;