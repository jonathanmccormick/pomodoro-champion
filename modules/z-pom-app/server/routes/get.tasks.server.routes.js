'use strict';

var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Task = mongoose.model('Task');

module.exports = function(app) {

  app.route('/api/user/tasks')
  .get(function(req, res) {

    Task.aggregate([
        { '$match': { 'userID': req.user._id }},
        { '$match': { 'completed': false } }
      ],
      function(err,result) {
        if (err) {
          console.log(err);
          res.status(500);
        }
        console.log(result);
        res.json(result);
      }
    );

  });

};
