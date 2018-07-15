'use strict';

/**
 * The goal of this file is to create a simulator to interact with the toy robot via command line
 */

// inital variables
var
    os = require('os'),
    stdin = process.stdin,
    stdout = process.stdout,
    stderr = process.stderr,
    toyRobot = require('./toyRobotCreator'),
    EOL = os.EOL,
    fs = require('fs'),
    readline = require('readline'),
    rl,
    argv,
    messenger = toyRobot.getMessenger();

stdin.setEncoding('utf8');
stdout.setEncoding('utf8');
process.title = 'The Toy Robot';
argv = process.argv.slice(2); // omit the commands and get only filename


// this is to readline in command prompt
stdin.on('data', function(data) {
    doOutput(data);
});


// to ingest the file of commands
if (argv.length) {
    try {
        fs.accessSync(argv[0], fs.F_OK || fs.R_OK);
    } catch (e) {
        stderr.write(messenger.getMessage({
            msg: 'fileNotFound',
            fileName: argv[0]
        }));
        process.exit();
    }

    rl = readline.createInterface({
        input: fs.createReadStream(argv[0]),
        terminal: false
    });

    rl.on('line', function(line) {
        stdout.write(line + EOL);
        doOutput(line);
    });

    rl.on('close', function() {
        rl.close();
        process.exit();
    });
}

function robotAction(rCommand) {
    var res;
    if (rCommand.match(/^\s*place\s+\w+(?:,?\s*|\s+)\w+(?:,?\s*|\s+)\w+\s*$/i)) {
        var args = rCommand.trim().split(/(?:\s+|,\s*)/i).slice(1);
        res = toyRobot.place(args[0], args[1], args[2]);
    } else if (rCommand.match(/^move\s*$/i)) {
        res = toyRobot.move();
    } else if (rCommand.match(/^left\s*$/i)) {
        res = toyRobot.left();
    } else if (rCommand.match(/^right\s*$/i)) {
        res = toyRobot.right();
    } else if (rCommand.match(/^report\s*$/i)) {
        res = toyRobot.report();
    } else {
        res = new Error(messenger.getMessage({
            msg: 'unknownCommand'
        }));
    }
    return res;
}

function doOutput(data) {
    var res, _data = data.trim();

    if (_data.match(/(q|quit|exit)/i))
        process.exit();

    res = robotAction(_data);
    if (res instanceof Error) {
        stdout.write(res.message + EOL + '> ');
    } else if (typeof res === 'string') {
        stdout.write(res + EOL + '> ');
    } else {
        stdout.write('> ');
    }
}

function ToyRobotApp() {}

ToyRobotApp.run = function() {
    stdout.write(messenger.getMessage({
        msg: 'welcome',
        eol: EOL
    }) + EOL + '>');
    stdin.resume();
};

module.exports = ToyRobotApp;




