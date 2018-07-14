'use strict';

module.exports = Messenger;

/**
 * The messenger class constructor, it is primarily used to parse messages
 * @constructor
 */

function Messenger() {
}

var config = require('config');

var prototype = {

    /**
     * Instructions for messages
     * @return {String}
     */

    getMessage: function(mData) {

        if (!mData) {
            return config.get('messages.default');
        }

        if (!config.messages[mData.msg]){
            return config.get('messages.default');
        }

        return this._constructMessage(mData);
    },

    _constructMessage: function(mData) {
        var mCombined = Object.assign({}, mData, config.messages),
            str;

        str = config.messages[mCombined.msg].replace(
            /{(\w+)}/g,
            function(match, p) {
                return mCombined[p];
            });
        return str;
    }
};

Messenger.prototype = Object.create(prototype);
Messenger.prototype.constructor = Messenger;
