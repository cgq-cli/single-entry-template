const date = {
    /**
     * 初始化日期
     * @param {*} date
     * @return {Date} 继承自Date原型的日期
     */
    initDate(date = new Date()) {
        if (date instanceof Date === false) {
            return new Date(date)
        } else {
            return date
        }
    },

    /**
     * 自定义格式模板
     * @param {String} format 自定义的格式，默认'yyyy-mm-dd'
     * @param {*} date
     * @return {String} 格式化的日期
     */
    format(format = 'yyyy-mm-dd', date) {
        date = this.initDate(date)
        var look = function(m) {
            // Check whether a format character is doubled
            var n = 0
            while (i + 1 < format.length && format.charAt(i + 1) === m) {
                n++
                i++
            }
            return n
        }
        var f1 = function(m, val, len) {
            // Format a number, with leading zero if necessary
            var n = '' + val
            if (look(m)) {
                while (n.length < len) {
                    n = '0' + n
                }
            }
            return n
        }
        var i
        var output = ''
        var literal = false

        for (i = 0; i < format.length; i++) {
            if (literal) {
                if (format.charAt(i) === "'" && !look("'")) {
                    literal = false
                } else {
                    output += format.charAt(i)
                }
            } else {
                switch (format.charAt(i)) {
                    case 'd':
                        output += f1('d', date.getDate(), 2)
                        break
                    case 'o':
                        output += f1(
                            'o',
                            (date.getTime() -
                                new Date(date.getFullYear(), 0, 0).getTime()) /
                                86400000,
                            3
                        )
                        break
                    case 'm':
                        output += f1('m', date.getMonth() + 1, 2)
                        break
                    case 'y':
                        output += look('y')
                            ? date.getFullYear()
                            : (date.getFullYear() % 100 < 10 ? '0' : '') +
                              (date.getFullYear() % 100)
                        break
                    case 'h':
                        var h = date.getHours()
                        output += f1('h', h > 12 ? h - 12 : h === 0 ? 12 : h, 2)
                        break
                    case 'H':
                        output += f1('H', date.getHours(), 2)
                        break
                    case 'i':
                        output += f1('i', date.getMinutes(), 2)
                        break
                    case 's':
                        output += f1('s', date.getSeconds(), 2)
                        break
                    case 'a':
                        output += date.getHours() > 11 ? '下午' : '上午'
                        break
                    case 'A':
                        output += date.getHours() > 11 ? 'PM' : 'AM'
                        break
                    case "'":
                        if (look("'")) {
                            output += "'"
                        } else {
                            literal = true
                        }
                        break
                    default:
                        output += format.charAt(i)
                }
            }
        }
        return output
    },
    getWeek(date) {
        date = this.initDate(date)
        return '星期' + '日一二三四五六'.charAt(date.getDay())
    },
    /**
     * 格式化时分秒
     * @param {Number} seconds 秒数
     * @return {String} '00:00:00' 时分秒
     */
    formatSeconds(count) {
        let h = parseInt(count / 3600)
        let m = parseInt((count - h * 3600) / 60)
        let s = count - h * 3600 - m * 60

        // 格式化
        h < 10 ? (h = `0${h}`) : ''
        m < 10 ? (m = `0${m}`) : ''
        s < 10 ? (s = `0${s}`) : ''

        if (h > 0) {
            return `${h}:${m}:${s}`
        } else {
            return `${m}:${s}`
        }
    },
    // 根据日期计算当前年龄（精确到年）
    countYearAge(start, end = new Date()) {
        start = this.initDate(start)
        end = this.initDate(end)
        return end.getFullYear() - start.getFullYear()
    },
    compare(d1, d2) {
        d1 = d1.replace(/-/gi, '/')
        d2 = d2.replace(/-/gi, '/')
        let time1 = new Date(d1).getTime()
        let time2 = new Date(d2).getTime()
        if (time1 > time2) {
            return 1
        } else if (time1 === time2) {
            return 0
        } else {
            return -1
        }
    },
    getPreMonth(date) {
        let arr = date.split('-')
        let year = arr[0] // 获取当前日期的年份
        let month = arr[1] // 获取当前日期的月份
        let year2 = year
        let month2 = parseInt(month) - 1
        if (month2 === 0) {
            year2 = parseInt(year2) - 1
            month2 = 12
        }
        let month2Str = month2.toString()
        if (month2 < 10) {
            month2Str = '0' + month2
        }
        let t2 = year2 + '-' + month2Str
        return t2
    },
    getNextMonth(date) {
        let arr = date.split('-')
        let year = arr[0] // 获取当前日期的年份
        let month = arr[1] // 获取当前日期的月份
        let year2 = year
        let month2 = parseInt(month) + 1
        if (month2 === 13) {
            year2 = parseInt(year2) + 1
            month2 = 1
        }
        let month2Str = month2.toString()
        if (month2 < 10) {
            month2Str = '0' + month2
        }

        let t2 = year2 + '-' + month2Str
        return t2
    },

    /**
     * 获取前后n天的日期
     * @param {Number} n
     * @return {String} 前后n天的日期
     */
    funDate(n) {
        let date1 = new Date()
        let date2 = new Date(date1)
        date2.setDate(date1.getDate() + n)
        return date2
    },

    /**
     * 计算当前年龄
     * @param {*} start 格式化的出生年月日 如：1990-01-01
     * @return {String} 当前年龄
     */
    countMonthAge(start, end = this.format(new Date())) {
        start = start.split('-')
        end = end.split('-')
        let temp =
            (end[0] - start[0]) * 12 +
            (end[1] - start[1]) +
            (end[2] - start[2] >= 0 ? 0 : -1)
        if (temp < 12) {
            return temp + '个月'
        } else {
            return parseInt(temp / 12) + '岁'
        }
    },

    /**
     * 判断是否在该时间段内
     * @param {String} beginTime 开始时间
     * @param {String} endTime 结束时间
     * @param {String} nowTime 当前时间
     * @return {Boolean} 当前时间是否在开始时间和结束时间范围内
     */
    timeRange(beginTime, endTime, nowTime) {
        let strb = beginTime.split(':')
        if (strb.length !== 2) {
            return false
        }
        let stre = endTime.split(':')
        if (stre.length !== 2) {
            return false
        }
        let strn = nowTime.split(':')
        if (stre.length !== 2) {
            return false
        }
        let b = new Date()
        let e = new Date()
        let n = new Date()

        b.setHours(strb[0])
        b.setMinutes(strb[1])
        e.setHours(stre[0])
        e.setMinutes(stre[1])
        n.setHours(strn[0])
        n.setMinutes(strn[1])

        if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
            // alert('当前时间是：' + n.getHours() + ':' + n.getMinutes() + '，在该时间范围内！')
            return true
        } else {
            // alert('当前时间是：' + n.getHours() + ':' + n.getMinutes() + '，不在该时间范围内！')
            return false
        }
    }
}

export default date
