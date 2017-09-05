"use strict";

// {4E00}-\u{9FFF}

const CodeTables = {

    "Kanbun": {
        "start": 0x3190,
        "end": 0x319F,
        "map": [
        //  0x3190 ~ 0x319F => 古典日文中使用的註釋字符, 以指示閱讀順序
        //       |,      ^,     一,     二,     三,     四,     上,     中,     下,     甲,     乙,     丙,     丁,     天,     地,     人
            0x007C, 0x005E, 0x4E00, 0x4E8C, 0x4E09, 0x56DB, 0x4E0A, 0x4E2D, 0x4E0B, 0x7532, 0x4E59, 0x4E19, 0x4E01, 0x5929, 0x5730, 0x4EBA
        ]
    },

    "Enclosed_CJK_Lettersvar_Brackets": {
        "start": 0x3220,
        "end": 0x3247,
        "map": [
        //  0x3220 ~ 0x3247 => 帶括弧的中日韓表意文字, 0x3220~0x3243 帶括弧, 新增 0x3244~0x3247 帶圓圈
        //      一,     二,     三,     四,     五,     六,     七,     八,     九,     十,     月,     火,     水,     木,     金,     土,
            0x4E00, 0x4E8C, 0x4E09, 0x56DB, 0x4E94, 0x516D, 0x4E03, 0x516B, 0x4E5D, 0x5341, 0x6708, 0x706B, 0x6C34, 0x6728, 0x91D1, 0x571F,
        //      日,     株,     有,     社,     名,     特,     財,     祝,     勞,     代,     呼,     學,     監,     企,     資,     協,
            0x65E5, 0x682A, 0x6709, 0x793E, 0x540D, 0x7279, 0x8CA1, 0x795D, 0x52DE, 0x4EE3, 0x547C, 0x5B78, 0x76E3, 0x4F01, 0x8CC7, 0x5354,
        //      祭,     休,     自,     至,     問,     幼,     文,     箏
            0x796D, 0x4F11, 0x81EA, 0x81F3, 0x554F, 0x5E7C, 0x6587, 0x7B8F
        ]
    },
    "Enclosed_CJK_Lettersvar_Circles": {
        "start": 0x3280,
        "end": 0x32B0,
        "map": [
        //  0x3280 ~ 0x32B0 => 帶圓圈的中日韓表意文字
        //      一,     二,     三,     四,     五,     六,     七,     八,     九,     十,     月,     火,     水,     木,     金,     土,
            0x4E00, 0x4E8C, 0x4E09, 0x56DB, 0x4E94, 0x516D, 0x4E03, 0x516B, 0x4E5D, 0x5341, 0x6708, 0x706B, 0x6C34, 0x6728, 0x91D1, 0x571F,
        //      日,     株,     有,     社,     名,     特,     財,     祝,     勞,     秘,     男,     女,     適,     優,     印,     注,
            0x65E5, 0x682A, 0x6709, 0x793E, 0x540D, 0x7279, 0x8CA1, 0x795D, 0x52DE, 0x79D8, 0x7537, 0x5973, 0x9069, 0x512A, 0x5370, 0x6CE8,
        //      項,     休,     寫,     正,     上,     中,     下,     左,     右,     醫,     宗,     學,     監,     企,     資,     協,
            0x9805, 0x4F11, 0x5BEB, 0x6B63, 0x4E0A, 0x4E2D, 0x4E0B, 0x5DE6, 0x53F3, 0x91AB, 0x5B97, 0x5B78, 0x76E3, 0x4F01, 0x8CC7, 0x5354,
        //      夜
            0x591C
        ]
    },
    "Ideographic_Telegraph_Symbols_Months": {
        "start": 0x32C0,
        "end": 0x32CB,
        "map": (index) => {
        //  0x32C0 ~ 0x32CB => 電報文字 1 月到 12 月
        // like 1月2月3月4月5月6月7月8月9月10月11月12月
            return (0 > index || index > 11) ? undefined : (index + 1) + '月';
        }
    },
    "Ideographic_Telegraph_Symbols_Hours": {
        "start": 0x3358,
        "end": 0x3370,
        "map": (index) => {
        //  0x3358 ~ 0x3370 => 電報文字 0 點到 24 點
        // like 0点1点2点......24点
            return (0 > index || index > 24) ? undefined : (index) + '点';
        }
    },
    "Japanese_Era_Names_And_Corporation": {
        "start": 0x337B,
        "end": 0x337F,
        "map": [
        //  0x337B ~ 0x337F => 日本年號跟公司
            '平成', '昭和', '大正', '明治', '株式会社'
        ]
    },
    "Ideographic_Telegraph_Symbols_Days": {
        "start": 0x33E0,
        "end": 0x33FE,
        "map": (index) => {
        //  0x33E0 ~ 0x33FE => 電報文字 1 日到 31 日
        // like 1日2日3日......31日
            return (0 > index || index > 30) ? undefined : (index + 1) + '日';
        }
    },
    "Private_Use_Area": {
        "start": 0xE000,
        "end": 0xF8FF,
        "map": null
        //  0xE000 ~ 0xF8FF => 私有區域, 沒有統一的對應
    },
    "CJK_Compatibility_Ideographs": {
        "start": 0xF900,
        "end": 0xFAFF,
        "map": [
        //  0xF900 ~ 0xFAFF => 中日韓相容表意文字, 目前只編到 0xFAD9
        //      豈,     更,     車,     賈,     滑,     串,     句,     龜,     龜,     契,     金,     喇,     奈,     懶,     癩,     羅,
            0x8C48, 0x66F4, 0x8ECA, 0x8CC8, 0x6ED1, 0x4E32, 0x53E5, 0x9F9C, 0x9F9C, 0x5951, 0x91D1, 0x5587, 0x5948, 0x61F6, 0x7669, 0x7F85,
        //0xF910 ~ 0xF91F =>
        //      蘿,     螺,     裸,     邏,     樂,     洛,     烙,     珞,     落,     酪,     駱,     亂,     卵,     欄,     爛,     蘭,
            0x863F, 0x87BA, 0x88F8, 0x908F, 0x6A02, 0x6D1B, 0x70D9, 0x73DE, 0x843D, 0x916A, 0x99F1, 0x4E82, 0x5375, 0x6B04, 0x721B, 0x862D,
        //0xF920 ~ 0xF92F =>
        //      鸞,     嵐,     濫,     藍,     襤,     拉,     臘,     蠟,     廊,     朗,     浪,     狼,     郎,     來,     冷,     勞
            0x9E1E, 0x5D50, 0x6FEB, 0x85CD, 0x8964, 0x62C9, 0x81D8, 0x881F, 0x5ECA, 0x6717, 0x6D6A, 0x72FC, 0x90CE, 0x4F86, 0x51B7, 0x52DE,
        //0xF930 ~ 0xF93F =>
        //      擄,     櫓,     爐,     盧,     老,     蘆,     虜,     路,     露,     魯,     鷺,     碌,     祿,     綠,     菉,     錄
            0x64C4, 0x6AD3, 0x7210, 0x76E7, 0x8001, 0x8606, 0x865C, 0x8DEF, 0x9732, 0x9B6F, 0x9DFA, 0x788C, 0x797F, 0x7DA0, 0x83C9, 0x9304,
        //0xF940 ~ 0xF94F =>
        //      鹿,     論,     壟,     弄,     籠,     聾,     牢,     磊,     賂,     雷,     壘,     屢,     樓,     淚,     漏,     累
            0x9E7F, 0x8AD6, 0x58DF, 0x5F04, 0x7C60, 0x807E, 0x7262, 0x78CA, 0x8CC2, 0x96F7, 0x58D8, 0x5C62, 0x6A13, 0x6DDA, 0x6F0F, 0x7D2F,
        //0xF950 ~ 0xF95F =>
        //      縷,     陋,     勒,     肋,     凜,     凌,     稜,     綾,     菱,     陵,     讀,     拏,     樂,     諾,     丹,     寧
            0x7E37, 0x964B, 0x52D2, 0x808B, 0x51DC, 0x51CC, 0x7A1C, 0x7DBE, 0x83F1, 0x9675, 0x8B80, 0x62CF, 0x6A02, 0x8AFE, 0x4E39, 0x5BE7,
        //0xF960 ~ 0xF96F =>
        //      怒,     率,     異,     北,     磻,     便,     復,     不,     泌,     數,     索,     參,     塞,     省,     葉,     說
            0x6012, 0x7387, 0x7570, 0x5317, 0x78FB, 0x4FBF, 0x5FA9, 0x4E0D, 0x6CCC, 0x6578, 0x7D22, 0x53C3, 0x585E, 0x7701, 0x8449, 0x8AAA,
        //0xF970 ~ 0xF97F =>
        //      殺,     辰,     瀋,     十,     若,     掠,     略,     亮,     兩,     涼,     梁,     糧,     良,     諒,     量,     勵
            0x6BBA, 0x8FB0, 0x700B, 0x5341, 0x82E5, 0x63A0, 0x7565, 0x4EAE, 0x5169, 0x6DBC, 0x6881, 0x7CE7, 0x826F, 0x8AD2, 0x91CF, 0x52F5,
        //      0xF980 ~ 0xF98F =>
        //      呂,     女,     廬,     旅,     濾,     礪,     閭,     驪,     麗,     黎,     力,     曆,     歷,     轢,     年,     憐
            0x5442, 0x5973, 0x5EEC, 0x65C5, 0x6FFE, 0x792A, 0x95AD, 0x9A6A, 0x9E97, 0x9ECE, 0x529B, 0x66C6, 0x6B77, 0x8F62, 0x5E74, 0x6190,
        //0xF990 ~ 0xF99F =>
        //      戀,     撚,     漣,     煉,     璉,     秊,     練,     聯,     輦,     蓮,     連,     鍊,     列,     劣,     咽,     烈
            0x6200, 0x649A, 0x6F23, 0x7149, 0x7489, 0x79CA, 0x7DF4, 0x806F, 0x8F26, 0x84EE, 0x9023, 0x934A, 0x5217, 0x52A3, 0x54BD, 0x70C8,
        //0xF9A0 ~ 0xF9AF =>
        //      裂,     說,     廉,     念,     捻,     殮,     簾,     獵,     令,     囹,     寧,     嶺,     怜,     玲,     瑩,     羚
            0x88C2, 0x8AAA, 0x5EC9, 0x5FF5, 0x637B, 0x6BAE, 0x7C3E, 0x7375, 0x4EE4, 0x56F9, 0x5BE7, 0x5DBA, 0x601C, 0x73B2, 0x7469, 0x7F9A,
        //0xF9B0 ~ 0xF9BF =>
        //      聆,     鈴,     零,     靈,     領,     例,     禮,     醴,     隸,     惡,     了,     僚,     寮,     尿,     料,     樂
            0x8046, 0x9234, 0x96F6, 0x9748, 0x9818, 0x4F8B, 0x79AE, 0x91B4, 0x96B8, 0x60E1, 0x4E86, 0x50DA, 0x5BEE, 0x5C3F, 0x6599, 0x6A02,
        //0xF9C0 ~ 0xF9CF =>
        //      燎,     療,     蓼,     遼,     龍,     暈,     阮,     劉,     杻,     柳,     流,     溜,     琉,     留,     硫,     紐
            0x71CE, 0x7642, 0x84FC, 0x907C, 0x9F8D, 0x6688, 0x962E, 0x5289, 0x677B, 0x67F3, 0x6D41, 0x6E9C, 0x7409, 0x7559, 0x786B, 0x7D10,
        //0xF9D0 ~ 0xF9DF =>
        //      類,     六,     戮,     陸,     倫,     崙,     淪,     輪,     律,     慄,     栗,     率,     隆,     利,     吏,     履
            0x985E, 0x516D, 0x622E, 0x9678, 0x502B, 0x5D19, 0x6DEA, 0x8F2A, 0x5F8B, 0x6144, 0x6817, 0x7387, 0x9686, 0x5229, 0x540F, 0x5C65,
        //0xF9E0 ~ 0xF9EF =>
        //      易,     李,     梨,     泥,     理,     痢,     罹,     裏,     裏,     里,     離,     匿,     溺,     吝,     燐,     璘
            0x6613, 0x674E, 0x68A8, 0x6CE5, 0x7406, 0x75E2, 0x7F79, 0x88CF, 0x88CF, 0x91CC, 0x96E2, 0x533F, 0x6EBA, 0x541D, 0x71D0, 0x7498,
        //0xF9F0 ~ 0xF9FF =>
        //      藺,     鄰,     鱗,     麟,     林,     淋,     臨,     立,     笠,     粒,     狀,     炙,     識,     什,     茶,     刺
            0x85FA, 0x9130, 0x9C57, 0x9E9F, 0x6797, 0x6DCB, 0x81E8, 0x7ACB, 0x7B20, 0x7C92, 0x72C0, 0x7099, 0x8B58, 0x4EC0, 0x8336, 0x523A,
        //0xFA00 ~ 0xFA0F =>
        //      切,     度,     拓,     糖,     宅,     洞,     暴,     輻,     行,     降,     見,     廓,     兀,     嗀,     﨎,     﨏
            0x5207, 0x5EA6, 0x62D3, 0x7CD6, 0x5B85, 0x6D1E, 0x66B4, 0x8F3B, 0x884C, 0x964D, 0x898B, 0x5ED3, 0x5140, 0x55C0, 0xFA0E, 0xFA0F,
        //0xFA10 ~ 0xFA1F =>
        //      塚,     﨑,     晴,     﨓,     﨔,     凞,     猪,     益,     礼,     神,     祥,     福,     靖,     精,     羽,     﨟
            0x585A, 0xFA11, 0x6674, 0xFA13, 0xFA14, 0x51DE, 0x732A, 0x76CA, 0x793C, 0x795E, 0x7965, 0x798F, 0x9756, 0x7CBE, 0x7FBD, 0xFA1F,
        //0xFA20 ~ 0xFA2F =>
        //      蘒,     﨡,     諸,     﨣,     﨤,     逸,     都,     﨧,     﨨,     﨩,     飯,     飼,     館,     鶴,     郞,     隷
            0x8612, 0xFA21, 0x8AF8, 0xFA23, 0xFA24, 0x9038, 0x90FD, 0xFA27, 0xFA28, 0xFA29, 0x98EF, 0x98FC, 0x9928, 0x9DB4, 0x90DE, 0x96B7,
        //0xFA30 ~ 0xFA3F =>
        //      侮,     僧,     免,     勉,     勤,     卑,     喝,     嘆,     器,     塀,     墨,     層,     屮,     悔,     慨,     憎
            0x4FAE, 0x50E7, 0x514D, 0x52C9, 0x52E4, 0x5351, 0x559D, 0x5606, 0x5668, 0x5840, 0x58A8, 0x5C64, 0x5C6E, 0x6094, 0x6168, 0x618E,
        //0xFA40 ~ 0xFA4F =>
        //      懲,     敏,     既,     暑,     梅,     海,     渚,     漢,     煮,     爫,     琢,     碑,     社,     祉,     祈,     祐
            0x61F2, 0x654F, 0x65E2, 0x6691, 0x6885, 0x6D77, 0x6E1A, 0x6F22, 0x716E, 0x722B, 0x7422, 0x7891, 0x793E, 0x7949, 0x7948, 0x7950,
        //0xFA50 ~ 0xFA5F =>
        //      祖,     祝,     禍,     禎,     穀,     突,     節,     練,     縉,     繁,     署,     者,     臭,     艹,     艹,     著
            0x7956, 0x795D, 0x798D, 0x798E, 0x7A40, 0x7A81, 0x7BC0, 0x7DF4, 0x7E09, 0x7E41, 0x7F72, 0x8005, 0x81ED, 0x8279, 0x8279, 0x8457,
        //0xFA60 ~ 0xFA6F =>
        //      褐,     視,     謁,     謹,     賓,     贈,     辶,     逸,     難,     響,     頻,     恵,     熙,     舘, [FA6E], [FA6F]
            0x8910, 0x8996, 0x8B01, 0x8B39, 0x8CD3, 0x8D08, 0x8FB6, 0x9038, 0x96E3, 0x97FF, 0x983B, 0x6075, 0x7199, 0x8218, 0xFA6E, 0xFA6F,
        //0xFA70 ~ 0xFA7F =>
        //      並,     况,     全,     侀,     充,     冀,     勇,     勺,     喝,     啕,     喙,     嗢,     塚,     墳,     奄,     奔
            0x4E26, 0x51B5, 0x5168, 0x4F80, 0x5145, 0x5180, 0x52C7, 0x52FA, 0x559D, 0x5555, 0x5599, 0x55E2, 0x585A, 0x58B3, 0x5944, 0x5954,
        //0xFA80 ~ 0xFA8F =>
        //      婢,     嬨,     廒,     廙,     彩,     徭,     惘,     慎,     愈,     憎,     慠,     懲,     戴,     揄,     搜,     摒
            0x5A62, 0x5B28, 0x5ED2, 0x5ED9, 0x5F69, 0x5FAD, 0x60D8, 0x614E, 0x6108, 0x618E, 0x6160, 0x61F2, 0x6234, 0x63C4, 0x641C, 0x6452,
        //0xFA90 ~ 0xFA9F =>
        //      敖,     晴,     朗,     望,     杖,     歹,     殺,     流,     滛,     滋,     漢,     瀞,     煮,     瞧,     爵,     犯
            0x6556, 0x6674, 0x6717, 0x671B, 0x6756, 0x6B79, 0x6BBA, 0x6D41, 0x6EDB, 0x6ECB, 0x6F22, 0x701E, 0x716E, 0x77A7, 0x7235, 0x72AF,
        //0xFAA0 ~ 0xFAAF =>
        //      猪,     瑱,     甆,     画,     瘝,     瘟,     益,     盛,     直,     睊,     着,     磌,     窱,     節,     类,     絛
            0x732A, 0x7471, 0x7506, 0x753B, 0x761D, 0x761F, 0x76CA, 0x76DB, 0x76F4, 0x774A, 0x7740, 0x78CC, 0x7AB1, 0x7BC0, 0x7C7B, 0x7D5B,
        //0xFAB0 ~ 0xFABF =>
        //      練,     缾,     者,     荒,     華,     蝹,     襁,     覆,     視,     調,     諸,     請,     謁,     諾,     諭,     謹
            0x7DF4, 0x7F3E, 0x8005, 0x8352, 0x83EF, 0x8779, 0x8941, 0x8986, 0x8996, 0x8ABF, 0x8AF8, 0x8ACB, 0x8B01, 0x8AFE, 0x8AED, 0x8B39,
        //0xFAC0 ~ 0xFACF =>
        //      變,     贈,     輸,     遲,     醙,     鉶,     陼,     難,     靖,     韛,     響,     頋,     頻,     鬒,     龜,     愆
            0x8B8A, 0x8D08, 0x8F38, 0x9072, 0x9199, 0x9276, 0x967C, 0x96E3, 0x9756, 0x97DB, 0x97FF, 0x980B, 0x983B, 0x9B12, 0x9F9C, 0x6106,
        //0xFAD0 ~ 0xFAD9 =>
        //      憯,     杮,     㮝,     䀘,     䀹,[25249],[25CD0],     逬,     齃,     龎
            0x61AF, 0x676E, 0x3B9D, 0x4018, 0x4039, 0xFAD5, 0xFAD6, 0x902C, 0x9F43, 0x9F8E
        ]
    },
};

var findAltWord = function(table, code) {
    const index = code - table.start;
    const map = table.map;

    if ((code > table.end) || (index < 0)) {
        return undefined;
    }

    if (!map) {
        return 0x3f;
    }

    return (typeof map == 'function') ? map(index) : map[index];
}

var generate = function(tables) {
    let altTables = (tables && tables.length) ? (tables || []).reduce((ary, name) => {

        let table = CodeTables[name];
        console.log('==', name)
        table && ary.push(table);
        return ary;
    }, []) : Object.values(CodeTables);

    return function(chr) {
        if (!(altTables && altTables.length)) {
            return char;
        }

        const code = chr.charCodeAt(0);
        let altCode, i = altTables.length;
        while (i--) {
            altCode = findAltWord(altTables[i], code);
            if (altCode) {
                break;
            }
        };

        if (!altCode) { // undefined
            return chr;
        }

        return isNaN(altCode) ? altCode : String.fromCharCode(altCode);
    }
}

var getNames = function() {
    return Object.keys(CodeTables);
}

var has = function(tableName) {
    return !!CodeTables[tableName];
}

var escapeUnicode = function escapeUnicode(code) {
    return "\\u" + ("0000" + code.toString(16).toUpperCase()).slice(-4);
}

var dump = function(tableName) {
    if (!has(tableName)) {
        return;
    }

    const table = CodeTables[tableName];
    let dat = [];

    for (let index = table.start; index <= table.end; index++) {
        let alt, altCode = findAltWord(table, index);

        if (altCode === undefined) {
            alt = undefined;
        } else if (isNaN(altCode)) {
            alt = altCode;
            altCode = altCode.split('').map((c) => escapeUnicode(c.charCodeAt(0))).join('');
        } else {
            alt = String.fromCharCode(altCode);
            altCode = escapeUnicode(altCode);
        }

        dat.push({
            "code": escapeUnicode(index),
            "char": String.fromCharCode(index),
            "alt": alt,
            "altCode": altCode
        });
    }

    return dat;
}

var list = function(re) {
    let dat = [],
        tableNames = getNames();

    tableNames.forEach((name) => {
        if (name !== 'Private_Use_Area') {
            dump(name).forEach((row) => {
                if (!re || (re && re.test(JSON.stringify(row)))) {
                    dat.push(row);
                }
            })
        }
    });

    return dat;
}

module.exports = {
    "generate": generate,
    "getNames": getNames,
    "has": has,
    "dump": dump,
    "list": list,
};