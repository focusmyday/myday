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
            console.log(results);
        });

}

try {
    return readEmail();
}
catch (e) {
    console.log(e);
}