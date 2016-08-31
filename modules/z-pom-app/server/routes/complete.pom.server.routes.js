'use strict';

// var mongodb = require('mongodb');
var mongoose = require('mongoose');
// var User = mongoose.model('User');
var Pom = mongoose.model('Pom');
var Task = mongoose.model('Task');

module.exports = function(app) {

  // Find pom with current ID, then set momentCompleted
  app.route('/api/user/pom/:id/complete/:moment')
  .put(function(req, res) {

    var completedPom;
    
    Pom.findOneAndUpdate(
      { '_id': req.params.id, 'userID': req.user._id },
      { $set: { 'momentCompleted': req.params.moment } },
      { save: true, new: true },
      function(err, doc) {
        if (err) return err;

        completedPom = doc;

        Task.findOneAndUpdate(
        { '_id': completedPom.taskID, 'userID': req.user._id },
        { $inc: { 'timeActual': 1 } },
        function(err, doc) {
          if (err) return res.sendStatus(err);
          console.log(doc);
          // res.sendStatus(200);
        });

        console.log(doc);
        res.sendStatus(200);
      });

  });

};
