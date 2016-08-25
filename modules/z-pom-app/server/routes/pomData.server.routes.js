// IMPORTANT - This file contains vestigial code that was built by our ancestors in the days before poms were stored as objects containing data. The old code has been commented out.

'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app) {

  // Handle request for pom data
  // app.route('/api/user/poms/:date')
  // .get(function(req, res) {
  //
  //   // // Push object for today *if it doesn't exist*.
  //   // User.findOneAndUpdate(
  //   //   { '_id': req.user._id, 'pomLogs.date': { $ne: req.params.date } },
  //   //   { $push: { 'pomLogs': { date: req.params.date } } },
  //   //   { save: true, upsert: true, new: true },
  //   //   function(err, doc) {
  //   //     if (err) return err;
  //   //   }
  //   // );
  //   //
  //   // // Get poms completed for today
  //   // User.findOne(
  //   //   { '_id': req.user._id, 'pomLogs.date': req.params.date },
  //   //   'pomLogs.$.pomsCompleted',
  //   //   { upsert:true },
  //   //   function(err, result) {
  //   //     if (err) return err;
  //   //     if (result === null) {
  //   //       return res.status(500);
  //   //     }
  //   //     res.json(result.toObject().pomLogs[0].pomsCompleted);
  //   //   }
  //   // );
  //
  // });

  // Increment today's poms
  // app.route('/api/user/poms/:date')
  // .put(function(req, res) {
  // //   User.update(
  // //     { '_id': req.user._id, 'pomLogs.date': req.params.date },
  // //     { $inc: { 'pomLogs.$.pomsCompleted': 1 } },
  // //     { upsert:true },
  // //     function(err, data) {
  // //       if (err) {
  // //         console.log(err);
  // //         return res.status(500).send(err);
  // //       }
  // //       res.send(200);
  // //     }
  // //   );
  // // });
  // //
  // // // Increment today's failed poms
  // // app.route('/api/user/poms/failed/:date')
  // // .put(function(req, res) {
  // //   User.update(
  // //     { '_id': req.user._id, 'pomLogs.date': req.params.date },
  // //     { $inc: { 'pomLogs.$.pomsFailed': 1 } },
  // //     { upsert:true },
  // //     function(err, data) {
  // //       if (err) {
  // //         console.log(err);
  // //         return res.status(500).send(err);
  // //       }
  // //       res.send(200);
  // //     }
  // //   );
  // });

  // Delete a pom
  // app.route('/api/user/poms/:date')
  // .delete(function(req, res) {
  //   // User.findOneAndUpdate(
  //   //   { '_id': req.user._id, 'pomLogs.date': req.params.date },
  //   //   { $inc: { 'pomLogs.$.pomsCompleted': -1 } },
  //   //   { upsert:true },
  //   //   function(err, data) {
  //   //     if (err) return res.status(500).send(err);
  //   //     // return res.status(200).send(data);
  //   //   }
  //   // );
  //   //
  //   // User.findOne(
  //   //   { '_id': req.user._id, 'pomLogs.date': req.params.date },
  //   //   'pomLogs.$.pomsCompleted',
  //   //   { upsert:true },
  //   //   function(err, result) {
  //   //     if (err) return err;
  //   //     if (result === null) {
  //   //       return res.status(500);
  //   //     }
  //   //     res.json(result.toObject().pomLogs[0].pomsCompleted);
  //   //   }
  //   // );
  // });

  // Create a new day in pomLogs array
  // app.route('/api/user/poms/new/:date/:pomsCompleted/')
  // .put(function(req, res) {
  //   // User.findOneAndUpdate(
  //   //   { '_id': req.user._id },
  //   //   { $push: { 'pomLogs': { date: req.params.date, pomsCompleted: req.params.pomsCompleted } } },
  //   //   { save: true, upsert: true, new: true },
  //   //   function(err, doc) {
  //   //     if (err) return err;
  //   //     res.status(200).send(doc);
  //   //   }
  //   // );
  // });

};
