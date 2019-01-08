angular.module('starter.zhenLiaoJLControllers', ['ionic'])

/* 诊疗记录查询 */
.controller('zlJiLuListC', function ($scope, $state, $stateParams, XywyService, Popup, $window, $ionicLoading, JsUtil, $timeout, UserInfoService, GoZzJbYp) {
    $scope.isIos = false;
    if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        $scope.isIos = true;
        sessionStorage.setItem('isIos', $scope.isIos);
    }
    //返回上一页
    $scope.goBack = function () {
        $window.history.back();
    };
    
    $scope.yaopinlist = function(name, leixing) {
        GoZzJbYp.yaopinlist(name, leixing);
    };
    /**
     * 疑似疾病中疾病详情查询（单条数据直接跳转详情，多条数据展示疾病列表）
     */
    $scope.ysjbxq = function (jbmc) {
        //阻止冒泡事件
        event.stopPropagation();
        var param = {
            jbmc: jbmc
        };
        var config = {
            params: param,
            cache: false
        }
        XywyService.query("/getysjbxqlist", config).then(function (response) {
            if (response.data.length == 0) {

            } else if (response.data.length == 1) {
                $state.go('wenjibingdetail', {
                    id: response.data[0].id,
                    estype: "jb"
                });
            } else {
                //跳转到疾病列表页面
                sessionStorage.setItem("yaopinlist", angular.toJson(response.data));
                $state.go('yaopinlist');
            }
        });
    }
    var param = {};
    var num;
    var now = new Date();
    var preMonth = new Date(now);
    preMonth.setDate(now.getDate() - 30);
    var years = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var pYears = preMonth.getFullYear();
    var pMonth = preMonth.getMonth() + 1;
    var pDay = preMonth.getDate();
    // 设置默认日期
    document.getElementById('endDate').value = years + "/" + month + "/" + day;
    document.getElementById('startDate').value = pYears + "/" + pMonth + "/" + pDay;
    
    param.endTime = document.getElementById('endDate').value;
    param.startTime = document.getElementById('startDate').value;
    //用户微信头像
    var txNc = UserInfoService.getTxNc();
    $scope.weiXinTX = txNc.tx; 
    
    //按时间查询
    $scope.doSearch = function () {
        var starttime = document.getElementById('startDate').value;
        var endtime = document.getElementById('endDate').value;
        if (!starttime && !endtime) {
            return;
        }
        if(starttime && endtime){//起始时间大于结束时间
        	if(starttime > endtime){
        		$ionicLoading.hide();
                Popup.alert('开始日期大于结束日期！');
        		return;
        	}
        }
        param.startTime = starttime;
        param.endTime = endtime;      
        param.num = 0;
        isloadMore = false;
        queryZhenLiaoJiLu('more');
    };
    
    //下拉刷新数据
	$scope.micRefresh = function() {
	    //隐藏无数据提示
		var starttime = document.getElementById('startDate').value;
        var endtime = document.getElementById('endDate').value;
        if (!starttime && !endtime) {
            return;
        }
        if(starttime && endtime){//起始时间大于结束时间
        	if(starttime > endtime){
        		$ionicLoading.hide();
                Popup.alert('开始日期大于结束日期！');
        		return;
        	}
        }
		param.startTime = starttime;
	    param.endTime = endtime;
	    param.num = 0;
	    isloadMore = false;
	   
		queryZhenLiaoJiLu('refresh');
		$scope.$broadcast('scroll.refreshComplete');
	 };
    
    var isloadMore = false;
    //上拉加载更多
    $scope.loadMicMore = function () {
        if ($scope.ishowall) {
            $scope.reusltNullTip = "已加载全部！";
            $scope.$broadcast('scroll.infiniteScrollComplete');
        } else {
            isloadMore = true;
            param.num = num;
            queryZhenLiaoJiLu('more');
        }
    };
    
	//设置初始伸缩标志位
    $scope.ssflag = [];
    param.num = 0;
    function queryZhenLiaoJiLu(actionflag){
    	// 查询诊疗记录列表  	
        param.yhid = $stateParams.id;
        //console.log(param.endTime);
        XywyService.query('/queryZljl', {
                params: param
            })
            .then(function (res) {
            	if(res){
            		if (isloadMore) {
                        $scope.memberMsg = $scope.memberMsg.concat(res.data.list);
                        
                    } else {
                    	 $scope.memberMsg = res.data.list;
                    }

                    var cyid = localStorage.getItem('cyid'); //家庭成员id
                    var i=$scope.memberMsg.length-res.data.list.length;
                    for (var j = i; j < $scope.memberMsg.length; j++) {
                        //  有已经点击的成员，设置为展开，没有已经点击的成员，第一个设置为展开
                        if (j == 0) {
                            $scope.ssflag[j] = "show";                    
                          
                        } else {
                            $scope.ssflag[j] = "hide";
                        }
                        if (JsUtil.isEmpty($scope.memberMsg[j].imgUrl)) {
                            $scope.memberMsg[j].imgUrl = null;
                        }
                       
                    }
                    num = res.data.num;
                    $scope.ishowall = res.data.isshowall;
            	}
                //console.log($scope.ssflag);
            	//禁止上拉滑动（加载更多防止多次加载）因为异步加载你数据还没有请求完成 就执行$scope.$broadcast('scroll.infiniteScrollComplete')，这样的话他会又触发请求
                if(actionflag == 'more'){
                	$scope.$broadcast('scroll.infiniteScrollComplete');
                }
                

            }, Popup.alert);
    }
    
    
    
    
    
    //点击按钮的伸缩事件
    $scope.changeShowState = function(index){
    	if ($scope.ssflag[index] == "show") {
            $scope.ssflag[index] = "hide";
        } else {
            //置所有伸缩位hide
            for (var i = 0; i < $scope.ssflag.length; i++) {
                $scope.ssflag[i] = "hide";
            }
            //改变点击索引所具有的标志位
            $scope.ssflag[index] = "show";
        }
    }
    
    //时间插件onchange事件
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDate = now.getDate();


    // 数据初始化
    function formatYear(nowYear) {
        var arr = [];
        for (var i = nowYear - 120; i <= nowYear; i++) {
            arr.push({
                id: i + '',
                value: i
            });
        }
        return arr;
    }

    function formatMonth() {
        var arr = [];
        for (var i = 1; i <= 12; i++) {
            arr.push({
                id: i + '',
                value: i
            });
        }
        return arr;
    }

    function formatDate(count) {
        var arr = [];
        for (var i = 1; i <= count; i++) {
            arr.push({
                id: i + '',
                value: i
            });
        }
        return arr;
    }
    // 年数据
    var yearData = function (callback) {
        callback(formatYear(nowYear))
    }
    // 月数据
    var monthData = function (year, callback) {
        callback(formatMonth());
    };
    // 日期数据
    var dateData = function (year, month, callback) {
        if (/^(1|3|5|7|8|10|12)$/.test(month)) {
            callback(formatDate(31));
        } else if (/^(4|6|9|11)$/.test(month)) {
            callback(formatDate(30));
        } else if (/^2$/.test(month)) {
            if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                callback(formatDate(29));
            } else {
                callback(formatDate(28));
            }
        } else {
            throw new Error('month is illegal');
        }
    };

    $scope.datePiker = function (id) {
        var date;
        var selectDateDom = $("#" + id);
        var showDateDom = selectDateDom;
        if (showDateDom.attr('data-year')) {

        } else {
            showDateDom.attr('data-year', nowYear);
        }
        if (showDateDom.attr('data-month')) {

        } else {
            showDateDom.attr('data-month', nowMonth);
        }
        if (showDateDom.attr('data-date')) {

        } else {
            showDateDom.attr('data-date', nowDate);
        }

        var oneLevelId = showDateDom.attr('data-year');
        var twoLevelId = showDateDom.attr('data-month');
        var threeLevelId = showDateDom.attr('data-date');
        var iosSelect = new IosSelect(3, [yearData, monthData, dateData], {
            title: '日期选择',
            itemHeight: 35,
            oneLevelId: oneLevelId,
            twoLevelId: twoLevelId,
            threeLevelId: threeLevelId,
            showLoading: true,
            callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                showDateDom.attr('data-year', selectOneObj.id);
                showDateDom.attr('data-month', selectTwoObj.id);
                showDateDom.attr('data-date', selectThreeObj.id);
                //向dom元素中添加值
                

                selectDateDom.val(selectOneObj.value + '/' + selectTwoObj.value + '/' + selectThreeObj.value);
                $scope.doSearch();
                //返回值
            }
        });

    };
    
    
    
    queryZhenLiaoJiLu('more');//诊疗记录列表查询

    // 循环完毕页面定位(滚动)到展开项
    /*$scope.$on('repeatFinishCallback', function () {
        if (showIndex > 3) {
            var id = "cy" + showIndex;
            var dom = document.getElementById(id);
            var top = dom.offsetTop;
            $('#dalist').animate({
                scrollTop: top - 50
            });
        }
    });*/
   
})
