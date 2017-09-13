"use strict";

const normalize = require('./lib/normalize');
const font = require('./lib/font');


module.exports = {
    "normalize": normalize,
    "fullwidthCase": font.fullwidthCase,
    "halfwidthCase": font.halfwidthCase,
    "fontwidth": font.fontwidth,
    "isFullwidth": font.isFullwidth
};
