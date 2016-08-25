'use strict';

// Module dependencies.
var mongoose = require('mongoose');

var PomSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
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

mongoose.model('Pom', PomSchema);
