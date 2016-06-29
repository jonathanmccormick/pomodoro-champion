'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var User = mongoose.model('User');

User.schema.add({
  tasks: [
    {
      name: String,
      details: String,
      estimatedPoms: Number
    }
  ]
});
