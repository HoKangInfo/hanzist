"use strict";

const { isString, isNumber } = require('js-group');


// 採萬進位, 依清代《數理精蘊》數字單位為 一、十、百、千、萬、億、兆、京、[垓、秭、穰、溝、澗、正、載、極]
// 萬以下是十進位，萬以後為萬進位，即 "萬萬為億、 萬億為兆、 萬兆為京"
// MAX_SAFE_INTEGER = 9007,1992,5474,0991
var unit = (n) => {
    let num = {
        '零': 0,
        '一': 1,
        '二': 2,
        '三': 3,
        '四': 4,
        '五': 5,
        '六': 6,
        '七': 7,
        '八': 8,
        '九': 9,
        '十': 10,
        '百': 100,
        '千': 1000,
        '萬': 10000,
        '億': 100000000,
        '兆': 1000000000000,
        '京': 10000000000000000 // 10^16
    }[n];

    return num >= 0 ? num : NaN;
}

var normalize = (str) => [
    ["零", /[\u{F9B2}]/ug],
    ["一", /[\u{58F1}\u{58F9}\u{5F0C}]/ug],
    ["二", /[\u{8CB3}\u{8D30}\u{5F0D}]/ug],
    ["三", /[\u{53C1}\u{53C2}\u{53C3}\u{5F0E}]/ug],
    ["四", /[\u{8086}]/ug],
    ["五", /[\u{3405}\u{4F0D}]/ug],
    ["六", /[\u{9678}\u{F9D1}]/ug],
    ["七", /[\u{67D2}]/ug],
    ["八", /[\u{634C}]/ug],
    ["九", /[\u{7396}]/ug],
    ["十", /[\u{62FE}\u{F973}]/ug],
    ["百", /[\u{4F70}]/ug],
    ["千", /[\u{4EDF}]/ug],
    ["萬", /[\u{4E07}]/ug],
    ["億", /[\u{4EBF}]/ug],
].reduce((str, [word, pattern]) => {
    return str.replace(pattern, word);
}, str);

var verify = (str) => ![
    /[^零一二三四五六七八九十百千萬億兆京]/,
    /^零[^零]+|[^零]+零$/,
    /([零一二三四五六七八九十百千萬億兆京])\1+/,
    /零[萬億兆京]/,
    /[萬億兆京][十百千萬億兆京]/,
    /[一二三四五六七八九][零一二三四五六七八九]/,
    /萬零[一二三四五六七八九]?千|千零?百|百零?十|千十/,
    /千零[一二三四五六七八九]百|百零[一二三四五六七八九]十|十零/,
].some((re) => re.test(str));

var wanjin = (str) => (str || '').replace(/([萬億兆京])/g, '$1,').split(',')
    .filter((value) => value).map((value) => {
        let mult = unit(value.slice(-1));
        return mult >= 10000 ? [value.slice(0, -1), mult] : [value, 1];
    });

var koliPoint = (str) => (str || '').replace(/([千百十])/g, '$1,').split(',')
    .filter((value) => value).map((value) => {
        value = value.replace(/零/g, '');
        let multed = unit(value.slice(-2, -1)),
            mult = unit(value.slice(-1));

        switch (value.length) {
            case 1:
                multed = 1;
                break;
            case 2:
                multed = multed ? multed : 1;
                break;
            default:
                multed = NaN;
                break;
        }

        return multed * mult;
    });

var isOrder = (ary) => {
    let ordered = 0;

    return !ary.reverse().find((n) => {
        ordered = (n > ordered) ? n : 0;
        return !ordered;
    });
}

var isHanNumber = function(str) {
    if (str == null) {
        return false;
    }

    if (!isString(str)) {
        return false;
    }

    str = str.trim();
    if (!str) {
        return false;
    }

    str = normalize(str);

    if (!verify(str)) {
        return false;
    }

    let ary = wanjin(str);

    if (!isOrder(ary.map(([s, n]) => n))) {
        return false;
    }

    if (!ary.map(([s, n]) => koliPoint(s)).every((ary) => isOrder(ary))) {
        return false;
    }

    return true;
}

var toNumber = function(str) {
    if (str == null) {
        return NaN;
    }

    if (isNumber(str)) {
        return str;
    }

    if (!isString(str)) {
        return NaN;
    }

    str = str.trim();
    if (!str) {
        return NaN;
    }

    if (!isNaN(str)) {
        return +str;
    }

    let hanNum = normalize(str).replace(/(\d+)/g, (match) => toHanNumber(match));

    if (!verify(hanNum)) {
        return NaN;
    }

    if (hanNum.length === 1) {
        return unit(hanNum);
    }

    let baseUnit = (/([百千萬億兆京])[一二三四五六七八九]$/.exec(hanNum) || []).pop();
    if (baseUnit) {
        const lst = ['十', '百','千', '萬', '億', '兆', '京'];
        baseUnit = lst[lst.indexOf(baseUnit) - 1];
        hanNum = hanNum + baseUnit;
    }

    let ary = wanjin(hanNum);

    if (!isOrder(ary.map(([s, n]) => n))) {
        return NaN;
    }

    ary = ary.map(([multedStr, mult]) => {
        let multed = koliPoint(multedStr);

        multed = isOrder(multed) ? multed.reduce((sum, x) => sum + x, 0) : NaN;

        multed = multed == 0 ? 1 : multed;

        return multed * mult;
    });

    if (!isOrder(ary)) {
        return NaN;
    }

    return ary.reduce((sum, x) => sum + x, 0);
}


var wanfen = (str) => {
    const size = 4;
    str = ('0000' + str).slice(-(((str.length >> 2) + 1) << 2))
    const len = str.length;

    let i = 0,
        ary = [];
    while (i < len) {
        ary.push(str.substring(i, (i += size)));
    }

    return ary;
}

var koliDot = (str) => ('0000' + str).slice(-4).split('').map((n, i) => {
    n = +n;
    const lst =  ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    return n == 0 ? '零' : lst[n] + ['千', '百', '十', ''][i];
}).join('').replace(/零+/g, '零').replace(/零+$/g, '');

var toHanNumber = function(n) {
    if (n == null) {
        return '';
    }

    if (isNumber(n) && !Number.isSafeInteger(n)) {
        throw 'Not Safe Integer';
    }

    n = ('' + n).trim();
    if (!n) {
        return '';
    }

    if (isHanNumber(n)) {
        return normalize(n);
    }

    if (/^0+$/.test(n)) {
        return '零';// n.replace(/0/g, '零');
    }

    if (isNaN(n)) {
        return '';
    }

    if (!/^\d+$/.test(n)) {
        return '';
    }

    return wanfen(n).reverse().map((multed, mult) => {
        multed = koliDot(multed);
        mult = ['', '萬', '億', '兆', '京', '垓', '秭', '穰', '溝', '澗', '正', '載', '極'][mult];
        if (multed && mult == undefined) {
            throw '極大數';
        }
        return multed ? multed + mult: '';
    }).reverse().join('').replace(/^零+|零+$/g, '').replace(/^一十/, '十');

}

var extractionHanNumber = function(str) {
    var m = /([零\u{F9B2}一\u{58F1}\u{58F9}\u{5F0C}二\u{8CB3}\u{8D30}\u{5F0D}三\u{53C1}\u{53C2}\u{53C3}四\u{8086}五\u{3405}\u{4F0D}六\u{9678}\u{F9D1}七\u{67D2}八\u{634C}九\u{7396}十\u{62FE}\u{F973}百\u{4F70}千\u{4EDF}萬\u{4E07}億\u{4EBF}兆京]+)/u.exec(str);
    if (!m) {
        return '';
    }

    if (isHanNumber(m[1])){
        return m[1];
    }

    return '';
}


module.exports = {
    "toNumber": toNumber,
    "isHanNumber": isHanNumber,
    "toHanNumber": toHanNumber,
    "extractionHanNumber": extractionHanNumber
}
