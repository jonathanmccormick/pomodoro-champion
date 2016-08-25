'use strict';

var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Pom = mongoose.model('Pom');

module.exports = function(app) {

  app.route('/api/user/pom/:id/pause/:moment')
  .put(function(req, res) {

    var newPauseId  = new mongoose.Types.ObjectId(); 
    console.log(newPauseId);

    Pom.findOneAndUpdate(
      { '_id': req.params.id, 'userID': req.user._id},
      { $push: { 'pauses': { momentPaused: req.params.moment } } },
      { upsert: true, new: true },
      function(err, doc) {
        if (err) {
          return console.log(err);
        }
        console.log(doc);
        res.sendStatus(200);
      });

      // console.log(`Current Pom: ${}`);

  });

};
