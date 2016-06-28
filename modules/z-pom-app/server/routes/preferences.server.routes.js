'use strict';

var mongoose = require('mongoose'),
User = mongoose.model('User');

module.exports = function(app) {

  app.route('/api/user/preferences')
  .put(function(req, res) {
    User.findOneAndUpdate(
      { '_id': req.user._id },
      { $set: { preferences: req.body } },
      { upsert:true },
      function(err, data) {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
      }
    );
  });

};
