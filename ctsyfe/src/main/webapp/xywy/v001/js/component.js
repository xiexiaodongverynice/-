angular.module('component', [])
    /**
     * 安卓返回首页
     */
    .directive('goHomeAndroid', ['$ionicViewSwitcher', '$state', function ($ionicViewSwitcher, $state) {
        return {
            scope: {},
            restrict: 'ACE',
            template: '<button ng-click="back()" class="button button-clear icon ion-ios-home-outline">',
            link: function ($scope) {
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

                }
            }
        };
    }]) 
    /**
    * ios返回首页
    */
   .directive('goShouye', ['$ionicViewSwitcher', '$rootScope', '$state', 'Popup', '$window', '$location', 'audioControl', 'XywyService', 'Message', function ($ionicViewSwitcher, $rootScope, $state, Popup, $window, $location, audioControl, XywyService, Message) {

       return {
           scope: {
               gn: "=",
               type: '=',
               id: '='
           },
           restrict: 'ACE',
        //    template: '<div ng-click="back()" style="width: 90px; height:50px;text-align:center; float: right;border-bottom-left-radius: 35px;border-top-left-radius: 35px;color: #2db4ee;margin-top: 5px;background-color: white;opacity:0.9;border: 1px solid #ebebeb;"><i  class="ion-ios-home-outline" style="margin-top: 3px;display:block;font-size:22px;padding-left:10px;"></i><p ng-if="!type" style="padding-top: 0px;padding-left:10px;">返回首页</p><p ng-if="type" style="padding-top: 0px;padding-left:10px;">报告首页</p></div>',
           template: '<div ng-click="back()" style="display: flex; justify-content: center;align-items: center;width: 44px;height: 44px;line-height: 44px;background: #00b5ee;border-radius: 50%;opacity: .8;box-shadow: 0px 5px 10px #72D5F5;"><i class="icon iconfont icon-shouye" style="color: white;font-size: 25px;"></i></div>',
           link: function ($scope, $element, $attrs) {
               $scope.back = function () {
                   if ($scope.type) {
                       $state.go("medicallist", {
                           type: $scope.type,
                           id: $scope.id
                       });
                   } else {
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
                   }

               }
           }
       };
   }])
   /**
    * 浮动菜单中
    */
   .directive('goShouyeInMenu', ['$ionicViewSwitcher', '$rootScope', '$state', 'Popup', '$window', '$location', 'audioControl', 'XywyService', 'Message', function ($ionicViewSwitcher, $rootScope, $state, Popup, $window, $location, audioControl, XywyService, Message) {

    return {
        scope: {
            gn: "=",
            type: '=',
            id: '='
        },
        restrict: 'ACE',
     //    template: '<div ng-click="back()" style="width: 90px; height:50px;text-align:center; float: right;border-bottom-left-radius: 35px;border-top-left-radius: 35px;color: #2db4ee;margin-top: 5px;background-color: white;opacity:0.9;border: 1px solid #ebebeb;"><i  class="ion-ios-home-outline" style="margin-top: 3px;display:block;font-size:22px;padding-left:10px;"></i><p ng-if="!type" style="padding-top: 0px;padding-left:10px;">返回首页</p><p ng-if="type" style="padding-top: 0px;padding-left:10px;">报告首页</p></div>',
        template: '<div ng-click="back()" class="fl-child"><i class="icon iconfont icon-shouye" style="color: white;font-size: 20px;"></i></div>',
        link: function ($scope, $element, $attrs) {
            $scope.back = function () {
                if ($scope.type) {
                    $state.go("medicallist", {
                        type: $scope.type,
                        id: $scope.id
                    });
                } else {
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
                }

            }
        }
    };
}]);