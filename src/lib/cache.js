'use strict';

var cache = {};
var debug = false;
var hitCount = 0;
var missCount = 0;
var size = 0;
var apis = {};
var _serialize = function (value) {
    return JSON.stringify(value)
}
var _deserialize = function (value) {
    if (typeof value != 'string') {
        return undefined
    }
    try {
        return JSON.parse(value)
    }
    catch (e) {
        return value || undefined
    }
}


apis.put = function (key, value, time, timeoutCallback) {
    if (debug) {
        console.log('caching: %s = %j (@%s)', key, value, time);
    }

    if (typeof time !== 'undefined' && (typeof time !== 'number' || isNaN(time) || time <= 0)) {
        throw new Error('Cache timeout must be a positive number');
    } else if (typeof timeoutCallback !== 'undefined' && typeof timeoutCallback !== 'function') {
        throw new Error('Cache timeout callback must be a function');
    }

    var oldRecord = cache[key];
    if (oldRecord) {
        clearTimeout(oldRecord.timeout);
    } else {
        size++;
    }

    var record = {
        value : value,
        expire: time + Date.now()
    };

    if (!isNaN(record.expire)) {
        record.timeout = setTimeout(function () {
            _del(key);
            if (timeoutCallback) {
                timeoutCallback(key, value);
            }
        }, time);
    }

    cache[key] = record;

    return value;
};

apis.del = function (key) {
    var canDelete = true;

    var oldRecord = cache[key];
    if (oldRecord) {
        clearTimeout(oldRecord.timeout);
        if (!isNaN(oldRecord.expire) && oldRecord.expire < Date.now()) {
            canDelete = false;
        }
    } else {
        canDelete = false;
    }

    if (canDelete) {
        _del(key);
    }

    return canDelete;
};

function _del(key) {
    size--;
    delete cache[key];
}

apis.clear = function () {
    for (var key in cache) {
        clearTimeout(cache[key].timeout);
    }
    size = 0;
    cache = Object.create(null);
    if (debug) {
        hitCount = 0;
        missCount = 0;
    }
};

apis.get = function (key) {
    var data = cache[key];
    if (typeof data != "undefined") {
        if (isNaN(data.expire) || data.expire >= Date.now()) {
            if (debug) hitCount++;
            return data.value;
        } else {
            // free some space
            if (debug) missCount++;
            size--;
            delete cache[key];
        }
    } else if (debug) {
        missCount++;
    }
    return null;
};

apis.size = function () {
    return size;
};

apis.memsize = function () {
    var size = 0,
        key;
    for (key in cache) {
        size++;
    }
    return size;
};

apis.debug = function (bool) {
    debug = bool;
};

apis.hits = function () {
    return hitCount;
};

apis.misses = function () {
    return missCount;
};

apis.keys = function () {
    if (!Object.keys) throw "Don't support Object.key";
    return Object.keys(cache);
};

/** Add persistence support
 * Store all cached object to localstorage
 */
(function(apis){

    if(typeof localStorage === 'undefined') return;

    var PERSISTENCE_KEY = 'LITE_CACHE_PERSISTENCE_BLOCK';
    var storage = window['localStorage'];

    apis.dump = function (key) {

        key = key || PERSISTENCE_KEY;
        storage[key] = _serialize(cache);
    }

    apis.restore = function (key) {


        key = key || PERSISTENCE_KEY;
        var ls = storage[key];
        if (ls) {
            cache = _serialize(ls);
        }
    }

    var store = {
        put: function (key, val) {
            if (val === undefined) {
                return store.remove(key)
            }
            //safari 无痕浏览问题
            try {
                storage.setItem(key, _serialize(val))
            } catch(e) {}

            return val
        },

        get   : function (key, defaultVal) {
            var val = _deserialize(storage.getItem(key))
            return (val === undefined ? defaultVal : val)
        },
        remove: function (key) {
            storage.removeItem(key)
        },

        clear : function () {
            storage.clear()
        }
    }

    apis.store = store;

})(apis)


/**End**/

export default  apis;
