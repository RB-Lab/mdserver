#!/usr/bin/env node
var http = require('http'),
    path = require('path'), 
    init = require('../lib/init'),
    handler = require('../lib/handler');

function usage() {
    console.log('mdserv init [directory]');
    console.log('mdserv serve [directory] [port]');
}

function serve(directory, port) {
    directory = path.resolve(directory);

    var handlerInstance = handler(directory);
    http.createServer(handlerInstance).listen(port || 0xD0C);
}

var args = process.argv.slice(2),
    command = (args[0] || '').toLowerCase(),
    directory = args[1] || '.',
    port = Number(args[2]);

switch (command) {
    case 'init':
        return init(directory);
    case 'serve':
        serve(directory, port);
        return;
    default:
        return usage(); 
}
