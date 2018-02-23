'use strict';

let fetchSummaries  = function(user, since) {
    //mock for now
    let summaries = [];
    let summary = {
        'user': user,
        'channelType' : 'email',
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