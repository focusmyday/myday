'use strict'
;/**
 * Created by svina on 2/22/18.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create the message summary schema

const msgSummarySchema = new Schema({
     channelType : String,
     channelName : String,
     msgTimeStamp: Date,
     metadata    : {
          from: String,
          target: String,
          msgType: String,
          snippet: String
     }
});


const MessageSummary = mongoose.model('MessageSummary', msgSummarySchema);

module.exports = MessageSummary;