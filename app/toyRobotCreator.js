'use strict';

/**
 * This constructs the robot
 */

var config = require('config');
var TheTable = require('./../app/tableTop');
var Messenger = require('./../app/messenger');
var TheRobot = require('./../app/theRobot');

module.exports =
new TheRobot(config.TheRobot,
    new TheTable(config.TheTable,
        new Messenger(config.Messenger)));


