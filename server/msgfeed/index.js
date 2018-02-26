'use strict';
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myday');
const MsgSummaryModel = require('./model/messagesummary.js');

const emailChannel = require('../emailParser/index.js');
const ghChannel = require('../ghParser/index.js');

const channels = [emailChannel, ghChannel];

let syndicate = function(user, since) {
    emailChannel.fetchSummaries(user, since)
        .then(summaries => saveSummaries(user, summaries));
    
    ghChannel.fetchSummaries(user, since)
        .then(summaries => saveSummaries(user, summaries))
        .catch(function (err) {
            console.log(err);
        });

}


let saveSummaries = function(user, summaries) {
    summaries.forEach(function(summary) {
        console.log(summary);
        saveSummary(user, summary)
    });
}


let saveSummary = function(user, summary) {
    const ms = MsgSummaryModel({
        'user': user,
        'channelType' : summary.channelType,
            'channelName': summary.channelName,
            'msgTimeStamp': summary.msgTimeStamp,
            'metadata' : {
                'from' : summary.metadata.from,
                'target': summary.metadata.target,
                'snippet': summary.metadata.snippet
            },
        body: summary.body,
        title: summary.title,
        url: summary.url
        });
    ms.save(err => {
        console.log(err);
        if (err) throw err;
        console.log('summary created');
    });
}


const now = new Date();
syndicate('userx', new Date(now - 5*60*60));

