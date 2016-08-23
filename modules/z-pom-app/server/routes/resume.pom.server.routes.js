'use strict';

var mongodb = require('mongodb');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app) {

  app.route('/api/user/pom/:pomId/pause/:pauseId/resume/:moment')
  .put(function(req, res) {

    User.aggregate([
      { "$match": { "_id": mongodb.ObjectID.createFromHexString(req.user._id.toString()) } },
      { "$unwind": "$poms" },
      { "$project": {
          "_id": 0,
          "pom": "$poms"
      } },
      { "$match": { "pom._id": mongodb.ObjectID.createFromHexString(req.params.pomId.toString()) } },
      { "$unwind": "$pom.pauses" },
      { "$project": {
          "pause": "$pom.pauses"
      } },
      { "$match": {
        "pause._id": mongodb.ObjectID.createFromHexString(req.params.pauseId.toString())
      } }
    ],
    function(err, response) {
        if(err) console.log(err);
        console.log(response);
        res.status(500);
      }
  );
    res.status(200);

    // User.findOne(
    //   {'_id': mongodb.ObjectID.createFromHexString(req.user._id.toString()), 'poms.pauses._id' : mongodb.ObjectID.createFromHexString(req.params.pauseId.toString()) },
    //   { $set: { 'poms.pauses.$.momentCompleted': req.params.moment } },
    //   { save: true, new: true },
    //   function(err, response) {
    //     if(err) console.log(err);
    //     console.log(response);
    //   }
    // );

  });

};
