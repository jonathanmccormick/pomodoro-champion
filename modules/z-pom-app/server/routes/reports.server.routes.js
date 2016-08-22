'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
// var moment = require('moment');

module.exports = function(app) {

  app.route('/api/user/reports/:startDate/:endDate')
  .get(function(req, res) {

    // Create the dates array
    // var dates = []; // Create array
    // dates.push(req.params.startDate); // add startDate to the array
    // var workingDate = new Date(req.params.startDate + 'CST'); // convert startDate to JS date object
    // while (workingDate < (new Date(req.params.endDate + 'CST'))) {
    //   workingDate.setDate(workingDate.getDate() + 1); // increment date object by one day
    //   dates.push(moment(workingDate).format('YYYY-MM-DD')); // create a string of our format from that date object and push that new string to the array
    // }

    User.aggregate([
        { '$match': { '_id': req.user._id }},
        { '$unwind': '$poms' },
        { '$project': {
            '_id': 0,
            'poms.momentStarted': 1,
            'poms.momentCompleted': 1
        }},
        { '$match': { 'poms.momentStarted': { '$gte': new Date(req.params.startDate)} } },
        { '$match': { 'poms.momentCompleted': { '$lte': new Date(req.params.endDate)} } }

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
