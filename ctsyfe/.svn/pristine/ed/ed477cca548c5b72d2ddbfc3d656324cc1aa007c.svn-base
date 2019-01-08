angular.module('starter.tiJianBaoGaoControllers', ['ionic'])
    //体检报告详情历史记录
    .controller('medicalDetails', function ($scope, $state, $stateParams, XywyService, Popup, $window, jqueryService) {
        var c = 750; // 基准宽度,取的是iphone6
        var b = document.getElementsByTagName('html')[0];
        var f = b.getBoundingClientRect().width / c;
        b.style.fontSize = f + 'rem';
        $scope.imgBaseUrl = myConfig.imgBaseUrl;
        $scope.showWzr = false;
        $scope.chulizhong = ""
        //判断手机类型
        $scope.isIos = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
        }
        if ($stateParams.status) {
            $scope.clztitie = '系统正在处理中，请耐心等候。'
            $scope.clzxtitie = ''
            $scope.chulizhong = 1
        } else {
            $scope.clztitie = '您的检查结果一切正常'
            $scope.clzxtitie = '请继续保持！'
        }
        //返回上一页
        $scope.goBack = function () {
            javascript: history.go(-1);

        };
        $scope.tjtype = $stateParams.type
        $scope.tjid = $stateParams.fid
        //返回首页
        $scope.back = function () {
            var openid = sessionStorage.getItem("openId");
            var token = sessionStorage.getItem("token");
            $state.go("shouye", { openid: openid, token: token });
        }
        $scope.order = "";
        $scope.id = $stateParams.id;
        $scope.picturelist = [];
        $scope.picturelistmore = [];
        //展示图片
        $scope.showimg = function (imgurllist, index) {
            for (var i = 0; i < imgurllist.length; i++) {
                $scope.picturelist.push(imgurllist[i].imageName)
            }
            var list = angular.toJson($scope.picturelist);
            $state.go("jkqimgyulan", { list: list, curindex: index });
        };

        $scope.showimgmore = function (imgurllist, index) {
            for (var i = 0; i < imgurllist.length; i++) {
                $scope.picturelistmore.push(imgurllist[i].imageName)
            }
            var list = angular.toJson($scope.picturelistmore);
            $state.go("jkqimgyulan", { list: list, curindex: index });
        };
        //绑定是否点击展示
        $scope.ischick = false;
        $scope.checkPosition = "";
        $scope.jiankangzhidao = "";
        $scope.getreultlist = "";
        $scope.ishow = function (item) {
            if (item.matchStatus != 1) {
                return
            }
            if ($scope.order != item.pid) {
                $scope.checkPosition = "";
                $scope.order = item.pid
                var param = {};
                param = item
                XywyService.save("/tjbgjd/getjkzd", param)
                    .then(function (data) {
                        $scope.jiankangzhidao = data.data;
                        console.log(data, "555")
                    }).catch(function (err) {
                        console.log(err)
                    })
            } else {
                $scope.order = ""
                $scope.jiankangzhidao = ""
            }
        }
        $scope.isJYHide = false;
        $scope.isJCHide = false;
        $scope.containerSwitch = function (type) {
            if (type == "jy") {
                $scope.isJYHide = !$scope.isJYHide;
            }
            if (type == "jc") {
                $scope.isJCHide = !$scope.isJCHide;
            }
        };
        $scope.ijcshow = function (item) {
            if (item.matchStatus != 1) {
                return
            }
            if ($scope.checkPosition != item.pid) {
                $scope.checkPosition = item.pid
                $scope.order = ""
                var param = {}
                param = item
                XywyService.save("/tjbgjd/getJcJkzd", param)
                    .then(function (data) {
                        $scope.getreultlist = data.data
                    }).catch(function (err) {
                        console.log(err)
                    })
            } else {
                $scope.checkPosition = "";
            }
        }
        var fiter = {}
        fiter.openId = sessionStorage.getItem("openId");
        fiter.recordPid = $scope.id
        //获取体检报告详情
        $scope.getmedicalDetailslist = function () {
            XywyService.save("/tjbgjd/getjcjg", fiter)
                .then(function (data) {
                    $scope.medicalDetailslist = data.data;
                }).catch(function (err) {
                    console.log(err)
                })
        }

        $scope.getmedicalDetailslist();

        /**
         * 查询用户列表
         */
        jqueryService.ajax('/queryGuanXiNiCheng', {
            openid: sessionStorage.getItem('openId'),
            needOtherFlag: false
        }, false).then(function (response) {
            $scope.cyList = response;
            for (var i = 0; i < $scope.cyList.length; i++) {
                if (typeof $scope.cyList[i].IMGURL == 'undefined') {
                    $scope.cyList[i].IMGURL = "img/hz.png";
                }
            }
            $scope.cyList[0].choose = true;
        }, Popup.alert);

        /**
         * 点击保存体检报告按钮事件
         */
        $scope.saveClick = function () {
            if ($scope.cyList && $scope.cyList.length > 1) {
                // 如果成员列表大于1，显示成员选择面板
                $scope.showWzr = true;

            } else {
                // 如果只有自己，提示并保存
                Popup.confirm(["提示", "您确定要存入个人档案吗？"], function () {
                    doSave();
                })

            }
            event.stopPropagation();
        };
        /**
         * 问诊人面板取消事件
         */
        $scope.wzrClose = function () {
            $scope.showWzr = false;
            event.stopPropagation;
        };
        /**
         * 问诊人面板确定事件
         */
        $scope.wzrSure = function () {
            $scope.showWzr = false;
            doSave($scope.cyList[0].id);
            event.stopPropagation;
        };
        /**
        * 问诊人翻页
        * e：event
        * type:(1-下一页，2-上一页)
        */
        $scope.wzrFanye = function (e, type) {
            var obj, listLength = $scope.cyList.length-1;
            if (e.target.nodeName == "I") {
                obj = e.target.parentNode;
            }
            else {
                obj = e.target;
            }
            if (obj.getAttribute("disabled") == "disabled") {
                return;
            }
            var parent = obj.parentNode,
                ul = parent.getElementsByTagName("ul")[0],
                $ul = $(ul),
                one,
                up = parent.getElementsByClassName("up")[0],
                np = parent.getElementsByClassName("np")[0],
                p = parseInt(ul.getAttribute("data-p"));
            if (type == 1) {
                up.setAttribute("disabled", false);
                up.classList.remove("disabled");
                one = $ul.find("li").first().width()
                $ul.animate({
                    scrollLeft: one * 5 * p
                }, 300);
                p = ++p;
                ul.setAttribute("data-p", p);

                if (p >= Math.ceil(listLength / 5)) {
                    obj.setAttribute("disabled", "disabled");
                    obj.classList.add("disabled");
                }
            }
            if (type == 2) {
                p = --p;
                ul.setAttribute("data-p", p);
                np.setAttribute("disabled", false);
                np.classList.remove("disabled");
                one = $ul.find("li").first().width()
                $ul.animate({
                    scrollLeft: one * 5 * (p - 1)
                }, 300);
                if (p <= 1) {
                    obj.setAttribute("disabled", "disabled");
                    obj.classList.add("disabled");
                }
            }
            e.stopPropagation();
        };
        /**
         * 选择问诊人
         * index
         */
        $scope.chooseWzr = function (e, index) {
            if (index == 0) {
                return;
            }
            var temp = $scope.cyList[index];
            // 交换元素
            $scope.cyList.splice(index, 1)
            $scope.cyList[0].choose = false;
            $scope.cyList.unshift(temp);
            $scope.cyList[0].choose = true;
            e.stopPropagation();
        };
        /**
         * 保存报告结果
         * @param {用户id} id 
         */
        var doSave = function (id) {
            var param = {};
            param.recordPid = $scope.id;
            if (id) {
                param.familyMemberId = id;
            }
            XywyService.save("/tjbgjd/changeRecordType", param)
                .then(function (response) {
                    // Popup.alert(response.data.message);
                    Popup.alert("保存成功");
                }).catch(function (err) {
                    console.log(err);
                });
        };

        // 监听页面滑动事件,菜单显示时使页面滑动失效
        document.addEventListener('touchmove', function (event) { 　　 //监听滚动事件
            if ($scope.showWzr) {
                event.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
            }
        }, { passive: false });//passive 参数不能省略，用来兼容ios和android

    })
    //体检报告解读列表页
    .controller('medicallist', function (wxApi, $ionicViewSwitcher, $scope, $http, $state, $stateParams, $timeout, XywyService, Popup, Outlet, $ionicScrollDelegate, audioControl, $window, $rootScope, geoLocation, $ionicPopup, Upload, $timeout, $ionicModal, $ionicLoading) {
        var c = 750; // 基准宽度,取的是iphone6
        var b = document.getElementsByTagName('html')[0];
        var f = b.getBoundingClientRect().width / c;
        b.style.fontSize = f + 'rem';
        //返回首页
        $scope.back = function () {
            var openid = sessionStorage.getItem("openId");
            var token = sessionStorage.getItem("token");
            $state.go("shouye", { openid: openid, token: token });
        }
        window.onscroll = function () {
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            // console.log(scrollTop,"111");
        }
        //判断手机类型
        $scope.isIos = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
        }
        if ($stateParams.type == 1) {
            $scope.title = "体检报告"
        } else {
            $scope.title = "检查检验报告"
        }
        //判断报告是否超过限制
        $scope.isoverthelimit = false
        //返回上一页
        $scope.goBack = function () {
            javascript: history.go(-1);

        };
        //返回首页
        $scope.back = function () {
            var openid = sessionStorage.getItem("openId");
            $ionicViewSwitcher.nextDirection('back');
            var token = sessionStorage.getItem("token");
            $state.go("shouye", { openid: openid, token: token });
        };
        //进入提交体检报告页面
        $scope.gomedical = function () {
            if ($scope.isoverthelimit) {
                $state.go('tiJianBaoGao', { type: $stateParams.type, id: $stateParams.id })
            } else {
                $ionicLoading.show({
                    template: '您的试用次数已用完!',
                });
                $timeout(function () {
                    $ionicLoading.hide(); //由于某种原因3秒后关闭弹出
                }, 2000);
                return
            }

        };
        //进入详情页面
        $scope.godetails = function (id, status) {
            // console.log("112")
            if (status == 5) {
                $state.go('medicalDetails', { id: id, type: $stateParams.type, fid: $stateParams.id })
            }
            if (status == 4) {
                $state.go('tiJianBaoGaoQR', { id: id, type: $stateParams.type, fid: $stateParams.id })
            }
            if (status == 1 || status == 2 || status == 3) {
                $state.go('medicalDetails', { id: id, type: $stateParams.type, fid: $stateParams.id, status: status })
            }

        }
        // $scope.isnodata = false;
        var fiter = {}
        fiter.type = $stateParams.type;
        fiter.familyMemberId = $stateParams.id;
        //获取报告解读列表
        $scope.getmedicallist = function () {
            XywyService.save("/tjbgjd/getbglist", fiter)
                .then(function (data) {
                    $scope.medicallist = data.data;
                    if ($scope.medicallist.length == 0) {
                        $scope.isnodata = true;
                    } else {
                        $scope.isnodata = false;
                    }
                }).catch(function (err) {
                    console.log(err)
                })
        }
        //判断是否上传报告超过限制
        $scope.overthelimit = function () {
            var param = {}
            param.openId = sessionStorage.getItem("openId");
            XywyService.save("/tjbgjd/validateProbationNumber", param)
                .then(function (data) {
                    $scope.isoverthelimit = data.data.isAvaliable
                }).catch(function (err) {
                    console.log(err)
                })
        }
        //删除体检报告提示
        $scope.delettjpg = function (evet, id) {
            event.stopPropagation();
            var myPopup = $ionicPopup.show({
                template: '您确定要删除该条记录吗？',
                title: '提示',
                scope: $scope,
                buttons: [
                    {
                        text: '取消',
                    },
                    {
                        text: '<b>确定</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            e.preventDefault();
                            $scope.delettjpgs(id)
                            myPopup.close();
                        }
                    },
                ]
            });


        }
        //删除体检报告
        $scope.delettjpgs = function (pid) {

            // console.log(pid,"122")
            var param = {};
            param.openId = sessionStorage.getItem("openId");
            param.recordPid = pid;
            XywyService.save('/tjbgjd/deleterecordbypid', param)
                .then(function (res) {
                    if (res) {
                        $ionicLoading.show({
                            template: '删除成功！',
                        });
                        $timeout(function () {
                            $ionicLoading.hide(); //由于某种原因3秒后关闭弹出
                            $scope.getmedicallist()
                        }, 2000);
                    } else {
                        $ionicLoading.show({
                            template: '删除失败，请重试！',
                        });

                        $timeout(function () {
                            $ionicLoading.hide(); //由于某种原因3秒后关闭弹出
                        }, 2000);
                    }
                });

        }
        //报告列表刷新
        $scope.baogaoRefresh = function () {
            $scope.getmedicallist();
            document.getElementById("liebiao").scrollTop = 0;
            $scope.$broadcast('scroll.refreshComplete');


        }
        $scope.getmedicallist();
        $scope.overthelimit();
    })
    //体检报告解读
    .controller('medical', function (wxApi, $ionicViewSwitcher, $scope, $http, $state, $stateParams, $timeout, XywyService, Popup, Outlet, $ionicScrollDelegate, audioControl, $window, $rootScope, geoLocation, $ionicPopup, Upload, $timeout, $ionicModal, $ionicLoading) {
        var c = 750; // 基准宽度,取的是iphone6
        var b = document.getElementsByTagName('html')[0];
        var f = b.getBoundingClientRect().width / c;
        b.style.fontSize = f + 'rem';
        $scope.type = $stateParams.type
        $scope.nohide = true
        $scope.ishide = function () {
            $scope.nohide = false
        }
        //判断手机类型
        $scope.isIos = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
        }
        //返回上一页
        $scope.goBack = function () {
            javascript: history.go(-1);

        };
        //返回首页
        $scope.back = function () {
            var openid = sessionStorage.getItem("openId");
            var token = sessionStorage.getItem("token");
            $state.go("shouye", { openid: openid, token: token });
        }
        //体检报告上传图片列表
        $scope.listimg = [];
        $scope.listimgname = [];
        $scope.list = [];
        //检查检测报告上传图片列表
        $scope.listimg2 = [];
        $scope.listimgname2 = [];
        $scope.list2 = [];
        $scope.tackImgClick = function () {
            if ($scope.type == 3) {
                document.getElementById("cameraInput").click();
            } else {
                document.getElementById("cameraInputs").click();
            }

        };
        //判断提示语是否出现
        $scope.overthelimit = function () {
            var param = {}
            param.openId = sessionStorage.getItem("openId");
            XywyService.save("/tjbgjd/validateProbationNumber", param)
                .then(function (data) {
                    $scope.nohide = data.data.isFirstUse
                }).catch(function (err) {
                    console.log(err)
                })
        }
        //添加图片
        $scope.upload2 = function (files) {
            if (!files) {
                return false;
            }
            if (files.length > 20) {
                files = files.slice(0, 20);
            }
            var data = {};
            //                 data.file = files;
            data.staffCode = sessionStorage.getItem("openId");
            data.files = files;
            Upload.upload({
                url: myConfig.serverUrl + '/baocunimg',
                data: data
            }).success(function (response) {
                if (response) {

                    for (var i = 0; i < response.length; i++) {
                        if ($scope.list2.length < 20) {
                            $scope.list2.push(response[i]);
                            if ($scope.listimg2.length > 0) {
                                $scope.listimg2[$scope.listimg2.length] = response[i].backpath;
                                $scope.listimgname2[$scope.listimgname2.length] = response[i].fileName;
                            } else {
                                $scope.listimg2[0] = response[i].backpath;
                                $scope.listimgname2[0] = response[i].fileName;
                            }
                        }
                    }


                    // console.log($scope.listimg,"123")
                }
            }).error(function (file) {
                //上传失败
                console.log(file);
            });

        };
        //添加图片
        $scope.upload = function (files) {
            if (!files) {
                return false;
            }
            if (files.length > 20) {
                files = files.slice(0, 20);
            }
            var data = {};
            //                 data.file = files;
            data.staffCode = sessionStorage.getItem("openId");
            data.files = files;
            Upload.upload({
                url: myConfig.serverUrl + '/baocunimg',
                data: data
            }).success(function (response) {
                if (response) {
                    for (var i = 0; i < response.length; i++) {
                        if ($scope.list.length < 20) {
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


                    // console.log($scope.listimg,"123")
                }
            }).error(function (file) {
                //上传失败
                console.log(file);
            });

        };
        //提交报告
        $scope.tijiaoclick = function () {
            var param = {};
            param.baogaolist = [];
            param.openId = sessionStorage.getItem("openId");
            param.type = $stateParams.type;
            param.familyMemberId = $stateParams.id;
            if ($scope.type == 3) {
                for (var i = 0; i < $scope.listimg.length; i++) {
                    param.baogaolist.push({ imageName: $scope.listimg[i], orderNum: (i + 1) })
                }
            } else {
                for (var i = 0; i < $scope.listimg2.length; i++) {
                    param.baogaolist.push({ imageName: $scope.listimg2[i], orderNum: (i + 1) })
                }
            }

            var title = document.getElementById("title");
            XywyService.save('/tjbgjd/setbg', param)
                .then(function (res) {
                    $scope.recordPid = res.data.data.pid
                    if (res) {
                        $ionicLoading.show({
                            template: '提交成功！',

                        });
                        $scope.overthelimit()
                        // 清除当前输入信息以及图片信息
                        $timeout(function () {
                            $ionicLoading.hide(); //由于某种原因3秒后关闭弹出
                            $state.go('medicalstats', { type: $stateParams.type, id: $stateParams.id, recordPid: $scope.recordPid })
                            $scope.listimg = [];
                            $scope.list = [];
                            $scope.listimg2 = [];
                            $scope.list2 = [];
                            var param = {};
                        }, 500);

                    } else {
                        $ionicLoading.show({
                            template: '提交失败，请重试！',
                        });

                        $timeout(function () {
                            $ionicLoading.hide(); //由于某种原因3秒后关闭弹出
                        }, 2000);
                    }
                });
        }
        $scope.showimg = function (index) {
            var yulan = {
                index: index,
                listimg: $scope.listimg,
                list: $scope.list
            }
            console.log(yulan, "123")
            sessionStorage.setItem("imgyulan", JSON.stringify(yulan));
            $state.go("tpyulan");
        }
        $scope.showimg2 = function (index) {
            var yulan = {
                index: index,
                listimg: $scope.listimg2,
                list: $scope.list2

            }
            console.log(yulan, "123")
            sessionStorage.setItem("imgyulan", JSON.stringify(yulan));
            $state.go("tpyulan");
        }
        $rootScope.$on('tpyulan', function (event, yulan) {
            if ($scope.type == 1) {
                $scope.listimg = yulan.listimg;
                $scope.list = yulan.list;
            } else {
                $scope.listimg2 = yulan.listimg;
                $scope.list2 = yulan.list;
            }

        });
        $scope.tiaoguo = function (event) {
            event.stopPropagation();
            var param = {};
            param.openId = sessionStorage.getItem("openId");
            param.type = $stateParams.type;
            param.familyMemberId = $stateParams.id;
            XywyService.save('/tjbgjd/setbg', param)
                .then(function (data) {
                    console.log(data, "456")
                    $scope.finallydata = data.data.data
                    if ($scope.finallydata.status == 5) {
                        $state.go('medicalDetails', { id: $scope.finallydata.pid, type: $scope.finallydata.type, fid: $scope.finallydata.familyMemberId })
                    }
                    if ($scope.finallydata.status == 4) {
                        $state.go('tiJianBaoGaoQR', { id: $scope.finallydata.pid, type: $scope.finallydata.type, fid: $scope.finallydata.familyMemberId })
                    }
                    if ($scope.finallydata.status == 1 || $scope.finallydata.status == 2 || $scope.finallydata.status == 3) {
                        $state.go('medicalDetails', { id: $scope.finallydata.pid, type: $scope.finallydata.type, fid: $scope.finallydata.familyMemberId })
                    }
                });
        }
        $scope.overthelimit()
    })
    //上传报告状态
    .controller('medicalstats', function (wxApi, $ionicViewSwitcher, $scope, $http, $state, $stateParams, $timeout, XywyService, Popup, Outlet, $ionicScrollDelegate, audioControl, $window, $rootScope, geoLocation, $ionicPopup, Upload, $timeout, $ionicModal, $ionicLoading) {
        var c = 750; // 基准宽度,取的是iphone6
        var b = document.getElementsByTagName('html')[0];
        var f = b.getBoundingClientRect().width / c;
        b.style.fontSize = f + 'rem';
        var vm = this;
        $scope.type = $stateParams.type
        //判断手机类型

        $scope.isIos = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
        }
        //返回上一页
        $scope.goBack = function () {
            javascript: history.go(-1);



        };
        //返回首页
        $scope.back = function () {
            var openid = sessionStorage.getItem("openId");
            $ionicViewSwitcher.nextDirection('back');
            var token = sessionStorage.getItem("token");
            $state.go("shouye", { openid: openid, token: token });
        };
        //继续上传
        $scope.continue = function () {
            $state.go('tiJianBaoGao', { type: $stateParams.type, id: $stateParams.id })

        };
        //返回
        $scope.close = function () {
            $state.go('medicallist', { type: $stateParams.type, id: $stateParams.id })

        }
        function goGn(gn) {
            $state.transitionTo('yuyinjiaohuclick', { gn: gn, zhuci: '' }, { reload: true, notify: true });
        }
        //返回指标解读
        $scope.gozbjd = function () {
            goGn('WBG');

        }
        $scope.changeStatus = function () {
            var param = {}
            param.recordPid = $stateParams.recordPid;
            XywyService.save("/tjbgjd/getTjbgjdStatusByPid", param)
                .then(function (data) {
                    $scope.status = data.data.status
                    if ($scope.status == 4) {
                        $state.go('tiJianBaoGaoQR', { id: data.data.pid, type: data.data.type, fid: data.data.familyMemberId })
                    } else {

                        lunxun = $timeout(function () {
                            $scope.changeStatus()
                        }, 3000)


                    }
                }).catch(function (err) {
                    console.log(err)
                })
        }
        var lunxun = $timeout(function () {
            $scope.changeStatus()
        }, 5000)

        $scope.$on('$destroy', function () {
            if (lunxun) {
                $timeout.cancel(lunxun);
            }
            // $timeOut.cancel();
            // $scope.cancel = true
        })
    })
    //体检报告检验修改
    .controller('jianyanEdit', function ($scope, $state, $stateParams, XywyService, Popup, $window) {
        $scope.isIos = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            sessionStorage.setItem('isIos', $scope.isIos);
        }
        //返回上一页
        $scope.goBack = function () {
            $window.history.back();
        };
        //返回首页
        $scope.back = function () {
            var openid = sessionStorage.getItem("openId");
            var token = sessionStorage.getItem("token");
            $state.go("shouye", { openid: openid, token: token });
        }
        //判断是否可选分类
        $scope.isshowfenlei = false;
        //是否出现等级分类
        $scope.ishowxiala = false;
        //是否出现项目分类
        $scope.isxmdata = false
        //判断是否为定量和定性,正常
        $scope.isdingxing = false;
        $scope.iszhengchang = false;
        $scope.isdingliang = true
        $scope.gettanchu = function () {
            $scope.ishowxiala = true;
            setTimeout("$('#allname').focus()", 100);
            $scope.allname = $scope.tjxmname
            if ($scope.allname != '') {
                $scope.findzhibiao($scope.allname)
            }
        }
        //关闭搜索框
        $scope.close = function () {
            $scope.ishowxiala = false;
            $scope.ishavexmfl = false;
            $scope.select1 = "";
            $scope.select2 = "";
            $scope.tjxmname = document.getElementById("allname").value
            // $scope.getmoredata($scope.tjxmname)
            if (!$stateParams.qid) {
                $scope.getnewdata($scope.tjxmname, $stateParams.rid);
            }
            if ($scope.isdingxing) {
                if ($scope.tjjgdy != '') {
                    $("#submit").attr('disabled', false);
                }
                if ($scope.tjjgdy == '') {
                    $("#submit").attr('disabled', true);
                }
            }
            if ($scope.isdingliang) {
                if (($scope.zcfwmax != '' || $scope.zcfwmin != '') && $scope.tjjg != '') {
                    $("#submit").attr('disabled', false);
                }
                if (($scope.zcfwmax == '' && $scope.zcfwmin == '') || $scope.tjjg == '') {
                    $("#submit").attr('disabled', true);
                }
            }
            if ($scope.iszhengchang) {
                if ($scope.tjjgzc != '') {
                    $("#submit").attr('disabled', false);
                }
                if ($scope.tjjgzc == '') {
                    $("#submit").attr('disabled', true);
                }
            }

        }
        //定性固定值阴性
        $scope.selectedSite = "阴性"
        //等级分类数组
        $scope.alldjdata = []
        //项目分类数组
        $scope.allxmdata = []
        $scope.names = ['异常', "高", "低"];
        $scope.tjjgzc = '异常'
        //下拉列表绑定值
        $scope.select2 = ''
        $scope.select1 = ''
        $scope.isqueding = false;
        $scope.ishavexmfl = false;
        //判断标本等级是否显示
        $scope.getbbselect = function (name) {
            $("#xmflDiv").hide();
            $scope.allxmdata = []
            $scope.gnumdata = []
            for (var i = 0; i < $scope.payWayList.length; i++) {
                if ($scope.payWayList[i].amode == name) {
                    $scope.gnumdata = $scope.payWayList[i].gnum
                    if ($scope.gnumdata.length > 1) {
                        $scope.isxmdata = true
                        $("#xmflDiv").show();
                    } else {
                        $scope.isxmdata = false
                    }
                }
            }
            $scope.select2 = ''
            for (var j = 0; j < $scope.gnumdata.length; j++) {
                var xmdata = { value: $scope.gnumdata[j].name }
                $scope.allxmdata.push(xmdata)
            }

        };
        //判断项目等级是否显示
        $scope.getxmselect = function (name) {
            $("#xmflDiv").hide();
            $scope.allxmdata = []
            for (var i = 0; i < $scope.payWayList.length; i++) {
                if ($scope.payWayList[i].amode == name) {
                    $scope.gnumdata = $scope.payWayList[i].gnum
                    if ($scope.gnumdata.length > 1) {
                        $scope.isxmdata = true
                        $("#xmflDiv").show();
                    } else {
                        $scope.isxmdata = false
                    }
                }
            }
            for (var j = 0; j < $scope.gnumdata.length; j++) {
                var xmdata = { value: $scope.gnumdata[j].name }
                $scope.allxmdata.push(xmdata)
            }
        };
        //点击改变单选按钮
        $scope.gaibian = function (type) {
            if (type == 1) {
                $scope.isdingxing = false;
                $scope.iszhengchang = false;
                $scope.isdingliang = true
                $scope.ishowxiala = false;
                if ($scope.tjxmname != '' && ($scope.zcfwmax != '' || $scope.zcfwmin != '') && $scope.tjjg != '') {
                    $("#submit").attr('disabled', false);
                }
                if ($scope.tjxmname == '' || ($scope.zcfwmax == '' && $scope.zcfwmin == '') || $scope.tjjg == '') {
                    $("#submit").attr('disabled', true);
                }
            }
            if (type == 2) {
                $scope.isdingxing = true;
                $scope.iszhengchang = false;
                $scope.isdingliang = false
                $scope.ishowxiala = false;
                // console.log($scope.tjjgdy,"123")
                if ($scope.tjxmname != '' && $scope.tjjgdy != '') {
                    $("#submit").attr('disabled', false);
                }
                if ($scope.tjxmname == '' || $scope.tjjgdy == '') {
                    $("#submit").attr('disabled', true);
                }
            }
            if (type == 3) {
                $scope.isdingxing = false;
                $scope.iszhengchang = true;
                $scope.isdingliang = false
                $scope.ishowxiala = false;
                if ($scope.tjxmname != '' && $scope.tjjgzc != '') {
                    $("#submit").attr('disabled', false);
                }
                if ($scope.tjxmname == '' || $scope.tjjgzc == '') {
                    $("#submit").attr('disabled', true);
                }
            }

        }
        //获取检验数据
        $scope.getjianyandata = function () {
            var param = {}
            param.pid = $stateParams.qid
            XywyService.save("/tjbgjd/getResultJyDetailByPid", param)
                .then(function (data) {
                    if ($stateParams.type == 1) {
                        $scope.isdingling = true;
                        $scope.isdingxing = false;
                        $scope.iszhengchang = false;
                        $scope.jianyandata = data.data;
                        $scope.tjjgdy = "";
                        $scope.tjxmname = $scope.jianyandata.inspectItemName;
                        $scope.zcfwmax = parseFloat(data.data.zczmax);
                        $scope.zcfwmin = parseFloat(data.data.zczmin);
                        $scope.tjjg = parseFloat($scope.jianyandata.inspectResult);
                        if ($scope.jianyandata.specimenName) {
                            $scope.ishavexmfl = true;
                            $scope.select1 = $scope.jianyandata.specimenName
                            $scope.select2 = $scope.jianyandata.projectName
                        } else {
                            $scope.select1 = ""
                            $scope.select2 = ""
                        }
                        // $scope.getmoredata($scope.tjxmname,$scope.select1)
                    }
                    if ($stateParams.type == 2) {
                        $scope.isdingliang = false;
                        $scope.isdingxing = true;
                        $scope.iszhengchang = false;
                        $scope.jianyandata = data.data;
                        $scope.tjxmname = $scope.jianyandata.inspectItemName;
                        $scope.tjjgdy = $scope.jianyandata.inspectResult;
                        // $scope.selectedSite=$scope.jianyandata.inspectStandardRange
                        if ($scope.jianyandata.specimenName) {
                            $scope.ishavexmfl = true;
                            $scope.select1 = $scope.jianyandata.specimenName
                            $scope.select2 = $scope.jianyandata.projectName
                        } else {
                            $scope.select1 = ""
                            $scope.select2 = ""
                        }


                        // $scope.getmoredata($scope.tjxmname,$scope.select1)
                    }
                    if ($stateParams.type == 3) {
                        $scope.isdingliang = false;
                        $scope.isdingxing = false;
                        $scope.iszhengchang = true;
                        $scope.jianyandata = data.data;
                        $scope.tjxmname = $scope.jianyandata.inspectItemName;
                        $scope.tjjgzc = $scope.jianyandata.inspectResult;
                        console.log($scope.tjjgzc, "555")
                        // $scope.selectedSite=$scope.jianyandata.inspectStandardRange
                        if ($scope.jianyandata.specimenName) {
                            $scope.ishavexmfl = true;
                            $scope.select1 = $scope.jianyandata.specimenName
                            $scope.select2 = $scope.jianyandata.projectName
                        } else {
                            $scope.select1 = ""
                            $scope.select2 = ""
                        }
                    }
                    // $scope.zcfwdanwei = $scope.jianyandata.inspectUnit;
                }).catch(function (err) {
                    console.log(err)
                })
        }
        if ($stateParams.rid) {
            $scope.tjxmname = '';
            $scope.zcfwmax = '';
            $scope.zcfwmin = '';
            $scope.tjjg = '';
            $scope.tjjgdy = "";
            // $scope.tjjgzc="";
            // $scope.selectedSite = "阳性"
            // $scope.zcfwdanwei = '';
            $scope.title = "添加检验项目"
        }
        if ($stateParams.rid && $stateParams.qid) {
            $scope.getjianyandata()
            $scope.title = "编辑检验项目"
        }
        // 页面数据验证
        $scope.valuedata = function () {
            $scope.ishowxiala = false
            if ($scope.isdingliang) {
                var name = document.getElementById('tjxm').value
                var zcfwmax = document.getElementById('zcfw1').value
                var zcfwmin = document.getElementById('zcfw').value
                var tjjg = document.getElementById('tjjg').value
                var newname = name.trim()
                if (newname != '' && (zcfwmax != '' || zcfwmin != '') && tjjg != '') {
                    $("#submit").attr('disabled', false);
                }
                if (newname == '' || (zcfwmax == '' && zcfwmin == '') || tjjg == '') {
                    $("#submit").attr('disabled', true);
                }
            }
            // console.log(dxname,"321")
            // $scope.selectedSite = dxname
            if ($scope.isdingxing) {
                var name = document.getElementById('tjxm').value
                var tjjgdy = document.getElementById('tjjgdy').value
                var newname = name.trim()
                var newtjjgdy = tjjgdy.trim()
                // console.log(newtjjgdy,"123")
                if (newname != '' && newtjjgdy != '') {
                    $("#submit").attr('disabled', false);
                }
                if (newname == '' || newtjjgdy == '') {
                    $("#submit").attr('disabled', true);
                }
            }

            if ($scope.iszhengchang) {
                var name = document.getElementById('tjxm').value
                var tjjgzc = document.getElementById('tjjgzc').value
                var newname = name.trim()
                $scope.tjjgzc = tjjgzc
                // var newtjjgdy = tjjgzc.trim()
                console.log($scope.tjjgzc, "666")
                if (newname != '' && $scope.tjjgzc != '') {
                    $("#submit").attr('disabled', false);
                }
                if (newname == '' || $scope.tjjgzc == '') {
                    $("#submit").attr('disabled', true);
                }
            }

        }
        //搜索页面
        $scope.getallname = function (name) {
            $scope.findzhibiao(name)
            $scope.tjxmname = name
        }
        //新增判断项目是否有数据
        $scope.isgetnewdata = false
        //数据匹配
        $scope.getnewdata = function (name, id) {
            var filter = {}
            filter.inspectItemName = name
            filter.recordPid = id
            XywyService.save("/tjbgjd/getResultJyDetailByRecordPidAndName", filter)
                .then(function (data) {
                    $scope.isgetnewdata = data.data.hasDataFlag
                    if (data.data.hasDataFlag) {
                        // console.log( data,"123")
                        $scope.newdata = data.data.data
                        if ($scope.newdata.resultType == 1) {
                            $scope.isdingliang = false
                            $scope.zcfwmax = parseFloat($scope.newdata.zczmax);
                            $scope.zcfwmin = parseFloat($scope.newdata.zczmin);
                            $scope.tjjg = parseFloat($scope.newdata.inspectResult);
                            if ($scope.isqueding) {
                                $scope.ishavexmfl = true;
                            } else {
                                $scope.ishavexmfl = false;
                                $scope.select1 = ""
                                $scope.select2 = ""
                            }

                            // $scope.getmoredata(name,$scope.select1);
                            $scope.pid = $scope.newdata.pid
                            if (($scope.zcfwmax != '' || $scope.zcfwmin != '') && $scope.tjjg != '') {
                                $("#submit").attr('disabled', false);
                            }
                            if (($scope.zcfwmax == '' && $scope.zcfwmin == '') || $scope.tjjg == '') {
                                $("#submit").attr('disabled', true);
                            }
                        }
                        if ($scope.newdata.resultType == 2) {
                            $scope.isdingxing = true
                            $scope.ishavexmfl = true;
                            $scope.tjjgdy = $scope.newdata.inspectResult
                            if ($scope.isqueding) {
                                $scope.ishavexmfl = true;
                            } else {
                                $scope.ishavexmfl = false;
                                $scope.select1 = ""
                                $scope.select2 = ""
                            }

                            $scope.pid = $scope.newdata.pid
                            // $scope.getmoredata(name,$scope.select1);
                            if ($scope.tjjgdy != '') {
                                $("#submit").attr('disabled', false);
                            }
                            if ($scope.tjjgdy == '') {
                                $("#submit").attr('disabled', true);
                            }


                        }
                        if ($scope.newdata.resultType == 3) {
                            $scope.iszhengchang = true
                            $scope.ishavexmfl = true;
                            $scope.tjjgzc = $scope.newdata.inspectResult
                            if ($scope.isqueding) {
                                $scope.ishavexmfl = true;
                            } else {
                                $scope.ishavexmfl = false;
                                $scope.select1 = ""
                                $scope.select2 = ""
                            }

                            $scope.pid = $scope.newdata.pid
                            // $scope.getmoredata(name,$scope.select1);
                            if ($scope.tjjgzc != '') {
                                $("#submit").attr('disabled', false);
                            }
                            if ($scope.tjjgzc == '') {
                                $("#submit").attr('disabled', true);
                            }

                        }
                    } else {
                        if ($scope.isdingliang) {
                            $scope.zcfwmax = ""
                            $scope.zcfwmin = ""
                            $scope.tjjg = ''
                            if (!$scope.isqueding) {
                                $scope.select1 = ""
                                $scope.select2 = ""
                            }
                            document.getElementById('zcfw1').value = ""
                            document.getElementById('zcfw').value = ""
                            document.getElementById('tjjg').value = ""
                            $scope.pid = ''
                            if (($scope.zcfwmax != '' || $scope.zcfwmin != '') && $scope.tjjg != '') {
                                $("#submit").attr('disabled', false);
                            }
                            if (($scope.zcfwmax == '' && $scope.zcfwmin == '') || $scope.tjjg == '') {
                                $("#submit").attr('disabled', true);
                            }
                        }
                        if ($scope.isdingxing) {
                            $scope.tjjgdy = ''
                            if (!$scope.isqueding) {
                                $scope.select1 = ""
                                $scope.select2 = ""
                            }
                            $scope.pid = ''
                            document.getElementById('tjjgdy').value = ""
                            if ($scope.tjjgdy != '') {
                                $("#submit").attr('disabled', false);
                            }
                            if ($scope.tjjgdy == '') {
                                $("#submit").attr('disabled', true);
                            }
                        }
                        if ($scope.iszhengchang) {
                            if (!$scope.isqueding) {
                                $scope.select1 = ""
                                $scope.select2 = ""
                            }
                            $scope.pid = ''
                            if ($scope.tjjgzc != '') {
                                $("#submit").attr('disabled', false);
                            }
                            if ($scope.tjjgzc == '') {
                                $("#submit").attr('disabled', true);
                            }
                        }

                        // $scope.zcfwdanwei = ''
                    }


                }).catch(function (err) {
                    console.log(err)
                })
        }
        //根据检验项目名称查找现有指标库信息接口
        $scope.findzhibiao = function (name) {
            var filter = {}
            filter.inspectItemName = name
            XywyService.save("/tjbgjd/getInspectSelectListByName", filter)
                .then(function (data) {
                    if (data.data.hasDataFlag) {
                        $scope.detailList = data.data.detailList
                        $scope.isqueding = false
                    }
                    else {
                        $scope.detailList = []
                        // $scope.getmoredata(name)
                        // $scope.getnewdata(name,$stateParams.rid);
                    }


                }).catch(function (err) {
                    console.log(err)
                })
        }
        //弹出搜索框选择数据
        $scope.xunazhedata = function (data) {
            $scope.select1 = data.bbmc;
            $scope.select2 = data.xmmc;
            $scope.tjxmname = data.jyxm;
            $scope.allname = ''
            $scope.ishavexmfl = true;
            // $scope.getnewdata(name,$stateParams.rid);
            if (data.zlx == 1) {
                $scope.isdingxing = false;
                $scope.iszhengchang = false;
                $scope.isdingliang = true
                if (($scope.zcfwmax != '' || $scope.zcfwmin != '') && $scope.tjjg != '') {
                    $("#submit").attr('disabled', false);
                }
                if (($scope.zcfwmax == '' && $scope.zcfwmin == '') || $scope.tjjg == '') {
                    $("#submit").attr('disabled', true);
                }
            }
            if (data.zlx == 2) {
                $scope.isdingxing = true;
                $scope.iszhengchang = false;
                $scope.isdingliang = false
                if ($scope.tjjgdy != '') {
                    $("#submit").attr('disabled', false);
                }
                if ($scope.tjjgdy == '') {
                    $("#submit").attr('disabled', true);
                }
            }
            if (data.zlx == 3) {
                $scope.isdingxing = false;
                $scope.iszhengchang = false;
                $scope.isdingliang = true
            }

            $scope.ishowxiala = false;
            $scope.isqueding = true;
            if (!$stateParams.qid) {
                $scope.getnewdata($scope.tjxmname, $stateParams.rid);
            }
            // $scope.getnewdata($scope.tjxmname,$stateParams.rid)

        }
        //获取更多解读数据--分类列表
        $scope.getmoredata = function (name, select) {
            var filter = {};
            filter.inspectItemName = name
            XywyService.save("/tjbgjd/getInspectNameCategory", filter)
                .then(function (data) {
                    $scope.alldjdata = []
                    if (data.data.hasDataFlag) {
                        $scope.payWayList = data.data.data
                        if ($scope.payWayList.length > 1) {
                            $scope.isshowfenlei = true
                        }
                        for (var i = 0; i < $scope.payWayList.length; i++) {
                            if ($scope.payWayList[i].gnum.length > 1) {
                                $scope.isshowfenlei = true
                            }
                            var djdata = { value: $scope.payWayList[i].amode }
                            $scope.alldjdata.push(djdata)
                        }
                        if (select) {
                            $scope.getxmselect(select)
                        }
                    } else {
                        // if($scope.select1==""){
                        //     $scope.select1 = ""
                        // }
                        // if($scope.select2 = ""){
                        //     $scope.select2 = ""
                        // }

                        $scope.isshowfenlei = false
                    }

                }).catch(function (err) {
                    console.log(err)
                })
        }
        // //标本分类下拉数据
        // $scope.getdengji = function(){
        //     var guanXiDom =$('#select1');
        //     var guanXiData = guanXiDom.attr("data-gx");
        //     var iosSelect = new IosSelect(1, [$scope.alldjdata], {
        //         title: '标本分类',
        //         itemHeight: 35,
        //         relation: [1, 1],
        //         oneLevelId: guanXiData,
        //         callback: function(selectOneObj) {
        //             guanXiDom.attr("data-gx", selectOneObj.amode);
        //             $scope.select1 = selectOneObj.value;
        //             guanXiDom.val(selectOneObj.value);
        //             $scope.getbbselect($scope.select1);
        //         }
        //     });
        // }
        //  //项目分类下拉数据
        //  $scope.getxiangmu = function(){
        //     var guanXiDom =$('#select2');
        //     var guanXiData = guanXiDom.attr("data-gx");
        //     var iosSelect = new IosSelect(1, [$scope.allxmdata], {
        //         title: '项目分类',
        //         itemHeight: 35,
        //         relation: [1, 1],
        //         oneLevelId: guanXiData,
        //         callback: function(selectOneObj) {
        //             guanXiDom.attr("data-gx", selectOneObj.name);
        //             $scope.select2 = selectOneObj.value;
        //             guanXiDom.val(selectOneObj.value);
        //         }
        //     });
        // }
        $scope.ischongfu = false
        //验证上传数据是否重复
        $scope.ischongfudata = function (filter) {
            XywyService.save("/tjbgjd/validJyDetailNameByRecordPidAndName", filter)
                .then(function (data) {
                    // console.log(data,"123")
                    $scope.ischongfu = data.data.nameExistedFlag
                    if ($scope.ischongfu) {
                        Popup.alert("您输入的数据已存在!");
                    } else {
                        $scope.baocun(filter)
                    }

                }).catch(function (err) {
                    console.log(err)
                })
        }
        //保存接口
        $scope.baocun = function (param) {
            // 提交数据到后台
            XywyService.save("/tjbgjd/savejyycresult", param)
                .then(function (data) {
                    //console.log(data);
                    Popup.alert("保存成功!");
                    $window.history.back();
                });
        }
        // 提交表单
        $scope.submitForm = function () {
            var flag = true;
            var name = document.getElementById('tjxm').value
            if (flag) {
                if ($stateParams.rid && !$stateParams.qid) {
                    if ($scope.isdingliang) {
                        var zcfwmax = document.getElementById('zcfw1').value
                        var zcfwmin = document.getElementById('zcfw').value
                        var tjjg = document.getElementById('tjjg').value
                        if ($scope.isgetnewdata) {
                            var param = $scope.newdata;
                        } else {
                            var param = {};
                        }
                        param.specimenName = $scope.select1
                        param.projectName = $scope.select2
                        param.inspectStandardRange = zcfwmin + '-' + zcfwmax
                        param.inspectItemName = name;
                        param.recordPid = $stateParams.rid;
                        param.inspectResult = tjjg;
                        param.resultType = '1';
                        param.pid = $scope.pid
                        if (zcfwmin != '' && zcfwmax != '') {
                            if (parseFloat(zcfwmin) > parseFloat(zcfwmax)) {
                                Popup.alert("您输入的正常值范围有误!");
                                return
                            }
                            if (parseFloat(tjjg) <= parseFloat(zcfwmax) && parseFloat(tjjg) >= parseFloat(zcfwmin)) {
                                Popup.alert("您的检查结果正常，无需进行解读！");
                                return
                            }
                        }
                        if (zcfwmin == "" || zcfwmax == "") {
                            if (parseFloat(tjjg) <= parseFloat(zcfwmax) || parseFloat(tjjg) >= parseFloat(zcfwmin)) {
                                Popup.alert("您的检查结果正常，无需进行解读！");
                                return
                            }
                        }

                    }
                    if ($scope.isdingxing) {
                        if ($scope.isgetnewdata) {
                            var param = $scope.newdata;
                        } else {
                            var param = {};
                        }
                        var tjjgdy = document.getElementById('tjjgdy').value
                        param.specimenName = $scope.select1
                        param.projectName = $scope.select2
                        param.inspectStandardRange = $scope.selectedSite
                        param.inspectItemName = name;
                        param.recordPid = $stateParams.rid;
                        param.inspectResult = tjjgdy;
                        param.resultType = '2';
                        param.pid = $scope.pid
                        if (param.inspectResult == $scope.selectedSite) {
                            Popup.alert("您的检查结果正常，无需进行解读！");
                            return
                        }
                    }
                    if ($scope.iszhengchang) {
                        if ($scope.isgetnewdata) {
                            var param = $scope.newdata;
                        } else {
                            var param = {};
                        }
                        // var tjjgdy = document.getElementById('tjjgdy').value
                        param.specimenName = $scope.select1
                        param.projectName = $scope.select2
                        param.inspectStandardRange = "正常"
                        param.inspectItemName = name;
                        param.recordPid = $stateParams.rid;
                        param.inspectResult = $scope.tjjgzc;
                        param.resultType = '3';
                        param.pid = $scope.pid
                    }
                    // param.inspectUnit =zcfwdanwei;
                }
                if ($stateParams.rid && $stateParams.qid) {
                    if ($scope.isdingliang) {
                        var tjjg = document.getElementById('tjjg').value
                        var zcfwmax = document.getElementById('zcfw1').value
                        var zcfwmin = document.getElementById('zcfw').value
                        var param = $scope.jianyandata;
                        param.specimenName = $scope.select1
                        param.projectName = $scope.select2
                        param.inspectStandardRange = zcfwmin + '-' + zcfwmax
                        param.inspectItemName = name;
                        param.inspectResult = tjjg;
                        param.resultType = '1';
                        // param.pid = $scope.pid 
                        if (zcfwmin != '' && zcfwmax != '') {
                            if (parseFloat(zcfwmin) > parseFloat(zcfwmax)) {
                                Popup.alert("您输入的正常值范围有误!");
                                return
                            }
                            if (parseFloat(tjjg) <= parseFloat(zcfwmax) && parseFloat(tjjg) >= parseFloat(zcfwmin)) {
                                Popup.alert("您的检查结果正常，无需进行解读！");
                                return
                            }
                        }
                        if (zcfwmin == "" || zcfwmax == "") {
                            if (parseFloat(tjjg) <= parseFloat(zcfwmax) || parseFloat(tjjg) >= parseFloat(zcfwmin)) {
                                Popup.alert("您的检查结果正常，无需进行解读！");
                                return
                            }
                        }
                    }
                    if ($scope.isdingxing) {
                        var tjjgdy = document.getElementById('tjjgdy').value
                        var param = $scope.jianyandata;
                        param.specimenName = $scope.select1
                        param.projectName = $scope.select2
                        param.inspectStandardRange = $scope.selectedSite
                        param.inspectItemName = name;
                        param.inspectResult = tjjgdy;
                        param.resultType = '2'
                        // param.pid = $scope.pid 
                        if (param.inspectResult == $scope.selectedSite) {
                            Popup.alert("您的检查结果正常，无需进行解读！");
                            return
                        }
                    }
                    if ($scope.iszhengchang) {
                        var param = $scope.jianyandata;
                        param.specimenName = $scope.select1
                        param.projectName = $scope.select2
                        param.inspectStandardRange = "正常"
                        param.inspectItemName = name;
                        param.inspectResult = $scope.tjjgzc;
                        param.resultType = '3'
                    }
                }
                $scope.ischongfudata(param)

            } else {
                return flag;
            }
        };

    })
    //体检报告检查修改
    .controller('jianchaEdit', function ($scope, $state, $stateParams, XywyService, Popup, $window, TimeXuanZe) {
        $scope.isIos = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            sessionStorage.setItem('isIos', $scope.isIos);
        }
        //返回首页
        $scope.back = function () {
            var openid = sessionStorage.getItem("openId");
            var token = sessionStorage.getItem("token");
            $state.go("shouye", { openid: openid, token: token });
        }
        //是否出现下拉列表
        $scope.ishowxiala = false;
        $scope.isresultlist = false;
        $scope.isgetxuanzhe = false;
        $scope.ishavexmfl = false;
        //等级分类信息
        $scope.xmfl = ""
        $scope.checked = [];
        //多选按钮
        $scope.selectOne = function (select, num) {
            var index = $scope.checked.indexOf(select)
            if (index === -1) {
                $scope.checked.push(select)
                $('#' + num).prop("checked", true);
            } else {
                $scope.checked.splice(index, 1)
                $('#' + num).prop("checked", false);
            }
            //    console.log($scope.checked,"1233")
        }
        //获取检查数据
        $scope.getjianchadata = function () {
            var param = {}
            param.pid = $stateParams.id
            XywyService.save("/tjbgjd/getResultJcByPid", param)
                .then(function (data) {
                    $scope.jianchadata = data.data;
                    $scope.xmmc = $scope.jianchadata.checkPosition
                    if ($scope.jianchadata.projectType) {
                        $scope.xmfl = $scope.jianchadata.projectType
                        $scope.ishavexmfl = true;

                    } else {
                        $scope.xmfl = ""
                        $scope.ishavexmfl = false;
                    }
                    // $scope.jcsj = $scope.jianchadata.checkFinding
                    $scope.jcjl = $scope.jianchadata.checkResult
                    $scope.getCheckReult()

                }).catch(function (err) {
                    console.log(err)
                })
        }
        //返回上一页
        $scope.goBack = function () {
            $window.history.back();

        };
        //选择检查结论
        $scope.goresult = function () {
            $scope.isresultlist = true;
            $scope.getCheckReult()
        }
        //关闭选择结论弹出页面
        $scope.getclose = function () {
            $scope.isresultlist = false;
            $scope.checked = [];
            if ($scope.xmmc != '' && $scope.jcjl != '') {
                $("#submit").attr('disabled', false);
            }
            if ($scope.xmmc == '' && $scope.jcjl == '') {
                $("#submit").attr('disabled', true);
            }
        }
        $scope.getqueding = function () {
            var jcjg = document.getElementById("jcjl").value;
            if (jcjg == "") {
                document.getElementById("jcjl").value = $scope.checked.join("、")
            } else {
                document.getElementById("jcjl").value = $scope.checked.join("、")
            }
            var jcjl = document.getElementById("jcjl").value;
            $scope.isresultlist = false;
            $scope.checked = [];
            if ($scope.xmmc != '' && jcjl != '') {
                $("#submit").attr('disabled', false);
            }
            if ($scope.xmmc == '' && jcjl == '') {
                $("#submit").attr('disabled', true);
            }
        }
        if ($stateParams.rid) {
            $scope.xmmc = "";
            // $scope.jcsj = "";
            $scope.jcjl = "";
            $scope.title = "添加检查项目"
        } else {
            $scope.getjianchadata()
            $scope.title = "编辑检查项目"
        }
        //根据检验项目名称查找现有指标库信息接口
        $scope.findzhibiao = function (name) {
            var filter = {}
            filter.checkName = name
            XywyService.save("/tjbgjd/getCheckSelectListByName", filter)
                .then(function (data) {
                    if (data.data.hasDataFlag) {
                        $scope.detailList = data.data.detailList
                    } else {
                        $scope.detailList = []
                    }


                }).catch(function (err) {
                    console.log(err)
                })
        }
        //关闭搜索框
        $scope.close = function () {
            $scope.xmmc = document.getElementById("alljcname").value
            $scope.ishowxiala = false;
            if ($scope.xmmc != '' && $scope.jcjl != '') {
                $("#submit").attr('disabled', false);
            }
            if ($scope.xmmc == '' && $scope.jcjl == '') {
                $("#submit").attr('disabled', true);
            }
            $scope.ishavexmfl = false;
            $scope.getCheckReult()
        }
        $scope.xunazhedata = function (data) {
            $scope.xmmc = data.xmmc;
            $scope.xmfl = data.bbmc;
            $scope.ishavexmfl = true;
            // console.log($scope.xmmc,"123")
            $scope.ishowxiala = false;
            $scope.getCheckReult()
            if ($scope.xmmc != '' && $scope.jcjl != '') {
                $("#submit").attr('disabled', false);
            }
            if ($scope.xmmc == '' && $scope.jcjl == '') {
                $("#submit").attr('disabled', true);
            }

        }
        //输入框获取焦点弹出搜索页面
        $scope.gettanchu = function () {
            $scope.ishowxiala = true;
            setTimeout("$('#alljcname').focus()", 100);
            $scope.alljcname = $scope.xmmc
            $scope.findzhibiao($scope.alljcname)
            // $scope.getCheckReult()

        }
        //搜索页面
        $scope.getallname = function (name) {
            $scope.findzhibiao(name)
            $scope.xmmc = name
        }
        // 表单验证
        $scope.valuedata = function () {
            var xmmc = document.getElementById("xmmc").value;
            // var jcsj = document.getElementById("jcsj").value;
            var jcjg = document.getElementById("jcjl").value;
            // console.log(xmmc,"123")
            if (xmmc != '' && jcjg != '') {
                $("#submit").attr('disabled', false);
            }
            if (xmmc == '' || jcjg == '') {
                $("#submit").attr('disabled', true);
            }
        }
        //筛选检查结论
        $scope.getCheckReult = function (name) {
            var filter = {}
            filter.checkName = $scope.xmmc
            filter.input = name
            XywyService.save("/tjbgjd/getCheckReultListByName", filter)
                .then(function (data) {
                    $scope.isgetxuanzhe = data.data.hasDataFlag
                    $scope.getCheckReultlist = data.data.data
                }).catch(function (err) {
                    console.log(err)
                })
        }
        //保存接口
        $scope.baocun = function (param) {
            // 提交数据到后台
            XywyService.save("/tjbgjd/savejcycresult", param)
                .then(function (data) {
                    //console.log(data);
                    Popup.alert("提交成功!");
                    $window.history.back();
                });
        }
        // 提交表单
        $scope.submitForm = function () {
            var flag = jianchaForm.checkValidity();
            if (flag) {
                var xmmcvalue = document.getElementById("xmmc").value;
                // var jcsjvalue = document.getElementById("jcsj").value;
                var jcjlvalue = document.getElementById("jcjl").value;
                if ($stateParams.rid) {
                    var param = {};
                    param.checkPosition = xmmcvalue;
                    // param.checkFinding =jcsjvalue;
                    param.checkResult = jcjlvalue;
                    param.projectType = $scope.xmfl
                    param.recordPid = $stateParams.rid
                } else {
                    var param = $scope.jianchadata;
                    param.checkPosition = xmmcvalue;
                    param.projectType = $scope.xmfl
                    // param.checkFinding =jcsjvalue;
                    param.checkResult = jcjlvalue
                }
                $scope.baocun(param)

            } else {
                return flag;
            }
        };
    })//报告确认
    .controller('tiJianBaoGaoQR', function ($scope, $stateParams, XywyService, JsUtil, Popup, $window, $state, $ionicPopup, Yuyin, audioControl, $ionicScrollDelegate, $timeout) {
        $scope.isIos = false;
        $scope.inputFocus = false;
        if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            $scope.isIos = true;
            sessionStorage.setItem('isIos', $scope.isIos);
        }
        var id = $stateParams.id;
        var param = { recordPid: id };
        $scope.tjtype = $stateParams.type
        $scope.tjid = $stateParams.fid
        //返回报告首页
        $scope.back = function () {
            $state.go("medicallist", { type: $scope.tjtype, id: $scope.tjid });
        }
        $scope.nohide = true;
        $scope.ishide = function () {
            $scope.nohide = false;
        }
        // 检查项目点击伸缩
        $scope.ssflag = [];
        $scope.jcDetailSwitch = function (index) {
            if (typeof ($scope.ssflag[index]) == 'undefined') {
                $scope.ssflag[index] = true;
            } else {
                $scope.ssflag[index] = !$scope.ssflag[index];
            }

        };
        //返回上一页
        $scope.goBack = function () {
            $window.history.back();
        };
        //检验修改保存
        $scope.gojianyan = function (id, rid, type) {
            $state.go('jianyanEdit', { qid: id, rid: rid, type: type })
        };
        //检查修改保存
        $scope.gojiancha = function (id) {
            $state.go('jianchaEdit', { id: id })
        };
        //检验新增
        $scope.newjianyan = function () {
            $state.go('jianyanEdit', { rid: id })
        }
        //检查新增
        $scope.newjiancha = function () {
            $state.go('jianchaEdit', { rid: id })
        }
        // 图片、检验、检查内容点击伸缩
        $scope.isImgHide = false;
        $scope.isJYHide = false;
        $scope.isJCHide = false;
        $scope.containerSwitch = function (type) {
            if (type == "img") {
                $scope.isImgHide = !$scope.isImgHide;
            }
            if (type == "jy") {
                $scope.isJYHide = !$scope.isJYHide;
            }
            if (type == "jc") {
                $scope.isJCHide = !$scope.isJCHide;
            }
        };

        // 查询要要确认的数据
        $scope.getdata = function () {
            XywyService.save('/tjbgjd/getjcjyycjg', param)
                .then(function (res) {
                    if (res.data) {
                        $scope.data = res.data;
                    }
                }).catch(function (err) {
                    console.log(err)
                })
        }
        // XywyService.save('/tjbgjd/getjcjyycjg', param)
        //     .then(function(res) {
        //         if (res.data) {
        //             $scope.data = res.data;
        //         }

        //     }, Popup.alert);

        //判断待确定页面是检查还是检验
        $scope.decide = function () {
            XywyService.save("/tjbgjd/getAddButtonDisplayInfo", param)
                .then(function (data) {
                    $scope.jybuttom = data.data.jyButton
                    $scope.jcbuttom = data.data.jcButton

                }).catch(function (err) {
                    console.log(err)
                })
        }
        //展示图片
        $scope.picturelist = [];
        $scope.showimg = function (imgurllist, index) {
            for (var i = 0; i < imgurllist.length; i++) {
                $scope.picturelist.push(imgurllist[i].imageName)
            }
            var list = angular.toJson($scope.picturelist);
            $state.go("jkqimgyulan", { list: list, curindex: index });
        };

        // 删除检查检验项目
        $scope.delItem = function (type, pid, recordPid, index) {
            // Popup.confirm(['提示', '您确定要删除该条记录吗？'], function() {
            //     var delParam = {};
            //     delParam.pid = pid;
            //     delParam.recordPid = recordPid;
            //     var url;
            //     if (type == 'jy') {
            //         url = "/tjbgjd/deletejyresult"
            //     } else {
            //         url = "/tjbgjd/deletejcresult"
            //     }
            //     XywyService.save(url, delParam)
            //         .then(function(res) {
            //             // if (type == 'jy') {
            //             //     $scope.data.jyList.splice(index, 1);
            //             // } else {
            //             //     $scope.data.jcList.splice(index, 1);
            //             // }
            //             $scope.getdata()
            //         }, Popup.alert);

            // }, function() {});
            var delParam = {};
            delParam.pid = pid;
            delParam.recordPid = recordPid;
            var url;
            if (type == 'jy') {
                url = "/tjbgjd/deletejyresult"
            } else {
                url = "/tjbgjd/deletejcresult"
            }
            var myPopup = $ionicPopup.show({
                template: '您确定要删除该条记录吗？',
                title: '提示',
                scope: $scope,
                buttons: [
                    {
                        text: '取消',
                    },
                    {
                        text: '<b>确定</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            e.preventDefault();
                            $scope.delete(url, delParam)
                            myPopup.close();
                        }
                    },
                ]
            });
        };
        //删除接口
        $scope.delete = function (url, param) {
            XywyService.save(url, param)
                .then(function (data) {
                    $scope.getdata()
                }).catch(function (err) {
                    console.log(err)
                })
        }
        // 确认上传点击事件
        $scope.queRenSC = function () {
            XywyService.save('/tjbgjd/updateRecordStatus', param)
                .then(function (res) {
                    if (res.data) {
                        // $state.go('medicallist', { type: $stateParams.type,id:$stateParams.fid});
                        $state.go('medicalDetails', { id: id, type: $stateParams.type, fid: $stateParams.id })
                    }

                }, Popup.alert);
        };
        $scope.datas = { textValue: "", voiceTip: "按住说话" };
        $scope.inputMethod = '';
        $scope.datas.hideVoice = false;
        $scope.isshowimg = false;
        $scope.listSize = myConfig.listSize;
        var smallScroll = $ionicScrollDelegate.$getByHandle('small');
        var scrollContainer;
        $timeout(function () {
            scrollContainer = smallScroll.getScrollView().__container;
        });
        var realHeight = $window.innerHeight;
        $scope.randomId = Math.random().toString(16).slice(2);
        $scope.stylebottom = function () {
            //    		自我评估，常见症状判断距底端距离
            if ($scope.curgn == "ZWPG" || $scope.curgn == "CJZZ") {
                return { "bottom": "0px" };
            }
            //    		问症状问报告时判断距底端距离
            if ($scope.isbottom0) {
                return { "bottom": "0px" };
            }
            if (!$scope.datas.hideVoice && $scope.inputMethod === 'voice') {
                return { "bottom": "101px" };
            } else {
                return { "bottom": "48px" };
            }

        }
        $scope.resize = function () {
            if ($scope.datas.hideVoice) {
                var clientHeight = scrollContainer.clientHeight;
                smallScroll.resize().then(function () {
                    var bottomPos = smallScroll.getScrollPosition().top + scrollContainer.clientHeight;
                    if (bottomPos < scrollContainer.scrollHeight) {
                        smallScroll.scrollBy(0, -155, true);
                    }
                });
            } else {
                smallScroll.scrollBy(0, 155, true);
            }
        }
        $scope.switchInput = function () {
            realHeight = $window.innerHeight;
            if ($scope.inputMethod === 'voice') {
                $scope.inputFocus = false;
                $scope.inputMethod = 'keyboard';
                $scope.resize();
            } else {
                $scope.inputFocus = true;
                $scope.inputMethod = 'voice';
            }
        };
        $scope.colseInput = function () {
            $scope.inputMethod = '';
        }
        function addDialog(message) {
            if (angular.isString(message)) {

            }
            $scope.inputFocus = false;
            audioControl.pause();
            $scope.messageArr.push(message);
            //console.log($scope.messageArr);
        }
        $scope.start = false;

        // $scope.data = { textValue: "", voiceTip: "按住说话" };
        // $scope.voiceTip = '按住说话';
        function startFunc() {
            $scope.start = true;
            $scope.isshowimg = true;
            $scope.datas.voiceTip = '按住说话';
        }

        function finishFunc() {
            $scope.datas.voiceTip = '按住说话';
            $scope.start = false;
        }
        $scope.send = function ($event) {
            $scope.inputFocus = false;
            var value = $scope.datas.textValue
            if (value == '') {
                return
            } else {
                $scope.uservideo(value)
            }

        }
        //识别回调函数
        function successFunc(text) {
            if (text === false || text === "只是一个模拟调试的结果") {
                addDialog({ type: 'text', message: "没有听清", radioMsg: "没有听清" });
                $scope.zIndex = false;
            } else {
                //                $scope.sendmessage(text);
                // $scope.sendMessageXin(text);
                $scope.uservideo(text)
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
                    $scope.datas.voiceTip = '松开手指，取消发送';
                    $scope.cancel = true;
                } else {
                    $scope.cancel = false;
                    $scope.datas.voiceTip = '向上滑动，取消发送';
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
        //用户语音输入接口
        $scope.uservideo = function (text) {
            var filter = {};
            filter.videoText = text
            filter.recordPid = id
            XywyService.save('/tjbgjd/addDetailResultByUserVideo', filter)
                .then(function (data) {
                    $scope.datas.textValue = '';
                    if (data.data.data.saveDataFlag) {
                        $scope.getdata()
                    } else {
                        Popup.alert("未检测到异常指标，请重试。");
                    }

                }).catch(function (err) {
                    console.log(err)
                })
        }

    $scope.decide()
    $scope.getdata()
})
//气象健康首页
.controller('weathershouye', function (wxApi, $ionicViewSwitcher, $scope, $http, $state, $stateParams, $timeout, XywyService, Popup, Outlet, $ionicScrollDelegate, audioControl, $window, $rootScope, geoLocation,$ionicPopup,Upload, $timeout, $ionicModal, $ionicLoading) {
    var c = 750; // 基准宽度,取的是iphone6
    var b = document.getElementsByTagName('html')[0];
    var f = b.getBoundingClientRect().width / c;
    b.style.fontSize = f + 'rem';
    //判断手机类型
    $scope.isIos = false;
    if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        $scope.isIos = true;
    }
    //返回上一页
    $scope.goBack = function () {
        javascript: history.go(-1);
   
    };
    //点击跳转慢病气象健康
    $scope.gomanbingweather = function(){
        $state.go("manbingweatherlist");
    }
    wxApi.wxPromise().then(function (wx) {
        wx.getLocation({
            success:function(res){
                var latitude = res.latitude;
                var longitude = res.longitude;
            }
        });
    });
   
    //获取天气信息
     $scope.getWeather = function () {
         var param = {}
         param.cityName = "北京市"
        XywyService.save("/qxjk/getWeather", param)
            .then(function (data) {
            //    console.log(data,"5555")
                $scope.weather = data.data
            }).catch(function (err) {
                console.log(err)
            })
    }
    $scope.getWeather()

})
//慢病气象健康
.controller('manbingweather', function (wxApi, $ionicViewSwitcher, $scope, $http, $state, $stateParams, $timeout, XywyService, Popup, Outlet, $ionicScrollDelegate, audioControl, $window, $rootScope, geoLocation,$ionicPopup,Upload, $timeout, $ionicModal, $ionicLoading) {
    $scope.isshowmanbingorweather = 'manbing'
    $scope.getchanges = function(text){
        if(text=='manbing'){
            $scope.isshowmanbingorweather = "manbing"
        }else{
            $scope.isshowmanbingorweather = 'weather'
        }
    }
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
    $scope.data.elementName = "低气压"
    /**
     * 查询慢病列表
     */
    function jibinglist() {
        cleanZimuColor();
        $ionicScrollDelegate.$getByHandle('dashboard').scrollTop(false);
        $scope.pageNum = 1;
        var param = {
            pinYin : $scope.zimu,
            input: $scope.data.keyword

        };
        var config = {
            params: param
        }

        XywyService.query("/qxjk/getManBingList", config)
            .then(function (response) {
                // console.log(response,"123")
                $scope.pageCount = response.data.Count;
                $scope.jbList = response.data;
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
  
    $scope.gomanbingdetail = function (id,name) {
        $state.go('manbingdetail', { id: id, estype: "mb", viewTitle:name});
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
    function cleanZimuColor() {
        if ($(".city_anchor").children(".target").length > 0) {
            $(".city_anchor").children(".target").each(function () { $(this).removeClass("target") });
        }
    }
   //气象因子列表
   $scope.getweatherdata = function(){
            XywyService.save("/qxjk/getQiXiangYinZi")
            .then(function (data) {
                //  console.log(data,"5555")
                $scope.weatherfactor = data.data
            }).catch(function (err) {
                console.log(err)
            })
   }
   //qi
   $scope.getjibingbywwather =function (elementName){
       $scope.data.elementName = elementName;
       var param = {};
       param.elementName = elementName
       XywyService.save("/qxjk/getJiBingByQiXiangYinZi",param)
       .then(function (data) {
            // console.log(data,"6666")
           $scope.jibingbywwather = data.data
       }).catch(function (err) {
           console.log(err)
       })

   }
   $scope.chooseZz = function(name,id){
    $state.go('manbingdetail', { id: id, estype: "mb", viewTitle:name});
   }
   $scope.getweatherdata()
   $scope.getjibingbywwather($scope.data.elementName)
    $scope.goserch=function(){
        $state.go("jibingserch",{gn:"mb"});
    }

})
  //慢病详情
  .controller('manbingdetail', ['$stateParams', 'Popup', 'QueryEsZhiShi', '$scope', '$window', '$state', 'XywyService', 'audioControl', function ($stateParams, Popup, QueryEsZhiShi, $scope, $window, $state, XywyService, audioControl) {
    $scope.isIos = false;
    $scope.inputFocus = false;
    if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        $scope.isIos = true;
        $scope.localyyzt = "打开";
    }
    var self = this;
    self.viewTitle = $stateParams.viewTitle
    self.haveResult = true;
    self.items = [];
    var push = Array.prototype.push.bind(self.items);
    self.title = $stateParams.viewTitle
    //获取危险气象
    $scope.getwxqxdata = function () {
        var param = {
            diseaseId : $stateParams.id,
        }
        XywyService.save("/qxjk/getWeiXianQiXiang ", param)
            .then(function (data) {
                $scope.wxqxdata = data.data
                if ($scope.wxqxdata) {
                    push({ title: '危险气候', content: $scope.wxqxdata.content, show: true });
                }
                $scope.getwxzzdata()
            }).catch(function (err) {
                console.log(err)
            });


    }
     //获取危险症状
     $scope.getwxzzdata = function () {
        var param = {
            diseaseId : $stateParams.id,
        }
        XywyService.save("/qxjk/getWeiXianZhengZhuang", param)
            .then(function (data) {
                $scope.wxzzdata = data.data
                if ($scope.wxzzdata) {
                    push({ title: '危险症状', content: $scope.wxzzdata.content, show: true });
                }
                $scope.getcjwtdata()
            }).catch(function (err) {
                console.log(err)
            });


    }
     //获取常见问题
     $scope.getcjwtdata = function () {
        var param = {
            diseaseId : $stateParams.id,
        }
        XywyService.save("/qxjk/getJiBingQuestion", param)
            .then(function (data) {
                $scope.cjwt = [];
                $scope.jwtdata = data.data
                for(var i=0;i<$scope.jwtdata.length;i++){
                    $scope.cjwt.push($scope.jwtdata[i].question)
                }
                if ($scope.jwtdata) {
                    push({ title: '常见问题', content: $scope.cjwt, show: true });
                   
                }
                console.log(self.items,"456")
                push = null
            }).catch(function (err) {
                console.log(err)
            });


    }
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
   
    function init(){
        $scope.getwxqxdata();
        // $scope.getwxzzdata();
        // $scope.getcjwtdata();
    }

    init()

}])

