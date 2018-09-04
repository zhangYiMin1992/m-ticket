//Copy from old version
var GPS = {
    mInfo: null,
    getGPS: function (callback) {
        if (G.versionCmp(G.AppVersion, "7.1.0") > 0) {
            this.useBridgeGPS(callback);
            return;
        }

        var appGPS = localStorage.getItem("zipLocation");
        var userGPS = localStorage.getItem("userGPS");
        var autoGPS = localStorage.getItem("autoGPS");
        if ((appGPS && !(/iphone/i.test(navigator.userAgent) && !G.isHybrid))) {
            appGPS = JSON.parse(appGPS);
            if (appGPS.orderCityLetter) {
                callback({
                    letter: appGPS.orderCityLetter,
                    code: appGPS.orderCityCode,
                    name: appGPS.orderCityName,
                    lat: appGPS.lat,
                    lng: appGPS.lng,
                    address: appGPS.address
                })
                return this;
            }
            if (userGPS) {
                var u = JSON.parse(userGPS);
                if (u.letter) {
                    callback({
                        letter: u.letter,
                        code: u.code,
                        name: u.name,
                        lat: appGPS.lat,
                        lng: appGPS.lng,
                        address: appGPS.address
                    })
                    return this;
                }
            }
            callback(appGPS);
            return this;
        }


        if (userGPS) {
            callback(JSON.parse(userGPS));
            return this;
        }
        if (autoGPS) {
            callback(JSON.parse(autoGPS));
            return this;
        }
        if (window.G && window.G.autoGPSListeners) {
            window.G.addAutoGPSListener(callback);
        }
        else {
            callback("");
        }
        return this;
    },

    useBridgeGPS: function (callback) {
        var b = require("./bridge");
        b.getGPS(function (json) {
            if (json.success) {
                json = json.data;
                callback({
                    letter: json.orderCityLetter,
                    code: json.orderCityCode,
                    name: json.orderCityName,
                    lat: json.lat,
                    lng: json.lng,
                    address: json.address
                })
            }
        });
    },

    getAutoGPS: function (callback, failure) {
        var appGPS = localStorage.getItem("zipLocation");
        if (G.versionCmp(G.AppVersion, "7.1.0") > 0) {
            this.useAutoBridgeGPS(callback, failure);
            return;
        }

        if (appGPS) {
            var cityJson = JSON.parse(appGPS);
            //兼容ios未定位下，返回lat:'0.000',lng:'0.000'情况
            if (cityJson.lat == 0 && cityJson.lng == 0) {
                cityJson.lat = '';
                cityJson.lng = '';
            }
            callback(cityJson);
            return this;
        }

        var autoGPS = localStorage.getItem("autoGPS");
        if (autoGPS) {
            callback(JSON.parse(autoGPS));
            return this;
        }

        if (window.G && window.G.autoGPSListeners) {
            window.G.addAutoGPSListener(callback);
        } else {
            callback("");
        }
        return this;
    },

    useAutoBridgeGPS: function (callback, failure) {
        var b = require("./bridge");
        b.getGPS(function (json) {
            if (json.success) {
                json = json.data;
                callback({
                    letter: json.letter,
                    code: json.code,
                    name: json.name,
                    lat: json.lat,
                    lng: json.lng,
                    address: json.address
                })
            } else {
                failure({
                    msg: "can't get position!"
                })
            }
        });
    }
}

export default GPS;