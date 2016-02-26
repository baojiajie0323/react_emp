'use strict';

var keyMirror = require('keymirror');

module.exports = {
  ActionEvent: keyMirror({
    LOGGEDIN: null,
    CLEAR_PLATFORM: null,
    LIST_PLATFORM: null,
    CLEAR_GROUPS: null,
    LIST_GROUPS: null,
    CLEAR_DEVICES: null,
    LIST_DEVICES: null,
    CLEAR_DEVICE_MODELS: null,
    LIST_DEVICE_MODELS: null,
    CLEAR_DEVICE_STATES: null,
    LIST_DEVICE_STATES: null,
    CLEAR_POINT_BASES: null,
    LIST_POINT_BASES: null,
    CLEAR_POINT_STATES: null,
    LIST_POINT_STATES: null,
    CLEAR_AREAS: null,
    LIST_AREAS: null,
    CLEAR_STAFFS: null,
    LIST_STAFFS: null,
    CLEAR_FTP_CONFIGS: null,
    LIST_FTP_CONFIGS: null,
    CLEAR_PRISONERS: null,
    LIST_PRISONERS: null,
    SET_PRISONER_FTP: null
  }),

  StoreEvent: keyMirror({
    LOGGEDIN: null,
    PLATFORM_CHANGED: null,
    GROUPS_CHANGED: null,
    DEVICES_CHANGED: null,
    DEVICE_MODELS_CHANGED: null,
    DEVICE_STATES_CHANGED: null,
    POINT_BASES_CHANGED: null,
    POINT_STATES_CHANGED: null,
    AREAS_CHANGED: null,
    STAFFS_CHANGED: null,
    FTP_CONFIGS_CHANGED: null,
    PRISONERS_CHANGED: null,
    PRISONER_FTP_CHANGED: null
  })
};
