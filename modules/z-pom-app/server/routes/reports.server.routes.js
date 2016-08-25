'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
// var moment = require('moment');

module.exports = function(app) {

  app.route('/api/user/reports/:startDate/:endDate')
  .get(function(req, res) {

    User.aggregate([
        { '$match': { '_id': req.user._id }},
        { '$unwind': '$poms' },
        { '$project': {
            '_id': 0,
            'poms.momentStarted': 1,
            'poms.momentCompleted': 1
        }},
        { '$match': { 'poms.momentStarted': { '$gte': new Date(req.params.startDate)} } },
        { '$match': { '$or': [
          { 'poms.momentCompleted': { '$lte': new Date(req.params.endDate)} } ,
          { 'poms.momentCompleted': null } 
        ] } },
        { '$project': {
            'momentStarted': '$poms.momentStarted',
            'momentCompleted': '$poms.momentCompleted'
        }}

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
