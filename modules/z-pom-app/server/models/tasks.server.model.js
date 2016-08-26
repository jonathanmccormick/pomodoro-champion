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
        required: false
    },
    timeAcutal: {
        // Denominated in minutes
        type: Number,
        required: false
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    }
});

mongoose.model('Task', taskSchema)