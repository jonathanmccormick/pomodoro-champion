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
        default: null
      },
      momentCompleted: {
        type: Date,
        required: true,
        default: null
      },
      pauses: [
        {
          timestampPaused: {
            type: Date,
            required: true,
            default: null
          },
          timestampResumed: {
            type: Date,
            required: true,
            default: null
          }
        }
      ],
      notes: {
        type: String
      }
    }
  ]
});
