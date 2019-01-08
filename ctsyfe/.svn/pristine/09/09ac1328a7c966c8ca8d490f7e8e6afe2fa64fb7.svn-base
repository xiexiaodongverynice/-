var _debug = false; // 是否debug模式

var _accountId = _js_accountId ? _js_accountId : ''; // 微信公众号唯一标识
var _openId = _js_openId ? _js_openId : '';// 微信用户的唯一标识
var _title = _js_title ? _js_title : ''; // 标题
var _link = ""; // 分享地址，支持auth2.0
var _shareLink = ""; // 分享地址2,用于分享到QQ或QQ空间等其他区域，支持auth2.0
var _shareUrl = _js_link ? _js_link : ''; // 链接地址
var _desc = _js_desc ? _js_desc : ''; // 描述
var _imgUrl = _js_imgUrl ? _js_imgUrl : ''; // 图片地址
var _shareType = _js_shareType ? _js_shareType : 'news'; // 共享类型
var _sns_scope = _js_sns_scope ? _js_sns_scope : 'base'; // 用户授权方式
var _urltoken; // 共享资源令牌
var _doShareUrl; // 共享记录地址

if (_debug) {
  console.log(_accountId);
  console.log(_shareUrl);
  console.log(_title);
  console.log(_imgUrl);
  console.log(!!_accountId);
}

if (!!_accountId && !!_shareUrl && !!_openId) {
  $.ajax({
    url : "rest/weixinShare/getBase/" + _accountId,
    data : {
      shareTitle : _title,
      shareImageUrl : _imgUrl,
      shareType : _shareType,
      shareUrl : _shareUrl,
      openId : _openId,
      snsScope : _sns_scope
    },
    dataType : "json",
    type : "POST",
    success : function(data) {
      // console.log(data);
      if (data.success) {
        // api票据
        var _apiTicket = data.attributes.api_ticket;
        // app 唯一标识
        var _appId = data.attributes.app_id;
        // 时间戳
        var _timestamp = data.attributes.timestamp;
        // 签名随机串
        var _nonceStr = data.attributes.nonce_str;
        // 签名字符串
        var _signature = data.attributes.signature;
        // 取得二维码地址
        var _qrcode_url = data.attributes.qrcode_url;
        // 分享资源的跳转地址-分享到朋友或朋友圈使用
        _link = data.attributes.link;
        // 分享资源的跳转地址-QQ或QQ空间等其他区域使用
        _shareLink = data.attributes.shareLink;
        // 共享资源令牌
        _urltoken = data.attributes.urlToken;

        _doShareUrl = data.attributes.doShareUrl;

        // console.log(_link);
        // console.log(_js_link);
        // console.log(_doShareUrl);
        // console.log(_nonceStr);
        // console.log(_signature);

        wx.config({
          debug : false,
          appId : _appId,
          timestamp : _timestamp,
          nonceStr : _nonceStr,
          signature : _signature,
          jsApiList : [ 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo',
              'onMenuShareQZone', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem',
              'previewImage', 'getNetworkType' ]
        });

        if (_qrcode_url) {
          $("#js_profile_qrcode_img").attr("src", _qrcode_url);
          $("#js_pc_qr_code_img").attr("src", _qrcode_url);
        }
      } else {
        if (_debug)
          console.log('系统返回出错原因：' + data.msg);
      }
    }
  });
} else {
  console.log('参数错误！');
}
