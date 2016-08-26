'use strict';

var mongoose = require('mongoose');
var Pom = mongoose.model('Pom');

module.exports = function(app) {

  app.route('/api/user/poms/:date')
  .get(function(req, res) {

    Pom.aggregate([
        { '$match': { 'userID': req.user._id }},
        { '$match': { 'momentCompleted': { '$gte': new Date(req.params.date)} } }
      ],
      function(err,result) {
        if (err) {
          console.log(err);
          res.status(500);
        }
        console.log(result);
        var pomsToday = result.length;
        res.json(pomsToday);
      }
    );

  });

};
