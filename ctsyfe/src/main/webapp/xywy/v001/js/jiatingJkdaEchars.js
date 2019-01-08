angular.module('jtjkdaechars', [])

.directive('xueYa', function(XywyService, Popup) {
        return {
            scope: {
                id: "@",
                legend: "=",
                item: "=",
                data: "=",
                userid: "="
            },
            restrict: 'E',
            template: '<div style="height:260px;width:100%; "></div>',
            replace: true,
            link: function($scope, element, attrs, controller) {
                var param = {};
                param.id = $scope.userid;
                //血压最近七次数据
                XywyService.query('/queryxueyaseven', { params: param })
                    .then(function(res) {
                        console.log(res);
                        if (res.data.length > 0) {
                            $scope.gaoya = [];
                            $scope.diya = [];
                            for (var i = 0; i < res.data.length; i++) {
                                $scope.gaoya[res.data.length - i - 1] = res.data[i].GAOYA;
                                $scope.diya[res.data.length - i - 1] = res.data[i].DIYA;
                            }
                            //                	$scope.item="最近七次血压趋势图";
                            $scope.item = [0, 1, 2, 3, 4, 5, 6, 7];
                            tuxiang();
                        } else {
                            $scope.gaoya = [];
                            $scope.diya = [];
                            //                     $scope.item="最近七次血压趋势图";
                            $scope.item = [0, 1, 2, 3, 4, 5, 6, 7];
                            //添加p标签
                            var domp='<div style="display: table;width: 100%;height: 100%;text-align: center;">'
                            	+'<p style="display: table-cell;vertical-align: middle;font-size: 14px;color: #999;">暂无数据</p>'
                            	+'</div>';
                            $("#"+$scope.id).append(domp);
                        }
                        
                    }, Popup.alert);
                //图形加载
                var tuxiang = function() {
                    myChart = echarts.init(document.getElementById($scope.id), 'macarons');
                    var s = $scope.gaoya + $scope.diya + $scope.item;
                    option = {                  		
                        tooltip: {
                            trigger: 'axis' //触发类型
                        },
                        legend: {
                            data: ['收缩压', '舒张压'], //定义折线名称
                            right: '10',
                        },
                        xAxis: {
                            type: 'category', //坐标轴类型
                            boundaryGap: false,
                            data: ['0', '1', '2', '3', '4', '5', '6', '7'], //x轴坐标值
                            axisLine: { show: false } //隐藏轴线
                        },
                        yAxis: {
                            name: 'mmHg',
                            type: 'value',
                            axisLine: { show: false } //隐藏轴线
                        },
                        series: [{
                            data: $scope.gaoya,
                            type: 'line',
                            smooth: true,
                            name: "收缩压",
//                            areaStyle: {
//                                normal: {
//                                    color: '#FFCC99', //圈圈颜色
//                                    lineStyle: {
//                                        color: '#FFCC99'
//                                    }
//                                }
//                            },
                            itemStyle: { 
                            	normal: { 
                            		label: { show: true },
                            		 color: '#666699',
//                            		 shadowBlur: 8,
//                            		 shadowColor: '#FFCC99',
//                            		 borderColor:'#FFCC99',
                            		 orderWidth:2,
                            		 backgroundColor:'transparent'
                            } 
                            } //显示数值
                        }, {
                            data: $scope.diya,
                            type: 'line',
                            smooth: true,
                            name: "舒张压",
//                            areaStyle: {
//                                normal: {
//                                    color: '#00b5ee', //圈圈颜色
//                                    lineStyle: {
//                                        color: '#00b5ee'
//                                    }
//                                }
//                            },
                            itemStyle: { 
                            	normal: { 
                            		label: { show: true },
                            		 color: '#00b5ee',
//                            		 shadowBlur: 8,
//                            		 shadowColor: '#00b5ee',
//                            		 borderColor:'#00b5ee',
                            		 orderWidth:2,
                            		 backgroundColor:'transparent'
                            } 
                            } //显示数值
                        }]
                    };
                    myChart.setOption(option);
                }

            }
        };
    })
    .directive('xueTang', function(XywyService, Popup) {
        return {
            scope: {
                id: "@",
                userid: "="
            },
            restrict: 'E',
            template: '<div style="height:200px;width:100%; "></div>',
            replace: true,
            link: function($scope, element, attrs, controller) {
                var param = {};
                param.id = $scope.userid;
                $scope.$on('xueTangTime', function(event, code) {
                    param.celiangshiduan = code;
                    queryData();
                });

                var queryData = function() {
                    XywyService.query('/queryxuetangseven', { params: param })
                        .then(function(res) {
                            console.log(res);
                            if (res.data.length > 0) {
                                $scope.xueTang = [];
                                //设置折线点的颜色
                                var shadowColor="#00d641";
                                for (var i = 0; i < res.data.length; i++) {
                                	if(res.data[i].JIEGUO=="偏低"||res.data[i].JIEGUO=="低"){
                                		shadowColor="#ff9500";
                                	}else if(res.data[i].JIEGUO=="偏高"||res.data[i].JIEGUO=="高"){
                                		shadowColor="#ff6666";
                                	}else{
                                		shadowColor="#00d641";
                                	}
                                	var data={value:res.data[i].XUETANG,
                                            itemStyle: {
                                            	normal: {
                                            		label: { show: true },
                                            		 color: '#00b5ee',
//                                            		 shadowBlur: 8,
//                                            		 shadowColor: shadowColor,
//                                            		 borderColor:shadowColor,
                                            		 orderWidth:2,
                                            		 backgroundColor:'transparent'
                                            } 
                                            } //显示数值
                                };
                                	$scope.xueTang[res.data.length - i - 1] = data;
                                }
//                                for (var i = 0; i < res.data.length; i++) {
//                                    $scope.xueTang[res.data.length - i - 1] = res.data[i].XUETANG;
//                                }
                                //展示图形
                                tuxiang();
                            } else {
                                $scope.xueTang = [];
                                //图形显示的外层dom
                                var domparent=document.getElementById($scope.id);
                                while(domparent.hasChildNodes()){//判断当前dom下是否还有节点，有则删除
                                	domparent.removeChild(domparent.firstChild);
                                }
                              //添加p标签
                                var domp='<div style="display: table;width: 100%;height: 100%;text-align: center;">'
                                	+'<p style="display: table-cell;vertical-align: middle;font-size: 14px;color: #999;">暂无数据</p>'
                                	+'</div>';
                                $("#"+$scope.id).append(domp);
                            }
                            
                        }, Popup.alert);
                };
                queryData();
                //图形加载
                var tuxiang = function() {
                    myChart = echarts.init(document.getElementById($scope.id), 'macarons');
                    option = {

                        tooltip: {
                            trigger: 'axis' //触发类型
                        },
                        grid: {
                            y: 40,
                            y2: 40
                        },
                        legend: {
                            right: '10',
                        },
                        xAxis: {
                            type: 'category', //坐标轴类型
                            boundaryGap: false,
                            data: ['0', '1', '2', '3', '4', '5', '6', '7'], //x轴坐标值
                            axisLine: { show: false } //隐藏轴线
                        },
                        yAxis: {
                            name: 'mmol/L',
                            type: 'value',
                            axisLine: { show: false } //隐藏轴线
                        },
                        series: [{
                            data: $scope.xueTang,
                            type: 'line',
                            smooth: true,
                            name: "血糖",
                            lineStyle:{
                            	normal:{
                            		color:'#00b5ee'
                            	}
                            },
//                            itemStyle: { normal: { label: { show: true } } } //显示数值
                        }]
                    };
                    myChart.setOption(option);
                }

            }
        };
    })
    .directive('tiZhong', function(XywyService, Popup) {
        return {
            scope: {
                id: "@",
                userid: "="
            },
            restrict: 'E',
            template: '<div style="height:200px;width:100%; "></div>',
            replace: true,
            link: function($scope, element, attrs, controller) {
                var param = {};
                param.id = $scope.userid;
                XywyService.query('/querytizhongseven', { params: param })
                    .then(function(res) {
                    console.log(res);
                    if (res.data.length > 0) {
                        $scope.tiZhong = [];
                        var shadowColor="#00d641";
                        for (var i = 0; i < res.data.length; i++) {
                        	if(res.data[i].JIEGUO=="偏瘦"||res.data[i].JIEGUO=="低"){
                        		shadowColor="#ff9500";
                        	}else if(res.data[i].JIEGUO=="超重"||res.data[i].JIEGUO=="高"){
                        		shadowColor="#ff6666";
                        	}else if(res.data[i].JIEGUO=="肥胖"){
                        		shadowColor="#ff3333";
                        	}else{
                        		shadowColor="#00d641";
                        	}
                        	var data={value:res.data[i].TI_ZHONG,
                                    itemStyle: {
                                    	normal: {
                                    		label: { show: true },
                                    		 color: '#00b5ee',
//                                    		 shadowBlur: 8,
//                                    		 shadowColor: shadowColor,
//                                    		 borderColor:shadowColor,
                                    		 orderWidth:2,
                                    		 backgroundColor:'transparent'
                                    } 
                                    } //显示数值
                        };
                        	$scope.tiZhong[res.data.length - i - 1] = data;
                        }
//                            for (var i = 0; i < res.data.length; i++) {
//                                $scope.tiZhong[res.data.length - i - 1] = res.data[i].TI_ZHONG;
//                            }
                            //展示图形
                            tuxiang();
                        } else {
                            $scope.tiZhong = [];
                          //添加p标签
                            var domp='<div style="display: table;width: 100%;height: 100%;text-align: center;">'
                            	+'<p style="display: table-cell;vertical-align: middle;font-size: 14px;color: #999;">暂无数据</p>'
                            	+'</div>';
                            $("#"+$scope.id).append(domp);
                        }
                        
                    }, Popup.alert);
                //图形加载
                var tuxiang = function() {
                    myChart = echarts.init(document.getElementById($scope.id), 'macarons');
                    option = {

                        tooltip: {
                            trigger: 'axis' //触发类型
                        },
                        grid: {
                            y: 40,
                            y2: 40
                        },
                        legend: {
                            right: '10',
                        },
                        xAxis: {
                            type: 'category', //坐标轴类型
                            boundaryGap: false,
                            data: ['0', '1', '2', '3', '4', '5', '6', '7'], //x轴坐标值
                            axisLine: { show: false } //隐藏轴线
                        },
                        yAxis: {
                            name: 'kg',
                            type: 'value',
                            axisLine: { show: false } //隐藏轴线
                        },
                        series: [{
                            data: $scope.tiZhong,
                            type: 'line',
                            smooth: true,
                            name: "体重",
                            lineStyle:{
                            	normal:{
                            		color:'#00b5ee'
                            	}
                            },
//                            itemStyle: { normal: { label: { show: true } } } //显示数值
                        }]
                    };
                    myChart.setOption(option);
                }

            }
        };
    })
    /**
     * 心率
     */
    .directive('xinLv', function(XywyService, Popup) {
        return {
            scope: {
                id: "@",
                userid: "="
            },
            restrict: 'E',
            template: '<div style="height:260px;width:100%; "></div>',
            replace: true,
            link: function($scope, element, attrs, controller) {
                var param = {};
                param.id = $scope.userid;
                //血压最近七次数据
                XywyService.query('/queryxueyaseven', { params: param })
                    .then(function(res) {
                        console.log(res);
                        if (res.data.length > 0) {
                            $scope.xinlv = [];
                            var shadowColor="#00d641";
                            for (var i = 0; i < res.data.length; i++) {
                            	if(res.data[i].XINLV<60){
                            		shadowColor="#ff9500";
                            	}else if(res.data[i].XINLV>100){
                            		shadowColor="#ff6666";
                            	}else{
                            		shadowColor="#00d641";
                            	}
                            	var data={value:res.data[i].XINLV,
                                        itemStyle: {
                                        	normal: {
                                        		label: { show: true },
                                        		 color: '#00b5ee',
//                                        		 shadowBlur: 8,
//                                        		 shadowColor: shadowColor,
//                                        		 borderColor:shadowColor,
                                        		 orderWidth:2,
                                        		 backgroundColor:'transparent'
                                        } 
                                        } //显示数值
                            };
                                $scope.xinlv[res.data.length - i - 1] = data;
                            }
                            //                	$scope.item="最近七次血压趋势图";
                            $scope.item = [0, 1, 2, 3, 4, 5, 6, 7];
                            tuxiang();
                        } else {
                            $scope.xinlv = [];
                            //                     $scope.item="最近七次血压趋势图";
                            $scope.item = [0, 1, 2, 3, 4, 5, 6, 7];
                            //添加p标签
                            var domp='<div style="display: table;width: 100%;height: 100%;text-align: center;">'
                            	+'<p style="display: table-cell;vertical-align: middle;font-size: 14px;color: #999;">暂无数据</p>'
                            	+'</div>';
                            $("#"+$scope.id).append(domp);
                        }
                        
                    }, Popup.alert);
                //图形加载
                var tuxiang = function() {
                    myChart = echarts.init(document.getElementById($scope.id), 'macarons');
                    option = {                  		
                        tooltip: {
                            trigger: 'axis' //触发类型
                        },
                        
                        xAxis: {
                            type: 'category', //坐标轴类型
                            boundaryGap: false,
                            data: ['0', '1', '2', '3', '4', '5', '6', '7'], //x轴坐标值
                            axisLine: { show: false } //隐藏轴线
                        },
                        yAxis: {
                            name: 'bpm',
                            type: 'value',
                            axisLine: { show: false } //隐藏轴线
                        },
                        series: [{
                            data: $scope.xinlv,
                            type: 'line',
                            smooth: true,
                            name: "心率", 
                            lineStyle:{
                            	normal:{
                            		color:'#00b5ee'
                            	}
                            },
//                            itemStyle: { 
//                            	normal: { 
//                            		label: { show: true },
//                            		 color: '#fa5a5c',
//                            		 shadowBlur: 8,
//                            		 shadowColor: '#fa5a5c',
//                            		 borderColor:'#fa5a5c',
//                            		 orderWidth:2,
//                            		 backgroundColor:'transparent'
//                            } 
//                            } //显示数值
                        }]
                    };
                    myChart.setOption(option);
                }

            }
        };
    })
    ;