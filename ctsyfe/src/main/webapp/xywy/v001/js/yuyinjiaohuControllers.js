angular.module('starter')
    //语音交互
    .controller('yuyinjiaohu', function (wxApi, $scope, $state, $stateParams, $interval, $timeout, XywyService, Popup, Outlet, Message, $ionicScrollDelegate, audioControl, Yuyin, $window, $rootScope, geoLocation, $http) {
        if ($stateParams.openid) {
            sessionStorage.setItem('openId', $stateParams.openid);
        }
        if ($stateParams.token) {
            sessionStorage.setItem('token', $stateParams.token);
        }
        if ($stateParams.hosorgCode) {
            sessionStorage.setItem('hosorgCode', $stateParams.hosorgCode);
        }
        if ($stateParams.yxzsurl) {
            sessionStorage.setItem('yxzsurl', $stateParams.yxzsurl);
        }
        if ($stateParams.orgid) {
            sessionStorage.setItem('orgid', $stateParams.orgid);
        }


        $scope.isIos = false;
        $scope.inputFocus = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            sessionStorage.setItem('isIos', $scope.isIos);
        }
        //默认打开语音播放
        //    	$scope.localyyzt = "打开";
        //    	localStorage.setItem("yyzhuangtai", "打开");

        $scope.labelpadding = function (curgn) {
            if (curgn == "WZZ") {
                return;
            } else {
                return { "padding-left": "40px" };
            }
        }
        //    	用户输入信息记录
        $scope.yonghuinput = "";
        //       根据功能判断年龄性别是否显示的显示
        $scope.showagesex = function (gn) {
            var p = "";
            if (gn == "WZZ" || gn == "ZNDZ") {

            } else {
                p = "hidden";
            }
            return { "visibility": p };
        }
        /**
         *当交互页面打开时调用，判断容器的大小是否需要改变
         *如：不需要语音部分时的容器调整
         */
        $scope.ionscrollngstyle = function (hideVoice, inputMethod) {
            if ($stateParams.gn == "WSS" || $stateParams.gn == "WYP" || $stateParams.gn == "WJB" || $stateParams.gn == "ZWPG" || $stateParams.gn == "CJZZ") {
                $scope.resize();
                return;
            }
            var bottom = "";
            if (!hideVoice && inputMethod === "voice") {
                bottom = "205px";
            } else {
                bottom = "49px";
            }
            return { "bottom": bottom }
        }
        //  语音状态（用于判断页面显示图标）
        $scope.localyyzt = localStorage.getItem("yyzhuangtai");
        if (localStorage.getItem("yyzhuangtai") === "禁止") { //禁止语音播放
            $scope.yuyinopen = "打开语音";
        } else { //允许语音播放
            $scope.yuyinopen = "关闭语音";
        }

        //隐藏年龄列表
        $scope.isHidePopup = function () {
            $scope.isShow_jj_yp_list = false;
            $scope.isShow_bl_yp_list = false;
            $scope.isShow_bl_yp_btn = true;
        };

        //  判断语音播放状态（语音播放按钮点击事件）
        $scope.yuyinzt = function () {
            //      当前状态是禁止播放
            if (localStorage.getItem("yyzhuangtai") === "禁止") {
                //          改变当前状态
                localStorage.setItem("yyzhuangtai", "打开");
                $scope.yuyinopen = "关闭语音";
            } else {
                localStorage.setItem("yyzhuangtai", "禁止");
                $scope.yuyinopen = "打开语音";
                audioControl.pause();
            }
            $scope.localyyzt = localStorage.getItem("yyzhuangtai");
        };

        //  标题
        $scope.curgn = $stateParams.gn;
        $scope.data = { textValue: "", voiceTip: "按住说话" };
        if ($stateParams.gn == "ZNDZ") {
            $scope.title = "挂号";
            $scope.inputMethod = 'keyboard';
            $scope.data.hideVoice = true;
            $scope.inputFocus = true;
        } else if ($stateParams.gn == "WZZ") {
            $scope.title = "智能导诊";
            if ($scope.isIos) {
                $scope.inputMethod = 'voice';
                $scope.data.hideVoice = false;
            } else {
                $scope.inputMethod = 'voice';
                $scope.data.hideVoice = false;
            }
            $scope.inputFocus = false;
            //$scope.inputtishi = "请输入症状、年龄、性别等";
        } else if ($stateParams.gn == "WSS") {
            $scope.title = "问手术";
            $scope.inputMethod = 'keyboard';
            $scope.data.hideVoice = true;
            $scope.inputFocus = false;
            //$scope.inputtishi = "请输入手术名称、手术方式";
        } else if ($stateParams.gn == "WYP") {
            $scope.title = "安全用药";
            $scope.inputMethod = 'voice';
            $scope.data.hideVoice = true;
            $scope.inputFocus = false;
            //$scope.inputtishi = "请输入药品名称";
        } else if ($stateParams.gn == "WBG") {
            $scope.title = "指标解读";
            if ($scope.isIos) {
                $scope.inputMethod = 'voice';
                $scope.data.hideVoice = false;
            } else {
                $scope.inputMethod = 'voice';
                $scope.data.hideVoice = false;
            }
            $scope.inputFocus = false;
            //$scope.inputtishi = "请输入检查、检验名称或指标名称";
        } else if ($stateParams.gn == "WJB") {
            $scope.title = "疾病指南";
            $scope.inputMethod = 'voice';
            $scope.data.hideVoice = false;
            $scope.inputFocus = false;
            //$scope.inputtishi = "请输入疾病名称";
        } else if ($stateParams.gn == "ZWPG") {
            $scope.title = "症状评估";
            $scope.inputMethod = 'voice';
            $scope.data.hideVoice = false;
            //$scope.inputFocus = false;
            //$scope.inputtishi = "请输入症状信息";
        } else if ($stateParams.gn == "CJZZ") {
            $scope.title = "症状指南";
            $scope.inputMethod = 'keyboard';
            $scope.data.hideVoice = true;
            $scope.inputFocus = false;
            $scope.inputtishi = "请输入症状信息";
        } else if ($stateParams.gn == "FYJK") { //妇幼保健
            $scope.title = "妇幼健康";
            if ("孕期" == $stateParams.zhuci) {
                $scope.title = "孕期知识";
            }
            if ($stateParams.zhuci == "新生儿" || $stateParams.zhuci == "婴幼儿" || $stateParams.zhuci == "学龄前") {
                $scope.title = "成长知识";
            }
            if ($scope.isIos) {
                $scope.inputMethod = 'voice';
                $scope.data.hideVoice = false;
            } else {
                $scope.inputMethod = 'voice';
                $scope.data.hideVoice = false;
            }
            $scope.inputFocus = false;
            //$scope.inputtishi = "请输入您要咨询的目录名称";
        } else if ($stateParams.gn == "JJJK") { //季节健康
            $scope.title = "季节健康";
            if ($scope.isIos) {
                $scope.inputMethod = 'voice';
                $scope.data.hideVoice = false;
            } else {
                $scope.inputMethod = 'voice';
                $scope.data.hideVoice = false;
            }
            $scope.inputFocus = false;
            // $scope.inputtishi = "请输入季节或疾病名称";
        }
        //问症状判断是哪个方案更改标题
        $scope.fangan = $stateParams.fangan;
        if ($scope.fangan == "jcswzza") {
            $scope.title = "方案A(基础版)";
        } else if ($scope.fangan == "jcswzzb") {
            $scope.title = "方案B(分词like版)";
        } else if ($scope.fangan == "jcswzzc") {
            $scope.title = "方案C(知识匹配版)";
        }

        //  获取微信用户的openid
        var userid = sessionStorage.getItem("openId");
        //  返回按钮
        $scope.goBack = function () {
            $window.history.back();
        }
        $scope.messageArr = [];
        // addDialog(testData.audio);
        //  当前交互问题的存放
        $scope.resdata = {};
        //  是否走疑似疾病流程（0是，1不走疾病流程）
        $scope.iszsk = 1;
        //        判断多选是否是点击了确认
        var tjbdqd = "";
        //  （点击按钮或连接文字，获得患者选中内容，并发送到显示页面）（可能需要患者回答内容的类型type）
        $scope.$on('userSubmit', function (event, userChoose) {
            console.log(userChoose, "1111")
            userChoose.style = '1';
            if (userChoose === false || userChoose.input === false) {
                //TODO 用户多选时取消
                console.log('用户取消了')
                //              取消重新输入主词
                $scope.setGn($stateParams.gn);
                //                取消时将重新走症状知识库部分
                $scope.iszsk = 1;
            } else if (userChoose.input === "继续") {
                //              是否走疑似疾病流程（0是，1不走疾病流程进入知识库流程）
                $scope.iszsk = 0;
                interaction(userChoose, userid);
            } else if (userChoose.input === "没有了") {
                interaction(userChoose, userid);
            } else {
                //              是否走疑似疾病流程（0是，1不走疾病流程进入知识库流程）
                $scope.iszsk = 0; //??待定
                //              判断当前问题类型是否是多选类型（是则不在页面显示用户选择了哪些内容）
                if ($scope.resdata.type === "multiple") {
                    //                  不显示用户发送消息内容
                } else {
                    // fgfh:分隔符号
                    var InputStr = userChoose.input.toString();
                    if (InputStr.indexOf("fgfh") > -1) {
                        var a = [];
                        a = InputStr.split("fgfh", 3);
                        addDialog({ type: 'text', message: a[2], user: true });
                    } else if (InputStr.indexOf("×") == 0 && InputStr.length > 1) {
                        var InputStrqx = InputStr.substring(1);
                        addDialog({ type: 'text', message: InputStrqx, user: true });
                    } else if (userChoose.displaystr) {
                        addDialog({ type: 'text', message: userChoose.displaystr, user: true });
                    } else if (InputStr.indexOf("@fn&et#") > -1) {//妇幼健康列表用户输入页面展示
                        var fyjk = InputStr.split("@fn&et#");
                        addDialog({ type: 'text', message: fyjk[1], user: true });
                    } else {
                        addDialog({ type: 'text', message: userChoose.input, user: true });
                    }
                }
                interaction(userChoose, userid);
                //              }

            }
        });
        //有家庭健康功能模块进入并且点击重新开始按钮时触发（妇幼健康交互部分）
        $scope.$on("newJtdaStart", function (event, userChoose) {
            $scope.sendMessageXin($stateParams.zhuci);
        });
        //        检查检验类型获取
        $scope.$on('jcjytype', function (event, userChoose) {
            $scope.jcjytype = userChoose.jcjytype;
        });


        function addDialog(message) {
            if (angular.isString(message)) {

            }
            $scope.inputFocus = false;
            audioControl.pause();
            $scope.messageArr.push(message);
            //console.log($scope.messageArr);
        }

        document.oncontextmenu = function (e) {
            e.preventDefault();
        };

        //语音部分代码
        $scope.listSize = myConfig.listSize;
        var smallScroll = $ionicScrollDelegate.$getByHandle('small');
        var scrollContainer;
        $timeout(function () {
            scrollContainer = smallScroll.getScrollView().__container;
        });
        var realHeight = $window.innerHeight;
        $scope.randomId = Math.random().toString(16).slice(2);

        /**
         *当滚动容器大小应该变化时调用
         *如：切换语音输入、语音输入按钮显示隐藏
         */
        $scope.resize = function () {
            if ($scope.data.hideVoice) {
                var clientHeight = scrollContainer.clientHeight;
                smallScroll.resize().then(function () {
                    var bottomPos = smallScroll.getScrollPosition().top + scrollContainer.clientHeight;
                    if (bottomPos < scrollContainer.scrollHeight) {
                        smallScroll.scrollBy(0, -155, true);
                    }
                    // else if(scrollContainer.scrollHeight -bottomPos < 155){
                    //         console.log(scrollContainer.scrollHeight-bottomPos);
                    //     smallScroll.scrollBy(0, scrollContainer.scrollHeight-bottomPos, true);
                    // }
                });
            } else {
                smallScroll.scrollBy(0, 155, true);
            }
        }

        $scope.switchInput = function () {
            realHeight = $window.innerHeight;
            if ($scope.inputMethod === 'keyboard') {
                $scope.inputFocus = false;
                $scope.inputMethod = 'voice';
                $scope.resize();
            } else {
                $scope.inputFocus = true;
                $scope.inputMethod = 'keyboard';
            }
        };
        //		是否显示语音提示图标
        $scope.isshowimg = false;
        var startY = 0,
            startAudio = new Audio("./mp3/luyinkaishi.mp3"),
            finishAudio = new Audio("./mp3/luyinjieshu.mp3"),
            startTime;
        $scope.start = false;

        function startFunc() {
            $scope.start = true;
            $scope.isshowimg = true;
            $scope.data.voiceTip = '向上滑动，取消发送';
        }

        function finishFunc() {
            $scope.data.voiceTip = '按住说话';
            $scope.start = false;
        }
        $scope.send = function ($event) {
            $scope.inputFocus = false;
            //            $scope.sendmessage();
            $scope.sendMessageXin();
        }
        //识别回调函数
        function successFunc(text) {
            if (text === false || text === "只是一个模拟调试的结果") {
                addDialog({ type: 'text', message: "没有听清", radioMsg: "没有听清" });
                $scope.zIndex = false;
            } else {
                //                $scope.sendmessage(text);
                $scope.sendMessageXin(text);
            }
        };
        var bindFunces = Yuyin(startFunc, finishFunc, successFunc);

        $scope.startRecord = function ($event) {
            $scope.zIndex = true;
            // startAudio.play();
            $scope.isshowimg = true;
            $event.preventDefault();
            startTime = $event.timeStamp;
            startY = $event.touches[0].screenY;
            bindFunces.start();
            $scope.moveaction($event)
        };

        $scope.moveaction = function ($event) {
            $scope.isshowimg = true;
            if ($scope.start) {
                if ($event.touches[0].screenY - startY < -50) {
                    $scope.data.voiceTip = '松开手指，取消发送';
                    $scope.cancel = true;
                } else {
                    $scope.cancel = false;
                    $scope.data.voiceTip = '向上滑动，取消发送';
                };
                $scope.zIndex = false;
            }
        };

        $scope.finishRecord = function ($event) {
            $scope.isshowimg = false;
            if ($scope.cancel) { /* || ($event.timeStamp && $event.timeStamp - startTime < 100)*/
                bindFunces.stop();
                $scope.zIndex = false;
            } else {
                // finishAudio.play();
                bindFunces.finish();
                $scope.zIndex = false;
            }
            $scope.cancel = false;
            $timeout(function () {
                smallScroll.resize();
            });
        };

        //ios手机input键盘弹出问题
        var bodyScroll = $ionicScrollDelegate.$getByHandle('intBody');
        var realHeight = $window.innerHeight;
        $scope.inputFocu = function () {
            $timeout(function () {
                bodyScroll.scrollBy(0, realHeight - $window.innerHeight, true);
            }, 500)
        };
        $scope.inputBlur = function () {
            $timeout(function () {
                var inputIntId = document.getElementById("inputIntId");
                inputIntId.blur();
                //realHeight = $window.innerHeight;
            }, 500)
        };

        $scope.$on('fankui', function (event, bool) {
            $scope.fankui(bool);
        });
        $scope.fankui = function (bool) {
            var index = 0,
                length = $scope.messageArr.length;
            for (var i = length - 1; i >= 0; i--) {
                if ($scope.messageArr[i].newSearchFlag) {
                    index = i - 1;
                    break;
                }
            }
            var data = angular.toJson($scope.messageArr.slice(index));
            if (bool) {
                XywyService.save('/fankuiyijian', { fknr: '正确', jhnr: data })
                    .then(function (res) {
                        if (res.data) Popup.alert(res.data);
                    });
            } else {
                Popup.fankui({ data: data });
            }
        };

        //发送消息新方法
        $scope.sendMessageXin = function (value, resloid, length) {
            if ($scope.questiontype === "textbs") {
                return $scope.sendmessage(value, resloid, length);
            }
            if (!value && !$scope.data.textValue) {
                return;
            }
            $('.button-ddd').attr('disabled', "true"); //历史会话设置为不可用
            var param = { userid: userid, gnname: $stateParams.gn };
            var config = {
                params: param,
                cache: false
            }
            $scope.setting = true;
            XywyService.query("/setGn", config).then(function (response) {
                //            	重新选功能时(或者重新输入时)清空用户输入信息展示的内容
                $scope.yonghuinput = "";
                $scope.resdata = response.data;
                $scope.questiontype = response.data.type;
                $scope.setting = false;
                if (angular.isArray(response.data)) {
                    //                    angular.forEach(response.data, function (e) {
                    //                        addDialog(new Message(e));
                    //                    });
                    $scope.sendmessage(value, resloid, length);
                } else {
                    //                    addDialog(new Message(response.data));
                    $scope.sendmessage(value, resloid, length);
                }
            }, Popup.alert);
        }



        //  发送信息
        $scope.sendmessage = function (value, resloid, length) {
            console.log("1")
            if (!value) {
                value = $scope.data.textValue;
            }
            if (!!resloid) {
                addDialog({ type: 'text', radioMsg: resloid, message: value, user: true });
            } else if (!!value) {
                //主词存在时页面不显示主词（当从孕期呵护、儿童保健跳转到妇幼健康时不现实主词）
                if ($stateParams.zhuci && (value == "新生儿" || value == "婴幼儿" || value == "学龄前" || value == "孕期")) {

                } else {
                    addDialog({ type: 'text', message: value, user: true });
                }
            } else {
                return;
            }

            //      清空输入框中的内容
            $scope.data.textValue = "";
            //            if ($scope.resdata.type === "multiple"&& value.indexOf("以上都不存在")<0) {
            //                var tishi = { type: "text", message: "请点击确认按钮确定选择内容，或者输入以上都不存在排除上述所有内容，或者选择取消按钮重新输入症状。" };
            //                addDialog(new Message(tishi));
            //            } else {
            //                interaction({ input: value }, userid);
            //            }
            if ($scope.resdata.type === "multiple") {
                tjbdqd = "非确认";
            }
            interaction({ input: value, style: '2' }, userid);
            $('.button-textbs').attr('disabled', "true"); //设置无其他症状伴随按钮不可用（当用户输入其他伴随症状时设置为不可用）

        }
        //  用户输入内容后的操作（后台执行操作判断交互过程）交互处理
        function interaction(params, userid) {
            console.log(params, "123")
            //        	开发模式和非开发模式显示疾病个数(开发模式显示5个)
            var keshiLimit = myConfig.keshiLimit;
            if ($stateParams.gn == "WZZ" && localStorage.getItem("showpingfen") == "true") {
                keshiLimit = 5;
            }
            //state: params.style 判断input是输入的还是列表获取的'1'是列表获取 '2'是输入的
            var param = { userid: userid, input: params.input, style: params.style, processNo: params.processNo, hosOrgCode: sessionStorage.getItem('hosorgCode'), keshiLimit: keshiLimit, iszsk: $scope.iszsk, tjbdqd: tjbdqd, jcjytype: $scope.jcjytype, fangan: $stateParams.fangan, yonghuid: sessionStorage.getItem('wzrId') };
            var config = {
                params: param
            }

            XywyService.query("/interaction", config).then(function (response) {
                $scope.resdata = response.data;
                $scope.questiontype = response.data.type;
                //                判断用户输入内容记录是否存在
                if (response.data.userjl) {
                    //                  设置页面展示用户输入内容
                    userinputjl(response.data.sex, response.data.age, response.data.userjl);
                }
                sessionStorage.setItem('ksSwitch', 'failed');
                var hosorgcode = sessionStorage.getItem('hosorgCode');
                $scope.depsData = [];
                if ($scope.questiontype === "html") {
                    //跳转到儿童免疫、孕期时间表静态页面
                    $state.go(response.data.laiyuan);
                } else
                    if (sessionStorage.getItem('hosorgCode') && $scope.questiontype == 'listdetail' && response.data.tjkslist != null) {
                        var params = {
                            hosorgcode: hosorgcode,
                            cgksmc: angular.toJson(response.data.tjkslist)
                            //response.data[0].list[0].xxdxkdis
                        };
                        XywyService.query("/yiyuanVersion/getkeshiZhuanhuanUrl", { params: { yiyuanBm: hosorgcode } }).then(
                            function (response) {
                                var url = response.data.keshiZhuanhuanUrl + '/keshiConvert';
                                $http.post(url, angular.toJson(params)).success(function (result) {
                                    if (result.resultcode == "success") {
                                        sessionStorage.setItem('ksSwitch', 'success');
                                        angular.forEach(result.data, function (array, index) {
                                            $scope.depsData.push({
                                                type: '科室',
                                                xxdxkdis: array.yyKsMc,
                                                depCode: array.yyKsDm
                                            })
                                        })
                                        $scope.resdata.tjkslist = $scope.depsData;
                                    }
                                    addDialog(new Message($scope.resdata));
                                });
                            }
                        );

                    } else if (sessionStorage.getItem('hosorgCode') && ($scope.questiontype == 'ysjbresult' && response.data.tjkslist != null)) {
                        var params = {
                            hosorgcode: hosorgcode,
                            cgksmc: angular.toJson(response.data.tjkslist)
                        };
                        XywyService.query("/yiyuanVersion/getkeshiZhuanhuanUrl", { params: { yiyuanBm: hosorgcode } }).then(
                            function (result) {
                                var url = result.data.keshiZhuanhuanUrl + '/keshiConvert';
                                $http.post(url, angular.toJson(params))
                                    .success(function (response) {
                                        if (response.resultcode == "success") {
                                            sessionStorage.setItem('ksSwitch', 'success');
                                            angular.forEach(response.data, function (array, index) {
                                                $scope.depsData.push({
                                                    type: '科室',
                                                    xxdxkdis: array.yyKsMc,
                                                    depCode: array.yyKsDm
                                                })
                                            })
                                            $scope.resdata.tjkslist = $scope.depsData;
                                        }
                                        addDialog({
                                            type: $scope.resdata.type,
                                            radioMsg: $scope.resdata.radioMsg,
                                            list: $scope.resdata.list,
                                            resData: $scope.resdata.tjkslist,
                                            laiyuan: $scope.resdata.laiyuan,
                                            userjl: $scope.resdata.userjl,
                                            liucheng: $scope.resdata.liucheng
                                        });
                                    })
                            })
                    } else if (sessionStorage.getItem('hosorgCode') && $scope.questiontype == 'tjksresult') {
                        var params = {
                            hosorgcode: hosorgcode,
                            cgksmc: angular.toJson(response.data.list)
                        };
                        XywyService.query("/yiyuanVersion/getkeshiZhuanhuanUrl", { params: { yiyuanBm: hosorgcode } }).then(
                            function (result) {
                                var url = result.data.keshiZhuanhuanUrl + '/keshiConvert';
                                $http.post(url, angular.toJson(params))
                                    .success(function (response) {
                                        if (response.resultcode == "success") {
                                            sessionStorage.setItem('ksSwitch', 'success');
                                            angular.forEach(response.data, function (array, index) {
                                                $scope.depsData.push({
                                                    type: '科室',
                                                    xxdxkdis: array.yyKsMc,
                                                    depCode: array.yyKsDm
                                                })
                                            })
                                            $scope.resdata.list = $scope.depsData;
                                        }
                                        addDialog(new Message($scope.resdata));
                                    })
                            })
                    } else if (response.data.type == "duodetail" || response.data.type == "listdetail") {
                        addDialog({ type: "text", message: response.data.message, radioMsg: response.data.radioMsg, });
                        response.data.radioMsg = null;
                        addDialog(new Message(response.data));
                    } else if (response.data.type == "jtyyresult") {

                        addDialog(new Message(response.data));
                    }
                    else if (response.data.type != "ysjbresult") {
                        addDialog(new Message(response.data));
                    } else {
                        addDialog({ type: "text", message: response.data.message, radioMsg: response.data.radioMsg, });
                        addDialog({
                            type: response.data.type,
                            list: response.data.list,
                            resData: response.data.tjkslist,
                            laiyuan: response.data.laiyuan,
                            userjl: $scope.resdata.userjl,
                            tjksmessage: $scope.resdata.tjksmessage,
                            isShowDianZan: $scope.resdata.isShowDianZan,
                            liucheng: $scope.resdata.liucheng
                        });
                    }

                //                判断是否是问症状结果,如果是则改变iszsk的值
                if ($stateParams.gn == "WZZ") {
                    if (response.data.type == "result" || response.data.type == "zskresult" || response.data.type == "text") {
                        $scope.iszsk = 1;
                    }
                }
                if (response.data.sex) {
                    $scope.itemsex = response.data.sex.substring(0, 1) + "性";
                } else {
                    $scope.itemsex = "未选择";
                }
                if (response.data.age) {
                    $scope.itemage = response.data.age;
                } else {
                    $scope.itemage = "未选择";
                }
                $scope.zIndex = false;
                yesclick();
            }, Popup.alert);
            //            清空判断是否点击确认的内容
            tjbdqd = "";
        }
        /***
         * 当前用户输入信息记录显示
         */
        function userinputjl(sex, age, yonghujilu) {
            //			交互信息的性别
            var jhsex = ""
            if (sex) {
                jhsex = sex + "-->";
            }
            var jhage = "";
            if (age) {
                jhage = age + "岁-->";
            }
            //            替换文本中的逗号
            //            yonghujilu=yonghujilu.replace(/[，|,]/g,"-->");
            //          判断是哪个功能模块（用于判断是否展示年龄、性别）  
            if ($stateParams.gn == "WZZ" || $stateParams.gn == "ZNDZ") {
                //              用户输入信息值展示
                $scope.yonghuinput = "您当前输入的信息：" + jhsex + jhage + yonghujilu;
            } else {
                //              用户输入信息值展示
                $scope.yonghuinput = "您当前输入的信息：" + yonghujilu;
            }
        }
        //  取消输入其它主词
        $scope.cancelToSrzc = function () {
            var param = { userid: userid };
            var config = {
                params: param
            }

            XywyService.query("/cancelToSrzc", config).then(function (response) {
                addDialog({ type: response.data.type, message: response.data.message, list: response.data.daan });
            }, Popup.alert);
        }
        //  取消选择其它功能
        $scope.cancelToXgn = function () {
            var param = { userid: userid };
            var config = {
                params: param
            }

            XywyService.query("/cancelToXgn", config).then(function (response) {
                addDialog({ type: response.data.type, message: response.data.message, list: response.data.daan });
            }, Popup.alert);
        }
        //  在页面下方直接选择功能
        $scope.restart = function (msg) {
            if ($stateParams.gn === 'WBG') {
                $scope.sendmessage(msg);
            } else {
                $scope.setGn();
            }
        }
        $scope.setGn = function (name) {
            if (!name) {
                name = $stateParams.gn;
            }
            var param = { userid: userid, gnname: name, fresh: 0 };
            if (sessionStorage.getItem("orgid")) {
                param = { userid: userid, gnname: name, orgid: sessionStorage.getItem("orgid"), fresh: 0 };
            }
            var config = {
                params: param,
                cache: false
            }
            $scope.setting = true;
            XywyService.query("/setGn", config).then(function (response) {
                //            	重新选功能时(或者重新输入时)清空用户输入信息展示的内容
                $scope.yonghuinput = "";
                $scope.resdata = response.data;
                $scope.questiontype = response.data.type;
                $scope.setting = false;
                if (angular.isArray(response.data)) {
                    angular.forEach(response.data, function (e) {
                        //setgn时当选择用户为true时显示（默认为true，false时表示首次进入）
                        if (e.isshowYongHu == true) {
                            addDialog(new Message(e));
                        } else {
                            sessionStorage.setItem("wzrId", e.list[0].id);
                        }

                    });
                } else {
                    addDialog(new Message(response.data));
                }
            }, Popup.alert);
        }
        /**进入页面判断是哪个功能，判断语音播放状态*/
        //  判断$stateParams是否存在功能和主词信息
        if ($stateParams.gn && $stateParams.zhuci) {
            $scope.sendMessageXin($stateParams.zhuci);
        } else
            if ($stateParams.gn) {
                $scope.setGn($stateParams.gn);
            } else {
                $scope.cancelToXgn();
            }

        /** 年龄性别选择*/
        //        保存性别年龄
        var savesexage = function (sex, age, gn) {
            var param = { userid: userid, sex: sex, age: age, gn: gn };
            var config = {
                params: param
            }
            //          修改userinfo中的性别人群
            XywyService.query("/saveuserinfoxx", config).then(function (response) { }, Popup.alert);
        }

        //      确定按钮点击事件
        function yesclick() {
            //          用于页面展示年龄性别
            var showage = "年龄";
            var showsex = "性别";
            //          用于保存年龄性别用的数据
            var saveage = "";
            var savesex = "";
            if ($scope.itemsex != "未选择") {
                savesex = $scope.itemsex;
                showsex = $scope.itemsex;
            }
            if ($scope.itemage != "未选择") {
                saveage = $scope.itemage;
                showage = $scope.itemage + "岁";
            }
            $scope.sexagevalue = showsex + "," + showage;
            localStorage.setItem("sex", $scope.itemsex);
            localStorage.setItem("age", $scope.itemage);
        }

        $scope.sexagevalue = "性别,年龄";
        $scope.itemage = localStorage.getItem("age");
        $scope.itemsex = localStorage.getItem("sex");
        if (!$scope.itemage || $scope.itemage == "null") {
            $scope.itemage = "未选择";
        }
        if (!$scope.itemsex || $scope.itemsex == "null") {
            $scope.itemsex = "未选择";
        }
        //       初始化页面时判断年龄性别
        yesclick();
        if ($scope.itemsex == undefined && $scope.itemage == undefined) {
            $scope.sexagevalue = "性别,年龄";
            $scope.itemsex = "未选择";
            $scope.itemage = "未选择";
        }
        //        滑动样式的年龄性别选择框
        //        年龄性别取值范围
        var suData = [{ 'id': '0', 'value': '未选择' }, { 'id': '1', 'value': '男性' }, { 'id': '2', 'value': '女性' }];
        var weiData = [{ 'id': '0', 'value': '未选择' }];
        for (var i = 1; i < 101; i++) {
            var agenumobj = { 'id': i, 'value': i };
            weiData[i] = agenumobj;
        }

        var showGeneralDom = document.querySelector('#showGeneral');
        var suIdDom = document.querySelector('#suId');
        var weiIdDom = document.querySelector('#weiId');
        //      showGeneralDom = document.getElementById('showGeneral');
        //        var suIdDom = document.getElementById('suId');
        //        var weiIdDom = document.getElementById('weiId');
        $scope.click = function () {
            //          展示年龄性别选择框时，展示当前选中的年龄性别
            if ($scope.itemsex == "未选择") {
                showGeneralDom.dataset.su_id = 0;
            } else if ($scope.itemsex == "男性") {
                showGeneralDom.dataset.su_id = 1;
            } else if ($scope.itemsex == "女性") {
                showGeneralDom.dataset.su_id = 2;
            }
            if ($scope.itemage == "未选择") {
                showGeneralDom.dataset.wei_id = 0;
            } else {
                showGeneralDom.dataset.wei_id = $scope.itemage;
            }

            var suId = showGeneralDom.dataset['su_id'];
            var suValue = showGeneralDom.dataset['su_value'];
            var weiId = showGeneralDom.dataset['wei_id'];
            var weiValue = showGeneralDom.dataset['wei_value'];
            var sanguoSelect = new IosSelect(2, [suData, weiData], {
                title: '选择性别年龄',
                itemHeight: 35,
                oneLevelId: suId,
                twoLevelId: weiId,
                callback: function (selectOneObj, selectTwoObj) {
                    suIdDom.value = selectOneObj.id;
                    weiIdDom.value = selectTwoObj.id;
                    //                    showGeneralDom.innerHTML = '蜀国将领是：' + selectOneObj.value + ' 魏国将领是：' + selectTwoObj.value;

                    showGeneralDom.dataset['su_id'] = selectOneObj.id;
                    showGeneralDom.dataset['su_value'] = selectOneObj.value;
                    showGeneralDom.dataset['wei_id'] = selectTwoObj.id;
                    showGeneralDom.dataset['wei_value'] = selectTwoObj.value;
                    $scope.itemsex = selectOneObj.value;
                    $scope.itemage = selectTwoObj.value;
                    //                  执行确定按钮操作
                    yesclick();
                    var age = "";
                    var sex = "";
                    if ($scope.itemsex != "未选择") {
                        sex = $scope.itemsex;
                    }
                    if ($scope.itemage != "未选择") {
                        age = $scope.itemage;
                    }
                    savesexage(sex, age, $stateParams.gn);
                }
            });
        };

        geoLocation.getCity().then(function (city) {
            $scope.yiyuan = city.mc;
            sessionStorage.setItem("citydm", city.csdm);
        }, function (reason) {
            $scope.yiyuan = angular.isString(reason) ? reason : '';
        });
        $rootScope.$on('userCityUpdate', function (event, city) {
            $scope.yiyuan = city.mc;
            sessionStorage.setItem("citydm", city.csdm);
        });


        //问药品禁忌药品年龄段选择
        $scope.jjYpNl = [{ 'key': '孕妇', 'value': '1' }, { 'key': '儿童', 'value': '2' }, { 'key': '老人', 'value': '3' }];
        $scope.isShow_bl_yp_btn = true;

        $scope.show_jj_yp_nld = function () {
            if ($scope.isShow_jj_yp_list) {
                $scope.isShow_jj_yp_list = false;
                $scope.isShow_bl_yp_btn = true;
            } else {
                $scope.isShow_jj_yp_list = true;
                $scope.isShow_bl_yp_btn = false;
            }
            $scope.isShow_bl_yp_list = false;
        }
        //不良反应药的列表     
        $scope.show_bl_yp_nld = function () {
            if ($scope.isShow_bl_yp_list) {
                $scope.isShow_bl_yp_list = false;
            } else {
                $scope.isShow_bl_yp_list = true;
            }
        }

        //年龄段列表跳转
        $scope.go_jj_yp_List = function (nld, type) {
            $state.go('wenyaojjYpList', { jj_yp_nld: nld, jj_yp_type: type, jj_yp_keyWord: "" });
            $scope.isShow_jj_yp_list = false;
            $scope.isShow_bl_yp_list = false;
            $scope.isShow_bl_yp_btn = true;
        }
        //    	交互页面底端样式bottom的距离判断
        $scope.stylebottom = function () {
            //    		自我评估，常见症状判断距底端距离
            //            if ($scope.curgn == "ZWPG" || $scope.curgn == "CJZZ") {
            if ($scope.curgn === "CJZZ") {
                return { "bottom": "0px" };
            }
            //    		问症状问报告时判断距底端距离
            if ($scope.isbottom0) {
                return { "bottom": "0px" };
            }
            if (!$scope.data.hideVoice && $scope.inputMethod === 'voice') {
                return { "bottom": "101px" };
            } else {
                return { "bottom": "48px" };
            }
        }
        //    	（WZZ、WBG）是否显示输入框
        $scope.isshowinput = function () {
            if ($scope.curgn == "WZZ") {
                //    			判断$scope.questiontype是否存在，存在则判断剩余的两个
                if (!$scope.questiontype || $scope.questiontype == "text" || $scope.questiontype == "ysjbresult" || $scope.questiontype == "tjksresult" || $scope.questiontype == "textbs") {
                    $scope.isbottom0 = false;
                    return;
                } else {
                    //    				判断距离底部的距离（当输入框隐藏时距底部为0px，bottomheight为true）
                    $scope.isbottom0 = true;
                    return { "display": "none" };
                }
            }
            if ($scope.curgn == "WBG" || $scope.curgn == "FYJK" || $scope.curgn == "JJJK") {
                if (!$scope.questiontype || $scope.questiontype == "text" || $scope.questiontype == "duodetail" || $scope.questiontype == "html") {
                    $scope.isbottom0 = false;
                    return;
                } else {
                    //    				判断距离底部的距离（当输入框隐藏时距底部为0px，bottomheight为true）
                    $scope.isbottom0 = true;
                    return { "display": "none" };
                }
            }
        }
    })
    /**
     * 语音交互个人记录部分
     */
    .controller('jiaohugeren', function ($scope, $state, $stateParams, $http, $ionicPopup, $log, $compile, XywyService, testHref, Popup) {
        //      用于记录当前userinfo的信息
        var zuixinjilu = new Object();
        $scope.data = [];

        var param = { userid: sessionStorage.getItem("openId"), lsjlnum: myConfig.lsjlnum };
        var config = {
            params: param
        }
        //  历史记录
        XywyService.query("/queryrizhi", config).then(function (response) {
            //         console.log(response);
            $scope.jilu = response.data;
        }, function (response) {
            var alertPopup = $ionicPopup.alert({
                template: '<div align="center">请重试！</div>',
                okText: '确定'
            });
        });

        //      userinfo 信息赋值
        var yemianxx = function (userinfo) {
            if (userinfo.sex == "" || userinfo.sex === undefined) {
                $scope.data.xingbie = "未选择";
            } else {
                $scope.data.xingbie = userinfo.sex;
            }
            if (userinfo.age == "" || userinfo.age === undefined) {
                $scope.data.renqun = "未选择";
            } else {
                $scope.data.renqun = userinfo.age;
            }
            if (userinfo.curGn == "GNXZ") {
                $scope.data.gn = "";
            } else if (userinfo.curGn == "ZNDZ") {
                $scope.data.gn = "智能导诊";
            } else if (userinfo.curGn == "WYP") {
                $scope.data.gn = "问药品";
            } else if (userinfo.curGn == "WSS") {
                $scope.data.gn = "问手术";
            } else if (userinfo.curGn == "WJB") {
                $scope.data.gn = "问疾病";
            } else if (userinfo.curGn == "WBG") {
                $scope.data.gn = "问报告";
            }
        }
        //      userinfo的基本信息
        XywyService.query("/queryuserinfo", config).then(function (response) {
            //             console.log(response);
            zuixinjilu = response.data;
            if (response.data) {
                yemianxx(response.data);
            }
        }, function (response) {
            var alertPopup = $ionicPopup.alert({
                template: '<div align="center">请重试！</div>',
                okText: '确定'
            });
        });
        //      返回
        $scope.goBack = function () {
            //          $state.go('yuyinjiaohu',{},{location:testHref()||"replace"});
            javascript: history.go(-1);
        }
        //      点击主词的事件
        $scope.zhuciclick = function (item) {
            var gn = item.GN;
            //          功能英文缩写
            var gndm = "";
            if (gn === "智能导诊") {
                gndm = "ZNDZ";
            }
            if (gn === "问药品") {
                gndm = "WYP";
            }
            if (gn === "问手术") {
                gndm = "WSS";
            }
            if (gn === "问报告") {
                gndm = "WBG";
            }
            if (gn === "问疾病") {
                gndm = "WJB";
            }

            var param = { userid: sessionStorage.getItem("openId"), sex: item.SEX, age: item.AGE, gn: gndm };
            var config = {
                params: param
            }
            //          修改userinfo中的性别人群主词功能
            XywyService.query("/saveuserinfoxx", config).then(function (response) {
                //              sessionStorage.setItem("gn",item.GN);
                //              sessionStorage.setItem("zhuci",item.ZC);
                //              跳转
                $state.go('yuyinjiaohuclick', { gn: gndm, zhuci: item.ZC }, { location: testHref() || "replace" });
                //              $state.go('yuyinjiaohu',{},{location:testHref()||"replace"});
            }, function (response) {
                var alertPopup = $ionicPopup.alert({
                    template: '<div align="center">请重试！</div>',
                    okText: '确定'
                });
            });
        }
        //      保存按钮点击事件
        $scope.saveonclick = function () {
            var item = new Object();
            if ($scope.data.xingbie === "未选择") {
                item.SEX = "";
            } else {
                item.SEX = $scope.data.xingbie;
            }
            if ($scope.data.renqun === "未选择") {
                item.AGE = "";
            } else {
                item.AGE = $scope.data.renqun;
            }

            item.GN = $scope.data.gn;
            item.ZC = "";
            $scope.zhuciclick(item);
        }
        //      取消按钮点击事件
        $scope.quxiao = function () {
            yemianxx(zuixinjilu);
        }
        //      删除历史记录提示内容中取消的点击事件
        var lsjlquxiao = function () {
            //          不做任何操作
        }
        //      删除历史记录提示内容中确定的点击事件
        var queren = function () {
            var param = { userid: sessionStorage.getItem("openId") };
            var config = {
                params: param
            }
            XywyService.query("/deleterizhi", config).then(function (response) {
                //                 console.log(response);
                $scope.jilu = new Object();
            }, function (response) {
                var alertPopup = $ionicPopup.alert({
                    template: '<div align="center">请重试！</div>',
                    okText: '确定'
                });
            });
        }
        //      删除历史记录的点击事件
        $scope.deletelsjl = function () {
            var content = ["删除历史记录", "您确定要删除所有历史记录吗？"];
            Popup.confirm(content, queren, lsjlquxiao);

        }
    })

    /**
     * 问症状疑似疾病详情页面js
     */
    .controller('wenzzxqjs', function ($scope, $state, $stateParams, $http, $ionicPopup, $log, $compile, XywyService, testHref, Popup, Outlet, $window, audioControl) {
        $scope.isIos = false;
        $scope.inputFocus = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            $scope.localyyzt = "打开";
        }
        //    	判断ios
        $scope.panduanios = function () {
            if ($scope.isIos) {
                return { "margin-top": "0px" };
            } else {
                return { "margin-top": "40px" };
            }
        }

        var self = this;
        //self.viewTitle = '疾病指南';


        var jbmc = $stateParams.jbmc;
        self.viewTitle = jbmc;
        var param = { jbmc: jbmc };
        var config = {
            params: param
        }

        XywyService.query("/getwenzzjbxq", config).then(function (response) {
            var jbms = response.data.jbms;
            var zlyz = response.data.zlyz;
            var jkzd = response.data.jkzd;
            var lcbx = response.data.lcbx;
            self.haveResult = true;
            self.items = [];
            var push = Array.prototype.push.bind(self.items);
            self.title = jbmc;
            if (jkzd) {
                jkzd = response.data.jkzd.replace(/健康指导：|健康指导:|健康指导/, "");
                jkzd = jkzd.trim();
                jkzd = jkzd.replace(/\ +/g, "");
            }
            push({ title: '疾病描述', content: jbms, show: true });
            push({ title: '治疗意见', content: zlyz });
            push({ title: '健康指导', content: jkzd });
            push({ title: '临床表现', content: lcbx });
            push = null;
        }, function (response) {
            Popup.alert(reason);
        });
        self.backshouye = function () {
            var openid = sessionStorage.getItem("openId");
            var token = sessionStorage.getItem("token");
            if (sessionStorage.getItem('hosorgCode')) {
                var yxzsurl = sessionStorage.getItem('yxzsurl');
                var hosorgCode = sessionStorage.getItem('hosorgCode');
                $state.go("yiyuanshouye", { hosorgCode: hosorgCode, openid: openid, token: token, yxzsurl: yxzsurl });
            } else {
                $state.go("shouye", { openid: openid, token: token });
            }
        }
        /*if(sessionStorage.getItem("wenzzxqshow")){
    		$scope.show=sessionStorage.getItem("wenzzxqshow");
    	}else{
    		$scope.show = "介绍";
    		sessionStorage.setItem("wenzzxqshow",$scope.show);
    	}
    	
    	
        //      获得疾病名称
        $scope.jbmc = $stateParams.jbmc;
        //      疑似疾病介绍
        $scope.showjieshaoclick = function() {
            $scope.show = "介绍";
            sessionStorage.setItem("wenzzxqshow",$scope.show);
        }
        //      疑似疾病用药
        $scope.showyaopinclick = function() {
            $scope.show = "药品";
            sessionStorage.setItem("wenzzxqshow",$scope.show);
            //           $ionicScrollDelegate.$getByHandle('small').scrollTop(true);
        }
        //      挂号
        $scope.showhuahaoclick = function() {
            $scope.show = "挂号";
            sessionStorage.setItem("wenzzxqshow",$scope.show);
        }
        //      检查检验
        $scope.showjcjyclick = function() {
            $scope.show = "检查检验";
            sessionStorage.setItem("wenzzxqshow",$scope.show);
        }

        var jibingxq = function(jbmc) {
            var param = { jbmc: jbmc };
            var config = {
                params: param
            }

            XywyService.query("/getwenzzjbxq", config).then(function(response) {
                //                 console.log(response);
                $scope.jbms = response.data.jbms;
                $scope.zlyz = response.data.zlyz;
                $scope.jkzd = response.data.jkzd;
            }, function(response) {
                var alertPopup = $ionicPopup.alert({
                    template: '<div align="center">请重试！</div>',
                    okText: '确定'
                });
            });
        }
        //      疾病介绍
        jibingxq($scope.jbmc);

        */
        /**     推荐科室*/
        /*
                $scope.data = { keshiShow: [] };
                $scope.data.keshiLimit = myConfig.keshiLimit;
                //      查询疾病相关科室
                $scope.search = function(jbmc) {
                    var map = { xingbie: "", renqun: "", user: sessionStorage.getItem("openId"), keyword: jbmc, hosOrgCode: myConfig.hosOrgCode };
                    var para = {
                        cache: true,
                        params: map
                    };
                    $scope.noks = true;
                    XywyService.query("/getwenzzjbks", para).then(
                        function(response) {
                            if (!response.data || response.data.length === 0) {
                                //                          Popup.alert('未能找到更多疾病！');
                                $scope.noks = true;
                            } else {
                                $scope.noks = false;
                                $scope.data.keshies = response.data;
                                $scope.haveResult = true;
                            }
                        },
                        Popup.alert
                    );
                };
                //          推荐科室
                $scope.search($scope.jbmc);
                //          挂号
                $scope.guahao = function(keshi) {
                    //            //前往医信助手yisheng界面(用$window)http://10.38.128.25/hmpmanager/views/www/index.html#/yisheng/"+keshi.YY_KS_DM
                    $window.location.href = myConfig.yxzsurl + "/views/www/index.html#/yisheng/" + keshi.YY_KS_DM;
                };
                */
        /**     推荐科室结束*/
        /*
         */
        /**检查检验*/
        /*
                var queryjcjy = function(jbmc) {
                    var param = { jbmc: jbmc };
                    var config = {
                        params: param
                    }
                    XywyService.query("/getwenzzjcjy", config).then(
                        function(response) {
                            $scope.jcjys = response.data;
                            if (response.data && response.data.length > 0) {
                                $scope.nojcjy = false;
                            } else {
                                $scope.nojcjy = true;
                            }
                        },
                        function(response) {
                            var alertPopup = $ionicPopup.alert({
                                template: '<div align="center">请重试！</div>',
                                okText: '确定'
                            });
                        });
                }
                //            检查检验
                queryjcjy($scope.jbmc);
                //            检查检验详情
                $scope.jcjyxq = function(jcjymc) {
                    $state.go('wenzzjcjy', { jcmc: jcjymc });
                }
                */
        /**检查检验结束*/
        /*
         */
        /**药品*/
        /*
                var yaopinxx = function(jbmc) {
                    var param = { jbMc: jbmc };
                    var config = {
                        params: param
                    }

                    XywyService.query("/getJbXgYaoPin", config).then(function(response) {
                        $scope.yaopines = response.data;
                        if (!response.data || response.data.length === 0) {
                            $scope.noyaopin = true;
                        } else {
                            //                  无结果时提示信息
                            $scope.noyaopin = false;
                        }
                    }, function(resonse) {
                        var alertPopup = $ionicPopup.alert({
                            template: '<div align = "center">未找到相关药品!</div>',
                            okText: '确定'
                        });
                    });
                }
                //            药品信息查询
                yaopinxx($scope.jbmc);
                $scope.showYpXq = function(mc, item, otc, id) {
                    if (id) {
                        $state.go('wenyaodetail', { id: id });
                        //                sessionStorage.setItem('yaopinxiangqing', JSON.stringify(item));
                        //                if (otc == true) {
                        //                    sessionStorage.setItem('isotc', "OTC");
                        //                } else {
                        //                    sessionStorage.setItem('isotc', "非OTC");
                        //                }
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            template: '<div align = "center">暂无药品详情信息!</div>',
                            okText: '确定'
                        });
                    }

                }
                $scope.showYaoFang = function(aaa, $event) {
                    var alertPopup = $ionicPopup.alert({
                        template: '<div align = "center">找药房功能正在开发,敬请期待!</div>',
                        okText: '确定'
                    });
                    $event.stopPropagation();
                }
                var direction = [true, true, true, true, true, false, false];
                $scope.direction = direction;
                $scope.data = { haveResult: false };
                $scope.data.haveResult = true;

                */
        /**药品结束*/

        $scope.audioCtrlShow = 1;
        $scope.switchAudioBar = function (e) {
            if ($scope.audioCtrlShow == 1) {
                $scope.audioCtrlShow = 0;
            } else {
                $scope.audioCtrlShow = 1;
            }
        };
        $scope.$on('closeAudioBar', function () {
            $scope.switchAudioBar();
        });

    })

    /**
     * 问症状检查检验详情
     */
    .controller('wenzzjcjyxq', ['$scope', '$state', '$stateParams', '$http', '$ionicPopup', '$log', '$compile', 'XywyService', 'testHref', 'Popup', 'QueryZhiShi', '$window', function ($scope, $state, $stateParams, $http, $ionicPopup, $log, $compile, XywyService, testHref, Popup, QueryZhiShi, $window) {
        $scope.isIos = false;
        $scope.inputFocus = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            $scope.localyyzt = "打开";
        }

        var self = this;
        //self.viewTitle = '问症状';
        self.viewTitle = $stateParams.jcmc;
        var param = { jcjymc: $stateParams.jcmc };
        var config = {
            params: param
        }

        XywyService.query("/wenzzjcjyxq", config).then(function (response) {
            var data = response.data;
            self.haveResult = true;
            self.items = [];
            var push = Array.prototype.push.bind(self.items);
            self.title = $stateParams.jcmc;
            push({ title: '项目目的', content: data.md });
            push({ title: '临床解释', content: data.lcjs, show: true });
            push({ title: '健康指导', content: data.jkzd });
            push = null;
        }, Popup.alert);

        $scope.audioCtrlShow = 1;
        $scope.switchAudioBar = function (e) {
            if ($scope.audioCtrlShow == 1) {
                $scope.audioCtrlShow = 0;
            } else {
                $scope.audioCtrlShow = 1;
            }
        };
        $scope.$on('closeAudioBar', function () {
            $scope.switchAudioBar();
        });

    }])


    /*
     *药品指南
     */
    .controller('yaoPinZhiNan', ['$scope', '$state', '$stateParams', '$window', 'wxApi', 'XywyService', '$timeout', 'Popup', "$ionicPopup", '$ionicScrollDelegate', '$ionicViewSwitcher', function ($scope, $state, $stateParams, $window, wxApi, XywyService, $timeout, Popup, $ionicPopup, $ionicScrollDelegate, $ionicViewSwitcher) {

        $scope.isHidePopup = function () {
            $scope.isShowNldList = false;
            $scope.isShowDrugList = false;
        };

        $scope.data = {
            keyword: $stateParams.jj_yp_keyWord
        }
        //返回上一页
        $scope.goBack = function () {
            $window.history.back();
        };
        //首页
        $scope.back = function () {
            var openid = sessionStorage.getItem("openId");
            $ionicViewSwitcher.nextDirection('back');
            var token = sessionStorage.getItem("token");
            $state.go("shouye", { openid: openid, token: token });
        };
        //判断手机类型
        $scope.isIos = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
        }
        // 菜单点击
        $scope.changeButton = function () {
            if ($scope.isShowPx == true) {
                $scope.isShowPx = false;
            } else {
                $scope.isShowPx = true;
            }
        }

        //首次进去查询药品列表
        $scope.loadMec = function () {
            $scope.pageNum = 1;
            var param = { pageNum: $scope.pageNum };
            var config = {
                params: param
            };
            //禁忌药品列表查询
            XywyService.query("/queryYpZn", config)
                .then(function (response) {
                    $scope.micList = response.data.micData;
                    $scope.pageCount = response.data.micPageCount;
                }, Popup.alert);
        };
        $scope.loadMec();
        $scope.rqType = [{
            "nld": "儿童",
            "value": "1"
        }, {
            "nld": "孕妇",
            "value": "2"
        }, {
            "nld": "老人",
            "value": "3"
        }];

        $scope.ypType = [{
            "title": "全部药品",
            "vmId": "0"
        }, {
            "title": "禁忌药品",
            "vmId": 1,
        }, {
            "title": "不良反应药品",
            "vmId": 2,
        }];

        function restart() {
            //初始状态
            $scope.flag1 = true;
            $scope.flag2 = false;
            $scope.flag3 = false;
            $scope.rqlist1 = {
                nld: "禁忌药品"
            };
            $scope.rqlist2 = {
                nld: "不良反应药品"
            };
        }

        restart();

        $scope.selectNld = function (nld) {
            $scope.isShowNldList = false;
        }
        $scope.selectJj = function (drug) {
            $scope.isShowDrugList = false;
        }

        //输入框清除
        $scope.clean = function () {
            restart();
            cleanZimuColor();
            $scope.showRq = false;
            $scope.reusltNullTip = "已加载全部";
            $scope.data.keyword = "";
            $scope.data.searchSuc = false;
            $scope.loadMec();
            $scope.isShowNldList = false;
            $scope.isShowDrugList = false;
        };



        $scope.szmPx = "";
        //药品查询
        $scope.searchDrug = function () {
            $ionicScrollDelegate.$getByHandle('dashboard').scrollTop(false);
            $scope.isShowNldList = false;
            $scope.isShowDrugList = false;
            if ($scope.micType == "0") {
                $scope.nld = "";
            }
            $scope.pageNum = 1;
            var param = {
                nld: $scope.nld,
                pageNum: $scope.pageNum,
                state: $scope.micType,
                ypmc: $scope.data.keyword,
                py: $scope.szmPx
            };
            var config = {
                params: param
            };
            //禁忌药品列表查询
            XywyService.query("/queryYpZn", config)
                .then(function (response) {
                    $scope.panDuanFanHuiZshi(response, "");
                    $scope.micList = response.data.micData;
                    $scope.pageCount = response.data.micPageCount;
                }, Popup.alert);

        }
        //选择年龄段
        $scope.changeNld = function (item) {
            $scope.nld = item.value;
            $scope.szmPx = "";
            $scope.searchDrug();
            $scope.isShowNldList = false;
            $scope.rqlist = item;

        }
        //选择药品字段
        $scope.changeDrug = function (item) {
            $scope.szmPx = "";
            $scope.micType = item.vmId;
            $scope.searchDrug();
            $scope.isShowDrugList = false;
            $scope.yplist = item;
            if (item.vmId !== "0") {
                $scope.showRq = true;
            } else {
                $scope.showRq = false;
            }

        }
        //点击显示年龄段列表
        $scope.nldClick = function () {
            if ($scope.micType == "1" || $scope.micType == "2") {
                if ($scope.isShowNldList) {
                    $scope.isShowNldList = false;
                } else {
                    $scope.isShowNldList = true;
                }
            }
            $scope.isShowDrugList = false;
        }
        //点击显示药品列表
        $scope.drugClick = function () {
            if ($scope.isShowDrugList) {
                $scope.isShowDrugList = false;
            } else {
                $scope.isShowDrugList = true;
            }
            $scope.currentTab = 'yp'
            $scope.isShowNldList = false;
        }

        //点击显示全部药品列表
        $scope.quanbuClick = function () {
            cleanZimuColor();
            restart();
            //右侧字母变色
            var zimuList = document.getElementsByClassName('zimua');
            for (var i = 0; i < zimuList.length; i++) {
                zimuList[i].style.color = "#444444c2";
            }
            //
            if ($scope.isShowDrugList) {
                $scope.isShowDrugList = false;
            } else {
                $scope.isShowDrugList = true;
            }
            $scope.currentTab = 'yp'
            $scope.isShowNldList = false;

            //搜索全部
            $scope.szmPx = "";
            $scope.micType = "0"
            $scope.nld = "";
            $scope.data.keyword,
                $scope.searchDrug();
            $scope.displaySelect();
        }

        //点击显示禁忌药品列表
        $scope.jinjiClick = function () {
            //右侧字母变色
            var zimuList = document.getElementsByClassName('zimua');
            for (var i = 0; i < zimuList.length; i++) {
                zimuList[i].style.color = "#444444c2";
            }
            //
            if ($scope.isShowJinjiList) {
                $scope.isShowJinjiList = false;
            } else {
                $scope.isShowJinjiList = true;
            }
            $scope.isShowBuliangList = false;

            //搜索全部
        }

        $scope.changeJinji = function (item) {
            cleanZimuColor();
            $scope.flag1 = false;
            $scope.flag2 = true;
            $scope.flag3 = false;
            $scope.rqlist2 = {
                nld: "不良反应药品"
            }
            $scope.szmPx = "";
            $scope.micType = "1"
            $scope.nld = item.value;
            $scope.data.keyword,
                $scope.isShowJinjiList = false;
            $scope.rqlist1.nld = item.nld + "禁忌";
            $scope.searchDrug();
        }

        //点击显示不良反应药品列表
        $scope.buliangClick = function () {

            //右侧字母变色
            var zimuList = document.getElementsByClassName('zimua');
            for (var i = 0; i < zimuList.length; i++) {
                zimuList[i].style.color = "#444444c2";
            }
            //
            if ($scope.isShowBuliangList) {
                $scope.isShowBuliangList = false;
            } else {
                $scope.isShowBuliangList = true;
            }
            $scope.currentTab = 'yp';
            $scope.isShowJinjiList = false;

            //搜索全部
        }

        $scope.changeBuliang = function (item) {
            cleanZimuColor();
            $scope.flag1 = false;
            $scope.flag2 = false;
            $scope.flag3 = true;

            $scope.rqlist1 = {
                nld: "禁忌药品"
            }
            $scope.szmPx = "";
            $scope.micType = "2";
            $scope.nld = item.value;
            $scope.data.keyword;
            $scope.isShowBuliangList = false;
            $scope.rqlist2.nld = item.nld + "不良反应";
            $scope.searchDrug();
        }

        //点击菜单项查询
        $scope.currentPx = 1;
        $scope.menuSearch = function (index, value, type) {
            cleanZimuColor();
            $scope.isShowPx = false;
            $scope.currentPx = index;
            if (type == 0) {
                $scope.quanbuClick();
            }
            if (type == 1) {
                $scope.szmPx = "";
                $scope.micType = "1";
                $scope.nld = value;
                $scope.searchDrug();
            }
            if (type == 2) {
                $scope.szmPx = "";
                $scope.micType = "2";
                $scope.nld = value;
                $scope.searchDrug();
            }
        };

        //输入药品名称查询
        $scope.searchDrugName = function () {
            /*$scope.nld = "";
            $scope.micType ="";*/
            $scope.szmPx = "";
            cleanZimuColor();
            $scope.searchDrug();
        }

        //下拉刷新数据
        $scope.micRefresh = function () {
            //隐藏无数据提示
            $scope.task_hasMoreItem = true;
            $scope.pageNum = 1;
            var postParams = {
                params: {
                    pageNum: $scope.pageNum,
                    nld: $scope.nld,
                    state: $scope.micType,
                    ypmc: $scope.data.keyword,
                    py: $scope.szmPx
                }
            };
            XywyService.query("/queryYpZn", postParams)
                .then(function (response) {
                    $scope.micList = response.data.micData;
                    $scope.pageCount = response.data.micPageCount;
                }).finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
        $scope.task_hasMoreItem = true;
        //上拉加载更多数据
        $scope.loadMicMore = function () {
            $scope.pageNum += 1;
            if ($scope.pageNum <= $scope.pageCount) {
                //隐藏无数据提示
                $scope.task_hasMoreItem = true;
                var postParams = {
                    params: {
                        pageNum: $scope.pageNum,
                        nld: $scope.nld,
                        state: $scope.micType,
                        ypmc: $scope.data.keyword,
                        py: $scope.szmPx
                    }
                };
                XywyService.query("/queryYpZn", postParams)
                    .then(function (response) {
                        $scope.panDuanFanHuiZshi(response, "");
                        angular.forEach(response.data.micData, function (child) {
                            $scope.micList.push(child);
                        });
                        //禁止上拉滑动
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });
            } else {
                //显现提示
                $scope.task_hasMoreItem = false;
                $scope.reusltNullTip = "已加载全部";

                //隐藏上拉加载
                $scope.isShow = true;
                //禁止上拉滑动
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        };

        //字母查询
        $scope.$on('zimu', function (event, zimu) {
            //清空查询条件 恢复默认值
            restart();
            $scope.displaySelect();

            $scope.data.keyword = "";
            $scope.nld = "";
            $scope.micType = "";
            $scope.zimu = zimu.zimu;
            $scope.zimuheight = zimu.zimuheight;
            //        	页数置为1
            $scope.pageNum = 1;
            //        	执行字母查询
            //恢复默认值
            $scope.yplist = $scope.ypType[0];
            $scope.rqlist = $scope.rqType[0];
            $scope.showRq = false;
            $scope.szmPx = $scope.zimu;
            $scope.searchDrug();
            //        	2s后隐藏字母\
            $scope.ishsowzimu = true;
            $timeout(function () {
                $scope.ishsowzimu = false;
            }, 2000);
        });

        //查询药品返回值为空处理
        $scope.panDuanFanHuiZshi = function (response, type) {
            $scope.isShow = false;
            //禁止上拉滑动
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if (response.data.micData.length == 0) {
                $scope.task_hasMoreItem = false;
                $scope.reusltNullTip = "暂无相关搜索结果！";
            } else {
                $scope.task_hasMoreItem = true;
                $scope.reusltNullTip = "已加载全部";
            }
        }
        //跳转到详情页面
        $scope.go_yp_detail = function (id) {
            $scope.isShowBuliangList = false;
            $scope.isShowJinjiList = false;
            $state.go('wenyaodetail', { id: id, showItem: $scope.micType, estype: "yp" });
        };
        $scope.displaySelect = function () {
            $scope.isShowBuliangList = false;
            $scope.isShowJinjiList = false;
        }

        function cleanZimuColor() {
            if ($(".city_anchor").children(".target").length > 0) {
                $(".city_anchor").children(".target").each(function () { $(this).removeClass("target") });
            }
        }
    }])

    /**
     * 会员天地
     */
    .controller('huiyuan', ['$scope', '$state', '$stateParams', '$window', 'wxApi', '$timeout', 'Popup', 'XywyService', 'UserInfoService', function ($scope, $state, $stateParams, $window, wxApi, $timeout, Popup, XywyService, UserInfoService) {
        $scope.isIos = false;
        $scope.inputFocus = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            $scope.localyyzt = "打开";
        }
        $scope.goBack = function () {
            javascript: history.go(-1);
        }
        //     	获取用户昵称
        var openid = sessionStorage.getItem("openId");
        var param = { openid: openid };
        var config = {
            params: param
        }
        var uInfo = UserInfoService.getInfo();
        var txNc = UserInfoService.getTxNc();

        $scope.nicheng = txNc.nc;
        $scope.imgurl = txNc.tx;
        $scope.gxqm = uInfo.gxQianMing;//个性签名

        $scope.gotoInfoEdit = function () {
            var wantTo = { name: "huiyuan", para: null };
            $window.sessionStorage.setItem("wantTo", JSON.stringify(wantTo));
            var uid = null;
            if (uInfo) {
                uid = uInfo.id;
            }
            $state.go("dangAnEdit", { self: "1", id: uid });
        };
        //    	 判断语音状态
        if (localStorage.getItem("yyzhuangtai") == "禁止") {
            $scope.yuyin = { name: "关", value: false };
        } else {
            $scope.yuyin = { name: "开", value: true };

        }
        $scope.yuyinclick = function (zhuangtai) {
            if (zhuangtai == false) {
                //    			 $scope.yuyin="关"
                localStorage.setItem("yyzhuangtai", "禁止");
            } else {
                //    			 $scope.yuyin="开"
                localStorage.setItem("yyzhuangtai", "打开");
            }
        }
        //    	 朋友圈
        $scope.pengyouquan = function () {
            //    		alert("ceshi");
        }
        //    	 关于我们
        $scope.guanyu = function () {
            $state.go("guanyu");
        }

        //    	 我的收藏
        $scope.wdsc = function () {
            $state.go("wdscMain");
        }
        //我的消息
        $scope.gomyMessage = function () {
            $state.go("myMessage");
        }
        $scope.tucao = function () {
            $state.go("tucao");
        }
        $scope.jlhd = function () {
            $state.go("jlhd");
        }
        // 疾病手术编码查询
        $scope.jbssbmcx = function () {
            $state.go("jbssbmcx", { gn: "JBSSBMCX" });
        }


        // 家庭健康档案
        $scope.jtjkda = function () {
            var grxx = null;
            XywyService.query("/queryGeRenJtda", config)
                .then(function (response) {
                    grxx = response;
                    if (grxx.data && grxx.data.length > 0) {
                        $state.go("dangAnList");
                    } else {
                        $state.go("dangAnEdit", { self: "1", id: null });
                    }
                }, Popup.alert);


        }
        //判断是否有新消息
        $scope.getallmessage = function () {
            var fiter = {}
            fiter.userId = sessionStorage.getItem("openId");
            fiter.pageNum = "1"
            XywyService.save("/member/message/determineNewMessage", fiter)
                .then(function (data) {
                    $scope.havenewmessage = data.data.all
                }).catch(function (err) {
                    console.log(err)
                })
        }
        $scope.getallmessage()



    }])

    /**
     * 吐槽
     */
    .controller('tucao', ['$scope', '$state', '$stateParams', '$window', 'wxApi', '$timeout', 'XywyService', 'Upload', 'Popup', '$ionicPopup', '$rootScope', function ($scope, $state, $stateParams, $window, wxApi, $timeout, XywyService, Upload, Popup, $ionicPopup, $rootScope) {
        $scope.isIos = false;
        $scope.inputFocus = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            $scope.localyyzt = "打开";
        }
        $scope.isClick = true;
        $scope.textarCHange = function (textare) {
            if (textare.length >= 10 && textare.length <= 500) {
                $scope.isClick = false;
            } else {
                $scope.isClick = true;
            }
        }
        //     	手机号验证
        $scope.phoneyz = function (phonenum) {
            if (!phonenum) {
                $scope.phonetishi = false;
                return;
            }
            //     		正则表达式
            var zhengze = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            var len = (phonenum + "").length;
            if (len != 11) {
                $scope.phonetishi = true;
                return;
            }
            if (zhengze.test(phonenum)) {
                $scope.phonetishi = false;
            } else {
                $scope.phonetishi = true;
            }
        }
        $scope.listimg = [];
        $scope.listimgname = [];
        $scope.list = [];
        //    	添加图片
        $scope.upload = function (files) { //上传头像
            if (!files) {
                return false;
            }
            if (files.length > 10) {
                files = files.slice(0, 10);
            }
            var data = {};
            //                 data.file = files;
            data.staffCode = sessionStorage.getItem("openId");
            data.files = files;

            Upload.upload({
                url: myConfig.serverUrl + '/baocunimg',
                data: data
            }).success(function (response) {
                //                     console.log(response);
                if (response) {
                    //                    	 用于保存反馈信息中的图片信息
                    //                    	 $scope.list[$scope.list.length]=response;
                    for (var i = 0; i < response.length; i++) {
                        if ($scope.list.length < 10) {
                            $scope.list.push(response[i]);
                            if ($scope.listimg.length > 0) {
                                $scope.listimg[$scope.listimg.length] = response[i].backpath;
                                $scope.listimgname[$scope.listimgname.length] = response[i].fileName;
                            } else {
                                $scope.listimg[0] = response[i].backpath;
                                $scope.listimgname[0] = response[i].fileName;
                            }
                        }
                    }
                }
            }).error(function (file) {
                //上传失败
                console.log(file);
            });
            console.log($scope.listimg);
        };
        //        返回
        $scope.goBack = function () {
            javascript: history.go(-1);
        }
        //        提交点击事件
        $scope.aretext = "";
        $scope.sessts = false;
        $scope.tijiaoclick = function () {
            var param = {};
            param.list = $scope.list;
            param.imgname = $scope.listimgname;
            param.userId = sessionStorage.getItem("openId");
            var textare = document.getElementById("textare");
            var tucaovalue = textare.value;
            param.fanKui = tucaovalue;
            var phonenum = document.getElementById("inputnum");
            param.phone = phonenum.value;
            var params = [];
            params[0] = param;
            //保存数据 {imgname:param.imgname,userId:param.userId,fanKui:param.fanKui,phone:param.phone}
            XywyService.save('/savetcfankui', param)
                .then(function (res) {
                    if (res.data.respCode == "0000") {
                        var myPopup = $ionicPopup.show({
                            template: '提交成功，谢谢您的反馈！',
                            title: '提示',
                            scope: $scope,
                        });
                        //        		  清除当前输入信息以及图片信息
                        $scope.listimg = [];
                        $scope.list = [];
                        phonenum.value = "";
                        textare.value = "";

                        $timeout(function () {
                            myPopup.close(); //由于某种原因3秒后关闭弹出
                            javascript: history.go(-1);
                        }, 2000);
                    } else {
                        var myPopup = $ionicPopup.show({
                            template: '提交失败，请重试！',
                            title: '提示',
                            scope: $scope,
                        });

                        $timeout(function () {
                            myPopup.close(); //由于某种原因3秒后关闭弹出
                        }, 2000);
                    }
                });
        }
        //        图片预览功能
        $scope.showimg = function (index) {
            //        	$scope.isshowimg=true;
            //        	$scope.indeximg=index;
            var yulan = {
                index: index,
                listimg: $scope.listimg,
                list: $scope.list
            }
            sessionStorage.setItem("imgyulan", JSON.stringify(yulan));
            $state.go("tpyulan");
        }
        $rootScope.$on('tpyulan', function (event, yulan) {
            $scope.listimg = yulan.listimg;
            $scope.list = yulan.list;
        });
        //        向左滑动或点击上一页图标
        $scope.shangyiye = function () {
            //        	当$index为0时滑动事件不执行上一页操作
            if ($scope.indeximg == 0) {
                return;
            }
            $scope.indeximg = $scope.indeximg - 1;
        }
        //        向右滑动或点击下一页图片执行的方法
        $scope.xiayiye = function () {
            if ($scope.indeximg == $scope.list.length - 1) {
                return;
            }
            $scope.indeximg = $scope.indeximg + 1;
        }
        //        取消预览
        $scope.quxiao = function () {
            $scope.isshowimg = false;
        }
        //        删除上传的图片
        $scope.deleteimg = function () {
            Popup.confirm(["提示", "要删除这张图片吗？"], function () {
                $scope.list.splice($scope.indeximg, 1);
                $scope.listimg.splice($scope.indeximg, 1);
                //            	如果图片数组数据被删空则取消预览
                if ($scope.list.length == 0) {
                    $scope.isshowimg = false;
                }
                //            	判断删除图片下标
                if ($scope.list.length > 0) {
                    if ($scope.indeximg > 0) {
                        $scope.indeximg = $scope.indeximg - 1;
                    }
                }
            }, function () {

            });
            //        	$scope.list.splice($scope.indeximg,1);
            //        	$scope.listimg.splice($scope.indeximg,1);
            ////        	如果图片数组数据被删空则取消预览
            //        	if($scope.list.length==0){
            //        		$scope.isshowimg=false;
            //        	}
            ////        	判断删除图片下标
            //        	if($scope.list.length>0){
            //        		if($scope.indeximg>0){
            //        			$scope.indeximg=$scope.indeximg-1;
            //        		}
            //        	}
        }
        //        手机号获得焦点时的操作（用于手机键盘弹出时输入框位置变更）
        //        $scope.focusphone=function(){
        //        	var pannel=document.getElementById("fromid");
        //        	$timeout(function(){
        //        		pannel.scrollIntoView(true);
        //        		pannel.scrollIntoViewIfNeeded();
        //        	},200);	
        //        }
    }])
    /**
     * 关于我们
     */
    .controller('guanyu', ['$scope', '$state', '$stateParams', '$window', 'wxApi', '$timeout', '$interval', '$ionicPopup', function ($scope, $state, $stateParams, $window, wxApi, $timeout, $interval, $ionicPopup) {
        $scope.isIos = false;
        $scope.inputFocus = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            $scope.localyyzt = "打开";
        }
        $scope.goBack = function () {
            javascript: history.go(-1);
        }

    }])
    /**
     * 交流互动
     */
    .controller('jlhdC', ['$scope', '$state', '$stateParams', '$window', 'wxApi', '$timeout', function ($scope, $state, $stateParams, $window, wxApi, $timeout) {
        $scope.isIos = false;
        $scope.inputFocus = false;
        document.oncontextmenu = function (e) {
            e.preventDefault();
        };
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
        }
        $scope.goBack = function () {
            javascript: history.go(-1);
        }
    }])
    /***
     * 问疾病列表展示
     */
    .controller('wenjibinglist', ['$scope', '$state', '$stateParams', '$window', 'wxApi', '$timeout', 'XywyService', 'Popup', '$ionicScrollDelegate', function ($scope, $state, $stateParams, $window, wxApi, $timeout, XywyService, Popup, $ionicScrollDelegate) {
        $scope.isIos = false;
        $scope.inputFocus = false;
        document.oncontextmenu = function (e) {
            e.preventDefault();
        };
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
        }
        $scope.goBack = function () {
            javascript: history.go(-1);
        }
        $scope.data = {};
        /**
         * 查询疾病列表
         */
        function jibinglist() {
            cleanZimuColor();
            $ionicScrollDelegate.$getByHandle('dashboard').scrollTop(false);
            $scope.pageNum = 1;
            var param = {
                pageNum: $scope.pageNum,
                zimu: $scope.zimu,
                input: $scope.data.keyword

            };
            var config = {
                params: param
            }

            XywyService.query("/queryjblist", config)
                .then(function (response) {
                    $scope.pageCount = response.data.Count;
                    $scope.jbList = response.data.list;
                    if ($scope.jbList.length == 0) {
                        $scope.task_hasMoreItem = false;
                        $scope.reusltNullTip = "暂无相关搜索结果！";
                    } else {
                        if ($scope.pageCount == 1) {
                            $scope.task_hasMoreItem = false;
                            $scope.reusltNullTip = "已加载全部！"
                        }
                    }
                }, Popup.alert);
            //     		document.body.scrollTop=0;
        }
        jibinglist();
        //输入框清除
        $scope.clean = function () {
            $scope.reusltNullTip = "已加载全部";
            $scope.data.keyword = "";
            $scope.zimu = "";
            $scope.data.searchSuc = false;
            cleanZimuColor();
            if ($scope.showname == "全部疾病") {
                jibinglist();
            } else {
                cjjibinglist();
            }
        };
        //        查询事件
        $scope.searchDrug = function () {
            //        	清除字母
            $scope.zimu = "";
            //        	查询疾病list
            //jibinglist();
            if ($scope.showname == "全部疾病") {
                jibinglist();
            } else {
                cjjibinglist();
            }
        }
        $scope.gojibingdetail = function (id, value) {
            $state.go('wenjibingdetail', { id: id, estype: "jb", viewTitle: value });
        }
        //上拉加载更多数据
        $scope.loadMicMore = function () {
            $scope.pageNum += 1;
            if ($scope.pageNum <= $scope.pageCount) {
                //隐藏无数据提示
                $scope.task_hasMoreItem = true;
                var postParams = {
                    params: {
                        pageNum: $scope.pageNum,
                        zimu: $scope.zimu,
                        input: $scope.data.keyword
                    }
                };
                if ($scope.showname == "全部疾病") {
                    XywyService.query("/queryjblist", postParams)
                        .then(function (response) {
                            angular.forEach(response.data.list, function (child) {
                                $scope.jbList.push(child);
                            });
                            //禁止上拉滑动
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        });
                } else {
                    XywyService.query("/querycjjblist", postParams)
                        .then(function (response) {
                            angular.forEach(response.data.list, function (child) {
                                $scope.jbList.push(child);
                            });
                            //禁止上拉滑动
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        });
                }

            } else {
                //显现提示
                $scope.task_hasMoreItem = false;
                if ($scope.jbList.length == 0) {
                    $scope.reusltNullTip = "暂无相关搜索结果！";
                } else {
                    $scope.reusltNullTip = "已加载全部";
                }

                //隐藏上拉加载
                $scope.isShow = true;
                //禁止上拉滑动
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        };
        $scope.zimuquery = function (zimu) {
            $scope.loadMicMore();
        }
        //        接收广播
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
            if ($scope.showname == "全部疾病") {
                jibinglist();
            } else {
                cjjibinglist();
            }

            //        	2s后隐藏字母
            $scope.ishsowzimu = true;
            $timeout(function () {
                $scope.ishsowzimu = false;
            }, 2000);
        });
        //        下拉刷新
        $scope.micRefresh = function () {
            //隐藏无数据提示
            $scope.task_hasMoreItem = true;
            if ($scope.showname == "全部疾病") {
                jibinglist();
            } else {
                cjjibinglist();
            }
            $scope.$broadcast('scroll.refreshComplete');
        }

        function cleanZimuColor() {
            if ($(".city_anchor").children(".target").length > 0) {
                $(".city_anchor").children(".target").each(function () { $(this).removeClass("target") });
            }
        }
        /**
         * 常见疾病查询
         */
        function cjjibinglist() {
            cleanZimuColor();
            $ionicScrollDelegate.$getByHandle('dashboard').scrollTop(false);
            $scope.pageNum = 1;
            var param = {
                pageNum: $scope.pageNum,
                zimu: $scope.zimu,
                input: $scope.data.keyword

            };
            var config = {
                params: param
            }

            XywyService.query("/querycjjblist", config)
                .then(function (response) {
                    $scope.pageCount = response.data.Count;
                    $scope.jbList = response.data.list;
                    if ($scope.jbList.length == 0) {
                        $scope.task_hasMoreItem = false;
                        $scope.reusltNullTip = "暂无相关搜索结果！";
                    } else {
                        if ($scope.pageCount == 1) {
                            $scope.task_hasMoreItem = false;
                            $scope.reusltNullTip = "已加载全部！"
                        }
                    }
                }, Popup.alert);
            //     		document.body.scrollTop=0;
        }

        $scope.flag1 = true;
        $scope.showname = "全部疾病";
        //全部疾病
        $scope.quanbuClick = function () {
            $scope.zimu = "";
            $scope.flag1 = true;
            $scope.flag2 = false;
            $scope.showname = "全部疾病";
            jibinglist();
        }
        //常见疾病
        $scope.changjianClick = function () {
            $scope.zimu = "";
            $scope.flag1 = false;
            $scope.flag2 = true;
            $scope.showname = "常见疾病";
            cjjibinglist();
        };
        // 菜单点击
        $scope.changeButton = function () {
            if ($scope.isShowPx == true) {
                $scope.isShowPx = false;
            } else {
                $scope.isShowPx = true;
            }
        }
        // 下拉菜单项点击查询
        $scope.currentPx = 1;
        $scope.menuSearch = function (index) {
            $scope.currentPx = index;
            $scope.isShowPx = false;
            if (index == 1) {
                $scope.quanbuClick();
            } else {
                $scope.changjianClick();
            }
        };
        $scope.goserch = function () {
            $state.go("jibingserch", { gn: "jb" });
        }

    }])


    /**
     * 图片预览
     */
    .controller('tpyulan', ['$scope', '$state', '$stateParams', '$window', 'wxApi', '$timeout', '$rootScope', 'Popup', function ($scope, $state, $stateParams, $window, wxApi, $timeout, $rootScope, Popup) {
        $scope.isIos = false;
        $scope.inputFocus = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            $scope.localyyzt = "打开";
        }
        $scope.goBack = function () {
            javascript: history.go(-1);
        }
        var yulan = $.parseJSON(sessionStorage.getItem("imgyulan"));
        $scope.listimg = yulan.listimg;
        $scope.list = yulan.list;
        $scope.indeximg = yulan.index;
        //     	删除操作
        $scope.shanchu = function (index) {
            Popup.confirm(["提示", "要删除这张图片吗？"], function () {
                $scope.list.splice($scope.indeximg, 1);
                $scope.listimg.splice($scope.indeximg, 1);
                $rootScope.$broadcast('tpyulan', {
                    list: $scope.list,
                    listimg: $scope.listimg

                });
                //            	如果图片数组数据被删空则取消预览
                if ($scope.list.length == 0) {
                    javascript: history.go(-1);
                }
                //            	判断删除图片下标
                if ($scope.list.length > 0) {
                    if ($scope.indeximg > 0) {
                        $scope.indeximg = $scope.indeximg - 1;
                    }
                }
            }, function () {

            });

        }
        //      向左滑动或点击上一页图标
        $scope.shangyiye = function () {
            //        	当$index为0时滑动事件不执行上一页操作
            if ($scope.indeximg == 0) {
                return;
            }
            $scope.indeximg = $scope.indeximg - 1;
        }
        //        向右滑动或点击下一页图片执行的方法
        $scope.xiayiye = function () {
            if ($scope.indeximg == $scope.list.length - 1) {
                return;
            }
            $scope.indeximg = $scope.indeximg + 1;
        }
        //      延迟隐藏标题  
        $scope.isshow = true;
        $timeout(function () {
            $scope.isshow = false;
        }, 3000);
        //        显示标题（删除和返回）
        $scope.showtitle = function () {
            $scope.isshow = !$scope.isshow;
        }

    }])
    /***
     * 药品列表展示
     */
    .controller('yaopinlist', ['$scope', '$state', '$stateParams', '$window', 'wxApi', '$timeout', 'XywyService', 'Popup', '$ionicScrollDelegate', function ($scope, $state, $stateParams, $window, wxApi, $timeout, XywyService, Popup, $ionicScrollDelegate) {
        $scope.isIos = false;
        $scope.inputFocus = false;
        document.oncontextmenu = function (e) {
            e.preventDefault();
        };
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
        }
        $scope.goBack = function () {
            javascript: history.go(-1);
        }
        var leixing = $stateParams.leixing;
        if (leixing === "药品") {
            $scope.biaoti = "药品列表";
            $scope.title = "请选择您想要了解的药品：";
        } else if (leixing === "症状") {
            $scope.biaoti = "症状列表";
            $scope.title = "请选择您想要了解的症状：";
        } else if (leixing === "检验") {
            $scope.biaoti = "检验列表";
            $scope.title = "请选择您想要了解的检验指标：";
        } else if (leixing === "疾病") {
            $scope.biaoti = "疾病列表";
            $scope.title = "请选择您想要了解的疾病：";
        } else if (leixing === "手术") {
            $scope.biaoti = "手术列表";
            $scope.title = "请选择您想要了解的手术：";
        }
        $scope.data = {};
        $scope.ypList = angular.fromJson(sessionStorage.getItem("yaopinlist"));
        $scope.goyaopindetail = function (id) {
            if (leixing === "药品") {
                $state.go('wenyaodetail', { id: id, estype: "yp" });
            } else if (leixing === "症状") {
                $state.go('changjianzzdetail', { id: id, estype: "zz" });
            } else if (leixing === "检验") {
                $state.go('jianyanzhibiao', { id: id, estype: "jcjy" });
            } else if (leixing === "疾病") {
                $state.go('wenjibingdetail', { id: id, estype: "jb" });
            }else if (leixing === "手术") {
                $state.go('shouShuDetail', { id: id, estype: "ss" });
            }

        }

    }])
    /***
     * 我的消息
     */
    .controller('myMessage', function (wxApi, $ionicViewSwitcher, $scope, $http, $state, $stateParams, $timeout, XywyService, Popup, Outlet, $ionicScrollDelegate, audioControl, $window, $rootScope, geoLocation, $ionicModal, $ionicLoading, GoZzJbYp) {
        //判断手机类型
        $scope.isIos = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
        }
        //返回上一页
        $scope.goBack = function () {
            $window.history.back();
        };
        //首页
        $scope.back = function () {
            var openid = sessionStorage.getItem("openId");
            $ionicViewSwitcher.nextDirection('back');
            var token = sessionStorage.getItem("token");
            if (sessionStorage.getItem('hosorgCode')) {
                var yxzsurl = sessionStorage.getItem('yxzsurl');
                var hosorgCode = sessionStorage.getItem('hosorgCode');
                $state.go("yiyuanshouye", {
                    hosorgCode: hosorgCode,
                    openid: openid,
                    token: token,
                    yxzsurl: yxzsurl
                });
            } else {
                $state.go("shouye", {
                    openid: openid,
                    token: token
                });
            }
        };

        //判断是否有新消息
        $scope.getjkqmessage = function () {
            var fiter = {}
            fiter.userId = sessionStorage.getItem("openId");
            fiter.pageNum = "1"
            XywyService.save("/member/message/determineNewMessage", fiter)
                .then(function (data) {
                    $scope.havenewjkqmessage = data.data.jkq
                    $scope.havenewbgtxmessage = data.data.bgtx
                    $scope.getjkqlist()
                    $scope.getbgtxlist()
                }).catch(function (err) {
                    console.log(err)
                })
        }
        //获取健康圈列表
        $scope.getjkqlist = function () {
            var fiter = {}
            fiter.userId = sessionStorage.getItem("openId");
            fiter.pageNum = "1"
            XywyService.save("/member/message/getJkqMessageList", fiter)
                .then(function (data) {
                    if (data.data.dataList.length > 0) {
                        $scope.jkqtime = data.data.dataList[0].hfsj
                        $scope.jkqname = data.data.dataList[0].username
                        $scope.jkqtype = data.data.dataList[0].hflx
                    }
                    if ($scope.havenewjkqmessage) {
                        if ($scope.jkqtype == 'hf') {
                            $scope.jkqmessage = $scope.jkqname + "回复了您的帖子";
                        }
                        if ($scope.jkqtype == 'pl') {
                            $scope.jkqmessage = $scope.jkqname + "评论了您的消息";
                        }
                    } else {
                        $scope.jkqmessage = "暂无消息";
                    }
                    if ($scope.havenewbgtxmessage) {
                        $scope.bgtxmessage = "您有一份报告结果待确认。";
                    } else {
                        $scope.bgtxmessage = "暂无消息";
                    }

                }).catch(function (err) {
                    console.log(err)
                })
        }
        //获取体检报告列表
        $scope.getbgtxlist = function () {
            var fiter = {}
            fiter.userId = sessionStorage.getItem("openId");
            fiter.pageNum = "1"
            XywyService.save("/member/message/getBgtxMessageList", fiter)
                .then(function (data) {
                    if (data.data.dataList.length > 0) {
                        $scope.bgtxtime = data.data.dataList[0].updateTime
                    }

                }).catch(function (err) {
                    console.log(err)
                })
        }
        $scope.getjkqmessage()



        // $scope.gettjbgmessage()
        $scope.gomessagelist = function (type) {
            if (type == 'jkq') {
                $state.go("messageList", { type: type });
            }
            if (type == 'bgtx') {
                $state.go("messageList", { type: type });
            }
        }


    })
    /***
     * 消息列表
     */
    .controller('messageList', function (wxApi, $ionicViewSwitcher, $scope, $http, $state, $stateParams, $timeout, XywyService, Popup, Outlet, $ionicScrollDelegate, audioControl, $window, $rootScope, geoLocation, $ionicModal, $ionicLoading, GoZzJbYp) {
        //判断手机类型
        $scope.isIos = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
        }
        //返回上一页
        $scope.goBack = function () {
            $window.history.back();
        };
        $scope.type = $stateParams.type
        //首页
        $scope.back = function () {
            var openid = sessionStorage.getItem("openId");
            $ionicViewSwitcher.nextDirection('back');
            var token = sessionStorage.getItem("token");
            if (sessionStorage.getItem('hosorgCode')) {
                var yxzsurl = sessionStorage.getItem('yxzsurl');
                var hosorgCode = sessionStorage.getItem('hosorgCode');
                $state.go("yiyuanshouye", {
                    hosorgCode: hosorgCode,
                    openid: openid,
                    token: token,
                    yxzsurl: yxzsurl
                });
            } else {
                $state.go("shouye", {
                    openid: openid,
                    token: token
                });
            }
        };
        //获取健康圈列表
        $scope.getjkqlist = function () {
            var fiter = {}
            fiter.userId = sessionStorage.getItem("openId");
            fiter.pageNum = "1"
            XywyService.save("/member/message/getJkqMessageList", fiter)
                .then(function (data) {
                    if (data.data.dataList.length > 0) {
                        $scope.jkqlist = data.data.dataList
                    }

                }).catch(function (err) {
                    console.log(err)
                })
        }
        //获取体检报告列表
        $scope.getbgtxlist = function () {
            var fiter = {}
            fiter.userId = sessionStorage.getItem("openId");
            fiter.pageNum = "1"
            XywyService.save("/member/message/getBgtxMessageList", fiter)
                .then(function (data) {
                    if (data.data.dataList.length > 0) {
                        $scope.bgtxlist = data.data.dataList
                    }

                }).catch(function (err) {
                    console.log(err)
                })
        }
        $scope.getdetermineNewMessage = function (type) {
            var fiter = {}
            fiter.userId = sessionStorage.getItem("openId");
            fiter.messageType = type
            XywyService.save("/member/message/modifyClickTime", fiter)
                .then(function (data) {

                }).catch(function (err) {
                    console.log(err)
                })
        }
        if ($stateParams.type == 'jkq') {
            $scope.title = "健康圈消息"
            $scope.getjkqlist()
            $scope.getdetermineNewMessage("JKQ")
        }
        if ($stateParams.type == 'bgtx') {
            $scope.title = "报告确认提醒"
            $scope.getbgtxlist()
            $scope.getdetermineNewMessage("BGTX")
        }


        $scope.gojkqdeiles = function (id) {
            $state.go("postDetail", { tzid: id });
        }
        $scope.gobgtxdeiles = function (id) {
            $state.go('tiJianBaoGaoQR', { id: id, type: 2, fid: sessionStorage.getItem("openId") })
        }




    })
    /**
     * Created by xieweiming on 2018/5/29.
     * 反馈
     */
    .controller('fankui', ['$scope', '$state', '$stateParams', '$window', 'wxApi', '$timeout', 'XywyService', 'Upload', 'Popup', '$ionicPopup', '$rootScope', '$location', function ($scope, $state, $stateParams, $window, wxApi, $timeout, XywyService, Upload, Popup, $ionicPopup, $rootScope, $location) {
        $scope.isIos = false;
        $scope.inputFocus = false;
        //获取ip地址
        $scope.ip = returnCitySN['cip']
        var config = {};
        //微信版本号
        var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            $scope.localyyzt = "打开";
        }
        $scope.isClick = true;
        $scope.ischecked = true;
        $scope.textarCHange = function (textare) {
            if (textare.length >= 10 && textare.length <= 500) {
                $scope.isClick = false;
                // $scope.ischecked = false;
            } else {
                $scope.isClick = true;
            }
        }
        //浏览器版本 终端信息
        function getBrowserInfo() {
            var agent = navigator.userAgent.toLowerCase();
            // console.log(agent);
            var arr = [];
            var system = agent.split(' ')[1].split(' ')[0].split('(')[1];
            arr.push(system);
            var regStr_edge = /edge\/[\d.]+/gi;
            var regStr_ie = /trident\/[\d.]+/gi;
            var regStr_ff = /firefox\/[\d.]+/gi;
            var regStr_chrome = /chrome\/[\d.]+/gi;
            var regStr_saf = /safari\/[\d.]+/gi;
            var regStr_opera = /opr\/[\d.]+/gi;
            //IE
            if (agent.indexOf("trident") > 0) {
                arr.push(agent.match(regStr_ie)[0].split('/')[0]);
                arr.push(agent.match(regStr_ie)[0].split('/')[1]);
                return arr;
            }
            //Edge
            if (agent.indexOf('edge') > 0) {
                arr.push(agent.match(regStr_edge)[0].split('/')[0]);
                arr.push(agent.match(regStr_edge)[0].split('/')[1]);
                return arr;
            }
            //firefox
            if (agent.indexOf("firefox") > 0) {
                arr.push(agent.match(regStr_ff)[0].split('/')[0]);
                arr.push(agent.match(regStr_ff)[0].split('/')[1]);
                return arr;
            }
            //Opera
            if (agent.indexOf("opr") > 0) {
                arr.push(agent.match(regStr_opera)[0].split('/')[0]);
                arr.push(agent.match(regStr_opera)[0].split('/')[1]);
                return arr;
            }
            //Safari
            if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
                arr.push(agent.match(regStr_saf)[0].split('/')[0]);
                arr.push(agent.match(regStr_saf)[0].split('/')[1]);
                return arr;
            }
            //Chrome
            if (agent.indexOf("chrome") > 0) {
                arr.push(agent.match(regStr_chrome)[0].split('/')[0]);
                arr.push(agent.match(regStr_chrome)[0].split('/')[1]);
                return arr;
            } else {
                arr.push('请更换主流浏览器，例如chrome,firefox,opera,safari,IE,Edge!')
                return arr;
            }
        }

        //获取多选框信息
        $scope.listvalue = function () {
            XywyService.query("/pingjia/getwenti", config)
                .then(function (data) {
                    $scope.fankuiyijianlist = data.data
                    for (var i = 0; i < $scope.fankuiyijianlist.length; i++) {
                        $scope.fankuiyijianlist[i].checked = false
                    }
                })
        }
        // console.log( $scope.ip,"23")
        $scope.listvalue();
        // 手机号验证
        $scope.phoneyz = function (phonenum) {
            if (!phonenum) {
                $scope.phonetishi = false;
                return;
            }
            //     		正则表达式
            var zhengze = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
            var len = (phonenum + "").length;
            if (len != 11) {
                $scope.phonetishi = true;
                return;
            }
            if (zhengze.test(phonenum)) {
                $scope.phonetishi = false;
            } else {
                $scope.phonetishi = true;
            }
        }
        $scope.listimg = [];
        $scope.listimgname = [];
        $scope.list = [];
        //多选框id集合
        $scope.jutiwenti = [];
        //多选框点击操作
        $scope.changeOrderType = function (checked, id) {
            if (checked) {
                $scope.jutiwenti.push(id);
                $scope.ischecked = false;
                // $scope.isClick = false;
                // console.log($scope.ischecked,"8989")
            } else {
                var index = $scope.jutiwenti.indexOf(id)
                $scope.jutiwenti.splice(index, 1)
                $scope.ischecked = true;
                // console.log($scope.ischecked,"4559")
            }
        }
        //添加图片
        $scope.upload = function (files) { //上传头像
            if (!files) {
                return false;
            }
            if (files.length > 10) {
                files = files.slice(0, 10);
            }
            var data = {};
            //                 data.file = files;
            data.staffCode = sessionStorage.getItem("openId");
            data.files = files;

            Upload.upload({
                url: myConfig.serverUrl + '/baocunimg',
                data: data
            }).success(function (response) {
                //                     console.log(response);
                if (response) {
                    //                    	 用于保存反馈信息中的图片信息
                    //                    	 $scope.list[$scope.list.length]=response;
                    for (var i = 0; i < response.length; i++) {
                        if ($scope.list.length < 10) {
                            $scope.list.push(response[i]);
                            if ($scope.listimg.length > 0) {
                                $scope.listimg[$scope.listimg.length] = response[i].backpath;
                                $scope.listimgname[$scope.listimgname.length] = response[i].fileName;
                            } else {
                                $scope.listimg[0] = response[i].backpath;
                                $scope.listimgname[0] = response[i].fileName;
                            }
                        }
                    }
                }
            }).error(function (file) {
                //上传失败
                console.log(file);
            });
            // console.log($scope.listimg);
        };
        // console.log( $scope.listimg)
        // 返回
        $scope.goBack = function () {
            javascript: history.go(-1);
        }
        //提交点击事件
        $scope.aretext = "";
        $scope.sessts = false;
        // console.log($window.localStorage,"0987");
        $scope.tijiaoclick = function () {
            var param = {};
            param.hhId = $window.sessionStorage.getItem('hhid');
            param.jutiwenti = $scope.jutiwenti;
            param.picture = {}
            param.picture.list = $scope.list;
            param.ip = $scope.ip;
            param.llqbb = getBrowserInfo();
            param.zdxx = getBrowserInfo();
            param.sjxt = "";
            if (!wechatInfo) {
                param.wxbb = "";
            } else {
                param.wxbb = wechatInfo[1];
            }

            // param.picture.imgname = $scope.listimgname;
            param.userId = sessionStorage.getItem("openId");
            var textare = document.getElementById("textare");
            var tucaovalue = textare.value;
            param.youhuajianyi = tucaovalue;
            var phonenum = document.getElementById("inputnum");
            param.phonenum = phonenum.value;
            var params = [];
            params[0] = param;
            console.log(param, "777")
            XywyService.save('/pingjia/setpingjia', param)
                .then(function (res) {
                    if (res) {
                        var myPopup = $ionicPopup.show({
                            template: '提交成功，谢谢您的反馈！',
                            title: '提示',
                            scope: $scope,
                        });
                        // 清除当前输入信息以及图片信息
                        $scope.listimg = [];
                        $scope.list = [];
                        phonenum.value = "";
                        textare.value = "";
                        $scope.jutiwenti = [];
                        $scope.isClick = true;
                        $scope.ischecked = true;
                        $scope.listvalue();


                        $timeout(function () {
                            myPopup.close(); //由于某种原因3秒后关闭弹出
                            $scope.$emit("panduan", false)
                            javascript: history.go(-1);

                        }, 2000);
                    } else {
                        var myPopup = $ionicPopup.show({
                            template: '提交失败，请重试！',
                            title: '提示',
                            scope: $scope,
                        });

                        $timeout(function () {
                            myPopup.close(); //由于某种原因3秒后关闭弹出
                        }, 2000);
                    }
                });
        }
        //        图片预览功能
        $scope.showimg = function (index) {
            //        	$scope.isshowimg=true;
            //        	$scope.indeximg=index;
            var yulan = {
                index: index,
                listimg: $scope.listimg,
                list: $scope.list
            }
            sessionStorage.setItem("imgyulan", JSON.stringify(yulan));
            $state.go("tpyulan");
        }
        $rootScope.$on('tpyulan', function (event, yulan) {
            $scope.listimg = yulan.listimg;
            $scope.list = yulan.list;
        });


    }])