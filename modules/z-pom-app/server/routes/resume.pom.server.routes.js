'use strict';

var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Pom = mongoose.model('Pom');

module.exports = function(app) {

  app.route('/api/user/pom/:pomId/pause/:pauseId/resume/:moment')
  .put(function(req, res) {

    Pom.findOneAndUpdate(
      { '_id': req.params.pomId, /*'userID': req.user._id*/ 'pauses._id': req.params.pauseId },
      { $set: { 'pauses.$.momentResumed': req.params.moment }},
      function(err, doc) {
        if (err) {
          res.sendStatus(500);
          return console.log(err);
        }
        console.log(doc);
        res.sendStatus(200);
      });
      
  });

};
