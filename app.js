'use strict';

const express = require('express');
const registry = require('node-registry');


const app = express();
app.use(express.static('public'));

const Server = registry.createServer(app);

Server.start(function () {
    console.info('Server running on Port: %d', Server.port);

});