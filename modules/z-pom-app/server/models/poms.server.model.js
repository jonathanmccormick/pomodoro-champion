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
      momentPaused: {
        type: Date,
        required: true,
        default: null
      },
      momentResumed: {
        type: Date,
        required: true,
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
