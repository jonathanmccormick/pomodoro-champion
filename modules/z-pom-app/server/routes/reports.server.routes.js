'use strict';

var mongoose = require('mongoose');
var Pom = mongoose.model('Pom');

module.exports = function(app) {

  app.route('/api/user/reports/:startDate/:endDate')
  .get(function(req, res) {

    Pom.aggregate([
        { '$match': { 'userID': req.user._id }},
        { '$match': { 'momentStarted': { '$gte': new Date(req.params.startDate)} } },
        { '$match': { '$or': [
          { 'momentCompleted': { '$lte': new Date(req.params.endDate)} } ,
          { 'momentCompleted': null } 
        ] } }

      ],
      function(err,result) {
        if (err) {
          console.log(err);
          res.status(500);
        }
        res.json(result);
      }
    );

  });

};
