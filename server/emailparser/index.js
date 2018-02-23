'use strict';

let fetchSummaries  = function() {
    //mock for now
    let summaries = [];
    let summary = {'channelType' : 'email', 
        'channelName': 'My Gmail', 
        'msgTimeStamp': new Date(),
        'metadata' : {
            'from' : 'boss@myday.com',
            'target': 'you@myday.com',
            'snippet': 'Assessments due tomorrow'
        }
    };
    summaries.push(summary);
    return Promise.resolve(summaries);
}

module.exports = {
    fetchSummaries : fetchSummaries
}; 