/**
 * 主要用户URL拼接,适配APP, M站, 及各种版本
 * Created by danielhe on 7/29/16.
 */

const SCENIC_LINK_REG = /m\.tuniu\.com\/menpiao\/t_(\d*)/;


export function redirect(uri, isApp) {
    if (isApp) return '';
    return uri;
}

export function adLinksConverter(link, isApp) {

    if (!isApp) return link;

    var matches = link.match(SCENIC_LINK_REG)
    if (!matches) return link;

    var sid = matches[1];
    //return `tuniuapp://travel/product_detail?product_id=${sid}&product_type=4`
    let url = `https://${location.host}/menpiao/t_${sid}?app_topbar_style=1`;
    return `tuniuapp://travel/http?url=${encodeURIComponent(url)}`;
}

export function moreScenic(city, isApp) {

    var url = `/m2015/mpChannel/search?searchType=3&catId=${city.code}&productType=4&poiId=${city.code}&keyword=${encodeURIComponent(city.name)}`
    if (isApp) {
        return `tuniuapp://travel/http?url=${location.protocol}//${location.host}${encodeURIComponent(url)}`
    }
    return url;
}

export function searchLink(key, isApp) {
    if (isApp) {
        return `tuniuapp://travel/search?keyword=${encodeURIComponent(key)}&search_type=1&product_type=4`
    }
    return '/m2015/search/list?searchType=1&catId=0&poiId=0&productType=4&keyword=' + encodeURIComponent(key);

}

export function nearbyScenic(geo, isApp) {
    if (isApp && G.versionCmp(G.AppVersion, '8.0.6') >= 0) {
        return 'tuniuapp://travel/nearbyproductlist?product_type=4';
    }
    return `/m2015/localservice/list/nearby/position/${encodeURIComponent(JSON.stringify(geo))}?tab=ticket`

}

export function scenicThemeLink(city, typeId, isApp) {
    var url = `/m2015/mpChannel/search?searchType=1&catId=${city.code}&poiId=${city.code}&keyword=${encodeURIComponent(city.name)}&themeId=${typeId}`;
    if (isApp) {
        return `tuniuapp://travel/http?url=${location.protocol}//${location.host}${encodeURIComponent(url)}`
    }
    return url;

}

export function scenicLink(id, isApp) {
    if (isApp) {
        //return `tuniuapp://travel/product_detail?product_id=${id}&product_type=4`;
        let url = `https://${location.host}/menpiao/t_${id}?app_topbar_style=1`;
        return `tuniuapp://travel/http?url=${encodeURIComponent(url)}`;
    }
    return `/menpiao/t_${id}`;

}

export function matchProdImg(item, count) {
    var img = item.type === 3 ? "jd" : (item.type === 8 ? 'jj' : 'wl');
    return `//img1.tuniucdn.com/site/img/event/ticketChannel/assort0${count}${img}-s.png`;
}

export function matchProdText(item, city) {
    if (item.type == 3) {
        return city + __('酒店');
    } else if (item.type == 8) {
        return city + __('自驾');
    }
    return '当地玩乐';
}

export function payLink(id, isApp) {
    if (isApp) {
        return `tuniuapp://travel/orderpay?backpage=lastpage&order_id=${id}&product_type=4`
    }
    return `/userPay/selectPayMethod?orderId=${id}&orderType=2&payType=0`

}

export function mapLink(code, isApp, name, lat, lng){
    if(isApp){
        return `tuniuapp://travel/nearbymaplist?product_type=4&lat=${lat}&lng=${lng}&poi_name=${name}&poi_code=${code}&sort=0`
    }
    return 'javascript:void(0)';
}

export function shareLink(id, name, isApp, imageurl) {

    if(isApp){
        var url = `/menpiao/t_${id}`;
        var thumbUrl = '';
        return `tuniuapp://travel/share?url=${url}&title=${name}&content=${name}&imageurl=${imageurl}&thumburl=${thumbUrl}&share_type=0`
    }
}

export function bookLink(id, isApp) {
    id = parseInt(id);
    let url = `https://${location.host}/m2015/ticket/order/book?ticketId=${id}`;
    if(isApp){
        url += `&app_topbar_style=1`;
        return `tuniuapp://travel/http?url=${encodeURIComponent(url)}`;
    }
    return url;
}

export function driveLink(id, isApp) {
    if(isApp){
        return `tuniuapp://travel/product_detail?product_id=${id}&product_type=110`
    }else{
        return  '//m.tuniu.com/drive/' + id + '?fromMenpiaoToDrive';
    }
}

export function openTravelAssistant(url) {
    return url;

}

