"use strict";

const normalize = require('./lib/normalize');
const font = require('./lib/font');
const numeral = require('./lib/numeral');

module.exports = {
    "normalize": normalize,
    "fullwidthCase": font.fullwidthCase,
    "halfwidthCase": font.halfwidthCase,
    "fontwidth": font.fontwidth,
    "isFullwidth": font.isFullwidth,
    "cutDBCHstr": font.cutDBCHstr,
    "toNumber": numeral.toNumber,
    "isHanNumber": numeral.isHanNumber,
    "toHanNumber": numeral.toHanNumber,
    "extractionHanNumber": numeral.extractionHanNumber
};
