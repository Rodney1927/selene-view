/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
    return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
    return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 身份证号
 * @param {*} s
 */
export function isIdentify (s) {
    return /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(s)
}

/**
 * 银行卡号
 * @param {*} s
 */
export function isCardId (s) {
    return /^[0-9]{16}$/.test(s)
}

/**
 * 用户名
 * @param {*} s
 */
export function isUsername (s) {
    return /^[a-zA-Z][a-zA-Z_0-9]{5,11}$/.test(s)
}

/**
 * 密码
 * @param {*} s
 */
export function isPassword (s) {
    return /^[\w?!@#$%^&*+/\-=<>.]{8,16}$/.test(s)
}

/**
 * 工号
 * @param {*} s
 */
export function isWorkNumber (s) {
    return /^\d{8}$/.test(s)
}

/**
 * 部门编号
 * @param {*} s
 */
export function isDepartmentCode (s) {
    return /^[a-zA-Z_0-9]+$/.test(s)
}

/**
 * 会议室编号
 * @param {*} s
 */
export function isMeetingRoomCode (s) {
    return /^[a-zA-Z_0-9]+$/.test(s)
}

/**
 * 会议室楼层
 * @param {*} s
 */
export function isMeetingRoomFloor (s) {
    return /^[0-9]+$/.test(s)
}

/**
 * 学号
 * @param {*} s
 */
export function isStudentId (s) {
    return /^\d{8}$/.test(s)
}
