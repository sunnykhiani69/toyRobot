'use strict';

/**
 * This constructs the robot
 */

var config = require('config');
var TheTable = require('./tableTop');
var Messenger = require('./messenger');
var TheRobot = require('./theRobot');

module.exports = new TheRobot(config.robot,
    new TheTable(config.tableTop),
    new Messenger(config.messages));


