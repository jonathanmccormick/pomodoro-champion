'use strict';

// Module dependencies.
var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        rquired: true
    },
    description: {
        type: String,
        required: false
    },
    timeEstimate: {
        // Denominated in minutes
        type: Number,
        required: true
    },
    timeAcutal: {
        // Denominated in minutes
        type: Number,
        required: true
    }
});

mongoose.model('Task', taskSchema)