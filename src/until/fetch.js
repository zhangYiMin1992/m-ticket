/**
 * fetch 封装
 * includes. fetch & promise shim
 */
require("whatwg-fetch");
require('es6-promise').polyfill();

import Toast from '../components/vue-components/components/toast/index'


export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export function checkContentType(response) {
    console.log(response.headers.get('Content-Type'));
}

export function parseJSON(response) {
    return response.json()
}

export function exHandler(ex) {
    if (process.env.NODE_ENV === "development") console.log(ex.message);

    Toast({
        message : ex.message || '请求失败',
        position: 'bottom'
    });
}