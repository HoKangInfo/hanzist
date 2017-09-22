"use strict";

const altWordTable = require('./alt-word-table');
const {isString} = require('js-group');

var normalize = function(str, options) {
    if (!isString(str)) {
        throw new TypeError('str is not a String');
    }

    const unify = altWordTable.generate(options);

    const ary = [];
    for (const cp of str) {
        ary.push(cp.codePointAt(0) > 0xFFFF ? cp : unify(cp))
    }
    return ary.join('');

/*
    return (str).split('').map(function(c,i) {
        return unify(c);
    }).join('');
*/
}

module.exports = normalize;

