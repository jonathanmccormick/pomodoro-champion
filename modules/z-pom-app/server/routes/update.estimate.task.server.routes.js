'use strict';

var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Task = mongoose.model('Task');

module.exports = function(app) {

  app.route('/api/task/:taskId/update/estimate/:estimate')
  .put(function(req, res) {

    Task.findOneAndUpdate(
      { 'userID': req.user._id, '_id' : req.params.taskId },
      { 'timeEstimate': req.params.estimate },
      function(err, result) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        res.sendStatus(200);
      }
    );

  });

};
