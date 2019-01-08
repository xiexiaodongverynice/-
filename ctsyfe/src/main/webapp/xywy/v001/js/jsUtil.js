angular.module('jsUtil', [])
    /**
     * js公共方法
     * isEmpty,isNotEmpty,verifyMobile 方法
     */
    .service('JsUtil', [function() {
        return {


            // 对象是否为空
            isNotEmptyObj: function(obj) {
                return !(Object.keys(obj).length === 0)
            },

            /**
             * 为空判断
             * @param obj
             * @returns {boolean}
             */
            isEmpty: function(obj) {
                if (obj == undefined || obj == null || new String(obj).trim() == '') {
                    return true;
                } else {
                    return false;
                }
            },

            /**
             * 判断非空
             * @param obj
             * @returns {boolean}
             */

            isNotEmpty: function(obj) {
                return this.isEmpty(obj) ? false : true;
            },

            //手机号验证
            verifyMobile: function(phonenum) {
                //正则表达式
                var zhengze = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(16[0-9]{1}))+\d{8})$/;
                var len = (phonenum + "").length;
                if (len != 11) {
                    return false;
                }
                if (zhengze.test(phonenum)) {
                    return true;
                } else {
                    return false;
                }
            }
        }


    }]);