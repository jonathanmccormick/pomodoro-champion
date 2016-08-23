'use strict';

var mongodb = require('mongodb');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app) {

  // Find pom with current ID, then set momentCompleted
  app.route('/api/user/pom/:id/complete/:moment')
  .put(function(req, res) {
    console.log(req.params.id);
    User.findOneAndUpdate(
      { '_id': req.user._id, 'poms._id': req.params.id },
      { $set: { 'poms.$.momentCompleted': req.params.moment  } },
      { save: true, new: true },
      function(err, doc) {
        if (err) return err;
      });
  });

};
