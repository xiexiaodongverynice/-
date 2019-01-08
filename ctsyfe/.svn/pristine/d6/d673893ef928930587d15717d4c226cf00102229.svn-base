angular.module('starter.zndzControllers', ['ionic'])

    //接受便民助手跳转
    .controller('BmzsC', function ($window, $stateParams, Outlet) {
        Outlet.Enter($stateParams.state, $stateParams.openId, $stateParams.orgCode);
        //IOS隐藏最上方标题栏
        $scope.isIos = false;
        $scope.inputFocus = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            $scope.localyyzt = "打开";
        }
        //IOS隐藏最上方标题栏 结束

    })
    //科室推荐首页
    .controller('KSTJ', function (wxApi, $scope, $http, $state, $stateParams, XywyService, Popup, $window, $ionicViewSwitcher) {

        var c = 750; // 基准宽度,取的是iphone6
        var b = document.getElementsByTagName('html')[0];
        var f = b.getBoundingClientRect().width / c;
        b.style.fontSize = f + 'rem';
        $scope.data = {
            xingbie: "男",
            renqun: "成人",
            zhengmian: '正',
            choosing: false
        };
        //返回上一页
        $scope.goBack = function () {
            $window.history.back();
        };
        $scope.istishishow = true;
        //点击隐藏提示语
        $scope.isshow = function (event) {
            event.stopPropagation();
            $scope.istishishow = false;
        }
        //IOS隐藏最上方标题栏
        $scope.isIos = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
        }
        var rttdz = "直接选择身体部位发生的症状"
        $scope.rttdz = rttdz;


        var abdz = "直接选择疾病"
        $scope.abdz = abdz;

        var zndz = "通过语音录入身体病症"
        $scope.zndz = zndz;

        var yypm = "常规科室对应的全国医院排名"
        $scope.yypm = yypm;

        $scope.gorttdz = function () {
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('xuanbuwei');
        }
        $scope.goabdz = function () {
            $ionicViewSwitcher.nextDirection('forward');
            $state.go("changjianjb", { xingbie: $scope.data.xingbie, renqun: $scope.data.renqun });

        }

        $scope.gozndz = function () {
            $state.transitionTo('yuyinjiaohuclick', { gn: "WZZ", zhuci: '', history: 'zndz' }, { reload: true, notify: true });
        }
        //心里健康
        $scope.goyypm = function () {
            $state.go("yypm");

        }

    })

    //图片选部位Controller
    .controller('XuanbuweiC', ['$ionicViewSwitcher', '$scope', '$rootScope', '$stateParams', '$state', 'CitiesAndLevel', '$log', 'geoLocation', 'locHistory', 'Popup', '$http', '$window', 'wxApi', '$q', function ($ionicViewSwitcher, $scope, $rootScope, $stateParams, $state, CitiesAndLevel, $log, geoLocation, locHistory, Popup, $http, $window, wxApi, $q) {
        'use strict';
        //IOS隐藏最上方标题栏
        $scope.isIos = false;
        $scope.inputFocus = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            $scope.localyyzt = "打开";
        }
        //IOS隐藏最上方标题栏 结束

        //sessionStorage.setItem("dingwei",false);
        //$scope.navButton = true;
        $scope.backButton = true;

        $scope.data = {
            xingbie: "男",
            renqun: "成人",
            zhengmian: '正',
            choosing: false
        };
        //获取图片热区数据
        $http.get('js/bodymap.json').then(
            function (response) {
                $scope.bodymap = response.data;
            }, Popup.alert
        );
        $scope.urls = {
            '男成人正': 'mcrz.png',
            '男成人反': 'mcrf.png',
            '男儿童正': 'metz.png',
            '男儿童反': 'metf.png',
            '女成人正': 'fcrz.png',
            '女成人反': 'fcrf.png',
            '女儿童正': 'fetz.png',
            '女儿童反': 'fetf.png',
        };
        //跳转至部位对应症状页面
        $scope.gobuwei = function (buwei) {
            //if(sessionStorage.getItem("dingwei") == "true") {
            $state.go("buweizz", { xingbie: $scope.data.xingbie, renqun: $scope.data.renqun, buwei: buwei });
            //} else {
            //	Popup.alert('请先选择城市！');
            //}
        };
        $scope.goyypm = function () {
            //if(sessionStorage.getItem("dingwei") == "true") {
            $state.go("yypm");
            //} else {
            //	Popup.alert('请先选择城市！');
            //}
        };
        //跳转至选部位或是选疾病系统页面 leibie 'buwei'或'xitong'或'症状'
        $scope.goLieBiao = function (leibie) {
            if (leibie == 'buwei') {
                $ionicViewSwitcher.nextDirection('forward');
                $state.go("buweiliebiao", { leibie: leibie, xingbie: $scope.data.xingbie, renqun: $scope.data.renqun });
            }
            if (leibie == 'xitong') {
                $ionicViewSwitcher.nextDirection('forward');
                $state.go("changjianjb", { xingbie: $scope.data.xingbie, renqun: $scope.data.renqun });
            }
            if (leibie == 'zhengzhuang') {
                //$ionicViewSwitcher.nextDirection('forward');
                //$state.go("changjianzz", {xingbie: $scope.data.xingbie, renqun: $scope.data.renqun});
                // $state.go('yuyinjiaohuclick',{ gn: 'WZZ', zhuci: '' });
                //               $state.go('yuyinjiaohuclickZndz',{ gn: 'WZZ', zhuci: '',history:'zndz' });
                //        		$state.go('tjkswzxy',{ gn: 'XZWY', zhuci: '',history:'zndz' });
                $state.transitionTo('yuyinjiaohuclick', { gn: "WZZ", zhuci: '', history: 'zndz' }, { reload: true, notify: true });

            }
        };
        $scope.goyuyin = function () {
            Popup.alert("正在开发中,敬请期待！");
            //$state.go("yuyinsr", { mc: "yuyinwenda", yuyintishi: "您通过语音可以描述身体不适的症状，我们将为您分析挂号的候选科室，希望有所帮助。" });
        };
        //手动翻转人体图片
        $scope.turn = function () {
            var eles = $window.document.querySelector(".center-parent.transform-parent.center-container").children;
            var deg = eles && eles[0].style.transform.match(/rotateY\(\s*?(\d+)\s*deg\)/);
            eles[0].style.transform = 'translate(-50%,-50%) rotateY(' + (Number(deg ? deg[1] : 0) + 180) + 'deg)';
            eles[1].style.transform = 'translate(-50%,-50%) rotateY(' + (Number(deg ? deg[1] : 0) + 360) + 'deg)';
        };
        $scope.touchImg = function () {
            $scope.data.zhengmian = $scope.data.zhengmian === '正' ? '反' : '正';
            $scope.$digest();
        };


        /*//城市相关
        $scope.city = {mc: '定位中...'};
        $scope.title = '选择城市';
        $scope.showcity = function () {
            $scope.data.choosing =  !$scope.data.choosing;
        };
        //在选城市时修改返回图标作用
        $scope.back =function () {
            if($scope.data.choosing){
                $scope.data.choosing = !$scope.data.choosing;
            }else{
                $window.history.back();
            }
        }
        //选择城市
        $scope.choose = function (city) {
            $scope.city = city;
            $scope.data.choosing = false;
            sessionStorage.setItem("diqubm",city.csdm);
            sessionStorage.setItem("dingwei",true);
            $rootScope.$broadcast('userCityUpdate',city);
           // $window.history.back();
        };
        *//**
         * 获取并设置城市
         *//*
geoLocation.getCity().then(
  function (city) {
      locHistory.setHistory(city);
      sessionStorage.setItem("diqubm",city.csdm);
      sessionStorage.setItem("dingwei",true);
      $scope.choose(city);
  },
  function (reason) {
      $scope.city = {mc: '请选择'};
      return $q.reject(reason);
  }).catch(check);

function check() {
  if (!$scope.city.csdm) {
      Popup.alert('请选择城市！');
  }
  return !!$scope.city.csdm;
};
 
$scope.close = function() {
  $scope.data.choosing = false;
}*/


    }])
    //疾病列表页面Controller
    .controller('changjianjbC', function ($ionicViewSwitcher, $window, $scope, $state, $stateParams, XywyService, Popup, $ionicScrollDelegate, $timeout) {

        $scope.back = function () {
            var openid = sessionStorage.getItem("openId");
            $ionicViewSwitcher.nextDirection('back');
            var token = sessionStorage.getItem("token");
            $state.go("shouye", { openid: openid, token: token });
        }

        //IOS隐藏最上方标题栏
        $scope.startone = "首页";
        $scope.isIos = false;
        $scope.inputFocus = false;
        //初始化
        $scope.pageNum = 1;
        $scope.changjian = false;
        $scope.zimu = "";
        $scope.currentPx = 2;
        $scope.isShowPx = false;

        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            $scope.localyyzt = "打开";
        }
        //IOS隐藏最上方标题栏 结束

        $scope.data = { searchSuc: false, keyword: '', xitong: '疾病列表', morenxiaoxi: '请输入关键字搜索疾病' };
        function jibinglist() {
            $stateParams.pageNum = $scope.pageNum;
            $stateParams.zimu = $scope.zimu,
                $stateParams.changjian = $scope.changjian,
                $stateParams.input = $scope.data.keyword;
            var config = {
                cache: true,
                params: $stateParams
            };
            XywyService.query("/getChangJianJb", config).then(
                function (response) {
                    if (!response.data || !response.data.list.length) {
                        //Popup.alert("暂无数据！");
                        $scope.task_hasMoreItem = false;
                        $scope.reusltNullTip = "暂无相关搜索结果！";
                    } else {
                        $scope.zzlist = response.data.list;
                        $scope.pageCount = response.data.count;
                        $scope.task_hasMoreItem = false;
                    }
                },
                Popup.alert
            );

        }
        //最开始的查询
        jibinglist();



        //选择疾病后先弹出推荐常规科室
        $scope.chooseZz2 = function (zz) {
            var keshi = {};
            Object.keys(zz).forEach(function (key) {
                //BM开头的字符都会认为是科室
                if (/^BM/.test(key) && this[key]) {

                    //keshi[zz[key]] = { score: 0 };
                    keshi[zz[key]] = null;
                }
            }, zz);
            /*var uuid = guid();*/
            var para = {
                ksmc: Object.keys(keshi)
            };
            XywyService.query('/getzjksyyjblb', { params: para }).then(function (response) {
                //                if (!response.data || !response.data.length) {
                //                    keshi[para.ksmc] = null;
                //                } else {
                //                    keshi[para.ksmc] = response.data;
                //                }

                for (var i = 0; i < para.ksmc.length; i++) {
                    for (var n = 0; n < response.data.length; n++) {
                        if (response.data[n] && para.ksmc[i] == response.data[n].KSMC) {
                            keshi[para.ksmc[i]] = response.data[n];
                        }
                    }

                }

                sessionStorage.setItem('tuijiankeshi', JSON.stringify(keshi));
                /*event.preventDefault();*/
                $ionicViewSwitcher.nextDirection('forward');
                $state.go("cgkeshi", { recordId: '疾病', showjb: zz.ISZSK, jbmc: zz.MC });
            });
        };

        //查询
        $scope.searchJibing = function () {
            //        	清除字母
            $scope.zimu = "";
            cleanZimuColor();
            $scope.pageNum = 1;
            //        	查询疾病list
            jibinglist();
        }

        //切换查询方式

        $scope.paixu = ["常用排序", "字母排序"];
        $scope.selectedShunxu = $scope.paixu[0];
        $scope.changeSearch = function (item) {
        	/*if($scope.changjian === true) {
        		$scope.changjian = false;
        	} else {
        		$scope.changjian = true;
        	}*/
            if (item == 1) {
                $scope.changjian = true;
                $scope.currentPx = 1;
            }
            if (item == 2) {
                $scope.changjian = false;
                $scope.currentPx = 2;
            }
            if (item == 3) {
                $scope.back();
            }
            $scope.isShowPx = false;
            $scope.pageNum = 1;
            $scope.zimu = "";
            $scope.zzlist = null;
            jibinglist();
        }

        $scope.changeButton = function () {
            if ($scope.isShowPx == true) {
                $scope.isShowPx = false;
            } else {
                $scope.isShowPx = true;
            }
        }

        //清除按钮
        $scope.clean = function () {
            $scope.reusltNullTip = "已加载全部！";
            $scope.data.keyword = "";
            $scope.zimu = "";
            $scope.data.searchSuc = false;
            $scope.zzlist = null;
            $scope.pageNum = 1;
            cleanZimuColor();
            jibinglist();
        };

        $scope.displaySelect = function () {
            $scope.isShowPx = false;
        }

        //上拉加载更多数据
        $scope.loadMicMore = function () {
            $scope.isShowPx = false;
            $scope.pageNum += 1;
            if ($scope.pageNum <= $scope.pageCount || $scope.changjian === true) {
                //隐藏无数据提示
                $scope.task_hasMoreItem = true;
                $stateParams.pageNum = $scope.pageNum;
                $stateParams.zimu = $scope.zimu,
                    $stateParams.changjian = $scope.changjian,
                    $stateParams.input = $scope.data.keyword;
                var postParams = {
                    params: $stateParams
                };
                XywyService.query("/getChangJianJb", postParams)
                    .then(function (response) {
                        $scope.pageCount = response.data.count;
                        angular.forEach(response.data.list, function (child) {
                            $scope.zzlist.push(child);
                        });
                        //禁止上拉滑动
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });
            } else {
                //显现提示
                $scope.task_hasMoreItem = false;
                if ($scope.zzlist.length == 0) {
                    $scope.reusltNullTip = "暂无相关搜索结果！";
                } else {
                    $scope.reusltNullTip = "已加载全部！";
                }

                //隐藏上拉加载
                $scope.isShow = true;
                //禁止上拉滑动
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        };

        //反馈功能
        $scope.fankui = function () {
            if ($scope.notfound) {
                delete $stateParams.keyword;
                $stateParams.notfound = $scope.notfound;
                XywyService.save('/saveFanKui', $stateParams).then(Popup.alert.bind(null, '反馈成功！'), Popup.alert);
            } else {
                Popup.alert('请先尝试搜索！');
            }
        };

        //接收广播
        $scope.$on('zimu', function (event, zimu) {
            $scope.zimu = zimu.zimu;
            $scope.zimuheight = zimu.zimuheight;
            //        	清除输入框内容
            $scope.data.keyword = "";
            //        	设置浮动框的位置
            //        	var zimudiv=document.getElementById("dazimudiv");
            //        	zimudiv.style.marginTop=zimu.zimuheight+"px";
            //        	页数置为1
            $scope.pageNum = 1;
            //        	执行字母查询
            jibinglist();
            //        	2s后隐藏字母
            $scope.ishsowzimu = true;
            $timeout(function () {
                $scope.ishsowzimu = false;
            }, 2000);
        });

        //下拉刷新
        $scope.micRefresh = function () {
            //隐藏无数据提示
            $scope.task_hasMoreItem = true;
            jibinglist();
            $scope.$broadcast('scroll.refreshComplete');
        }
        function cleanZimuColor() {
            if ($(".city_anchor").children(".target").length > 0) {
                $(".city_anchor").children(".target").each(function () { $(this).removeClass("target") });
            }
        }
    })

    //系统疾病页面Controller
    .controller('xitongjbC', function ($ionicViewSwitcher, $window, $scope, $state, $stateParams, XywyService, Popup) {

        $scope.back = function () {
            var openid = sessionStorage.getItem("openId");
            $ionicViewSwitcher.nextDirection('back');
            var token = sessionStorage.getItem("token");
            $state.go("shouye", { openid: openid, token: token });
        }
        //IOS隐藏最上方标题栏
        $scope.isIos = false;
        $scope.inputFocus = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            $scope.localyyzt = "打开";
        }
        //IOS隐藏最上方标题栏 结束

        $scope.data = { searchSuc: false, keyword: '', xitong: $stateParams.xitong, morenxiaoxi: '请输入关键字搜索疾病' };
        var config = {
            cache: true,
            params: $stateParams
        };
        XywyService.query("/getXiTongJb", config).then(
            function (response) {
                if (!response.data || !response.data.length) {
                    Popup.alert("暂无数据！");
                } else {
                    $scope.zzlist = response.data;
                }
            },
            Popup.alert
        );
        $scope.clean = function () {
            $scope.data.keyword = "";
            $scope.data.searchSuc = false;
        };

        //选择疾病后前往推荐科室页面
        $scope.chooseZz = function (zz) {
            var keshi = {};
            Object.keys(zz).forEach(function (key) {
                //BM开头的字符都会认为是科室
                if (/^BM/.test(key) && this[key]) {
                    keshi[zz[key]] = { score: 0 };
                }
            }, zz);
            sessionStorage.setItem('tuijiankeshi', JSON.stringify(keshi));
            //有选地区功能时的方法----目前已取消
            //if(sessionStorage.getItem("diqubm") && sessionStorage.getItem("diqubm") != "null") {
            //if(sessionStorage.getItem("dingwei")=="true") {
            //如果已经选择了城市和医院，就从session中获取城市和医院，并直接进入推荐医院进行挂号
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('tuijianyyks2', { recordId: '疾病' });
            //} else if(sessionStorage.getItem("dingwei")=="false"){
            //	Popup.alert('定位失败，请先选择城市！');
            //}
            //} else {
            //	Popup.alert('定位失败，请先选择城市！');
            //}
        };

        //选择疾病后先弹出推荐常规科室
        $scope.chooseZz2 = function (zz) {
            var keshi = {};
            Object.keys(zz).forEach(function (key) {
                //BM开头的字符都会认为是科室
                if (/^BM/.test(key) && this[key]) {
                    keshi[zz[key]] = { score: 0 };
                }
            }, zz);
            sessionStorage.setItem('tuijiankeshi', JSON.stringify(keshi));
            $ionicViewSwitcher.nextDirection('forward');
            $state.go("cgkeshi", { recordId: '疾病' });
        };

        //搜索疾病
        $scope.search = function () {
            $stateParams.keyword = $scope.data.keyword;
            if ($scope.data.keyword === "") {
                return Popup.alert('请输入关键字！');
            }
            var para = {
                cache: true,
                params: $stateParams
            };
            XywyService.query("/getSearchJb", para).then(
                function (response) {
                    if (!response.data || response.data.length === 0) {
                        Popup.alert('未能匹配到相关疾病，请尝试其它关键字。');
                        $scope.notfound = $scope.data.keyword;
                    } else {
                        $scope.data.searchSuc = true;
                        $scope.searchzz = response.data;
                    }
                },
                Popup.alert("暂无数据！")
            );
        };
        //反馈功能
        $scope.fankui = function () {
            if ($scope.notfound) {
                delete $stateParams.keyword;
                $stateParams.notfound = $scope.notfound;
                XywyService.save('/saveFanKui', $stateParams).then(Popup.alert.bind(null, '反馈成功！'), Popup.alert);
            } else {
                Popup.alert('请先尝试搜索！');
            }
        };
    })

    //推荐常规科室
    //.controller('CGkeshiC', function($scope, $state, $stateParams, XywyService, Popup) {
    .controller('CGkeshiC', ['$ionicViewSwitcher', '$scope', '$rootScope', '$stateParams', '$state', 'CitiesAndLevel', '$log', 'geoLocation', 'locHistory', 'Popup', '$http', '$window', 'wxApi', '$q', 'XywyService', function ($ionicViewSwitcher, $scope, $rootScope, $stateParams, $state, CitiesAndLevel, $log, geoLocation, locHistory, Popup, $http, $window, wxApi, $q, XywyService) {
        'use strict';

        $scope.back = function () {
            var openid = sessionStorage.getItem("openId");
            $ionicViewSwitcher.nextDirection('back');
            var token = sessionStorage.getItem("token");
            $state.go("shouye", { openid: openid, token: token });
        }

        //IOS隐藏最上方标题栏
        $scope.isIos = false;
        $scope.inputFocus = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            $scope.localyyzt = "打开";
        }
        //IOS隐藏最上方标题栏 结束
        var keshi = {};
        //是否显示疾病列表跳转到科室推荐页面后，是否显示疾病知识以及标题头
        $scope.showjbzs = $stateParams.showjb;
        $scope.jbtks_showks = true;
        $scope.changeKsShow = function (ctype) {
            if (ctype == 'ks') {
                $scope.jbtks_showks = true;
            }
            if (ctype == 'jb') {
                $scope.jbtks_showks = false;
            }
        }

        //疾病知识库存在，用疾病名称去查询
        if ($scope.showjbzs == 1) {
            //得到疾病名称
            var jbmc = $stateParams.jbmc;

            if (jbmc != null) {
                XywyService.query('/android/getJbzs', {
                    params: {
                        jbmc: jbmc
                    }
                }).then(function (response) {//response
                    $scope.jbDes = response.data.DATA;
                }, Popup.alert);
            }
        }

        $scope.showjbms = true;
        $scope.showlcbx = true;
        $scope.showjyzs = true;
        $scope.showzlyz = true;
        $scope.showjkzd = true;

        $scope.changeWD = function (type) {
            if (type == 'jbms') {
                $scope.showjbms = !$scope.showjbms;
            }
            if (type == 'lcbx') {
                $scope.showlcbx = !$scope.showlcbx;
            }
            if (type == 'jyzs') {
                $scope.showjyzs = !$scope.showjyzs;
            }
            if (type == 'zlyz') {
                $scope.showzlyz = !$scope.showzlyz;
            }
            if (type == 'jkzd') {
                $scope.showjkzd = !$scope.showjkzd;
            }
        }


        $scope.navButton = true;
        $scope.data = {
            choosing: false
        }
        $scope.show = true;
        if (sessionStorage.getItem('tuijiankeshi')) {
            $scope.cgkeshi = angular.fromJson(sessionStorage.getItem('tuijiankeshi'));
        } else {
            $scope.show = false;
        }
        //    	 $scope.cgkeshi =  angular.fromJson(sessionStorage.getItem('tuijiankeshi'));

        /*$scope.choosekeshi = function (key) {
            if(sessionStorage.getItem("diqubm") && sessionStorage.getItem("diqubm") != "null") {
                if(sessionStorage.getItem("dingwei")=="true") {
                    //如果已经选择了城市和医院，就从session中获取城市和医院，并直接进入推荐医院进行挂号
                    $state.go('tuijianyyks4', {recordId: $stateParams.recordId,cgks:key});
                } else if(sessionStorage.getItem("dingwei")=="false"){
                    Popup.alert('定位失败，请先选择城市！');
                }
            } else {
                Popup.alert('定位失败，请先选择城市！');
            }
        }*/

        $scope.choosekeshi = function (key) {
            $ionicViewSwitcher.nextDirection('forward');
            if ($scope.cgkeshi[key]) {
                $state.go('guahao', { recordId: $stateParams.recordId, cgks: key });
            }

        }


        //城市相关
        /*$scope.city = {mc: '定位中...'};
        $scope.title = '选择城市';
        $scope.showcity = function () {
            $scope.data.choosing =  !$scope.data.choosing;
        };
        //在选城市时修改返回图标作用
        $scope.back =function () {
            if($scope.data.choosing){
                $scope.data.choosing = !$scope.data.choosing;
            }else{
                $window.history.back();
            }
        }
        //选择城市
        $scope.choose = function (city) {
            $scope.city = city;
            $scope.data.choosing = false;
            sessionStorage.setItem("diqubm",city.csdm);
            sessionStorage.setItem("dingwei",true);
            $rootScope.$broadcast('userCityUpdate',city);
           // $window.history.back();
        };
        *//**
         * 获取并设置城市
         *//*
 geoLocation.getCity().then(
     function (city) {
         locHistory.setHistory(city);
         sessionStorage.setItem("diqubm",city.csdm);
         sessionStorage.setItem("dingwei",true);
         $scope.choose(city);
     },
     function (reason) {
         $scope.city = {mc: '请选择'};
         return $q.reject(reason);
     }).catch(check);

function check() {
  if (!$scope.city.csdm) {
      Popup.alert('请选择城市！');
  }
  return !!$scope.city.csdm;
};
 
$scope.close = function() {
   $scope.data.choosing = false;
}*/


    }])

    //部位症状页面Controller
    .controller('buweizzC', function ($ionicViewSwitcher, $window, $scope, $state, $stateParams, XywyService, Popup, buweiData, testHref) {
        $scope.data = { searchSuc: false, keyword: '', buwei: $stateParams.buwei };

        $scope.back = function () {
            var openid = sessionStorage.getItem("openId");
            $ionicViewSwitcher.nextDirection('back');
            var token = sessionStorage.getItem("token");
            $state.go("shouye", { openid: openid, token: token });
        }

        //IOS隐藏最上方标题栏
        $scope.isIos = false;
        $scope.inputFocus = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            $scope.localyyzt = "打开";
        }
        //IOS隐藏最上方标题栏 结束
        var config = {
            cache: true,
            params: $stateParams
        };

        if (!buweiData.data || !buweiData.data.length) {
            Popup.alert("暂无数据！");
        } else {
            $scope.zzlist = buweiData.data;
        }

        // 点击页面部位加载症状
        $scope.loadzz = function (buwei, index) {
            $stateParams.buwei = buwei;
            $scope.data.buwei = buwei;
            $scope.buwei[choseIndex].chose = false;
            $scope.buwei[index].chose = true;
            choseIndex = index;
            XywyService.query('/getBuWeiZz', { params: $stateParams }).then(function (response) {
                if (!response.data || !response.data.length) {
                    $scope.zzlist = null;
                } else {
                    $scope.zzlist = response.data;
                }
            });
        };




        $scope.clean = function () {
            $scope.data.keyword = "";
            $scope.data.searchSuc = false;
        };
        //选择症状后前往问答页面
        $scope.chooseZz = function (zz) {
            $stateParams.zhengzhuang = zz.MC || zz;
            if (zz.BW) {
                $stateParams.buwei = zz.BW;
            }
            $state.get('wenda').cache = false;
            $ionicViewSwitcher.nextDirection('forward');
            //            $state.go('wenda', $stateParams, { replace: true, reload: true });
            //如果cache设为true，每次切换城市后，上次选的部位症状不刷新

            //===============从问答页面直接copy过来的开始=============//
            var config = {
                cache: false,
                params: angular.extend($stateParams, {
                    //hosOrgCode: myConfig.hosOrgCode,
                }),
            };
            var getQuestionUrl = "/getQuestion";
            if ($stateParams.miaoshu) {
                getQuestionUrl = "/getmobileyuyin";
            }
            //获取问题
            XywyService.query(getQuestionUrl, config).then(sucFunc, Popup.alert);
        };


        $scope.answeres = {};
        var questionTurn = 0;

        //对问题进行分组，有问题和无问题
        function QuestionFilter(arr) {
            if (angular.isArray(arr)) {
                var noQ = [];
                var haveQ = arr.filter(function (e) {
                    if (!e.WT) {
                        $scope.chose = $scope.chose || [];
                        $scope.chose.push({
                            zskId: e.ID,
                            recordId: $scope.recordId,
                            choose: '',
                            userid: sessionStorage.getItem('openId') || "",
                        })
                        addKSBM(noQ, e);
                    }
                    return !!e.WT;
                });
                return { noQ: noQ, haveQ: haveQ };
            }
        }
        //科室问题处理方法
        function addKSBM(arr, question) {
            Object.keys(question).forEach(function (key) {
                //BM开头的字符都会认为是科室
                if (/^BM/.test(key) && this[key]) {
                    arr.push({ bm: this[key], score: this.CD });
                }
            }, question);
        }

        //对问题进行预处理，判断是否有问题,无问题则直接推荐科室
        function sucFunc(response) {
            if (!response.data || !angular.isArray(response.data) || !response.data.length) {
                Popup.alert("暂无数据", true);
                //无问题时
            } else {
                $scope.recordId = response.data[0].recordId;
                delete response.data[0].recordId;
                var groupQ = QuestionFilter(response.data);
                $scope.noQ = groupQ.noQ;
                if (groupQ.haveQ.length === 0) {
                    var keshi = groupArr(groupQ.noQ);
                    leave(keshi, false);
                } else {
                    $scope.haveQuestion = true;
                    $scope.allQuestion = groupQ.haveQ;
                    $scope.questiones = $scope.allQuestion.slice(questionTurn, questionTurn += myConfig.QuestionCount);
                }
            }
        }

        $scope.clickable = function () {
            return !($scope.noQ.length || Object.keys($scope.answeres).length);
        };

        //选择答案
        $scope.chooseAnswer = function (question) {
            if (question.choose === undefined) {
                delete $scope.answeres[question.ID];
            } else {
                question.recordId = $scope.recordId;
                $scope.answeres[question.ID] = question;
                if ((Object.keys($scope.answeres).length === $scope.allQuestion.length) && ($scope.allQuestion.length === 1)) {
                    $scope.confirm();
                }
            }
        };
        //重置问题状态
        $scope.reset = function () {
            $scope.answeres = {};
            angular.forEach($scope.questiones, function (question) {
                delete question.choose;
            });
        };
        //确认回答
        $scope.confirm = function () {
            $scope.chose = $scope.chose || [];
            var datjks = [];
            var finalKs = angular.copy($scope.noQ);
            var keys = Object.keys($scope.answeres);
            keys.forEach(function (key) {
                var answer = $scope.answeres[key];
                $scope.chose.push({
                    zskId: answer.ID,
                    recordId: answer.recordId,
                    choose: answer.choose,
                    userid: sessionStorage.getItem('openId') || "",
                });
                if (answer.DA === answer.choose) {
                    addKSBM(datjks, answer);
                }
            });
            var keshi = groupArr(finalKs);
            if (datjks.length) {
                keshi = groupArr(datjks);
            }
            leave(keshi, true);
            postAnswer();
        };

        function leave(keshi, canReturn) {
            //选择疾病后先弹出推荐常规科室
            var para = {
                ksmc: Object.keys(keshi)[0]
            };
            XywyService.query('/getzjksyy', { params: para }).then(function (response) {
                if (!response.data || !response.data.length) {
                    keshi[para.ksmc] = null;
                } else {
                    keshi[para.ksmc] = response.data;
                }
                sessionStorage.setItem('tuijiankeshi', JSON.stringify(keshi));
                /*event.preventDefault();*/
                $ionicViewSwitcher.nextDirection('forward');
                $state.go("cgkeshi", { recordId: $scope.recordId }, { location: canReturn ? true : testHref() || 'replace' });
            });

            //$state.go("cgkeshi");
        }
        //保存用户回答
        function postAnswer() {
            if ($scope.chose.length) {
                //XywyService.save('/saveAnswers', $scope.chose).catch(function (res) {
                //    $log.error("保存选择失败", res);
                //});
            }
        }

        //将最后结果进行处理，计算科室命中次数
        function groupArr(arr) {
            var countMap = {};
            arr.forEach(function (e) {
                countMap[e.bm] = countMap[e.bm] || 0;
                countMap[e.bm] += e.score;
            });
            return countMap;
        }
        //切换问题
        $scope.changeQuestion = function () {
            if (questionTurn >= $scope.allQuestion.length) {
                questionTurn = 0;
                Popup.alert('没有更多问题了！');
            }
            $scope.questiones = $scope.allQuestion.slice(questionTurn, questionTurn += myConfig.QuestionCount);
        };
        //===============从问答页面直接copy过来的结束=============//

        //搜索症状
        $scope.search = function () {
            $stateParams.keyword = $scope.data.keyword;
            if ($scope.data.keyword === "") {
                return Popup.alert('请输入关键字！');
            }
            var para = {
                cache: true,
                params: $stateParams
            };
            XywyService.query("/getSearchZz", para).then(
                function (response) {
                    if (!response.data || response.data.length === 0) {
                        Popup.alert('未能匹配到相关症状，请尝试其它关键字。');
                        $scope.notfound = $scope.data.keyword;
                        // $scope.data.notfound = "在" + $stateParams.xingbie + "、" +
                        //     $stateParams.renqun + "、" +
                        //     $stateParams.buwei + "的条件下未找到%20" +
                        //     $scope.data.keyword + "%20相关症状";
                    } else {
                        $scope.data.searchSuc = true;
                        $scope.searchzz = response.data;
                    }
                },
                Popup.alert
            );
        };
        $scope.fankui = function () {
            if ($scope.notfound) {
                delete $stateParams.keyword;
                $stateParams.notfound = $scope.notfound;
                XywyService.save('/saveFanKui', $stateParams).then(Popup.alert.bind(null, '反馈成功！'), Popup.alert);
            } else {
                Popup.alert('请先尝试搜索！');
            }
        };
        var choseIndex = 0;
        XywyService.query('/getBuWei', config).then(function (response) {
            if (!response.data || !response.data.length) {
                Popup.alert('暂无数据！');
            } else {
                $scope.buwei = response.data;
                for (var i = 0; i < $scope.buwei.length; i++) {
                    if ($scope.buwei[i].mc == $scope.data.buwei) {
                        choseIndex = i;
                        $scope.buwei[i].chose = true;
                    } else {
                        $scope.buwei[i].chose = false;
                    }
                }
            }
        },
            Popup.alert);
        $scope.$on('repeatFinishCallback', function () {
            //下面是在table render完成后执行的js
            if (!$scope.isClickBwList) {
                var curBwPos = choseIndex * 51;//目标部位的座标位置
                var left = $('.left-lb');
                left = left[left.length - 1];
                var maxScroll = left.scrollHeight - left.offsetHeight;//元素内容的总高度减可视高度等于最大可滚动高
                if (curBwPos < maxScroll) {
                    // 元素位置小于可滚动高时直接滚动到元素位置
                    $('.left-lb').scrollTop(curBwPos);
                }
                else {
                    // 元素位置大于可滚动高
                    var more = maxScroll % 51;
                    $('.left-lb').scrollTop(maxScroll - more);
                }

            }
        });
    })
    //医院排名页面Controller
    .controller('yypmC', function ($ionicViewSwitcher, $window, $scope, $state, $stateParams, XywyService, $log, testHref, Popup) {

        $scope.back = function () {
            var openid = sessionStorage.getItem("openId");
            $ionicViewSwitcher.nextDirection('back');
            var token = sessionStorage.getItem("token");
            $state.go("shouye", { openid: openid, token: token });
        }

        $scope.isIos = false;
        $scope.inputFocus = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            $scope.localyyzt = "打开";
        }
        // 点击页面科室加载医院
        $scope.loadyy = function (ksmc) {
            var para = {
                ksmc: ksmc
            };
            $scope.ksmc = ksmc;
            XywyService.query('/getzjksyy', { params: para }).then(function (response) {
                if (!response.data || !response.data.length) {
                    //Popup.alert('暂无数据！');
                    $scope.zzlist = null;
                } else {
                    $scope.yylist = response.data[0].YYMC;
                }
            });
        };

        XywyService.query('/getzjkslist').then(function (response) {
            if (!response.data || !response.data.length) {
                Popup.alert('暂无数据！');
                $scope.kslist = null;
            } else {
                $scope.kslist = response.data;
                $scope.loadyy($scope.kslist[0].xxdxkdis);
            }
        });
    })
    //症状问答页面Controller
    .controller('ZZWenDaC', function ($ionicViewSwitcher, $window, $scope, $state, $stateParams, XywyService, $log, testHref, Popup) {

        $scope.back = function () {
            var openid = sessionStorage.getItem("openId");
            $ionicViewSwitcher.nextDirection('back');
            var token = sessionStorage.getItem("token");
            $state.go("shouye", { openid: openid, token: token });
        }


        //IOS隐藏最上方标题栏
        $scope.isIos = false;
        $scope.inputFocus = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            $scope.localyyzt = "打开";
        }
        //IOS隐藏最上方标题栏 结束
        var getQuestionUrl = "/getQuestion";
        if ($stateParams.miaoshu) {
            getQuestionUrl = "/getmobileyuyin";
        }
        //var answer = {};
        $scope.answeres = {};
        var questionTurn = 0;
        //如果cache设为true，每次切换城市后，上次选的部位症状不刷新
        var config = {
            cache: false,
            params: angular.extend($stateParams, {
                //hosOrgCode: myConfig.hosOrgCode,
            }),
        };
        //获取问题
        XywyService.query(getQuestionUrl, config).then(sucFunc, Popup.alert);

        //对问题进行分组，有问题和无问题
        function QuestionFilter(arr) {
            if (angular.isArray(arr)) {
                var noQ = [];
                var haveQ = arr.filter(function (e) {
                    if (!e.WT) {
                        $scope.chose = $scope.chose || [];
                        $scope.chose.push({
                            zskId: e.ID,
                            recordId: $scope.recordId,
                            choose: '',
                            userid: sessionStorage.getItem('openId') || "",
                        })
                        addKSBM(noQ, e);
                    }
                    return !!e.WT;
                });
                return { noQ: noQ, haveQ: haveQ };
            }
        }
        //科室问题处理方法
        function addKSBM(arr, question) {
            Object.keys(question).forEach(function (key) {
                //BM开头的字符都会认为是科室
                if (/^BM/.test(key) && this[key]) {
                    arr.push({ bm: this[key], score: this.CD });
                }
            }, question);
        }

        //对问题进行预处理，判断是否有问题,无问题则直接推荐科室
        function sucFunc(response) {
            if (!response.data || !angular.isArray(response.data) || !response.data.length) {
                Popup.alert("暂无数据", true);
                //无问题时
            } else {
                $scope.recordId = response.data[0].recordId;
                delete response.data[0].recordId;
                var groupQ = QuestionFilter(response.data);
                $scope.noQ = groupQ.noQ;
                if (groupQ.haveQ.length === 0) {
                    var keshi = groupArr(groupQ.noQ);
                    leave(keshi, false);
                    $state.get('wenda').cache = false;
                } else {
                    $state.get('wenda').cache = true;
                    $scope.haveQuestion = true;
                    $scope.allQuestion = groupQ.haveQ;
                    $scope.questiones = $scope.allQuestion.slice(questionTurn, questionTurn += myConfig.QuestionCount);
                }
            }
        }

        $scope.clickable = function () {
            return !($scope.noQ.length || Object.keys($scope.answeres).length);
        };

        //选择答案
        $scope.chooseAnswer = function (question) {
            if (question.choose === undefined) {
                delete $scope.answeres[question.ID];
            } else {
                question.recordId = $scope.recordId;
                $scope.answeres[question.ID] = question;
                if ((Object.keys($scope.answeres).length === $scope.allQuestion.length) && ($scope.allQuestion.length === 1)) {
                    $scope.confirm();
                }
            }
        };
        //重置问题状态
        $scope.reset = function () {
            $scope.answeres = {};
            angular.forEach($scope.questiones, function (question) {
                delete question.choose;
            });
        };
        //确认回答
        $scope.confirm = function () {
            $scope.chose = $scope.chose || [];
            var datjks = [];
            var finalKs = angular.copy($scope.noQ);
            var keys = Object.keys($scope.answeres);
            keys.forEach(function (key) {
                var answer = $scope.answeres[key];
                $scope.chose.push({
                    zskId: answer.ID,
                    recordId: answer.recordId,
                    choose: answer.choose,
                    userid: sessionStorage.getItem('openId') || "",
                });
                if (answer.DA === answer.choose) {
                    addKSBM(datjks, answer);
                }
            });
            var keshi = groupArr(finalKs);
            if (datjks.length) {
                keshi = groupArr(datjks);
            }
            leave(keshi, true);
            postAnswer();
        };

        //return 是否可返回问答页
        /*function leave(keshi, canReturn) {
            if (!(Object.keys(keshi).length || $scope.chose.length)) {
                return Popup.alert('请选择！');
            }
            sessionStorage.setItem('tuijiankeshi', JSON.stringify(keshi));
            if(sessionStorage.getItem("diqubm") && sessionStorage.getItem("diqubm") != "null") {
        		//如果是从健康五问跳转过来的，先判断有没有选择城市
        		if(sessionStorage.getItem("dingwei") == "true") {
        			//如果已经选择了城市和医院，就从session中获取城市和医院，并直接进入推荐医院进行挂号
        			event.preventDefault();
        			$state.go('tuijianyyks2', {recordId: $scope.recordId}, {location: canReturn ? true : testHref() || 'replace'});
        			//$state.go('tuijianyyks2', {recordId: $scope.recordId});
        		} else if(sessionStorage.getItem("dingwei") == "false"){
        			//如果没有选择城市和医院，就跳转到选城市和医院界面
        			Popup.alert('定位失败，请先选择城市！');
        		}
            } else {
            	Popup.alert('定位失败，请先选择城市！');
            }
        }*/

        function leave(keshi, canReturn) {
            //选择疾病后先弹出推荐常规科室
            var para = {
                ksmc: Object.keys(keshi)[0]
            };
            XywyService.query('/getzjksyy', { params: para }).then(function (response) {
                if (!response.data || !response.data.length) {
                    keshi[para.ksmc] = null;
                } else {
                    keshi[para.ksmc] = response.data;
                }
                sessionStorage.setItem('tuijiankeshi', JSON.stringify(keshi));
                /*event.preventDefault();*/
                $ionicViewSwitcher.nextDirection('forward');
                $state.go("cgkeshi", { recordId: $scope.recordId }, { location: canReturn ? true : testHref() || 'replace' });
            });

            //$state.go("cgkeshi");
        }
        //保存用户回答
        function postAnswer() {
            if ($scope.chose.length) {
                //XywyService.save('/saveAnswers', $scope.chose).catch(function (res) {
                //    $log.error("保存选择失败", res);
                //});
            }
        }

        //将最后结果进行处理，计算科室命中次数
        function groupArr(arr) {
            var countObj = {};
            var countMap = {};
            arr.forEach(function (e) {
                countMap[e.bm] = countMap[e.bm] || 0;
                countMap[e.bm] += e.score;
            });
            return countMap;
        }
        //切换问题
        $scope.changeQuestion = function () {
            if (questionTurn >= $scope.allQuestion.length) {
                questionTurn = 0;
                Popup.alert('没有更多问题了！');
            }
            $scope.questiones = $scope.allQuestion.slice(questionTurn, questionTurn += myConfig.QuestionCount);
        };
    })
    .controller('GuahaoC', ['$ionicViewSwitcher', '$window', '$scope', '$state', '$stateParams', 'XywyService', '$log', 'Outlet', 'Popup', 'hosFilterFilter', 'geoLocation',
        function ($ionicViewSwitcher, $window, $scope, $state, $stateParams, XywyService, $log, Outlet, Popup, hosFilterFilter, geoLocation) {

            $scope.back = function () {
                var openid = sessionStorage.getItem("openId");
                $ionicViewSwitcher.nextDirection('back');
                var token = sessionStorage.getItem("token");
                $state.go("shouye", { openid: openid, token: token });
            }


            //IOS隐藏最上方标题栏
            $scope.isIos = false;
            $scope.inputFocus = false;
            if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                $scope.isIos = true;
                $scope.localyyzt = "打开";
            }
            //IOS隐藏最上方标题栏 结束
            $scope.data = { keshiShow: [] };
            $scope.data.keshiLimit = myConfig.keshiLimit;
            var para = {
                ksmc: $stateParams.cgks
            };
            XywyService.query('/getzjksyy', { params: para }).then(function (response) {
                if (!response.data || !response.data.length) {
                    //Popup.alert('暂无数据！');
                    $scope.ksList = null;
                } else {
                    $scope.ksList = response.data;
                }
            });
        }
    ])
    ;