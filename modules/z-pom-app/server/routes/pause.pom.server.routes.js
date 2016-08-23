'use strict';

var mongodb = require('mongodb');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app) {

  app.route('/api/user/pom/:id/pause/:moment')
  .put(function(req, res) {

    var newPauseId  = new mongoose.Types.ObjectId();
    console.log(newPauseId);

    User.findOneAndUpdate(
      { '_id': req.user._id, 'poms._id': req.params.id },
      { $push: { 'poms.$.pauses': { "_id": newPauseId, "momentPaused": req.params.moment } } },
      { save: true, new: true },
      function(err, doc) {
        if (err) return err;
        res.send(newPauseId);
      });

      // console.log(`Current Pom: ${}`);

  });

};
