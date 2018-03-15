'use strict';

const WunderlistSDK = require('wunderlist');
const wunderlistAPI = new WunderlistSDK({
    'accessToken': process.env.access_token,
    'clientID': process.env.client_id
});

/*wunderlistAPI.http.lists.all()
    .done(function (lists) {
        console.log('=================> Wunerlist Lists ' + lists.toString());
        const listId = '343165472';
        //return wunderlistAPI.tasks.forList(343165472);
    })
    .fail(function () {
        console.error('there was a problem');
    });*/

// gets work related tasks.

wunderlistAPI.http.tasks.baseUrl = '/v1/tasks?list_id=343165472';
wunderlistAPI.http.tasks.all()
    .done(function (tasksData, statusCode) {
        console.log('=================> Wunerlist Tasks =======================>');
        tasksData.forEach(function (task) {
            console.log('Title: ' + task.title);
            console.log('Due on: ' + task.due_date);
            console.log('Task Completed: ' + task.completed);
            console.log('==========================================================>');
            //console.log(JSON.stringify(task, null, 2));
        });
    })
    .fail(function (resp, code) {
        console.error('there was a problem' + resp);
    });
