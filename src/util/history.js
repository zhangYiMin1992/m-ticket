/**
 * window.history 封装
 * NOTE: 部分业务可以由vue-router替代
 * @type {{}}
 */
var fnList = {},
    apis = {
        forward (name, fn, proxy) {

            fnList[name] = {
                fn: fn,
                proxy: proxy
            }

            if(history.state && (history.state.name === name)) return; // 防重复刷新

            history &&
            history.pushState &&
            history.pushState({
                name: name
            }, '');
        },
        back (fn) {
            history.back();
        }
    }

window.onpopstate =  (event) => {
    if (!event.state) return history.back();
    var name = event.state.name,
        fn = fnList[name].fn,
        proxy = fnList[name].proxy;

    if(fn) {
        proxy ? fn.call(proxy) : fn();
    }
}

export default apis;