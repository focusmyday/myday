'use strict';

const imaps = require('imap-simple');
let connection;

function readEmail() {
    const config = {
        imap: {
            user: process.env.MYDAY_USER_NAME,
            password: process.env.MYDAY_PASS,
            host: 'imap.gmail.com',
            port: 993,
            tls: true,
            authTimeout: 3000
        }
    };

    return imaps.connect(config)
        .then((connected) => {
            console.log('connection success!!!');
            connection = connected;
            return connection.openBox('INBOX');
        })
        .then(() => {
            const searchCriteria = ['UNSEEN'];
            const fetchOptions = {
                bodies: ['HEADER', 'TEXT'],
                markSeen: false
            };
            return connection.search(searchCriteria, fetchOptions);
        })
        .then((results) => {
            results.forEach(function (result) {
                console.log('');
                //console.log('body===>' + result.parts[0].body);
                console.log('from====>' + result.parts[1].body.from[0]);
                console.log('received at ====>' + result.parts[1].body.received[0]);
                console.log('subject====>' + result.parts[1].body.subject[0]);
                console.log('');
            });
        });

}

try {
    return readEmail();
}
catch (e) {
    console.log(e);
}