'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app) {

  app.route('/api/user/poms/:date')
  .get(function(req, res) {

    User.aggregate([
        { '$match': { '_id': req.user._id }},
        { '$unwind': '$poms' },
        { '$project': {
            '_id': 0,
            'poms.momentStarted': 1,
            'poms.momentCompleted': 1
        }},
        { '$match': { 'poms.momentCompleted': { '$gte': new Date(req.params.date)} } }
      ],
      function(err,result) {
        if (err) {
          console.log(err);
          res.status(500);
        }
        var pomsToday = result.length;
        res.json(pomsToday);
      }
    );

  });

};
