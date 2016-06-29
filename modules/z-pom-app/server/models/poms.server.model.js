'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var User = mongoose.model('User');
// var moment = require('moment');

// Add PomLogs data schema to user
User.schema.add({
  pomLogs: [
    {
      date: {
        type: String,
        required: true,
        default: moment().format('YYYY-MM-DD')
      },
      pomsCompleted: {
        type: Number,
        required: true,
        default: 0
      },
      pomsFailed: {
        type: Number,
        required: true,
        default: 0
      }
    }
  ]
});
