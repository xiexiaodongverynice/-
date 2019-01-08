'use strict';
var exeFlg = true;
var touchClientY = "";

var weixininit = function(locationCallback) {
    //alert(location.href.split('#')[0]);
    $.ajax({
        url: myConfig.serverUrl+"/getConfig",
//        url: myConfig.yxzsurl+'/services/wx/mpf/getWxJsapiSignatureGet.json',
        type: "GET",
        async: true, //同步执行
        dataType: "jsonp",
        jsonp: "callback",
        //jsonpCallback: "flightHandler",
        success: function(result) {
            suc(result);
        },
        error: function(errorMsg) {
                console.log("授权失败",errorMsg);
        }
    });

    function suc(result) {
        if (result) {
            console.log(result.appId);
            wx.config({
                debug: false,
                appId: result.appId,
                timestamp: result.timestamp,
                nonceStr: result.nonceStr,
                signature: result.signature,
                jsApiList: ['startRecord', 'stopRecord', 'playVoice', 'translateVoice', 'getLocation']
            });

            wx.ready(function() {
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function(res) {
                        var location = { latitude: res.latitude, longitude: res.longitude };
                        localStorage.setItem('location', JSON.stringify(location));
                        if (locationCallback && (typeof locationCallback === "function")) {
                            locationCallback(location);
                        }
                    },
                    error: function(res) {
                        console.log(res);
                    },
                    cancel: function() {
                        //这个地方是用户拒绝获取地理位置
                        if (typeof error == "function") {
                            error();
                        }
                    }
                });
                console.log("授权成功");
            });

            wx.error(function(res) {
                console.log("err:" + res);
            });
        }
    }
}

//显示遮罩层
function showMask() {
    $("#mask").css("height", $(document).height());
    $("#mask").css("width", $(document).width());
    $("#mask").show();
}
//隐藏遮罩层
function hideMask() {
    $("#mask").hide();
}