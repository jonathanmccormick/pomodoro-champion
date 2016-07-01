'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app) {

  // Start pom
  app.route('/api/user/pom/start/:moment')
  .put(function(req, res) {
    // Create ObjectId for the pom object we're going to insert so we can pass it back and store it in the client so we can finish the pom later.
    var newPomId  = new mongoose.Types.ObjectId();

    // Create new pom object in this user's poms[] with momentStarted: req.params.moment
    User.findOneAndUpdate(
      { '_id': req.user._id },
      { $push: { 'poms': { _id: newPomId, momentStarted: req.params.moment } } },
      { upsert: true, new: true },
      function(err, doc) {
        if (err) return err;
        res.send(newPomId);
        return;
      });
  });

  // Complete pom
  // Find pom with current ID, then set momentCompleted
  app.route('/api/user/pom/:id/complete/:moment')
  .put(function(req, res) {
    User.findOneAndUpdate(
      { '_id': req.user._id, 'poms._id': req.params.id },
      { $set: { 'poms.$.momentCompleted': req.params.moment  } },
      { save: true, new: true },
      function(err, doc) {
        if (err) return err;
      });
  });

  // Fail pom
  app.route('/api/user/pom/fail/:moment')
  .put(function(req, res) {
    console.log(`Pom failed at ${req.params.moment}`);

    // User.findOneAndUpdate(
    //   { '_id': req.user._id, 'poms.moment': { $ne: req.params.moment } },
    //   { $push: { 'poms': { date: req.params.moment } } },
    //   { save: true, upsert: true, new: true },
    //   function(err, doc) {
    //     if (err) return err;
    //   });
  });

  // Pause pom
  app.route('/api/user/pom/pause/:moment')
  .put(function(req, res) {
    console.log(`Pom paused at ${req.params.moment}`);
    // User.findOneAndUpdate(
    //   { '_id': req.user._id, 'poms.moment': { $ne: req.params.moment } },
    //   { $push: { 'poms': { date: req.params.moment } } },
    //   { save: true, upsert: true, new: true },
    //   function(err, doc) {
    //     if (err) return err;
    //   });
  });

  // Resume pom
  app.route('/api/user/pom/resume/:moment')
  .put(function(req, res) {
    console.log(`Pom resumeed at ${req.params.moment}`);
    // User.findOneAndUpdate(
    //   { '_id': req.user._id, 'poms.moment': { $ne: req.params.moment } },
    //   { $push: { 'poms': { date: req.params.moment } } },
    //   { save: true, upsert: true, new: true },
    //   function(err, doc) {
    //     if (err) return err;
    //   });
  });

};
