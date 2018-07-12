'use strict';

/**
 * This file will describe the test for all of the robots movements
 * The goal of this file is to validate app/theRobot.js
 */

var config = require('config');
var TheTable = require('./../app/tableTop');
var Messenger = require('./../app/messenger');
var TheRobot = require('./../app/theRobot');

describe('The Toy Robot', function() {
    var theRobot;
    var messenger;
    var x, y, f;

    beforeAll(function() {
        messenger = new Messenger(config.messenger);
    });

    beforeEach(function() {
        theRobot = new TheRobot(config.robot,
            new TheTable(config.table),
            Messenger);
    });

    it('should be undefined before PLACE command', function() {
        var oPosition = theRobot._getRobotPosition();
        expect(oPosition.x === undefined &&
            oPosition.y === undefined &&
            oPosition.f === undefined).toBe(true);
        console.log('condition robot is undefined');
    });

});

