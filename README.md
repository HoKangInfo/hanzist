# hanzist
some util function about hanzi. 
一些處理漢字的函式工具. 

### History ###
- 0.0.5 fix `isString` 
- 0.0.4 新增 `cutDBCHstr` 剪裁雙位元字寬字串
- 0.0.3 新增 `isFullwidth` 單字是否為全形字, `fontwidth` 計算字寬 
- 0.0.2 新增 `fullwidthCase` 轉全形字, `halfwidthCase` 轉半形字
- 0.0.1 目前只有 `normalize` 

### Install ###
```
> npm install hanzist
```

### How to use it ###
`normalize`,
```
const hanzist = require('hanzist');

var str = 'he羅, ㆗\u{3246}';
// => 'he羅, ㆗㉆'

hanzist.normalize(str);
// => 'he羅, 中文'
```
`normalize` 會將字碼在 

- Kanbun(0x3190 ~ 0x319F, 古典日文中使用來指示閱讀順序的註釋字符), 
- Enclosed_CJK_Lettersvar_Brackets(0x3220 ~ 0x3247, 帶括弧的中日韓表意文字, 0x3220 ~ 0x3243 為帶括弧文字, 0x3244 ~ 0x3247 是新增的帶圓圈文字), 
- Enclosed_CJK_Lettersvar_Circles(0x3280 ~ 0x32B0 , 帶圓圈的中日韓表意文字), 
- Ideographic_Telegraph_Symbols_Months(0x32C0 ~ 0x32CB, 電報文字中的 1 月到 12 月), 
- Ideographic_Telegraph_Symbols_Hours(0x3358 ~ 0x3370, 電報文字中的 0 點到 24 點), 
- Japanese_Era_Names_And_Corporation(0x337B ~ 0x337F, 日本年號跟公司), 
- Ideographic_Telegraph_Symbols_Days(0x33E0 ~ 0x33FE, => 電報文字中的 1 日到 31 日), Private_Use_Area(0xE000 ~ 0xF8FF, 私有區域, 沒有統一的對應), 
- CJK_Compatibility_Ideographs(0xF900 ~ 0xFAFF, 日韓相容表意文字, 目前只編到 0xFAD9)

中的字盡量改為位在 0x4E00 ~ 0x9FFF 之間的字. 讓異體或含中文的特殊符號, 盡量以相同的字碼統一顯示.

`fullwidthCase`, `halfwidthCase`
```
var str = '［￡\u{FF5E}£]中文1２3';
// => '［￡～£]中文1２3'

hanzist.fullwidthCase(str);
// => '［￡～￡］中文１２３'

hanzist.halfwidthCase(str);
// => '[£~£]中文123'
```

`fullwidthCase` 會將字串內的字轉為全形字, `halfwidthCase` 會將字串內的字轉為半形字. 第二參數可支援片假名與韓文. 
```
var str = '片假名:\u{FF90}, 韓文:\u{FFB0}';
// => '片假名:ﾐ, 韓文:ﾰ'

hanzist.fullwidthCase(str,['Katakana']);
// => '片假名：ミ，　韓文：ﾰ'

hanzist.fullwidthCase(str,['Hangul']);
// => '片假名：ﾐ，　韓文：ㅀ'
```

`isFullwidth` 判斷單字是否為全形字,
```
var str = '中文1２3';
hanzist.isFullwidth(str[0]);
// => true

hanzist.isFullwidth(str.charCodeAt(0));
// => true

hanzist.isFullwidth(str[2]);
// => false
```

`fontwidth` 計算字寬, 全形字長度為 2, 控制或合併複合字為 0, 其他為 1. 全形字以 unicode 標示為 full-width 或 wide 為準.
```
var str = '中文1２3';
hanzist.fontwidth(str);
// => 8

var str = '中文\n1２3';
// => 8
```
判斷字寬, 借用 [east-asian-width](https://github.com/vangie/east-asian-width)建立的 `code_point_utils`, 感謝 [Vangie Du](https://github.com/vangie). 但因為 `east-asian-width` v0.1.1 在計算字寬上對 `codepoint` 的判斷有些問題, 故並未使用其 `char_width` 函式. 且因為應用上需求不同, 原 `east-asian-width` 對控制字元傳回 `2`, 但 `fontwidth` 因其不可見而傳回 `0`.

`cutDBCHstr` 剪裁雙位元字寬字串, 開始剪裁位置若位於雙位元字寬字(全形字)中間, 則會包含該字元; 結束剪裁位置若位於雙位元字寬字中間, 則 **不** 會包含該字元.
```
var str = 'The中文word';
hanzist.cutDBCHstr(str, 1);
// => 'e中文word'

hanzist.cutDBCHstr(str, 1, 2);
// => 'e中'

hanzist.cutDBCHstr(str, 2, 2);
// => '中文'
```

### API ###

`normalize(str, options)`
```
Arguments

str (String): The string to normalize. 

options (Array): The alt word tables. default all. 目前可用的 [('Kanbun|Enclosed_CJK_Lettersvar_Brackets|Enclosed_CJK_Lettersvar_Circles|Ideographic_Telegraph_Symbols_Months|Ideographic_Telegraph_Symbols_Hours|Japanese_Era_Names_And_Corporation|Ideographic_Telegraph_Symbols_Days|Private_Use_Area|CJK_Compatibility_Ideographs')]

Returns

(String): Returns the normalize string.
```

`fullwidthCase(str, fontset)`, `halfwidthCase(str, fontset)`
```
Arguments

str (String): The string to fullwidth or halfwidth. 

fontset (['Katakana'|'Hangul']): 目前可用的 'Katakana'(片假名)與, 'Hangul'(韓文). 

Returns

(String): Returns the fullwidth or halfwidth string.
```

`isFullwidth(cp)`
```
Arguments

cp (String|Number): The codepoint or string first char. 

Returns

(Boolean): Returns true if fullwidth.
```

`fontwidth(str)`
```
Arguments

str (String): The string. 

Returns

(Number): Returns the width.
```

`cutDBCHstr(str, start, length)`
```
Arguments

str (String): The string. 

start (Number): Location at which to begin extracting characters. 開始剪裁的位置. 1 是等於兩個位元字寬(一個全形字).

length (Number): The number of characters to extract. 1 是等於兩個位元字寬. 沒有值會傳回開始字元後的所有字元.

Returns

(Number): Returns new string of the extracted. If length is 0 or a negative number, an empty string is returned. 
```
