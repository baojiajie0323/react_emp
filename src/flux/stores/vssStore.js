'use strict';

var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var EventConst = require('../event-const');
var ActionEvent = EventConst.ActionEvent;
var StoreEvent = EventConst.StoreEvent;


var _deviceinfo = [];
var _newversion = '';
/**
 * {
 *   date_number: {
 *     file_index: file,
 *     ...
 *   },
*    ...
 * }
 */
var _recfile = {};

var _puRecProgress = {
  channel: 0,
  progress: null
};

var _login = false;

var _userid = 0;
/**
 * store
 */
var VssStore = assign({}, EventEmitter.prototype, {
  notifytype:{
    alarm:1,
    deviceinfo:3,
    recfile:4,
    playtime:5,
    version:6,
    login:7,
  },

  setuserid: function(userid){
    _userid = userid;
  },

  getuserid: function(){
    return _userid;
  },

  setIsLoggedIn: function(login) {
    if (login === _login) return;

    _login = login;
    this.emitChange(this.notifytype.login);
  },

  isLoggedIn: function() {
    return _login;
  },

  GetDeviceInfo:function(){
      return _deviceinfo;
  },

  AddDeviceInfo:function(info){
    if(!info.hasOwnProperty('tagid'))
      return;
    var nLength = _deviceinfo.length;
    var bFind = false;
    for(var nIndex = 0; nIndex< nLength;nIndex++){
      if(_deviceinfo[nIndex].tagid == info.tagid){
        if(info.active == 1 && _deviceinfo[nIndex].active == 0){
          newalarm(info.tagid,1,getNowFormatDate(),'');
          this.emitChange(this.notifytype.alarm);
        }
        if(info.tamper == 1 && _deviceinfo[nIndex].tamper == 0){
          newalarm(info.tagid,2,getNowFormatDate(),'');
          this.emitChange(this.notifytype.alarm);
        }
        _deviceinfo[nIndex] = info;
        bFind = true;
        break;
      }
    }
    if(!bFind){
      _deviceinfo.push(info);
    }
    this.emitChange(this.notifytype.deviceinfo);
  },

  DelDeviceInfo:function(tagid){
    var nLength = _deviceinfo.length;
    for(var nIndex = 0; nIndex< nLength;nIndex++){
      if(_deviceinfo[nIndex].tagid == tagid){
        _deviceinfo.remove(nIndex);
        this.emitChange(this.notifytype.deviceinfo);
        break;
      }
    }
  },

  HasTagid:function(tagid){
    var nLength = _deviceinfo.length;
    for(var nIndex = 0; nIndex< nLength;nIndex++){
      if(_deviceinfo[nIndex].tagid == tagid){
        return true;
      }
    }
    return false;
  },

  setNewVersion:function(version){
    _newversion = version;
    this.emitChange(this.notifytype.version);
  },

  getNewVersion:function(){
    return _newversion;
  },

  sendEmptyTagData:function(tagid){
    var devinfo = {
      'tagid':tagid,
      'devid':'',
      'rssi2':'',
      'serial':'',
      'drop':'',
      'rssi1':'',
      'active':'',
      'tamper':'',
      'tampercount':'',
      'time':'',
    };
    this.AddDeviceInfo(devinfo);
  },



  getRecFile:function(){
    return _recfile;
  },

  getRecFileArray: function() {
    var ret = [];

    for (var d in _recfile) {
      for (var i in _recfile[d]) {
        ret.push(_recfile[d][i]);
      }
    }

    return ret;
  },

  setPuRecPlayProgress: function(channel, progress) {
    _puRecProgress.channel = channel;
    _puRecProgress.progress = progress;

    this.emitChange(this.notifytype.playtime);
  },

  getPuRecPlayProgress: function() {
    return _puRecProgress;
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
