"use strict";

const altWordTable = require('./alt-word-table');

var normalize = function(str, options) {
    if (!((typeof str == 'string') || (Object.prototype.toString.call(str) == '[object String]'))) {
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

