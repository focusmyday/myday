'use strict';

// let caFiles = ['/etc/ssl/cert.pem'];
// const fs = require('fs');

// let ca = caFiles.map(function (caFile) {
//     return fs.readFileSync(caFile, {encoding: 'utf8'});
// });

// const https = require('https');
// const agent = new http.Agent({
// 	host: '10.48.127.168',
// 	port: 8080,
// 	ca: ca,
// 	maxSockets: 100
// });

// TODO handle multi githubs
const octokit = require('@octokit/rest')({});
//
//
// TODO handle multi users
// token (https://github.com/settings/tokens)
octokit.authenticate({
    type: 'token',
    token: process.env.GITHUB_TOKEN
});
//
let fetchSummaries  = function(user, since) {
    // TODO handle user, since
    return octokit.issues.getAll({filter: 'assigned'}).then(function (results) {
        let summaries = [];
        results.data.forEach(function (issue) {
            let currentGithubUser = issue.user.id;
            let isAssigned = checkAssignment(issue.assignees, currentGithubUser);

            let summary = {
                user: user,
                channelType: 'github',
                channelName: 'My Issues',
                msgTimeStamp: new Date(issue.updated_at),
                assignedToMe: isAssigned,
                state: issue.state,
                title: issue.title,
                body: issue.body,
                metadata: {
                    from: issue.repository.name

                },
                url: issue.url
            };
                // name: issue.repository.name,
                // id: issue.repository.id,
                // url: issue.repository.url
            if (issue.milestone) {
                summary.milestone = {
                    title: issue.milestone.title,
                    url: issue.milestone.url,
                    id: issue.milestone.id
                }
            }
            summaries.push(summary);
        });
        return summaries;
    }).catch(function (err) {
        console.log(err);
    });
};

/**
 * Check if userId is in the list of assignees
 * @param assignees
 * @param userId
 * @return {boolean}
 */
function checkAssignment(assignees, userId) {
    let isAssigned = false;
    assignees.forEach(function (assignee) {
        if (assignee.id === userId) {
            isAssigned = true
        }
    });
    return isAssigned;
}

module.exports = {
    fetchSummaries : fetchSummaries
};