'use strict';

var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Task = mongoose.model('Task');

module.exports = function(app) {

  app.route('/api/user/new/task/:title')
  .put(function(req, res) {

    var task = new Task({
        userID: req.user._id,
        title: req.params.title
    });

    task.save(function(err, pom) {
      if (err) {
        return console.log(err);
      }
      console.log(task);
      res.sendStatus(200);
    });

  });

};
