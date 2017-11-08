'use strict'
var config ={
	user:'sa',
	password:'admin@reaki.cn',
	server:'192.168.2.118',
	database:'JG_Sys',
	option:{
		encrypt:true
	},
	pool:{
		min:0,
		max:10,
		idleTimeoutMillis:3000
	}
}
exports =module.exports =config;