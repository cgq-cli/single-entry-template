const util = {
    /**
     * 深拷贝
     * @author cyk
     * @param source {OBject} 源对象
     * @param target {Object} 目标对象
     * @return {Object} 目标对象
     */
    deepCopy(source, target) {
        target = target || {}
        for (var i in source) {
            if (typeof source[i] === 'object') {
                target[i] = source[i].constructor === Array ? [] : {}
                util.deepCopy(source[i], target[i])
            } else {
                target[i] = source[i]
            }
        }
        return target
    },

    /**
     * 生成uuid
     * @return {String} uuid字符串
     */
    guid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0)
                .toString(16)
                .substring(1)
        }
        return (
            S4() +
            S4() +
            '-' +
            S4() +
            '-' +
            S4() +
            '-' +
            S4() +
            '-' +
            S4() +
            S4() +
            S4()
        )
    },

    /**
     * 计算nodata
     * @param list {OBject} 列表数组
     * @return {Boolean} 真/假
     */
    switchNodata(list) {
        return !list || list.length === 0
    },

    /**
     * 距离格式化
     * @param distance {Number} 距离值
     * @return {String} 距离&单位
     */
    standardizeDistance(distance) {
        if (distance < 1000) {
            distance = parseInt(distance) + 'm'
        } else {
            distance = (distance / 1000).toFixed(1) + 'km'
        }
        return distance
    },

    /**
     * 解析分隔符，并用空格拼接
     * @param str {String} 待解析字符串
     * @return {String} 字符串/null
     */
    splitDignose(str, key = '@#%!%!#@') {
        if (!str) {
            return ''
        }
        let temp = str && str.split(key)
        if (temp && temp.length > 0) {
            return temp.filter(a => a !== 'null').join(' ')
        } else {
            return null
        }
    },

    /**
     * 过滤emoji表情包
     * @param {String} str 文本字符串
     * @return {String} 过滤掉表情符号的字符串
     */
    filteremoji(str) {
        let ranges = [
            '\ud83c[\udf00-\udfff]',
            '\ud83d[\udc00-\ude4f]',
            '\ud83d[\ude80-\udeff]',
            '[\uD800-\uDBFF][\uDC00-\uDFFF]'
        ]
        return str.replace(new RegExp(ranges.join('|'), 'g'), '')
    },

    /**
     * 随机生成belong
     * @return {String} belong字符串
     */
    getBelong() {
        let CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
            ''
        )
        let chars = CHARS
        let uuid = []
        let i
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                let r = 0 | (Math.random() * 16)
                uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
            }
        }
        return uuid.join('')
    },

    /**
     * 获取文件拓展名
     * @param {String} filename 文件名
     * @return {String} 文件后缀
     */
    getFileExtension(filename) {
        // 文件扩展名匹配正则
        let reg = /\.[^.]+$/
        let matches = reg.exec(filename)
        if (matches) {
            return matches[0]
        }
    },

    // 图片压缩并保存到files
    getBase64(url) {
        let Img = new Image(),
            dataURL = ''
        Img.src = url
        let p = new Promise(function(resolve, reject) {
            Img.onload = function() {
                //要先确保图片完整获取到，这是个异步事件
                let canvas = document.createElement('canvas'), //创建canvas元素
                    width = Img.width, //确保canvas的尺寸和图片一样
                    height = Img.height
                // 默认将长宽设置为图片的原始长宽，这样在长宽不超过最大长度时就不需要再处理
                let ratio = width / height,
                    maxLength = 500,
                    newHeight = height,
                    newWidth = width
                // ratio = 1;
                // 在长宽超过最大长度时，按图片长宽比例等比缩小
                if (width > maxLength || height > maxLength) {
                    if (width > height) {
                        newWidth = maxLength
                        newHeight = maxLength / ratio
                    } else {
                        newWidth = maxLength * ratio
                        newHeight = maxLength
                    }
                }
                canvas.width = newWidth
                canvas.height = newHeight
                canvas
                    .getContext('2d')
                    .drawImage(Img, 0, 0, newWidth, newHeight) //将图片绘制到canvas中
                dataURL = canvas.toDataURL('image/jpeg', 0.5) //转换图片为dataURL
                resolve(dataURL)
            }
        })
        return p
    },
    /**
     * 截取url链接后面的参数
     * @param {String} name 希望截取的参数键
     * @return {String} 截取的参数值
     */
    GetQueryString(name, url) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var urlStr = url || window.location.href
        var subUrl = '?' + urlStr.split('?')[1]
        var r = subUrl.substr(1).match(reg)
        if (r != null) return decodeURI(r[2])
        return null
    },
    // 验证身份证合法性
    isIdentityCodeValid(code){
        if (!code) {
            return false
        }
        code = code.toUpperCase()

        var reg,
            city = {
                11: '北京',
                12: '天津',
                13: '河北',
                14: '山西',
                15: '内蒙古',
                21: '辽宁',
                22: '吉林',
                23: '黑龙江 ',
                31: '上海',
                32: '江苏',
                33: '浙江',
                34: '安徽',
                35: '福建',
                36: '江西',
                37: '山东',
                41: '河南',
                42: '湖北 ',
                43: '湖南',
                44: '广东',
                45: '广西',
                46: '海南',
                50: '重庆',
                51: '四川',
                52: '贵州',
                53: '云南',
                54: '西藏 ',
                61: '陕西',
                62: '甘肃',
                63: '青海',
                64: '宁夏',
                65: '新疆',
                71: '台湾',
                81: '香港',
                82: '澳门',
                91: '国外 '
            }

        if (!city[code.substr(0, 2)]) {
            return false
        }

        if (code.length == 15) {
            reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/

            if (reg.test(code)) {
                return isValidityBrithBy15IdCard(code)
            }

            return false
        } else if (code.length == 18) {
            reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/

            if (!reg.test(code)) {
                return false
            } else {
                code = code.split('')
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
                var sum = 0
                var ai = 0
                var wi = 0
                for (var i = 0; i < 17; i++) {
                    ai = code[i]
                    wi = factor[i]
                    sum += ai * wi
                }

                if (parity[sum % 11] != code[17]) {
                    return false
                }
                return true
            }
        }
        return false
    },
    /**
     * 
     * @param {string} data 身份证或年月日
     * @param {obj} ageLimit {  {number} lowLimit 年龄小于lowLimit
     *                          {number} lowUnit 年龄小于lowLimit的单位  1：岁/2：月/3：天
     *                          {number} hightLimit 年龄大于hightLimit
     *                          {number} hightUnit 年龄大于hightLimit的单位  1：岁/2：月/3：天
     *                       }
     * @return {boolean} 是否符合条件
     */
    isAgeEligible(data, ageLimit){
        /**
         * 根据合法身份证或年月日获取年龄，几岁几月或几天
         * @param {string} data 身份证或年月日
         * @param {obj} unit 单位  1：岁/2：月/3：天
         * @return {number}  年龄
         */
        const getAge = function(data, unit) {
            var len = (data + "").length;
            var strBirthday = "";
            if (len == 10) {         //传入的不是身份证 而是格式为 1999-05-02 的字符串
                strBirthday = data.substr(0, 4) + "/" + data.substr(5, 2) + "/" + data.substr(8, 2);
            }else if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
            {
                strBirthday = data.substr(6, 4) + "/" + data.substr(10, 2) + "/" + data.substr(12, 2);
            }else if (len == 15) {
                strBirthday = "19" + data.substr(6, 2) + "/" + data.substr(8, 2) + "/" + data.substr(10, 2);
            }else {
                return 0
            }
            //时间字符串里，必须是“/”
            var birthDate = new Date(strBirthday);
            var nowDateTime = new Date();
            var year = nowDateTime.getFullYear() - birthDate.getFullYear();
            if (unit == 1) {
                //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
                if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() <= birthDate.getDate())) {
                    year--;
                }
                return year;
            } else if (unit == 2) {
                month = 12 * year + nowDateTime.getMonth() - birthDate.getMonth();
                if (nowDateTime.getDate() <= birthDate.getDate()) {
                    month--;
                }
                return month;
            } else if (unit == 3) {
                return Math.floor((nowDateTime.getTime() - birthDate.getTime())/86400000);
            }
        }
        return ageLimit.lowLimit && getAge(data, ageLimit.lowUnit) < ageLimit.lowLimit ||
        ageLimit.hightLimit && getAge(data, ageLimit.hightUnit) >=  ageLimit.hightLimit
    },
    // 时间戳转日期
    timeStampToDate(date){
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        return YY + MM + DD;
    },
    //验证手机号码合法性
    iscorrectPhone(value) {
        if (/^((1[3-9][0-9])+\d{8})$/.test(value)) {
            return true
        }else{
            return false
        }
    },
    /**获取客户端类型 */
    getFullPlatform () {
        var t = navigator.userAgent.toLowerCase(),
            e = {
                platform: "other",
                version: "1.0"
            };
        return -1 != t.indexOf("rubikui") ? (e = {
                platform: "native",
                version: "1.0"
            },
            -1 != t.indexOf("monkeycenter") && (e.monkey = !0)) : -1 != t.indexOf("micromessenger") ? (e = {
                platform: "weixin",
                version: "1.0"
            },
            -1 != t.indexOf("wxwork") && (e.work = !0)) : -1 != t.indexOf("alipayclient") && (e = {
            platform: "alipay",
            version: "1.0"
        }), e
    },
    //身份证加密
    encryptID (str) {
        return str && str.substr(0, 4) + '************' + str.substr(14, 18)
    },
    //手机号加密
    encryptPhone(str){
        return str && str.substr(0, 3) + '*****' + str.substr(8, 11)
    }
}
export default util
