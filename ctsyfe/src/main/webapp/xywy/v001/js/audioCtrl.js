angular.module('starter.audioCtrl', [])
    /**
         * 百度语音接口
         */
    .constant('baiduAudio', myConfig.serverUrl + "/text2audio?lan=zh&ie=UTF-8&spd=5&text=")
    /**
     * 统一语音播放控制（除开始结束播放提示音）
     */
    .service('audioControl', ['Popup', '$rootScope', 'baiduAudio', '$q', '$log', '$timeout', function (Popup, $rootScope, baiduAudio, $q, $log, $timeout) {
        var self = this;
        var isIos = false;
        if (sessionStorage.getItem('isIos') == true || sessionStorage.getItem('isIos') == 'true') {
            isIos = sessionStorage.getItem('isIos');
        }
        $rootScope.$on('$locationChangeStart', function () {
            //跳转时暂停
            self.pause();
        });

        var playingContent, src;
        this.audio = {
            pause: angular.noop,
            play: angular.noop,
            paused: false
        };

        //暂停
        this.pause = function () {
            //设置下次播放从开始播放
            //this.audio.currentTime = 0;
            this.audio.pause();
        };
        //播放完后播放“选择问诊人”
        function endedFun() {
            var el = document.getElementsByClassName("currentPlay");
            if (el.length > 0) {
                el[0].classList.remove('currentPlay')
            }
            var wzr = document.querySelector('.xzwzr');
            if (!wzr) {
                self.pause();
                return;
            }
            var wzrVoiceP = document.querySelector('.xzwzr .voiceP');
            if (wzrVoiceP) {
                if (isIos) {
                    WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                        self.play(wzrVoiceP.innerText);
                    });
                } else {
                    self.play(wzrVoiceP.innerText);
                }

            }
            wzr.classList.remove("xzwzr");
        }
        var barEnded = function () {
            playingContent = null; //清空当前播放内容
            $rootScope.$broadcast('playEnded');
        };
        /**
         * 开始播放，同一内容连续调用根据是否播放完决定
         * @param content 文字内容
         */
        this.play = function (content) {
            if (!content) {
                if (this.audio.paused) {
                    //捕获各种异常（无法自动播放、未加载完就调用pause等）
                    //alert(playingContent);
                    //this.audio = new Audio(baiduAudio + encodeURIComponent(playingContent.substr(0, 800)));
                    $q.when(this.audio.play(), angular.noop, $log.warn);


                    // WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                    //     $q.when(this.audio.play(), angular.noop, $log.warn);
                    // });
                } else {
                    this.pause();
                }
            } else {
                if (!angular.isString(content)) {
                    throw TypeError('语音参数为字符串');
                }
                content = content.trim();
                content = content.replace(/<[^>]+>/g, "");
                if (content !== playingContent) {
                    //alert(typeof(content) + "|" + content + "|" + "~" + typeof(playingContent) + "|" + playingContent + "|");

                    if (typeof playingContent == "undefined" || this.audio.paused) {
                        this.pause();
                        playingContent = content;
                    } else {
                        this.pause();
                        playingContent += content;
                    }
                    this.audio = new Audio(baiduAudio + encodeURIComponent(playingContent.substr(0, 800)));

                    if (arguments[1] == "ctrBar") {
                        // 如果是刷新添加播报问诊人
                        //this.audio.addEventListener('ended', endedFun, false);
                        //播放控制条播放完事件
                        this.audio.addEventListener('ended', barEnded, false);

                    }
                    //捕获各种异常（无法自动播放、未加载完就调用pause等）
                    $q.when(this.audio.play(), angular.noop,
                        function (error) {
                            $log.warn(error, 123)
                        });

                } else {
                    this.play();

                }
            }
        };
    }])
    /**
    * 语音播放指令
    * 将需要语音播放的内容放在此元素内
    <audio-content>
    <div>需要语音播放</div>
    </audio-content>
    */
    .directive('audioContent', ['audioControl', 'Popup', '$state', function (audioControl, Popup, $state) {
        return {
            scope: {
                isClickPlay: "@"
            },
            restrict: 'ACE',
            transclude: true,
            //             如果增加单击双击事件时，将ng-click改为sglclick="clickPlay()" dblglclick="doubleclick()"
            template: '<div class="icon iconfont icon-yuyin1" ng-click="clickPlay()" style="word-break:break-all;display:flex;" ng-transclude ng-clickPlay></div>',
            link: function ($scope, iElm, iAttrs, controller) {

                $scope.clickPlay = function () {
                    /*                	var parent=iElm[0].parentElement;
                                        var p=parent.querySelector('[showallp]');
                                        var showaudio=parent.querySelector('[showaudio]');
                                        var eventi=parent.querySelector('[changei]');
                    //                	判断p是否存在
                    //                	if(p){
                                        if(showaudio){	
                    //                		if(p.className=="showf ng-binding"||p.className=="ng-binding showf"){
                                            if(showaudio.className=="hide"){
                                                showaudio.className="";
                    //                    		p.className="f ng-binding";
                                                eventi.className="icon ion-chevron-down activated";
                                            }else{
                                                showaudio.className="hide";
                    //                    		p.className="showf ng-binding";
                                                eventi.className="icon ion-chevron-right activated";
                                            }
                                        }*/

                    //                	判断语音状态是否是打开状态
                    //                	if(localStorage.getItem("yyzhuangtai") === "打开"){
                    if (typeof $scope.isClickPlay == 'undefined') {
                        $scope.isClickPlay = true;
                    }
                    if ($scope.isClickPlay == true) {
                        audioControl.play(iElm[0].textContent);
                    }
                    //                	}

                };
                //                双击事件执行方法
                $scope.doubleclick = function () {
                    //                	Popup.zhanshi(iElm[0].textContent);
                    $state.go("textshow", {
                        textxq: iElm[0].textContent
                    });
                }
            }
        };
    }])
    /**
     * 语音播放控制条,停止、下一段、上一段、关闭
     * 
     <audio-control>
     */
    .directive('audioCtrlBar', ['audioControl', '$rootScope', 'JsUtil', function (audioControl, $rootScope, JsUtil) {
        return {
            scope: {
                items: "@",
                isShow: "="
            },
            restrict: 'AEC',
            transclude: true,
            template: '<div id="maskLayer" ng-show="menuBodyShow"></div><div class="audio-ctrl" ng-class="{true:\'ios\',false:\'andrio\'}[isIos||isIos==\'true\']" ng-show="isShow==1"><div><i class="icon iconfont icon-yuyin1 voiceI"></i><span ng-click="switchMenuBody()">正在收听： <span ng-if="selectPlayIndex==null">全部</span><span ng-if="selectPlayIndex!=null">{{datas[selectPlayIndex].title|limitTo:4}}</span><i class="icon iconfont icon-menu audio-menu"></i></span></div><div class="ctrl-buts"><i class="icon iconfont icon-xiangshang" ng-class="{true:\'disabled\',false:\'\'}[playing==0]" ng-disabled="playing==0" ng-click="up()"></i><i class="icon iconfont icon-zanting" ng-if="!isZanTing" ng-click="zanTing()"></i><i class="icon iconfont icon-bofang" ng-if="isZanTing" ng-click="boFang()"></i><i class="icon iconfont icon-xiangxia" ng-class="{true:\'disabled\',false:\'\'}[playing>=datas.length-1]" ng-disabled="playing>=datas.length-1" ng-click="next()"></i><i class="icon iconfont icon-guanbi" ng-click="close()"></i></div></div><div class="audio-menu-body" ng-show="menuBodyShow" ng-class="{true:\'ios\',false:\'andrio\'}[isIos||isIos==\'true\']"><ion-scroll><ul><li ng-click="allPlay()" ng-class="{true:\'playing\',false:\'\'}[allplay]">全部</li><li ng-repeat="item in datas" ng-bind="item.title" ng-class="{true:\'playing\',false:\'\'}[$index==selectPlayIndex]" ng-click="selectPlay($index)"></li></ul></ion-scroll></div>',
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.datas = JSON.parse($scope.items);
                var ionContent = document.getElementsByClassName('detailContent');
                var flag = 0;
                if (ionContent.length > 0) { ionContent = ionContent[ionContent.length - 1] }
                $scope.isIos = false;
                if (sessionStorage.getItem('isIos') && sessionStorage.getItem('isIos') != 'undefined') { $scope.isIos = sessionStorage.getItem('isIos'); }
                $scope.playing = 0;//当前播放index
                $scope.selectPlayIndex = null;//当前播放index
                $scope.allplay = true;//是否是选中全部播放
                $scope.isZanTing = false;//是否暂停
                $scope.ended = false;//正在播放是否播放完毕
                $scope.menuBodyShow = false;//是否显示菜单
                $scope.ischose = false;//选择的单项
                // 播放器控制条开关
                $scope.switchAudioCtrl = function () {
                    
                    if ($scope.isShow == 0) {
                        // 关闭播放条
                        $scope.menuBodyShow = false;
                        audioControl.pause();
                        if ($scope.isIos == "true" || $scope.isIos == true) {
                            ionContent.style.top = "0px";
                        } else {
                            var h = ionContent.style.top;
                            ionContent.style.top = "44px";
                        }
                    }
                    else {
                        // 显示播放条
                        $scope.isZanTing = false;
                        if ($scope.playing >= $scope.datas.length) {
                            $scope.playing = 0;
                        }
                        var content = $scope.datas[$scope.playing].content;
                        if (content) {
                            if ($scope.isIos == "true" || $scope.isIos == true) {
                                ionContent.style.top = "40px";
                                if (typeof WeixinJSBridge != 'undefined') {
                                    // 苹果手机不能自动播放处理
                                    WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                                        audioControl.play(content, "ctrBar");
                                    });
                                } else {
                                    audioControl.play(content, "ctrBar");
                                }

                            } else {
                                ionContent.style.top = (40 + 44) + "px";
                                audioControl.play(content, "ctrBar");
                            }
                        }

                    }
                };

                // 监听外部控制开关
                $scope.$watch('isShow',
                    function () {
                        $scope.switchAudioCtrl();
                    });

                // 接收播放完毕广播,使播放按钮变成暂停
                $scope.$on('playEnded', function () {
                    if ($scope.ischose) {
                        $scope.$apply(function () {
                            $scope.isZanTing = true;
                            $scope.ended = true;
                        });
                    } else {
                        audioControl.pause();
                        $scope.playing = $scope.playing + 1;
                        if ($scope.playing >= $scope.datas.length) {
                            $scope.$apply(function () {
                                $scope.isZanTing = true;
                                $scope.ended = true;
                            });
                            return;
                        }
                        var content = $scope.datas[$scope.playing] ? $scope.datas[$scope.playing].content : '';
                        if (content) { content = content.replace(/^<img[\s\S]+>$/g, ''); }
                        while (JsUtil.isEmpty(content)) {
                            if ($scope.playing >= $scope.datas.length) {
                                $scope.$apply(function () {
                                    $scope.isZanTing = true;
                                    $scope.ended = true;
                                });
                                return;
                            } else {
                                $scope.playing = $scope.playing + 1;
                                content = $scope.datas[$scope.playing] ? $scope.datas[$scope.playing].content : '';
                                if (content) { content = content.replace(/^<img[\s\S]+>$/g, ''); }
                            }
                        }
                        if ($scope.isIos == "true" || $scope.isIos == true) {
                            if (typeof WeixinJSBridge != 'undefined') {
                                // 苹果手机不能自动播放处理
                                WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                                    audioControl.play(content, "ctrBar");
                                });
                            } else {
                                audioControl.play(content, "ctrBar");
                            }

                        } else {
                            audioControl.play(content, "ctrBar");
                        }
                    }

                });

                // 点击页面隐藏菜单
                $("#maskLayer").click(function () {
                    if ($scope.menuBodyShow) {
                        $scope.menuBodyShow = false;//是否显示菜单
                        flag = 0;
                        $(".audio-menu-body").hide();
                        $("#maskLayer").hide();
                    }
                    event.stopPropagation();
                });

                // 菜单开关
                $scope.switchMenuBody = function () {
                    $scope.menuBodyShow = !($scope.menuBodyShow);
                    if ($scope.menuBodyShow) {
                        flag = 1;
                        $(".audio-menu-body").show();
                        $("#maskLayer").show();
                    } else {
                        flag = 0;
                        $(".audio-menu-body").hide();
                        $("#maskLayer").hide();
                    }
                    event.stopPropagation();
                };

                // 暂停事件
                $scope.zanTing = function () {
                    $scope.ended = false;
                    $scope.isZanTing = !$scope.isZanTing;
                    audioControl.pause();
                    event.stopPropagation();
                };

                // 播放事件
                $scope.boFang = function () {
                    $scope.isZanTing = !$scope.isZanTing;
                    if ($scope.ended) {
                        if ($scope.playing >= $scope.datas.length && $scope.allplay) {
                            $scope.playing = 0;
                        }
                        if ($scope.datas[$scope.playing].content) {
                            audioControl.play($scope.datas[$scope.playing].content, "ctrBar");
                        }

                    }
                    else {
                        audioControl.play(null, "ctrBar");
                    }

                    event.stopPropagation();
                };
                // 播放下一个
                $scope.next = function () {
                    if (event.target.disabled) {
                        return;
                    }


                    $scope.isZanTing = false;
                    $scope.playing = $scope.playing + 1;
                    if ($scope.selectPlayIndex != null) {
                        $scope.selectPlayIndex = $scope.playing;
                    }
                    audioControl.pause();
                    if ($scope.datas[$scope.playing].content) {
                        audioControl.play($scope.datas[$scope.playing].content, "ctrBar");
                    }

                    event.stopPropagation();
                };
                // 播放上一个
                $scope.up = function () {
                    if (event.target.disabled) {
                        return;
                    }
                    $scope.isZanTing = false;
                    $scope.playing = $scope.playing - 1;
                    if ($scope.selectPlayIndex != null) {
                        $scope.selectPlayIndex = $scope.playing;
                    }
                    audioControl.pause();
                    if ($scope.datas[$scope.playing].content) {
                        audioControl.play($scope.datas[$scope.playing].content, "ctrBar");
                    }
                    event.stopPropagation();
                };

                // 菜单选择播放
                $scope.selectPlay = function (index) {
                    $scope.isZanTing = false;
                    $scope.ischose = true;
                    $scope.allplay = false;
                    $scope.playing = index;
                    $scope.selectPlayIndex = index;//当前选择播放index
                    audioControl.pause();
                    if ($scope.datas[$scope.selectPlayIndex].content) {
                        audioControl.play($scope.datas[$scope.selectPlayIndex].content, "ctrBar");
                    }
                    flag = 0;
                    $scope.menuBodyShow = false;//是否显示菜单
                    event.stopPropagation();
                };

                // 菜单选择播放
                $scope.allPlay = function () {
                    $scope.isZanTing = false;
                    $scope.ischose = false;
                    $scope.allplay = true;
                    $scope.playing = 0;
                    $scope.selectPlayIndex = null;//当前选择播放index
                    audioControl.pause();
                    if ($scope.datas[$scope.playing].content) {
                        audioControl.play($scope.datas[$scope.playing].content, "ctrBar");
                    }
                    flag = 0;
                    $scope.menuBodyShow = false;//是否显示菜单
                    event.stopPropagation();
                };
                // 关闭播放控制条
                $scope.close = function () {
                    $scope.$emit('closeAudioBar');
                    event.stopPropagation();
                };

                // 监听页面滑动事件,菜单显示时使页面滑动失效
                var maskLayer = document.getElementById("maskLayer");
                var detailView = document.getElementById("detailView");
                var canScroll = null;
                detailView.addEventListener('touchmove', function (event) { 　　 //监听滚动事件
                    if (flag == 1) {
                        if (canScroll == null) {
                            if ((event.target.parentNode.offsetHeight+40) >= maskLayer.offsetHeight) {
                                // 菜单层高大于页面高，可以滚动，小于则阻止滑动件事
                                canScroll = true;
                            } else {
                                canScroll = false;
                                //阻止默认的处理方式(阻止下拉滑动的效果)
                                event.preventDefault();
                            }
                        } else {
                            if (!canScroll) {
                                //阻止默认的处理方式(阻止下拉滑动的效果)
                                event.preventDefault();
                            }
                        }
                    }
                }, { passive: false });//passive 参数不能省略，用来兼容ios和android


                

            }
        };
    }]);
