'use strict';

const Registry = require('node-registry');
const emailService = Registry.get('GmailService');

try {
    return emailService.readEmail();
}
catch (e) {
    console.log(e);
}