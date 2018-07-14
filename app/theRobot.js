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

    // robot place function
    place: function(x ,y ,f) {

        var arg ={};

        try {
            arg = this._validateInput(x,y,f);
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

    // robot move function
    move: function(){
        var x,y,f;

        // is the PLACE command made
        if (!this._hasPlacedCommand){

            return new Error(
                this._messenger.getMessage({ msg: 'noInitCommand'})
            );
        }

        x = this._robotCurrentPosition.x;
        y = this._robotCurrentPosition.y;
        f = this._robotCurrentPosition.f;

        // update x & y correctly

        switch(f) {
        case 0: ++y; // move north
            break;
        case 1: ++x; // move east (right)
            break;
        case 2: --y; // move south
            break;
        case 3: --x; // move west (left)
            break;
        }

        // make sure step is on table
        if (this._isFalling(x,y)) {
            return new Error(this._messenger.getMessage({
                msg: 'placeFall'
            }));
        }

        // places the robot if place command is valid
        this._updateRobotPosition(x, y, this._config.rDirections[f]);

    },

    // this is the report function

    report: function(msgObj){
        if (!msgObj) {
            var rPosition = this._getRobotPosition();

            if (rPosition.x === undefined &&
                rPosition.y === undefined &&
                rPosition.f === undefined) {
                return this._messenger.getMessage({
                    x: rPosition.x,
                    y: rPosition.y,
                    f: rPosition.f
                });

            } else {
                return this._messenger.getMessage({
                    msg: 'robotPosition',
                    x: rPosition.x,
                    y: rPosition.y,
                    f: rPosition.f
                });
            }
        } else
            return this._messenger.getMessage(msgObj);

    },

    left: function() {
        if (!this._hasPlacedCommand) {
            return new Error(this._messenger.getMessage({
                msg: 'noInitCommand'
            }));
        }
        this._robotCurrentPosition.f =
            (this._robotCurrentPosition.f - 1) < 0 ? // works if the directions are defined in clockwise
                3 : this._robotCurrentPosition.f - 1;
        return this;
    },

    right: function() {
        if (!this._hasPlacedCommand) {
            return new Error(this._messenger.getMessage({
                msg: 'noInitCommand'
            }));
        }
        this._robotCurrentPosition.f =
            (this._robotCurrentPosition.f + 1) > 3 ?
                0 : this._robotCurrentPosition.f + 1;
        return this;
    },

    // validate place command coordinates
    _validateInput: function(x, y, f) {

        if (!f) {
            throw new TypeError(this._messenger.getMessage({
                msg: 'noDirection'
            }));
        }

        if (typeof f !== 'string') {
            throw new TypeError(this._messenger.getMessage({
                msg: 'directionInvalid'
            }));
        }

        var _f = f.toUpperCase(),
            _x = parseInt(x),
            _y = parseInt(y);

        if (!Number.isInteger(_x) || !Number.isInteger(_y)) {
            throw new TypeError(this._messenger.getMessage({
                msg: 'posNotNum'
            }));
        }

        if (_x < 0 || _y < 0) {
            throw new TypeError(this._messenger.getMessage({
                msg: 'negativePos'
            }));
        }

        if (!this._isDirectionValid(_f)) {
            throw new TypeError(this._messenger.getMessage({
                msg: 'wrondDirection'
            }));
        }

        return {
            x: _x,
            y: _y,
            f: _f
        };
    },

    // check if the direction is valid
    _isDirectionValid: function(_f) {
        return this._config.rDirections.indexOf(_f) !== -1;
    },

    // check if robot will fall
    _isFalling: function(x, y) {
        return this._table.isFalling(x, y);
    },

    // update the robot position
    _updateRobotPosition: function(x, y, f) {
        this._robotCurrentPosition.x = x,
        this._robotCurrentPosition.y = y,
        this._robotCurrentPosition.f = this._config
            .rDirections.indexOf(f);
    },

    // function to fetch the robots current position
    _getRobotPosition: function() {
        return {
            x: this._robotCurrentPosition.x,
            y: this._robotCurrentPosition.y,
            f: this._config.rDirections[this._robotCurrentPosition.f]
        };
    },

    getMessenger: function() {
        return this._messenger;
    },

};

TheRobot.prototype = Object.create(prototype);
TheRobot.prototype.constructor = TheRobot;
