/**
 * 各种类型的字符串化
 * add by Daniel He
 *
 */

/**
 * 处理query String
 * @param json
 * @returns {string}
 */
export function query(json) {
    return '?' +
        Object.keys(json).map((key) => {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

/**
 * 处理query String JSON版
 * @param json
 * @returns {string}
 */
export function queryJson(json, c) {
    let ret = {
        d: JSON.stringify(json)
    }

    if(c) {
        ret['c'] = JSON.stringify(c);
    }

    return query(ret)
}