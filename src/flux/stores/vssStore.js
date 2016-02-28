'use strict';

var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var EventConst = require('../event-const');
var ActionEvent = EventConst.ActionEvent;
var StoreEvent = EventConst.StoreEvent;

var _userid = 0;
var _plangroup = [];
var _plan = [];
/**
 * store
 */
var VssStore = assign({}, EventEmitter.prototype, {
  notifytype:{
    planload:1,
    changesel:2,
  },

  setuserid: function(userid){
    _userid = userid;
  },

  getuserid: function(){
    return _userid;
  },

  updateplangroup: function(data){
    _plangroup = data;
  },

  getplangroup: function(){
    return _plangroup;
  },

  getplangroupbyid: function(groupid){
    for (var i = 0; i < _plangroup.length; i++) {
      if(groupid == _plangroup[i].id){
        return _plangroup[i];
      }
    }
    return null;
  },

  updateplan: function(data){
    _plan = data;
    this.emitChange(this.notifytype.planload);
  },

  getplan: function(){
    return _plan;
  },

  addplan: function(plan){
    for (var i = 0; i < _plan.length; i++) {
      if(plan.id == _plan[i].id){
        return false;
      }
    }
    _plan.push(plan);
    this.emit(this.notifytype.changesel,plan.id);
    //this.emitChange(this.notifytype.changesel);
  },

  delplan: function(planid){
    for (var i = 0; i < _plan.length; i++) {
      if(planid == _plan[i].id){
        _plan.splice(i,1);
        this.emit(this.notifytype.changesel,_plan[0].id);
        break;
      }
    }
  },

  getplanbyid :function(planid){
    for (var i = 0; i < _plan.length; i++) {
      if(planid == _plan[i].id){
        return _plan[i];
      }
    }
    return null;
  },

  getplanlistbygroupid: function(groupid){
    var planlist = [];
    for (var i = 0; i < _plan.length; i++) {
      if(_plan[i].groupid == groupid){
        planlist.push(_plan[i]);
      }
    }
    return planlist;
  },

  emitChange: function(eventtype) {
    this.emit(eventtype);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(eventtype,callback) {
    this.on(eventtype, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(eventtype,callback) {
    this.removeListener(eventtype, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

  switch(action.eventName) {

  case 1:
    VssStore.emitChange(1);
    break;



  default:
    break;
  }
});

module.exports = VssStore;
