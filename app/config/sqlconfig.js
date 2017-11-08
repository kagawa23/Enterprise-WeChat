'use strict'
var config ={
	user:'sa',
	password:'',
	server:'',
	database:'',
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