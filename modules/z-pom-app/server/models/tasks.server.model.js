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
        // Denominated in poms
        type: Number,
        required: false
    },
    timeActual: {
        // Denominated in poms
        type: Number,
        required: false
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    }
});

mongoose.model('Task', taskSchema);