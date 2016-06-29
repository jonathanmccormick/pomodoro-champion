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

User.schema.add({
  poms: [
    {
      // task: {
      //   type: ObjectID
      // },
      momentStarted: {
        type: Date,
        required: true,
        default: Date.now()
      },
      momentCompleted: {
        type: Date,
        required: false
      },
      pauses: [
        {
          timestampPaused: {
            type: Date,
            required: true,
            default: Date.now()
          },
          timestampResumed: {
            type: Date,
            required: false
          }
        }
      ],
      notes: {
        type: String
      },
      duration: {
        type: Number,
        required: true,
        default: null
      }
    }
  ]
});
