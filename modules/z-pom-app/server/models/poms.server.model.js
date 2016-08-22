'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var User = mongoose.model('User');

var PomSchema = new mongoose.Schema({
  // task: {
  //   type: ObjectID
  // },
  momentStarted: {
    type: Date,
    default: null
  },
  momentCompleted: {
    type: Date,
    default: null
  },
  pauses: [
    {
      momentPaused: {
        type: Date,
        default: null
      },
      momentResumed: {
        type: Date,
        default: null
      }
    }
  ],
  notes: {
    type: String
  }
});

User.schema.add({
  poms: [PomSchema]
});
