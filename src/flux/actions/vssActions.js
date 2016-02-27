'use strict';

const AJAXTIMEOUT = 10*1000;
var AppDispatcher = require('../AppDispatcher');
var Store = require('../stores/vssStore');

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
        alert('error1');
  		},
  		success: function(response) {
        alert(JSON.stringify(response));
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
          alert('error2');
        },
        success: function(response) {
          alert(JSON.stringify(response));
        }
      });
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
