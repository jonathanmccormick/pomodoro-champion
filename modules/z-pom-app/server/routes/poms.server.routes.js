'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app) {

  // Start pom
  app.route('/api/user/pom/start/:moment')
  .put(function(req, res) {
    console.log(`Pom started at ${req.params.moment}`);

    // Create new pom object in this user's poms[] with momentStarted: req.params.moment

    // We need a way to identify the pom that's currently running.
    // Maybe return a handle in the form of the ObjectID of the object created, and store that in the Data Service as self.currentPom ?

    var newPomId  = new mongoose.Types.ObjectId();

    User.findOneAndUpdate(
      { '_id': req.user._id },
      { $push: { 'poms': { _id: newPomId, momentStarted: req.params.moment } } },
      { upsert: true, new: true },
      function(err, doc) {
        if (err) return err;
        res.send(newPomId);
        // console.log(doc);
        return;
      });
  });

  // Complete pom
  // Find pom with current ID, then set momentCompleted
  app.route('/api/user/pom/:id/complete/:moment')
  .put(function(req, res) {
    console.log(`Pom completed at ${req.params.moment}, ${req.params.id}`);

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
