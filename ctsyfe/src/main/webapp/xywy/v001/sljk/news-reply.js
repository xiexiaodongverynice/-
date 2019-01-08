Zepto(function($) {
  var first_sceen__time = (+new Date());

  if ("" == 1 && document.getElementById('js_content'))
    document.getElementById('js_content').addEventListener("selectstart", function(e) {
      e.preventDefault();
    });

  (function() {
    if (navigator.userAgent.indexOf("WindowsWechat") != -1) {
      var link = document.createElement('link');
      var head = document.getElementsByTagName('head')[0];
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = "https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/style/page/appmsg/page_mp_article_improve_winwx2c2c35.css";
      head.appendChild(link);
    }
  })();
  
  $("#js_read_area3").show();
  $("#like3").show();

  // 显示或隐藏微信公众号信息
  $("#post-user").bind("click", function() {
    $("#js_profile_qrcode").toggle();
  });
  // 共享测试
  $("#fans-share").bind("click", function() {
    shareHandle('friend');
  });

  $("#like3").bind("click", function() {
    like();
  });

  function shareHandle(to) {
    $.ajax({
      url : "rest/weixinShare/doShare",
      data : {
        shareMode : to,
        urlToken : _urltoken
      },
      dataType : "json",
      type : "POST",
      success : function(data) {
        if (_debug)
          console.log(data);
        if (data.success) {
          // console.log(_apiTicket);

        } else {
          if (_debug)
            console.log('系统返回出错原因：' + data.msg);
        }
      }
    });
  }

  function like() {
    $.ajax({
      url : "rest/weixinShare/doLike",
      data : {
        urlToken : _urltoken
      },
      dataType : "json",
      type : "POST",
      success : function(data) {
        if (_debug)
          console.log(data);
        if (data.success) {
          // console.log(_apiTicket);

        } else {
          if (_debug)
            console.log('系统返回出错原因：' + data.msg);
        }
      }
    });
  }
  
});
