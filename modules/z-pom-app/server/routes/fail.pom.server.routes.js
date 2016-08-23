'use strict';

var mongodb = require('mongodb');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app) {

  app.route('/api/user/pom/fail/:moment')
  .put(function(req, res) {
    console.log(`Pom failed at ${req.params.moment}`);
    res.status(200)

    // User.findOneAndUpdate(
    //   { '_id': req.user._id, 'poms.moment': { $ne: req.params.moment } },
    //   { $push: { 'poms': { date: req.params.moment } } },
    //   { save: true, upsert: true, new: true },
    //   function(err, doc) {
    //     if (err) return err;
    //   });
  });

};
