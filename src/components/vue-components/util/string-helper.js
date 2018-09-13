
    var escapeRegex= function(raw) {
        return raw.replace(/([\/\\()[\]?{}|*+-.$^])/g, '\\$1');

    }
    export default escapeRegex