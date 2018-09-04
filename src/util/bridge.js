//Copy from old version, JSbridge
var bridge={
    call:function(method,data,callback){
        G.webviewBridgeReady(function(bridge){
            bridge.callHandler(method, data, callback);
        })
    },
    getGPS:function(callback){
        var _=this;
        _.call("getGPS",{},callback);
    },
    getAppVersion:function(callback){
        var _=this;
        _.call("getAppVersion",{},callback);
    },
    getNetStatus:function(callback){
        var _=this;
        _.call("getNetStatus",{},callback)
    },
    /**
     *
     * @param setting
     * @param callback
     * @description 设置APP头
     * @example
     * this.call("setAppHeader",{
                "mainTitle":document.getElementById("mainTitle").value,
                "subTitle":document.getElementById("subTitle").value,
                "styleId":document.getElementById("titleStyle").value,
                "canRefresh":+document.getElementById("refresh").checked
            },callback)
     */
    setAppHeader:function(setting,callback){
        this.call("setAppHeader",setting,callback)
    },
    /**
     *
     * @param setting
     * @param callback
     * @description 通过APP去分享
     * @example
     * _.call("share",{
                "title":"分享标题",
                "content":"分享内容",
                "url":"http://m.tuniu.com",
                "imageurl":"http://m.tuniu.com/apple-touch-icon-retina.png",
                "thumburl":"http://m.tuniu.com/apple-touch-icon.png",
                "share_type":15
            },function(json){
                alert("调用了分享")
                alert(json)
            });
     */
    setShare:function(setting,callback){
        this.call("share",setting,callback);
    }
}
module.exports=bridge;