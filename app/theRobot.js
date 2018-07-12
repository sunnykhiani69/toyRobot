'use strict';

module.exports = TheRobot;

/**
 * This is the robot constructor, this defines the robot and its movement
 * @constructor
 */

function TheRobot(config, table, messenger) {

    // robot initilization

    this._config = config;
    this._table = table;
    this._messenger = messenger;
    this._hasPlacedCommand = false;

    this._robotCurrentPosition = {
        x: undefined,
        y: undefined,
        f: undefined
    };

}

var prototype = {

    /**
    * Robot movements
    * @return robot position or error
    */

    place: function(x,y,f) {

        var arg ={};

        try {
            arg = this._vaidateInput(x,y,f);
        } catch (e) {

            return e; }

        // check if robot is placed on a safe place on the table top
        if (this._isFalling(arg.x, arg.y)) {
            return new Error(this._messenger.getMessage({
                msg: 'placeFall'
            }));
        }

        // places the robot if place command is valid
        this._updateRobotPosition(arg.x, arg.y, arg.f);

        // update inital place command
        if (!this._hasPlacedCommand)
            this._hasPlacedCommand = true;

        return this;
    },

    // function to fetch the robots current position
    _getRobotPosition: function() {
        return {
            x: this._robotCurrentPosition.x,
            y: this._robotCurrentPosition.y,
            f: this._config.rDirections[this._robotCurrentPosition.f]
        };
    },

};

TheRobot.prototype = Object.create(prototype);
TheRobot.prototype.constructor = TheRobot;
