'use strict'
const db =require('../model/db.js');
exports.initusers =function(){
    return new Promise(function(resolve,reject){
          db.selectJoin(function(err,result){
          	 if (err) {
          	 	reject(err);
          	 }
             resolve(result.recordset);
          });
    })
}