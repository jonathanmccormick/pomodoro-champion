'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var User = mongoose.model('User');

User.schema.add({
  preferences: {
    pomLength: {
      type: Number,
      required: true,
      default: 25
    },
    breakLength: {
      type: Number,
      required: true,
      default: 5
    },
    longBreakLength: {
      type: Number,
      required: true,
      default: 10
    },
    pomsBeforeLongBreak: {
      type: Number,
      required: true,
      default: 2
    },
    automaticallyStartNextPom: {
      type: Boolean,
      required: true,
      default: true
    },
    notifyWhenPomEnds: {
      type: Boolean,
      required: true,
      default: true
    },
    confirmPomCancel: {
      type: Boolean,
      required: true,
      default: true
    },
    pomCancelConfirmationThresholdMinutes: {
      type: Number,
      required: true,
      default: 5
    }
  }
});
