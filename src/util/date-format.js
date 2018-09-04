/**
 * 日期格式的字符串序列化及反序列化
 */

export function formatDate(date, fmt) {
    const o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S' : date.getMilliseconds()
    }
    const week = {
        '0': '/u65e5',
        '1': '/u4e00',
        '2': '/u4e8c',
        '3': '/u4e09',
        '4': '/u56db',
        '5': '/u4e94',
        '6': '/u516d'
    }
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() + ''])
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}

export function parseDate(str) {
    str = String(str).replace(/^[\s\xa0]+|[\s\xa0]+$/ig, '');
    let results = null;


    results = str.match(/^ *(\d{10}) *$/);
    if (results && results.length > 0)
        return new Date(parseInt(str, 10) * 1000);

    results = str.match(/^ *(\d{13}) *$/);
    if (results && results.length > 0)
        return new Date(parseInt(str, 10));

    results = str.match(/^ *(\d{4})(\d{2})(\d{2}) *$/);
    if (results && results.length > 3)
        return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10));

    results = str.match(/^ *(\d{4})(\d{2})(\d{2}) +(\d{2})(\d{2}) *$/);
    if (results && results.length > 6)
        return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10));

    results = str.match(/^ *(\d{4})[\._\-\/\\](\d{1,2})[\._\-\/\\](\d{1,2}) *$/);
    if (results && results.length > 3)
        return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10));

    results = str.match(/^ *(\d{4})[\._\-\/\\](\d{1,2})[\._\-\/\\](\d{1,2}) +(\d{1,2}):(\d{1,2}) *$/);
    if (results && results.length > 6)
        return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10));

    results = str.match(/^ *(\d{4})[\._\-\/\\](\d{1,2})[\._\-\/\\](\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
    if (results && results.length > 6)
        return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10));

    return (new Date(str));
}
