/**
 * 热门景点的临时处理方案(5个固定,3个随机)
 * @type {string[]}
 */
const keywordsFixed = [
    "上海迪士尼","万达乐园","长隆","欢乐谷","宋城"
]

const keywords = ["灵山大佛","中华恐龙园","普陀山","天目湖","横店影视城","淹城野生动物园","南浔古镇","峨眉山","兵马俑","天生三桥","九寨沟","水洞沟","西岭雪山","香港迪士尼乐园","香港海洋公园","澳门水舞间","新加坡环球影城","新加坡S.E.A海洋馆","大阪环球影城","日本铁路周游券JR PASS-九州券","阿联酋迪拜哈利法塔","天涯海角","武汉极地海洋世界","魅力两湘","桂林两江四湖","鼓浪屿","青岛海昌极地海洋世界","又见平遥","北京杜莎夫人蜡像馆","大连圣亚海洋世界","台儿庄古城","少林寺"]

const random = (min, max) => {
    if (max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
}

const shuffle = (list, trim) => {
    var length = list.length;
    var shuffled = Array(length);

    for (var index = 0, rand; index < length; index++) {
        rand = random(0, index);
        if (rand !== index) shuffled[index] = shuffled[rand];
        shuffled[rand] = list[index];
    }
    return shuffled.splice(0, trim);
}


export function getHotKeywords() {
    return keywordsFixed.concat(shuffle(keywords, keywords.length))
}
