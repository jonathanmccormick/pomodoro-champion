'use strict';

// var mongodb = require('mongodb');
var mongoose = require('mongoose');
// var User = mongoose.model('User');
var Pom = mongoose.model('Pom');

module.exports = function(app) {

  // Find pom with current ID, then set momentCompleted
  app.route('/api/user/pom/:id/complete/:moment')
  .put(function(req, res) {
    
    Pom.findOneAndUpdate(
      { '_id': req.params.id, 'userID': req.user._id },
      { $set: { 'momentCompleted': req.params.moment  } },
      { save: true, new: true },
      function(err, doc) {
        if (err) return err;
        console.log(doc);
        res.sendStatus(200);
      });

  });

};
