'use strict';

/**
 * The goal of this file is to create a simulator to interact with the toy robot via command line
 */

// inital variables

var os = require('os'),
    stdin = process.stdin;
    stdout = process.stdout;
    stderr = process.stderr;
    toyRobot = require('./toyRobotCreator');
    EOL = os.EOL;
    fs = require('fs');
    readline = require('readline');
    rl;
    argv;
    messenger = toyRobot.getMessenger();
    stdin.setEncoding('utf8');
    process.title = 'The Toy Robot';
    argv = process.argv.slice(2);




