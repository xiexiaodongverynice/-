/*
 * 注意：
 * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
 * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
 * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
 *
 * 如有问题请通过以下渠道反馈：
 * 邮箱地址：weixin-open@qq.com
 * 邮件主题：【微信JS-SDK反馈】具体问题
 * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
 */

wx.ready(function() {
  // 隐藏右上角菜单
  wx.hideOptionMenu();
  if (!!_accountId && !!_shareUrl && !!_openId) {
    // 显示右上角菜单
    wx.showOptionMenu();
  }
  wx.showMenuItems({
    menuList : [
    /* 基础类 */
    // 举报:
    "menuItem:exposeArticle",
    // 调整字体:
    "menuItem:setFont",
    // 日间模式:
    "menuItem:dayMode",
    // 夜间模式:
    "menuItem:nightMode",
    // 刷新:
    "menuItem:refresh",
    // 查看公众号（已添加）:
    "menuItem:profile",
    // 查看公众号（未添加）:
    "menuItem:addContact",
    /* 传播类 */
    // 发送给朋友:
    "menuItem:share:appMessage",
    // 分享到朋友圈:
    "menuItem:share:timeline",
    // 分享到QQ:
    "menuItem:share:qq",
    // 分享到Weibo:
    "menuItem:share:weiboApp",
    // 收藏:
    "menuItem:favorite",
    // 分享到FB:
    "menuItem:share:facebook",
    // 分享到 QQ 空间
    "menuItem:share:QZone",
    /* 保护类 */
    // 编辑标签:
    "menuItem:editTag",
    // 删除:
    "menuItem:delete",
    // 复制链接:
    "menuItem:copyUrl",
    // 原网页:
    "menuItem:originPage",
    // 阅读模式:
    "menuItem:readMode",
    // 在QQ浏览器中打开:
    "menuItem:openWithQQBrowser",
    // 在Safari中打开:
    "menuItem:openWithSafari",
    // 邮件:
    "menuItem:share:email",
    // 一些特殊公众号:
    "menuItem:share:brand" ]
  });

  // 分享接口开始
  // 分享给朋友
  wx.onMenuShareAppMessage({
    title : _title,
    desc : _desc,
    link : _link,
    imgUrl : _imgUrl,
    trigger : function(res) {
      // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
      // alert('用户点击发送给朋友');
    },
    success : function(res) {
      // alert('this-1');
      shareHandle('friend');
    },
    cancel : function(res) {
      // alert('已取消');
    },
    fail : function(res) {
      // alert(JSON.stringify(res));
    }
  });

  // 分享到朋友圈
  wx.onMenuShareTimeline({
    title : _title,
    link : _link,
    imgUrl : _imgUrl,
    trigger : function(res) {
      // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
      // alert('用户点击分享到朋友圈');
    },
    success : function(res) {
      shareHandle('friends');
    },
    cancel : function(res) {
      // alert('已取消');
    },
    fail : function(res) {
      // alert(JSON.stringify(res));
    }
  });

  // 分享到QQ
  wx.onMenuShareQQ({
    title : _title,
    desc : _desc,
    link : _shareLink,
    imgUrl : _imgUrl,
    trigger : function(res) {
      // alert('用户点击分享到QQ');
    },
    complete : function(res) {
      // alert(JSON.stringify(res));
    },
    success : function(res) {
      shareHandle('qq');
      // alert('已分享');
    },
    cancel : function(res) {
      // alert('已取消');
    },
    fail : function(res) {
      // alert(JSON.stringify(res));
    }
  });

  // 分享到微博
  wx.onMenuShareWeibo({
    title : _title,
    desc : _desc,
    link : _shareLink,
    imgUrl : _imgUrl,
    trigger : function(res) {
      // alert('用户点击分享到微博');
    },
    complete : function(res) {
      // alert(JSON.stringify(res));
    },
    success : function(res) {
      // alert('已分享');
      shareHandle('weibo');
    },
    cancel : function(res) {
      // alert('已取消');
    },
    fail : function(res) {
      // alert(JSON.stringify(res));
    }
  });

  // 分享到QZone
  wx.onMenuShareQZone({
    title : _title,
    desc : _desc,
    link : _shareLink,
    imgUrl : _imgUrl,
    trigger : function(res) {
      // alert('用户点击分享到QZone');
    },
    complete : function(res) {
      // alert(JSON.stringify(res));
    },
    success : function(res) {
      // alert('已分享');
      shareHandle('qzone');
    },
    cancel : function(res) {
      // alert('已取消');
    },
    fail : function(res) {
      // alert(JSON.stringify(res));
    }
  });

  // 关注公众号
  function WeiXinAddContact(wxid, cb) {
    if (typeof WeixinJSBridge == 'undefined')
      return false;
    WeixinJSBridge.invoke('addContact', {
      webtype : '1',
      username : wxid
    }, function(d) {
      // 返回d.err_msg取值，d还有一个属性是err_desc // add_contact:cancel 用户取消 //
      // add_contact:fail 关注失败
      // add_contact:ok 关注成功 // add_contact:added 已经关注
      WeixinJSBridge.log(d.err_msg);
      cb && cb(d.err_msg);
    });
  }
  ;

  function shareHandle(to) {
    // alert('this-2');
    // alert(_doShareUrl);
    if (_doShareUrl) {
      $.ajax({
        url : _doShareUrl,
        data : {
          shareMode : to,
          urlToken : _urltoken
        },
        dataType : "json",
        type : "POST",
        success : function(data) {
          // alert(data);
          if (data.success) {
            // console.log(_apiTicket);

          } else {
            if (_debug)
              console.log('系统返回出错原因：' + data.msg);
          }
        }
      });
    } else {
      if (_debug)
        console.log('共享地址未赋值！');
    }
  }
});

wx.error(function(res) {
  wx.hideOptionMenu();
  alert(res.errMsg+"！");
});