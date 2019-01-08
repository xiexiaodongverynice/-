angular.module('starter.yuyinControllers', ['ionic', 'wxjssdkInit'])

//医生评价展示
    .controller('YiShengPingJia', function ($scope, $state, $http, $ionicPopup) {
        //修改评价跳转
        $scope.gopingjiaxg = function () {
            $state.go('yishengpingjiaxiugai');
        }
        /**评星开始**/
        $scope.max = 5;
        $scope.ratingVal = 5;
        $scope.readonly = false;
        $scope.onHover = function (val) {
            $scope.hoverVal = val;
        };
        $scope.onLeave = function () {
            $scope.hoverVal = null;
        }
        $scope.onChange = function (val) {
            $scope.ratingVal = val;
        }
        /**评星结束**/
        var jiuzhenxx = JSON.parse(sessionStorage.getItem("huanzhexinxi"));
        $scope.huanzhexx = JSON.parse(sessionStorage.getItem("huanzhexinxi"));
        var pingjiaxx = JSON.parse(sessionStorage.getItem("hzdyspjxx"));
        $scope.manyidu = pingjiaxx["0"].manyidu;//满意度
        var myd = pingjiaxx["0"].manyidu;
        $scope.yiyuanpf = pingjiaxx["0"].yiyuanpingfen;//医院评分
        var yiyuanpingfen = pingjiaxx["0"].yiyuanpingfen;
        $scope.yishengpf = pingjiaxx["0"].yishengpingfen;//医生评分
        var yishengpingfen = pingjiaxx["0"].yishengpingfen;
        $scope.jzscpf = pingjiaxx["0"].shichangpingfen;//就诊时长评分
        var jzshichang = pingjiaxx["0"].shichangpingfen;
        var yishengxingming = jiuzhenxx.yisheng;
        var yiyuan = jiuzhenxx.yiyuan;
        var riqi = jiuzhenxx.jiuzhendate;
        //判断追加内容
        for (var i = 0; i < pingjiaxx.length; i++) {
            if (pingjiaxx[i].pingjiacishu == 1) {
                document.getElementById('pjnr').innerHTML = pingjiaxx[i].pingjia;//评价内容
                document.getElementById('zjdiv1').style.display = "none";//隐藏后释放占用页面空间
                document.getElementById('zjdiv2').style.display = "none";
            }
            if (pingjiaxx[i].pingjiacishu == 2) {
                document.getElementById('zjdiv1').style.display = "";
                document.getElementById('zjdiv2').style.display = "none";
                document.getElementById('zhujia1').innerHTML = pingjiaxx[i].pingjia;//追加内容1
            }
            if (pingjiaxx[i].pingjiacishu == 3) {
                document.getElementById('zjdiv1').style.display = "";
                document.getElementById('zjdiv2').style.display = "";
                document.getElementById('zhuijia').style.display = "none";
                document.getElementById('zhujia2').innerHTML = pingjiaxx[i].pingjia;//追加内容2
            }
        }
        //追加评论
        $scope.zhuijia = function () {
            //评价次数（本次评价为第几次评价）
            var cishu = pingjiaxx.length + 1;
            //追加内容
            var neirong = $("#pingjianeirong").val();
            //保存医生评价信息
            $.ajax({
                url: myConfig.serverUrl + "/saveyishengpingjia?callback=?",
                data: {
                    jiuzhenkahao: jiuzhenxx.jiuzhenkahao,
                    huanzhezhucexinxi: jiuzhenxx.huanzhezhucexinxi,
                    neirong: neirong,
                    manyidu: myd,
                    yishengpingfen: yishengpingfen,
                    yiyuanpingfen: yiyuanpingfen,
                    jzshichang: jzshichang,
                    yishengxingming: yishengxingming,
                    yiyuan: yiyuan,
                    riqi: riqi,
                    cishu: cishu
                },
                type: "GET",
                async: false,
                dataType: "jsonp", //返回数据形式为json
                success: function (response) {
//	                	$state.go('zhenhoufwsy');
                },
                error: function () {
                    hideMask();
                }
            });
            $state.go('zhenhoufwsy');
        }

    })

    //评价首页
    .controller('PingJiaShouYe', function ($scope, $state, $http, $ionicPopup) {
        $scope.gopingjia = function () {
            $state.go('yishengpingjia');
        };
        $scope.gobiji = function () {
            $state.go('huanzhebiji');
        }
    })
    //评价，评星（医生评价）
    .controller('PingJia', function ($scope, $state, $http, $ionicPopup) {
        var jiuzhenxx = JSON.parse(sessionStorage.getItem("huanzhexinxi"));
        $scope.huanzhexx = JSON.parse(sessionStorage.getItem("huanzhexinxi"));
        /**评星开始**/
        $scope.max = 5;
        $scope.ratingVal = 5;
        $scope.readonly = false;
        $scope.onHover = function (val) {
            $scope.hoverVal = val;
        };
        $scope.onLeave = function () {
            $scope.hoverVal = null;
        }
        $scope.onChange = function (val) {
            $scope.ratingVal = val;
        }
        /**评星结束**/
        //提交的点击事件
        $scope.pjtijiao = function () {
            //获取输入框中的内容（医生评价输入框）的两种方式
            var nr = document.getElementById('pingjianeirong').value;
            var neirong = $("#pingjianeirong").val();
            var myd = $("#myd").text();
            var yishengpingfen = $("#yishengpingfen").text();
            var yiyuanpingfen = $("#yiyuanpingfen").text();
            var jzshichang = $("#jz").text();
//			 var yishengxingming=$("#yishengxingming").text();
//			 var yiyuan=$("#yiyuan").text();
            var yishengxingming = jiuzhenxx.yisheng;
            var yiyuan = jiuzhenxx.yiyuan;
            var riqi = jiuzhenxx.jiuzhendate;
            //保存医生评价信息
            var cishu = 1;
            $.ajax({
                url: myConfig.serverUrl + "/saveyishengpingjia?callback=?",
                data: {
                    jiuzhenkahao: jiuzhenxx.jiuzhenkahao,
                    huanzhezhucexinxi: jiuzhenxx.huanzhezhucexinxi,
                    neirong: neirong,
                    manyidu: myd,
                    yishengpingfen: yishengpingfen,
                    yiyuanpingfen: yiyuanpingfen,
                    jzshichang: jzshichang,
                    yishengxingming: yishengxingming,
                    yiyuan: yiyuan,
                    riqi: riqi,
                    cishu: cishu
                },
                type: "GET",
                async: false,
                dataType: "jsonp", //返回数据形式为json
                success: function (response) {
                    // 	$state.go('zhenhoufwsy');
                },
                error: function () {
                    hideMask();
                }
            });
            $state.go('zhenhoufwsy');
        }
    })

    //患者笔记
    .controller('hzbiji', function ($scope, $state, $http, $ionicPopup) {
        //单条就诊信息
        var jiuzhenxx = JSON.parse(sessionStorage.getItem("huanzhexinxi"));
        $scope.huanzhexx = JSON.parse(sessionStorage.getItem("huanzhexinxi"));
        //提交的点击事件
        $scope.bijitijiao = function () {
            var jiuzhenriqi = jiuzhenxx.jiuzhendate;
            var yisheng = $("#yishengxingming").text();
            var yiyuan = $("#yiyuan").text();
            var riji = $("#pingjianeirong").val();
            var xiaoguo = document.getElementsByName('xiaoguo');
            var xiaoguozhi = "";
            for (var i = 0; i < 3; i++) {
                if (xiaoguo[i].checked) {
                    xiaoguozhi = xiaoguo[i].value;
                }
            }
            //保存患者笔记
            $.ajax({
                url: myConfig.serverUrl + "/savehuanzhebiji?callback=?",
                data: {
                    jiuzhenkahao: jiuzhenxx.jiuzhenkahao,
                    huanzhezhucexinxi: jiuzhenxx.huanzhezhucexinxi,
                    riqi: jiuzhenriqi,
                    yisheng: yisheng,
                    yiyuan: yiyuan,
                    riji: riji,
                    xiaoguo: xiaoguozhi
                },
                type: "GET",
                async: false,
                dataType: "jsonp", //返回数据形式为json
                success: function (response) {
                    //    	$state.go('zhenhoufwsy');
                },
                error: function () {
                    hideMask();
                }
            });
            $state.go('zhenhoufwsy');
        }
    })

    //诊后服务首页
    .controller('ZhenHoufwsy', function ($scope, $state, $http, $ionicPopup, $ionicScrollDelegate) {
        $scope.data = {more: false};
        //返回首页
        $scope.goshouye = function () {
            $state.go("shouye");
        }
        //清除输入框内容
        $scope.clean = function () {
            $scope.data.keyword = "";
        }
        $scope.show = false;
        $scope.zxshousuoclick = function () {
            document.getElementById("zxshousuo").style.display = "none";
            document.getElementById("zxxiangqing").style.display = "block";
            document.getElementById("one").style.display = "none";
            document.getElementById("two").style.display = "block";
            $scope.show = false;
        }
        $scope.zxxiangqingclick = function () {
            document.getElementById("zxshousuo").style.display = "block";
            document.getElementById("zxxiangqing").style.display = "none";
            document.getElementById("one").style.display = "block";
            document.getElementById("two").style.display = "none";
        }
        $("#two").hide();//隐藏第二种展现方式
//		//展现方式切换
//		$scope.zhanxianfangshi=function(){
//			if($("#one").is(":hidden")){
//				document.getElementById("one").style.display="block";
//				document.getElementById("two").style.display="none";
//			}else{
//				document.getElementById("one").style.display="none";
//				document.getElementById("two").style.display="block";
//			}
//		}
        var direction = [false];
        $scope.direction = direction;

        /**评星展示开始**/
        $scope.max = 5;
        $scope.ratingVal = 5;
        $scope.readonly = false;
        $scope.onHover = function (val) {
            $scope.hoverVal = val;
        };
        $scope.onLeave = function () {
            $scope.hoverVal = null;
        }
        $scope.onChange = function (val) {
            $scope.ratingVal = val;
        }
        /**评星展示结束**/
            //患者诊后信息
            //  $scope.zhenhouxx=[{riqi:"2017年5月2号     周二",yiyuan:"廊坊市中医院",yisheng:"贾洪娟",zhenduan:"心绞痛",feiyong:"4500",yongyao:"阿莫西林",jiancha:"心电图",huayan:"血液",riji:"qqqqq"},{riqi:"2017年5月7号     周日",yiyuan:"洛阳中医院",yisheng:"张三",zhenduan:"不稳定性心绞痛",feiyong:"4000",yongyao:"阿司匹林",jiancha:"心电图",huayan:"血生化",riji:"kkkk"}];
//		  var hzxx="410326195105111911";//患者信息(用于查询诊后数据)
        var hzxx = localStorage.huanzheidno;
        //存放查询结果
        var zhxq = "";
        $.ajax({
            url: myConfig.serverUrl + "/zhenhoufuwu?callback=?",
            data: {hzxx: hzxx},
            type: "GET",
            async: false,
            dataType: "jsonp", //返回数据形式为json
            success: function (response) {

                direction.length = 1 + response.length;
                for (var i = 0; i < direction.length; i++) {
                    if (i == 0) {
                        direction[i] = false;
                    } else {
                        direction[i] = true;
                    }

                }
                $scope.zhenhouxxone = response;//第一种展现方式所需数据
                //判断查询结果存在几条数据如果数据小于初始展示数据则全部数据赋值给zhenhouxx并将加载更多替换为已加载全部
                //第二种展现方式所需数据
                if (response.length <= 2) {
                    $scope.zhenhouxx = response;
                    $("#more").html("已加载全部");
                    $scope.domore = true;//加载完全部内容设为true（防止滚动条滑到底端不断执行此方法）
                } else {
                    $scope.zhenhouxx = response.slice(0, 2);
                }

                zhxq = response;
            },
            error: function () {
                hideMask();
            }
        });
        //填入查询信息（根据选中的诊断名称）
        $scope.writezhenduan = function (name) {
            $scope.data.keyword = name;
            $scope.queryjzxx();
        }
        //按条件查询就诊记录
        $scope.queryjzxx = function () {
            //查询条件
            var tiaojian = $scope.data.keyword;
            $.ajax({
                url: myConfig.serverUrl + "/zhenhoufuwu?callback=?",
                data: {hzxx: hzxx, tiaojian: tiaojian},
                type: "GET",
                async: false,
                dataType: "jsonp", //返回数据形式为json
                success: function (response) {

                    direction.length = 1 + response.length;
                    for (var i = 0; i < direction.length; i++) {
                        if (i == 0) {
                            direction[i] = false;
                        } else {
                            direction[i] = true;
                        }

                    }
                    $scope.zhenhouxxone = response;//第一种展现方式所需数据
                    //判断查询结果存在几条数据如果数据小于初始展示数据则全部数据赋值给zhenhouxx并将加载更多替换为已加载全部
                    //第二种展现方式所需数据
                    if (response.length <= 2) {
                        $scope.zhenhouxx = response;
                        $("#more").html("已加载全部");
                        $scope.domore = true;//加载完全部内容设为true（防止滚动条滑到底端不断执行此方法）
                    } else {
                        $scope.zhenhouxx = response.slice(0, 2);
                    }

                    zhxq = response;
                },
                error: function () {
                    hideMask();
                }
            });
        }
        //加载更多操作
//		  var page = parseInt($("#page").val());
        var page = 2;//初始展示数据条数
        $scope.getmore = function () {
            page = page + 1;
            if (page < zhxq.length) {
                $scope.zhenhouxx = zhxq.slice(0, page);
            } else {
                $scope.zhenhouxx = zhxq;
                $("#more").html("已加载全部");
                $scope.domore = true;//加载完全部内容设为true（防止滚动条滑到底端不断执行此方法）
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }

        //跳转到医生评价
        $scope.gopingjia = function (item) {
            sessionStorage.setItem('huanzhexinxi', JSON.stringify(item));
            var pingjiaxx = "";
            //查询医生评价
            $.ajax({
                url: myConfig.serverUrl + "/queryyspjzs?callback=?",
                data: {hzxx: item.huanzhezhucexinxi, jiuzhenkahao: item.jiuzhenkahao, riqi: item.jiuzhendate},
                type: "GET",
                async: true,
                dataType: "jsonp", //返回数据形式为json
                success: function (response) {
                    //存放患者对医生评价的信息
                    sessionStorage.setItem('hzdyspjxx', JSON.stringify(response));
                    if (response.length > 0) {
                        $scope.hzbjzs = response;
                        pingjiaxx = response;
                        if (pingjiaxx != "") {//判断评价是否存在内容(存在直接跳转到评价展示页面，不存在跳转到评价页面)
                            $state.go('yspjzs');
                        } else {
                            $state.go('yishengpingjia');
                        }
                    } else {
                        $state.go('yishengpingjia');
                    }

                },
                error: function () {
                    hideMask();
                }
            });

        };
        //跳转到患者笔记
        $scope.gobiji = function (item) {
            sessionStorage.setItem('huanzhexinxi', JSON.stringify(item));
            //获得笔记内容
            var biji = item.riji;
            //判断笔记是否存在（存在跳转到笔记展示页面，不存在跳转到写笔记页面）
            if (biji == "" || biji == "点击书写笔记") {
                $state.go('huanzhebiji');
            } else {
                $state.go('huanzhebijizhanshi');
            }

        };

        //跳转到用药列表
        $scope.goyongyao = function (item) {
            if (item.yongyao != "无") {
                sessionStorage.setItem('huanzhexinxi', JSON.stringify(item));
                $state.go('zhenhouyongyao');
            }

        }
        //检查点击事件
        $scope.jianchaclick = function (item) {
            //检查名称用于检查详情判断哪个初始化时展开
            sessionStorage.setItem('jianchamc', JSON.stringify(item.jcxmmc));
            var value = 2;
            var jczt = item.zt;//检查状态
            var id = item.id;//id
            if (jczt == 1) {//更改标记(更新为已读)
                $.ajax({
                    url: myConfig.serverUrl + "/updatejcjy?callback=?",
                    data: {value: value, id: id},
                    type: "GET",
                    async: true,
                    dataType: "jsonp", //返回数据形式为json
                    success: function (response) {

                    },
                    error: function () {
                        hideMask();
                    }
                });

            } else {

            }

        }
        //跳转到检查列表
        $scope.gojiancha = function (item) {
            if (item.jiancha != "无") {
                sessionStorage.setItem('huanzhexinxi', JSON.stringify(item));
                $state.go('zhenhoujiancha');
            }

        }

        //检验点击事件
        $scope.jianyanclick = function (item) {
            //化验信息用于化验详情判断哪个初始化时展开
            sessionStorage.setItem('huayanxx', JSON.stringify(item));
            var jcname = item.jyxmmc;//检验名称
            var value = 2;
            var jczt = item.zt;//检验状态
            var id = item.id;//id
            if (id != "") {
                jcname = "";
            }
            if (jczt == 1) {//更改标记(更新为已读)
                $.ajax({
                    url: myConfig.serverUrl + "/updatejy?callback=?",
                    data: {jcname: jcname, id: id, value: value},
                    type: "GET",
                    async: true,
                    dataType: "jsonp", //返回数据形式为json
                    success: function (response) {

                    },
                    error: function () {
                        hideMask();
                    }
                });

            }
        }
        //跳转到化验列表
        $scope.gohuayan = function (item) {
            if (item.huayan != "无") {
                sessionStorage.setItem('huanzhexinxi', JSON.stringify(item));
                $state.go('zhenhouhuayan');
            }

        }
        //跳转到切换用户页面
        $scope.goqiehuan = function () {
            $state.go('qiehuanhuanzhe', {panduan: "医疗记录"});
        }
    })

    //诊后用药信息
    .controller('ZhenHouyy', function ($scope, $state, $http, $ionicPopup) {
//		  var huanzhexinxi=window.localStorage.huanzhexinxi;
        var direction = [false];
        $scope.direction = direction;
        //得到的患者就诊信息
        var huanzhexx = JSON.parse(sessionStorage.getItem("huanzhexinxi"));
        $.ajax({
            url: myConfig.serverUrl + "/zhenhouyongyao?callback=?",
            data: {
                hzxx: huanzhexx.huanzhezhucexinxi,
                jiuzhenkahao: huanzhexx.jiuzhenkahao,
                riqi: huanzhexx.riqi,
                id: huanzhexx.id
            },
            type: "GET",
            async: false,
            dataType: "jsonp", //返回数据形式为json
            success: function (response) {
                //诊后用药列表
                $scope.zhenhouyyxx = response;
                direction.length = 1 + response.length;
                for (var i = 0; i < direction.length; i++) {
                    if (i == 0) {
                        direction[i] = false;
                    } else {
                        direction[i] = true;
                    }

                }

            },
            error: function () {
                hideMask();
            }
        });
        //跳转到药品详情页
        $scope.goyaopinxiangqing = function (yaopinmc) {
//			 $state.go('wenyaodetail',{yaopin:yaopinmc});
            sessionStorage.setItem('yaopinmc', yaopinmc);
            $state.go('wenyao');
        }
        $scope.gozhfw = function () {
            $state.go("zhenhoufwsy");
        };

    })

    //诊后检查信息
    .controller('ZhenHoujiancha', function ($scope, $state, $http, $ionicPopup) {
        //从医疗记录传过来的检查名称（用于判断展开哪条数据）
        var jcmc = JSON.parse(sessionStorage.getItem("jianchamc"));
        var direction = [false];
        $scope.direction = direction;
        //得到的患者就诊信息
        var huanzhexx = JSON.parse(sessionStorage.getItem("huanzhexinxi"));
        $.ajax({
            url: myConfig.serverUrl + "/zhenhoujiancha?callback=?",
            data: {
                hzxx: huanzhexx.huanzhezhucexinxi,
                jiuzhenkahao: huanzhexx.jiuzhenkahao,
                riqi: huanzhexx.riqi,
                id: huanzhexx.id,
                zzjgdm: huanzhexx.zzjgdm
            },
            type: "GET",
            async: false,
            dataType: "jsonp", //返回数据形式为json
            success: function (response) {
                //诊后检查列表
                $scope.zhenhoujclb = response;
                var xiangqing = response;
                direction.length = 1 + response.length;
                for (var i = 0; i < response.length; i++) {
                    //alert(xiangqing[i].jcxmmc);
                    if (xiangqing[i].jcxmmc == jcmc) {
                        direction[i] = false;
                    } else {
                        direction[i] = true;
                    }

                }
            },
            error: function () {
                hideMask();
            }
        });
        $scope.gotupian = function (item) {
            $state.go('zhenhoutupian');
        }
        $scope.gozhfw = function () {
            $state.go("zhenhoufwsy");
        };
    })

    //诊后化验信息
    .controller('ZhenHouhuayan', function ($scope, $state, $http, $ionicPopup) {
        //判断化验列表展开哪条数据
        var huayanxx = JSON.parse(sessionStorage.getItem("huayanxx"));
        var huayanmc = huayanxx.jyxmmc;
        if (huayanxx.mcpanduan == "未分类") {
            huayanmc = "未分类";
        }
        var direction = [false];
        $scope.direction = direction;
        //得到的患者就诊信息
        var huanzhexx = JSON.parse(sessionStorage.getItem("huanzhexinxi"));
        $.ajax({
            url: myConfig.serverUrl + "/zhenhouhuayan?callback=?",
            data: {
                hzxx: huanzhexx.huanzhezhucexinxi,
                jiuzhenkahao: huanzhexx.jiuzhenkahao,
                riqi: huanzhexx.riqi,
                id: huanzhexx.id
            },
            type: "GET",
            async: false,
            dataType: "jsonp", //返回数据形式为json
            success: function (response) {
                //诊后检查列表
                $scope.zhenhouhuayanlb = response;
                direction.length = 1 + response.length;
                for (var i = 0; i < response.length; i++) {
                    if (response[i].huayanmingcheng == huayanmc) {
                        direction[i] = false;
                    } else {
                        direction[i] = true;
                    }

                }
            },
            error: function () {
                hideMask();
            }
        });

        $scope.gozhfw = function () {
            $state.go("zhenhoufwsy");
        };
    })

    //患者笔记展示页面
    .controller('hzbijizhanshi', function ($scope, $state, $http, $ionicPopup) {
        //单条就诊信息
        var jiuzhenxx = JSON.parse(sessionStorage.getItem("huanzhexinxi"));
        $scope.huanzhexx = JSON.parse(sessionStorage.getItem("huanzhexinxi"));
        //查询患者笔记
        $.ajax({
            url: myConfig.serverUrl + "/queryhuanzhebiji?callback=?",
            data: {
                hzxx: jiuzhenxx.huanzhezhucexinxi,
                jiuzhenkahao: jiuzhenxx.jiuzhenkahao,
                riqi: jiuzhenxx.jiuzhendate
            },
            type: "GET",
            async: false,
            dataType: "jsonp", //返回数据形式为json
            success: function (response) {
//            	 $scope.hzbjzs=response;
                $scope.hzbjzs = response["0"];
                //存放患者笔记内容
                sessionStorage.setItem("huanzhebijixx", JSON.stringify(response["0"]));
//            	 document.getElementById('xiaoguo').innerHTML="治疗效果：      "+response["0"].zhiliaoxiaoguo;
//            	 document.getElementById('riji').innerHTML=response["0"].riji;
            },
            error: function () {
                hideMask();
            }
        });
        //跳转到笔记修改页面
        $scope.gotianjiabiji = function () {
            $state.go('huanzhebijiupdate')
        }
    })

    //注册页
    .controller('RegisterC', function ($scope, $state, $http, $ionicPopup) {
        //慢性病获取
//		$scope.manxingbingall=["高血压","糖尿病","心脏病","脑卒中"];
        $.ajax({
            url: myConfig.serverUrl + "/querymanxingbing?callback=?",
            data: {},
            type: "GET",
            async: false,
            dataType: "jsonp", //返回数据形式为json
            success: function (response) {
                $scope.manxingbingall = response;
            },
            error: function () {
                hideMask();
            }
        });
        $scope.tempmanxingbing = $scope.manxingbingall.slice(0, 0);

        $scope.data = [];
        $scope.data.checkCode = "111111";
        $scope.begin = false//初始不可用
        //发送验证码
        $scope.thatClick = function () {
            //获取电话号码
            var phonenum = document.getElementsByName('userid')["0"].value;
            $.ajax({
                url: myConfig.serverUrl + "/sendyzm?callback=?",
                data: {phonenum: phonenum},
                type: "GET",
                async: false,
                dataType: "jsonp", //返回数据形式为json
                success: function (response) {

                },
                error: function () {
                    hideMask();
                }
            });
        }
        //注册按钮点击事件
        $scope.goZhuce = function () {
            //微信号
            var weixnid = "1234";
            //获取患者姓名
            var huanzhename = document.getElementsByName('username')["0"].value;
            //获取患者身份证号
            var huanzheidno = document.getElementsByName('idNo')["0"].value;
            //获取患者电话号码
            var phonenum = document.getElementsByName('userid')["0"].value;
            //获得输入的验证码
            var checkCode = document.getElementsByName('checkCode')["0"].value;
            //获得慢性病
            var manxingbing = "";
            $('input[name="manxingbing"]:checked').each(function () {
                var zhongleival = $(this).val();
                if (manxingbing == "") {
                    manxingbing = zhongleival;
                } else {
                    manxingbing = manxingbing + "," + zhongleival;
                }
            });
            //保存注册信息
            $.ajax({
                url: myConfig.serverUrl + "/savehzzcxx?callback=?",
                data: {
                    shoujihao: phonenum,
                    huanzhename: huanzhename,
                    shenfenzhenghao: huanzheidno,
                    weixnid: weixnid,
                    checkCode: checkCode,
                    manxingbing: manxingbing
                },
                type: "GET",
                async: false,
                dataType: "jsonp", //返回数据形式为json
                success: function (response) {
                    if (response != "-1") {
                        //存放注册信息(存放在本地（没有时间限制的数据存储）)
                        localStorage.setItem("huanzheidno", huanzheidno);
                        localStorage.setItem("manxingbing", manxingbing);
                        localStorage.setItem("phonenum", phonenum);
                        localStorage.setItem("huanzhename", huanzhename);
                        $state.go('zhenhoufwsy');
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: '<div align="center">您输入的验证码错误，请重新输入！</div>',
                            okText: '确定'
                        });
                    }

                },
                error: function () {
                    hideMask();
                }
            });
        }
    })


    //修改就诊评价
    .controller('jzpjxg', function ($scope, $state, $http, $ionicPopup) {

        /**评星开始**/
        $scope.max = 5;
        $scope.ratingVal = 5;
        $scope.readonly = false;
        $scope.onHover = function (val) {
            $scope.hoverVal = val;
        };
        $scope.onLeave = function () {
            $scope.hoverVal = null;
        }
        $scope.onChange = function (val) {
            $scope.ratingVal = val;
        }
        /**评星结束**/
        var jiuzhenxx = JSON.parse(sessionStorage.getItem("huanzhexinxi"));
        $scope.huanzhexx = JSON.parse(sessionStorage.getItem("huanzhexinxi"));
        var pingjiaxx = JSON.parse(sessionStorage.getItem("hzdyspjxx"));
        $scope.manyidu = pingjiaxx["0"].manyidu;//满意度
        $scope.yiyuanpf = pingjiaxx["0"].yiyuanpingfen;//医院评分
        $scope.yishengpf = pingjiaxx["0"].yishengpingfen;//医生评分
        $scope.jzscpf = pingjiaxx["0"].shichangpingfen;//就诊时长评分
        document.getElementById('pingjianeirong').innerHTML = pingjiaxx["0"].pingjia;//评价内容

        //修改评价提交的点击事件
        $scope.xgpjtijiao = function () {
            //获取输入框中的内容（医生评价输入框）的两种方式
            var nr = document.getElementById('pingjianeirong').value;
            var neirong = $("#pingjianeirong").val();
            var myd = $("#myd").text();
            var yishengpingfen = $("#yishengpingfen").text();
            var yiyuanpingfen = $("#yiyuanpingfen").text();
            var jzshichang = $("#jz").text();
            var yishengxingming = $("#yishengxingming").text();
            var yiyuan = $("#yiyuan").text();
            var riqi = jiuzhenxx.jiuzhendate;
            //保存医生评价信息
            $.ajax({
                url: myConfig.serverUrl + "/updateyspj?callback=?",
                data: {
                    jiuzhenkahao: jiuzhenxx.jiuzhenkahao,
                    huanzhezhucexinxi: jiuzhenxx.huanzhezhucexinxi,
                    neirong: neirong,
                    manyidu: myd,
                    yishengpingfen: yishengpingfen,
                    yiyuanpingfen: yiyuanpingfen,
                    jzshichang: jzshichang,
                    yishengxingming: yishengxingming,
                    yiyuan: yiyuan,
                    riqi: riqi
                },
                type: "GET",
                async: false,
                dataType: "jsonp", //返回数据形式为json
                success: function (response) {
                    // 	$state.go('zhenhoufwsy');
                },
                error: function () {
                    hideMask();
                }
            });
            $state.go('zhenhoufwsy');
        }
    })
    //患者笔记修改
    .controller('hzbjxg', function ($scope, $state, $http, $ionicPopup) {
        //单条就诊信息
        var jiuzhenxx = JSON.parse(sessionStorage.getItem("huanzhexinxi"));
        $scope.huanzhexx = JSON.parse(sessionStorage.getItem("huanzhexinxi"));
        var huanzhebijixx = JSON.parse(sessionStorage.getItem("huanzhebijixx"));
        //治疗效果
        var xiaoguo = document.getElementsByName('xiaoguo');
        for (var i = 0; i < 3; i++) {
            if (xiaoguo[i].value == huanzhebijixx.zhiliaoxiaoguo) {
                xiaoguo[i].checked = true;
            }
        }
        document.getElementById('pingjianeirong').innerHTML = huanzhebijixx.riji;
        //提交的点击事件
        $scope.bijitijiao = function () {
            var jiuzhenriqi = jiuzhenxx.jiuzhendate;
            var yisheng = $("#yishengxingming").text();
            var yiyuan = $("#yiyuan").text();
            var riji = $("#pingjianeirong").val();

            var xiaoguozhi = "";
            for (var i = 0; i < 3; i++) {
                if (xiaoguo[i].checked) {
                    xiaoguozhi = xiaoguo[i].value;
                }
            }
            //保存患者笔记
            $.ajax({
                url: myConfig.serverUrl + "/updatehuanzhebiji?callback=?",
                data: {
                    jiuzhenkahao: jiuzhenxx.jiuzhenkahao,
                    huanzhezhucexinxi: jiuzhenxx.huanzhezhucexinxi,
                    riqi: jiuzhenriqi,
                    yisheng: yisheng,
                    yiyuan: yiyuan,
                    riji: riji,
                    xiaoguo: xiaoguozhi
                },
                type: "GET",
                async: false,
                dataType: "jsonp", //返回数据形式为json
                success: function (response) {
                    //    	$state.go('zhenhoufwsy');
                },
                error: function () {
                    hideMask();
                }
            });
            $state.go('zhenhoufwsy');
        }
    })
    //切换患者
    .controller('qiehuanhuanzhe', function ($scope, $state, $http, $ionicPopup, $window, $stateParams) {
        var weixinid = "1234";
        $scope.data = [];
        $scope.data.checkCode = "111111";
        //慢性病
        $.ajax({
            url: myConfig.serverUrl + "/querymanxingbing?callback=?",
            data: {},
            type: "GET",
            async: false,
            dataType: "jsonp", //返回数据形式为json
            success: function (response) {
                $scope.manxingbingall = response;
            },
            error: function () {
                hideMask();
            }
        });
        $scope.tempmanxingbing = $scope.manxingbingall.slice(0, 0);


        //切换患者
        $.ajax({
            url: myConfig.serverUrl + "/queryhuanzhexx?callback=?",
            data: {weixnid: weixinid},
            type: "GET",
            async: false,
            dataType: "jsonp", //返回数据形式为json
            success: function (response) {
                $scope.hzxx = response;
            },
            error: function () {
                hideMask();
            }
        });
        $scope.item = "";
        $scope.writephonenum = function () {
            var hzxxitem = JSON.parse(document.getElementById('select').value);
            $scope.phonevalue = hzxxitem.phonenum;
            $scope.manxingbing = hzxxitem.manxingbing;
            var value = $scope.manxingbing.split(",");
//			if(value){
//			for(var i=0;i<value.length;i++){
//				document.getElementById(value[i]).checked=true;
////				$("#"+value[i]).attr("class","ng-valid-parse");
//			}
//			}
            //判断选中内容
            for (var i = 0; i < $scope.manxingbingall.length; i++) {
                if ($scope.manxingbing.indexOf($scope.manxingbingall[i]) > -1) {
                    document.getElementById($scope.manxingbingall[i]).checked = true;
                } else {
                    document.getElementById($scope.manxingbingall[i]).checked = false;
                }
            }
        }
        /*	//删除患者注册信息
         $scope.delhzxx=function(item,i){
         $.ajax({
         url: myConfig.serverUrl+"/delqiehaunhuanzhe?callback=?",
         data: {weixinid:item.weixinid,huanzhename:item.huanzhename,phonenum:item.phonenum,shenfenzhengid:item.shenfenzhengid},
         type: "GET",
         async:false,
         dataType: "jsonp", //返回数据形式为json
         success: function (response) {

         },
         error: function(){
         hideMask();
         }
         });
         //刷新当前页面
         //		$window.location.reload();
         //从table移除被删除的一条数据
         $scope.hzxx.splice(i,1);
         }*/
        $scope.begin = false//初始不可用
        //发送验证码
        $scope.thatClick = function () {
            //获取电话号码
            var phonenum = document.getElementsByName('userid')["0"].value;
            $.ajax({
                url: myConfig.serverUrl + "/sendyzm?callback=?",
                data: {phonenum: phonenum},
                type: "GET",
                async: false,
                dataType: "jsonp", //返回数据形式为json
                success: function (response) {

                },
                error: function () {
                    hideMask();
                }
            });
        }

        //登陆按钮点击事件
        $scope.denglu = function () {
            //获取患者姓名
//		var huanzhename=document.getElementsByName('username')["0"].value;
            var huanzhename = JSON.parse(document.getElementById('select').value).huanzhename;
            //获取患者身份证号
            var huanzheidno = JSON.parse(document.getElementById('select').value).shenfenzhengid;
//		var huanzheidno=document.getElementsByName('idNo')["0"].value;
            //获取患者电话号码
            var phonenum = document.getElementsByName('userid')["0"].value;
            //获得输入的验证码
            var checkCode = document.getElementsByName('checkCode')["0"].value;
            //登陆判断
            $.ajax({
                url: myConfig.serverUrl + "/qiehaunhuanzhe?callback=?",
                data: {
                    shoujihao: phonenum,
                    huanzhename: huanzhename,
                    shenfenzhenghao: huanzheidno,
                    weixnid: weixinid,
                    checkCode: checkCode
                },
                type: "GET",
                async: false,
                dataType: "jsonp", //返回数据形式为json
                success: function (response) {
                    if (response.length > 0) {
                        //存放在本地（没有时间限制的数据存储）
//	 				localStorage.setItem("huanzheidno",huanzheidno);
                        localStorage.setItem("huanzheidno", response["0"].shenfenzhengid);
                        localStorage.setItem("manxingbing", response["0"].manxingbing);
                        localStorage.setItem("phonenum", response["0"].phonenum);
                        localStorage.setItem("huanzhename", response["0"].huanzhename);
                        var panduan = $stateParams.panduan;
                        if (panduan == "健康数据") {
                            $state.go("jiankangguanlizhanxian");
                        } else {
                            $state.go('zhenhoufwsy');
                        }
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示信息',
                            template: '<div align="center">输入信息错误，请重新输入！</div>',
                            okText: '确定'
                        });
                    }

                },
                error: function () {
                    hideMask();
                }
            });

        }
        //新增患者信息（注册新用户）
        $scope.gozhuce = function () {
            $state.go('register');
        }
    })

    //健康管理
    .controller('jiankangguanli', function ($scope, $state, $http, $ionicPopup, $filter, $ionicSlideBoxDelegate) {
        //日历展示
        $scope.data = {};
        var myDate = new Date();
        var myMonth = (myDate.getMonth()) + 1;
        var myDay = myDate.getDate();
        //console.log(myMonth);
        //console.log(myDay);
        $scope.startDate = myMonth + '-' + myDay;
        //不可选日期
        var disabledDates = [new Date(1437719836326),
            new Date(2015, 7, 10), // months are 0-based, this
            // is August, 10th!
            new Date('Wednesday, August 12, 2015'), // Works
            // with any
            // valid
            // Date
            // formats
            // like long
            // format
            new Date("08-14-2015"), // Short format
            new Date("05-14-2017"),
            new Date(1439676000000)// UNIX format
        ];
        var monthList = ["1", "2", "3", "4", "5", "6", "7", "8",
            "9", "10", "11", "12"];
        var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];
        $scope.datepickerObject = {};
        $scope.datepickerObject.nowDate = new Date()
        $scope.datepickerObject.startDate = new Date()
        $scope.startDate = $filter('date')(
            $scope.datepickerObject.startDate, "yyyy-MM-dd ");

        $scope.datepickerObjectPopup = {
            titleLabel: '选择日期',
            // Optional
            todayLabel: '今天',
            // Optional
            closeLabel: '关闭',
            // Optional
            setLabel: '选择',
            // Optional
            errorMsgLabel: 'Please select time.',
            // Optional
            setButtonType: 'button-assertive',
            // Optional
            modalHeaderColor: 'bar-positive',
            // Optional
            modalFooterColor: 'bar-positive',
            // Optional
            templateType: 'popup',
            // Optional
            inputDate: $scope.datepickerObject.startDate,
            // Optional
            mondayFirst: true,
            // Optional定义不可选日期
            disabledDates: null,
            // Optional
            monthList: monthList,
            // Optional
            weekDaysList: weekDaysList,
//			 from: $scope.datepickerObject.startDate,
            //		                         // Optional
            to: $scope.datepickerObject.startDate,
            // Optional
            callback: function (val) {
                if (typeof (val) === 'undefined') {
                    datePickerCallbackPopup(val);
                } else {
                    var secondstime = val.getTime();//转换为毫秒
                    // Optional
                    datePickerCallbackPopup(secondstime);
                }
            }
        };

        var datePickerCallbackPopup = function (val) {
            if (typeof (val) === 'undefined') {
                // console.log('No date selected');
            } else {
                $scope.datepickerObject.startDate = val;
                $scope.startDate = $filter('date')(
                    $scope.datepickerObject.startDate,
                    "yyyy-MM-dd ");
                // console.log('Selected date is : ', val)
                //获得当前日期（年-月-日）
                var nowdatatime = $filter('date')(
                    $scope.datepickerObject.nowDate, "yyyy-MM-dd ");
                if ($scope.startDate == nowdatatime) {
                    document.getElementById("addonedaytime").style.color = "#b2b2b2";
                } else {
                    document.getElementById("addonedaytime").style.color = "blue";
                }


            }
        };

        $scope.isGroupShown = function (item) {
            return item.show;
        };
        $scope.toggleGroup = function (item) {
            item.show = !item.show;
        };

//判断患者有哪些慢性病进而显示所需填的数据
        //心率（高血压）
        $scope.xinlvtd = false;
        //糖尿病信息隐藏
        $scope.xuetangdivshow = false;
        //高血压信息隐藏
        $scope.xueyashow = false;
        //血脂（糖尿病）隐藏
        $scope.xuezhidivshow = false;
        //糖化血红蛋白（糖尿病）
        $scope.thxuehongdanbaidivshow = false;
        var hzxx = localStorage.huanzheidno;//身份证号
        var hzmanxingbing = localStorage.manxingbing;//患者慢性病
        if (hzmanxingbing == "undefined" || hzmanxingbing == "") {

        } else {
            var value = hzmanxingbing.split(",");
            //循环判断有哪些疾病
            value.forEach(function (item) {
                if (item == "高血压") {
                    $scope.xinlvtd = true;
                    $scope.xueyashow = true;
                }
                if (item == "糖尿病") {
//	    			 $scope.xuezhidivshow=true;
//	    			 $scope.xueyashow=true;
                    $scope.xuetangdivshow = true;
                    $scope.thxuehongdanbaidivshow = true;
                }
                if (item == "心脏病") {
                    $scope.xueyashow = true;
                }
                if (item == "脑卒中") {
                    $scope.xueyashow = true;
                }
            });
        }


        //保存事件
        $scope.tijiao = function () {
            //身高
            var shengao = document.getElementById("shengao").value;
            //体重
            var tizhong = document.getElementById("tizhong").value;
            //心率
            var xinlv = document.getElementById("xinlv").value;
            //体温
            var tiwen = document.getElementById("tiwen").value;
            //睡眠时长
            var shuimian = document.getElementById("shuimian").value;
            //睡眠质量
            var shuimianzhiliang = $('input[name="shuimianzhiliang"]:checked').val(); //获取被选中Radio的Value值
            //食糖量
            var shitangliang = $('input[name="shitangliang"]:checked').val(); //获取被选中Radio的Value值
            //油腻度
            var younidu = $('input[name="younidu"]:checked').val(); //获取被选中Radio的Value值
            //运动
            var yundong = document.getElementById("yundong").value;
            //吸烟
            var xiyan = document.getElementById("xiyan").value;
            //存放多选框选中的值（饮酒种类）
            var duoxuan = "";
            //获得多选框选中的值（饮酒种类）
            $('input[name="zhonglei"]:checked').each(function () {
                var zhongleival = $(this).val();
                if (duoxuan == "") {
                    duoxuan = zhongleival;
                } else {
                    duoxuan = duoxuan + "," + zhongleival;
                }
            });
            //饮酒量
            var yinjiu = document.getElementById("yinjiu").value;
            //测血压时间
            var xueyatime = $('input[name="xueyatime"]:checked').val(); //获取被选中Radio的Value值
            //高压
            var gaoya = document.getElementById("gaoya").value;
            //低压
//			var diya=document.getElementById("diya").value;
            //脉搏
            var maibo = document.getElementById("maibo").value;
            //测血糖时间
            var xuetangtime = $('input[name="xuetangtime"]:checked').val(); //获取被选中Radio的Value值
            //空腹
            var kongfu = document.getElementById("kongfu").value;
            //餐后
            var canhou = document.getElementById("canhou").value;
            //身体不适
//			var zhengzhuang=document.getElementById("zhengzhuang").value;
            $state.go('shouye');
        }
//日期向左点击减一天
        $scope.yesterday = function () {
            $scope.datepickerObject.startDate = $scope.datepickerObject.startDate - 86400000;
            datePickerCallbackPopup($scope.datepickerObject.startDate);
            document.getElementById("addonedaytime").style.color = "blue";
//			$scope.startDate = $filter('date')(
//					 $scope.datepickerObject.startDate, "yyyy-MM-dd ");

        }
//日期向右点击增加一天
        $scope.addoneday = function () {
            //获得当前日期（年-月-日）
            var today = new Date();
            var nowdatatime = $filter('date')(
                today, "yyyy-MM-dd ");
            //获得页面显示的时间（年-月-日）
            var xianshitime = $filter('date')(
                $scope.datepickerObject.startDate, "yyyy-MM-dd ");
            if (xianshitime == nowdatatime) {

            } else {
                $scope.datepickerObject.startDate = $scope.datepickerObject.startDate + 86400000;
                //页面增加一日后的日期
                var xianshiaddtime = $filter('date')(
                    $scope.datepickerObject.startDate, "yyyy-MM-dd ");
                if (xianshiaddtime == nowdatatime) {
                    document.getElementById("addonedaytime").style.color = "#b2b2b2";
                } else {
                    document.getElementById("addonedaytime").style.color = "blue";
                }
                datePickerCallbackPopup($scope.datepickerObject.startDate);
            }
        }
    })
    //健康管理展示
    .controller('jiankangguanlizhanshi', function ($scope, $state, $http, $ionicPopup, $filter, $ionicSlideBoxDelegate) {
        //当前用户名
        $scope.name = localStorage.huanzhename;
//		document.getElementById("xueya").style.backgroundColor='#f7f7f7';
        document.getElementById("xueya").style.color = 'blue';
        document.getElementById("xuetang").style.color = 'black';
        document.getElementById("tiwen").style.color = 'black';
        $scope.tiwen = false;
        $scope.xueya = true;
        $scope.xuetang = false;
        $scope.tiwenclick = function () {
//			document.getElementById("xueya").style.backgroundColor='white';
//			document.getElementById("xuetang").style.backgroundColor='white';
//			document.getElementById("tiwen").style.backgroundColor='#f7f7f7';
            document.getElementById("xueya").style.color = 'black';
            document.getElementById("xuetang").style.color = 'black';
            document.getElementById("tiwen").style.color = 'blue';
            $scope.tiwen = true;
            $scope.xueya = false;
            $scope.xuetang = false;
        };
        $scope.xueyaclick = function () {
//			document.getElementById("xueya").style.backgroundColor='#f7f7f7';
//			document.getElementById("xuetang").style.backgroundColor='white';
//			document.getElementById("tiwen").style.backgroundColor='white';
            document.getElementById("xueya").style.color = 'blue';
            document.getElementById("xuetang").style.color = 'black';
            document.getElementById("tiwen").style.color = 'black';
            $scope.tiwen = false;
            $scope.xueya = true;
            $scope.xuetang = false;
        };
        $scope.xuetangclick = function () {
//			document.getElementById("xueya").style.backgroundColor='white';
//			document.getElementById("xuetang").style.backgroundColor='#f7f7f7';
//			document.getElementById("tiwen").style.backgroundColor='white';
            document.getElementById("xueya").style.color = 'black';
            document.getElementById("xuetang").style.color = 'blue';
            document.getElementById("tiwen").style.color = 'black';
            $scope.tiwen = false;
            $scope.xueya = false;
            $scope.xuetang = true;
        };
        $scope.writedangan = function () {
            var hzxx = localStorage.huanzheidno;//身份证号
            var hzmanxingbing = localStorage.manxingbing;//患者慢性病
            if (hzmanxingbing == "undefined" || hzmanxingbing == "") {
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '<div align="center">该用户未填写慢性病，请完善用户信息！</div>',
                    okText: '确定'
                });
                $state.go("yonghuguanli");
            } else {
                $state.go("jiankangguanli");
            }

        }
        $scope.goqiehuanhuanzhe = function () {
            //跳转到用户切换页面（传参数用于用户切换页面登陆的判断）
            $state.go("qiehuanhuanzhe", {panduan: "健康数据"});
        };
        $scope.goshouye = function () {
            $state.go("shouye");
        }

//		折线图(体温)
        $scope.legend = ["体温"];
        $scope.item = ['6-5', '6-6', '6-7', '6-8', '6-9', '6-10', '6-11', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $scope.data = [
            [36.6, 37.5, 34, 37, 35.9, 36.0, 38.5]
        ];


//		折线图(血压)
        $scope.xueyalegend = ['高压', '低压'];
        $scope.xueyaitem = ['6-5', '6-6', '6-7', '6-8', '6-9', '6-10', '6-11'];
        $scope.xueyadata = [
            [160, 120, 140, 150, 130, 135, 110],
            [90, 80, 88, 110, 90, 100, 70]
        ];
        $scope.xueyadanwei = "血压   mmHg";

//		折线图(血糖)
        $scope.xuetanglegend = ['空腹', '饭后'];
        $scope.xuetangitem = ['6-5', '6-6', '6-7', '6-8', '6-9', '6-10', '6-11'];
        $scope.xuetangdata = [
            [160, 120, 140, 150, 130, 135, 110],
            [90, 80, 88, 110, 90, 100, 70]
        ];
        $scope.xuetangdanwei = "血糖   mmol/L";


    })

    //用户管理（用户信息的修改）
    .controller('yonghuguanli', function ($scope, $state, $http, $ionicPopup, $filter, $ionicSlideBoxDelegate) {
        var weixinid = "1234";
        //当前用户姓名
        $scope.name = localStorage.huanzhename;
        //当前用户注册手机号
        $scope.phonenum = localStorage.phonenum;
        //当前用户身份证号
        $scope.huanzheidno = localStorage.huanzheidno;
        //慢性病（页面展示可供选择的慢性病）
        $.ajax({
            url: myConfig.serverUrl + "/querymanxingbing?callback=?",
            data: {},
            type: "GET",
            async: false,
            dataType: "jsonp", //返回数据形式为json
            success: function (response) {
                $scope.manxingbingall = response;
            },
            error: function () {
                hideMask();
            }
        });
        //当前用户的慢性病
        var manxingbingselect = localStorage.manxingbing;
        var value = manxingbingselect.split(",");
        //页面生成时自动勾选患者填写过的内容
        $scope.selectchecked = function (mxbitem) {
            var panduan = false;
            value.forEach(function (item) {
                if (mxbitem == item) {
                    panduan = true;
                }

            });
            return panduan;
        }
        //修改按钮点击事件
        $scope.updateyhxx = function () {
            var huanzhename = document.getElementById("yhname").value;
            //存放患者选择的慢性病
            var duoxuan = "";
            //获得多选框选中的值（慢性病）
            $('input[name="manxingbing"]:checked').each(function () {
                var zhongleival = $(this).val();
                if (duoxuan == "") {
                    duoxuan = zhongleival;
                } else {
                    duoxuan = duoxuan + "," + zhongleival;
                }
            });
            //判断姓名是否为空
            if (huanzhename == "") {
                var alertPopup = $ionicPopup.alert({
                    title: '提示信息',
                    template: '<div align="center">姓名不能为空！</div>',
                    okText: '确定'
                });
            } else {
                $.ajax({
                    url: myConfig.serverUrl + "/updateyonghuxx?callback=?",
                    data: {
                        name: $scope.name,
                        huanzhename: huanzhename,
                        weixinid: weixinid,
                        manxingbing: duoxuan,
                        phonenum: $scope.phonenum,
                        huanzheidno: $scope.huanzheidno
                    },
                    type: "GET",
                    async: false,
                    dataType: "jsonp", //返回数据形式为json
                    success: function (response) {
//	            	localStorage.setItem("huanzheidno","");
                        localStorage.setItem("manxingbing", duoxuan);
// 	 				localStorage.setItem("phonenum","");
                        localStorage.setItem("huanzhename", huanzhename);
                        $state.go("shouye");
                    },
                    error: function () {
                        hideMask();
                    }
                });
            }
        }
    });
