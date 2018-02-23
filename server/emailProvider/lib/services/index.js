'use strict';

const registry = require('node-registry');

const serviceFactories = {
    GmailService: require('./gmail')
};

module.exports = {
    initialize: function () {
        console.log('inside factories init');
        Object.keys(serviceFactories).forEach(function (key) {
            console.log('registering service ' + key);
            let service, ServiceClass = serviceFactories[key];
            service = new ServiceClass();
            registry.registerModule(key, service);
        });
    }

};