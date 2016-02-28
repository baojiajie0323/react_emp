'use strict';

const AJAXTIMEOUT = 10*1000;
var AppDispatcher = require('../AppDispatcher');
var Store = require('../stores/vssStore');
import { message } from 'antd';

var VssActions = {
  getAllPlan:function(){
    $.ajax({
  		url: '../users/postCommand',
  		type: 'POST',
  		timeout: AJAXTIMEOUT,
  		data:({
        command:'getallplangroup',
        userid:Store.getuserid()
  		}),
  		error: function(xhr, textStatus, thrownError){
        //alert('error1');
        message.error('与服务器建立连接失败');
  		},
  		success: function(response) {
        //alert(JSON.stringify(response));
        if(response.code == 0){
          Store.updateplangroup(response.data);
        }else{
          message.error(response.msg);
        }
  		}
  	}).then(function(response){
      $.ajax({
        url: '../users/postCommand',
        type: 'POST',
        timeout: AJAXTIMEOUT,
        data:({
          command:'getallplan',
          userid:Store.getuserid()
        }),
        error: function(xhr, textStatus, thrownError){
          message.error('与服务器建立连接失败');
        },
        success: function(response) {
          if(response.code == 0){
            Store.updateplan(response.data);
          }else{
            message.error(response.msg);
          }
        }
      });
    })
  },
  addplan:function(planname,plandetail){
    $.ajax({
  		url: '../users/postCommand',
  		type: 'POST',
  		timeout: AJAXTIMEOUT,
  		data:({
        command:'addplan',
        planname:planname,
        plandetail:plandetail,
        userid:Store.getuserid()
  		}),
  		error: function(xhr, textStatus, thrownError){
        //alert('error1');
        message.error('与服务器建立连接失败');
  		},
  		success: function(response) {
        if(response.code == 0){
          Store.addplan(planid);
        }else{
          message.error(response.msg);
        }
  		}
  	})
  },
  delplan:function(planid){
    $.ajax({
  		url: '../users/postCommand',
  		type: 'POST',
  		timeout: AJAXTIMEOUT,
  		data:({
        command:'delplan',
        planid:planid,
        userid:Store.getuserid()
  		}),
  		error: function(xhr, textStatus, thrownError){
        //alert('error1');
        message.error('与服务器建立连接失败');
  		},
  		success: function(response) {
        if(response.code == 0){
          Store.delplan(planid);
        }else{
          message.error(response.msg);
        }
  		}
  	})
  },
  dispatch:function(funname,value){
    AppDispatcher.dispatch({
      eventName: funname,
      value:value
    });
  }
};

module.exports = VssActions;
