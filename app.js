'use strict';

const express = require('express');
const Registry = require('node-registry');

// Scans your `server` directory to autmatically register modules inside the IoC Container
Registry.registerFolder(__dirname + '/server');

const app = express();

// register the Express HTTP Listener with the default port of 8000
const Server = Registry.createServer(app);
// Start the server
Server.start(function() {
    console.info('Server running on Port: %d', Server.port);
});