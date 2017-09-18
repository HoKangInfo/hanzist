"use strict";


const charWidth = require('east-asian-width').char_width;
const fontBoundWidth = function(cp){
    if (!isLength(cp)) {
        throw new TypeError('must be type of natural Number');
    }
    // fix control characters return 0 not 2
    return (cp < 32 || (cp >= 0x7f && cp < 0xa0))? 0: charWidth(cp);
};

var isLength = function(value) {
    return (typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= Number.MAX_SAFE_INTEGER);
};

var isString = function(value) {
    return ((typeof value == 'string') ||
        (Object.prototype.toString.call(str) == '[object String]'));
};

var reverseMap = function(map) {
    return Object.entries(map).reduce((reverse, [key, value]) => {
        reverse[value] = key;
        return reverse;
    }, {});
};

// wideFontMap: wide => narrow, narrowFontMap: narrow => wide
// 3000=0020=[ ], FFE0=00A2=[¢], FFE1=00A3=[£], FFE2=00AC=[¬], FFE3=00AF=[¯], FFE4=00A6=[¦], FFE5=00A5=[¥], FFE6=20A9=[₩]
const General = {
    "wideFontMap": {
        "\u3000": "\u0020", "\u3002": "\uFF61", "\u300C": "\uFF62", "\u300D": "\uFF63", "\u3001": "\uFF64",
        "\uFF5F": "\u2985", "\uFF60": "\u2986", "\uFFE0": "\u00A2", "\uFFE1": "\u00A3", "\uFFE2": "\u00AC",
        "\uFFE3": "\u00AF", "\uFFE4": "\u00A6", "\uFFE5": "\u00A5", "\uFFE6": "\u20A9"
    }
};
General["narrowFontMap"] = reverseMap(General.wideFontMap);

//Katakana 片假名
const Katakana = {
    "narrowFontMap": {
        "\uFF65": "\u30FB", "\uFF66": "\u30F2", "\uFF67": "\u30A1", "\uFF68": "\u30A3",
        "\uFF69": "\u30A5", "\uFF6A": "\u30A7", "\uFF6B": "\u30A9", "\uFF6C": "\u30E3", "\uFF6D": "\u30E5",
        "\uFF6E": "\u30E7", "\uFF6F": "\u30C3", "\uFF70": "\u30FC", "\uFF71": "\u30A2", "\uFF72": "\u30A4",
        "\uFF73": "\u30A6", "\uFF74": "\u30A8", "\uFF75": "\u30AA", "\uFF76": "\u30AB", "\uFF77": "\u30AD",
        "\uFF78": "\u30AF", "\uFF79": "\u30B1", "\uFF7A": "\u30B3", "\uFF7B": "\u30B5", "\uFF7C": "\u30B7",
        "\uFF7D": "\u30B9", "\uFF7E": "\u30BB", "\uFF7F": "\u30BD", "\uFF80": "\u30BF", "\uFF81": "\u30C1",
        "\uFF82": "\u30C4", "\uFF83": "\u30C6", "\uFF84": "\u30C8", "\uFF85": "\u30CA", "\uFF86": "\u30CB",
        "\uFF87": "\u30CC", "\uFF88": "\u30CD", "\uFF89": "\u30CE", "\uFF8A": "\u30CF", "\uFF8B": "\u30D2",
        "\uFF8C": "\u30D5", "\uFF8D": "\u30D8", "\uFF8E": "\u30DB", "\uFF8F": "\u30DE", "\uFF90": "\u30DF",
        "\uFF91": "\u30E0", "\uFF92": "\u30E1", "\uFF93": "\u30E2", "\uFF94": "\u30E4", "\uFF95": "\u30E6",
        "\uFF96": "\u30E8", "\uFF97": "\u30E9", "\uFF98": "\u30EA", "\uFF99": "\u30EB", "\uFF9A": "\u30EC",
        "\uFF9B": "\u30ED", "\uFF9C": "\u30EF", "\uFF9D": "\u30F3", "\uFF9E": "\u3099", "\uFF9F": "\u309A",
    },
};
Katakana["wideFontMap"] = reverseMap(Katakana.narrowFontMap);

//Hangul 韓文
const Hangul = {
    "narrowFontMap": {
        "\uFFA0": "\u3164", "\uFFA1": "\u3131", "\uFFA2": "\u3132", "\uFFA3": "\u3133",
        "\uFFA4": "\u3134", "\uFFA5": "\u3135", "\uFFA6": "\u3136", "\uFFA7": "\u3137",
        "\uFFA8": "\u3138", "\uFFA9": "\u3139", "\uFFAA": "\u313A", "\uFFAB": "\u313B",
        "\uFFAC": "\u313C", "\uFFAD": "\u313D", "\uFFAE": "\u313E", "\uFFAF": "\u313F",
        "\uFFB0": "\u3140", "\uFFB1": "\u3141", "\uFFB2": "\u3142", "\uFFB3": "\u3143",
        "\uFFB4": "\u3144", "\uFFB5": "\u3145", "\uFFB6": "\u3146", "\uFFB7": "\u3147",
        "\uFFB8": "\u3148", "\uFFB9": "\u3149", "\uFFBA": "\u314A", "\uFFBB": "\u314B",
        "\uFFBC": "\u314C", "\uFFBD": "\u314D", "\uFFBE": "\u314E", "\uFFC2": "\u314F",
        "\uFFC3": "\u3150", "\uFFC4": "\u3151", "\uFFC5": "\u3152", "\uFFC6": "\u3153",
        "\uFFC7": "\u3154", "\uFFCA": "\u3155", "\uFFCB": "\u3156", "\uFFCC": "\u3157",
        "\uFFCD": "\u3158", "\uFFCE": "\u3159", "\uFFCF": "\u315A", "\uFFD2": "\u315B",
        "\uFFD3": "\u315C", "\uFFD4": "\u315D", "\uFFD5": "\u315E", "\uFFD6": "\u315F",
        "\uFFD7": "\u3160", "\uFFDA": "\u3161", "\uFFDB": "\u3162", "\uFFDC": "\u3163",
    },
};
Hangul["wideFontMap"] = reverseMap(Hangul.narrowFontMap);


var fontCase = function(str, halfwidth, fontset) {
    const maps = (fontset || []).reduce((result, name) => {
        if (/Katakana/i.test(name)) {
            result['Katakana'] = halfwidth ? Katakana.wideFontMap : Katakana.narrowFontMap;
        } else if (/Hangul/i.test(name)) {
            result['Hangul'] = halfwidth ? Hangul.wideFontMap : Hangul.narrowFontMap;
        }

        return result;
    }, { "General": halfwidth ? General.wideFontMap : General.narrowFontMap });

    const downMin = 0x20, downMax = 0x7E, upMin = 0xFF00, upMax = 0xFF5E;
    const moving = upMin - downMin;

    const isRange = halfwidth ? (code) => (upMax >= code && code > upMin) :
        (code) => (downMax >= code && code > downMin);

    const alternate = halfwidth ? (code) => String.fromCharCode(code - moving) :
        (code) => String.fromCharCode(code + moving);

    const dat = [];
    for (const cp of str) {
        const code = cp.codePointAt(0);

        let hit = false;
        for (const name in maps){
            hit = maps[name][cp];
            if (hit) {
                dat.push(hit);
                break;
            }
        }

        if (hit) {
            continue;
        }

        if (isRange(code)) {
            dat.push(alternate(code));
            continue;
        }

        dat.push(cp);
    }

    return dat.join('');
};

var fullwidthCase = function(str, fontset) {
	return fontCase(str, false, fontset);
};

var halfwidthCase = function(str, fontset) {
    return fontCase(str, true, fontset);
};

var isFullwidth = function(cp) {
    if (!cp) {
        return false;
    }

    // fix cp must be 0 or n
    const code = isLength(cp)? cp: ('' + cp).codePointAt(0);

    return fontBoundWidth(code) == 2;
};

var fontwidth = function(str) {
    if (!str){
        return 0;
    }

    if (!isString(str)) {
        throw new TypeError('must be type of String');
    }

    let len = 0;
    for (const cp of str) {
        const code = cp.codePointAt(0);
        len = len + fontBoundWidth(code);
    }

    return len;
};

var cutDBCHstr = function(str, start, length) {
    start = (isLength(start)? start: 0) * 2;
    let end = start + (isLength(length)? length: 0) * 2;
    let pos = 0, len = 0, idx = 0;
    let breakOff = false;

    for (const cp of str) {
        if (len >= end) {
            break;
        }

        if (len < start) {
            idx++;
        }

        if (len < end) {
            pos++;
        }

        const code = cp.codePointAt(0);
        const step = (isFullwidth(code) ? 2 : 1);
        len = len + step;
        if (!breakOff && step === 2 && ((start - len + 1) === 0)) {
        // head break
            breakOff = true;
            idx--;
            pos--;
        }

        if (step === 2 && ((end - len + 1) === 0)) {
        // tail break
            if (pos - idx - 1) {
                pos--;
           }
        }

    }

    return length == null ? str.substring(idx) : str.substring(idx, pos);
};

module.exports = {
    "fullwidthCase": fullwidthCase,
    "halfwidthCase": halfwidthCase,
    "fontwidth": fontwidth,
    "isFullwidth": isFullwidth,
    "cutDBCHstr": cutDBCHstr
};

