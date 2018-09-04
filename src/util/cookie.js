/**
 * Created by fengshenhai on 2016/12/27.
 */
export function getCookie(n) {
    var a = document.cookie.split("; ");
    for (var i = 0; i < a.length; i++) {
        if (a[i].split("=")[0] == n) {
            return a[i].split("=")[1]
        }
    }
    return ''
}
export function setCookie(n, v) {
    var d = 30;
    var e = new Date();
    e.setTime(e.getTime() + d * 24 * 60 * 60 * 1000);
    if (n == "backUrl") {
        deleteCookie("backUrl");
        document.cookie = n + "=" + escape(v) + ";expires=" + e.toGMTString() + ";path=/;domain=.tuniu.com"
    } else {
        document.cookie = n + "=" + escape(v) + ";expires=" + e.toGMTString() + ";path=/"
    }
}
export function setCookie(n, v, t) {
    var e = new Date();
    e.setTime(e.getTime() + t);
    if (n == "backUrl") {
        deleteCookie("backUrl");
        document.cookie = n + "=" + escape(v) + ";expires=" + e.toGMTString() + ";path=/;domain=.tuniu.com"
    } else {
        document.cookie = n + "=" + escape(v) + ";expires=" + e.toGMTString() + ";path=/"
    }
}
export function deleteCookie(n) {
    var d = new Date();
    d.setTime(d.getTime() - 10000);
    document.cookie = n + "=v; expires=" + d.toGMTString() + ";path=/"
}