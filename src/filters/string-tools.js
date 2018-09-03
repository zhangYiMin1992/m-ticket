/**
 * 背景:全站https化, 后端接口hard-code 协议为http://
 * 改为协议自匹配
 * @param content
 * @returns String
 */
export function autoProtocol(content) {
    if (!content) return '';
    return content.replace(/^http:\/\//, '//');
}

export function imgAutoProtocolWebP(content) {
    if (!content) return '';
    content = content.replace(/^http:\/\//, '//');
    var reg = /\/fb2\//g;
    return window.webpCapability && reg.test(content) ? content + '.webp' : content;
}

/**
 * 将带\r\n的字符串改为HTML标签
 * @param content
 * @returns {string}
 */
export function stringToHTML(content) {
    if (!content) return '';
    var html = '', snappets = content.split(/\r|\n/)
    snappets.forEach(function (snippet) {
        html += `<p>${snippet}</p>`;
    });
    return html;
}

export function formatDistance(raw){
    if(raw == 0) return '';
    if(!/^(\d*,?)+(.\d*)?$/.test(raw)) return '';
    let distance = parseFloat(raw.replace(',','')).toFixed(1);
    return distance > 500 ? ">500km" : (distance + 'km');
}
