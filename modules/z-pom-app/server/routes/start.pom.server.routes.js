'use strict';

var mongodb = require('mongodb');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Pom = mongoose.model('Pom');

module.exports = function(app) {

  app.route('/api/user/pom/start/:moment/task/:selectedTask')
  .put(function(req, res) {
    // Create ObjectId for the pom object we're going to insert so we can pass it back and store it in the client so we can finish the pom later.
    var newPomId  = new mongoose.Types.ObjectId();

    // Create new pom object in this user's poms[] with momentStarted: req.params.moment
    // User.findOneAndUpdate(
    //   { '_id': req.user._id },
    //   { $push: { 'poms': { _id: newPomId, momentStarted: req.params.moment } } },
    //   { upsert: true, new: true },
    //   function(err, doc) {
    //     if (err) return err;
    //     res.send(newPomId);
    //     return;
    //   });

    var pom = new Pom({
      _id: newPomId,
      momentStarted: req.params.moment,
      userID: req.user._id,
      taskID: req.params.selectedTask
    });

    pom.save(function(err, pom) {
      if (err) {
        return console.log(err);
      }
      console.log(pom);
      res.send(newPomId);
    });

  });
  
};
