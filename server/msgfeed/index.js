'use strict';
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myday');
const MsgSummaryModel = require('./model/messagesummary.js');

const emailChannel = require('../emailParser/index.js');
// const ghChannel = require('../ghParser/index.js');

const channels = [emailChannel];


let syndicate = function() {
    // channels.forEach(function(channel) {
    //     channel.fetchSummaries()
    //         .then(function(summaries) {
    //             saveSummaries(summaries);
    //         });
    //    
    // });
    emailChannel.fetchSummaries()
        .then(function(summaries) {
            saveSummaries(summaries);
        });

}


let saveSummaries = function(summaries) {
    summaries.forEach(function(summary) {
        saveSummary(summary)
    });
}


let saveSummary = function(summary) {
    const ms = MsgSummaryModel({
        'channelType' : summary.channelType,
            'channelName': summary.channelName,
            'msgTimeStamp': summary.msgTimeStamp,
            'metadata' : {
                'from' : summary.metadata.from,
                'target': summary.metadata.target,
                'snippet': summary.metadata.snippet
            }
        });
    ms.save(function(err){
        if (err) throw err;
        console.log('summary created');
    });
}



syndicate();

