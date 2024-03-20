/**
 * 检查一个值是否为对象。
 * @param value 未知类型的值，需要检查是否为对象。
 * @returns 返回一个布尔值，如果该值是对象则为true，否则为false。
 */
const isObject = (value: unknown): value is Record<any, any> =>
  value !== null && typeof value === 'object'

/**
 * 检查一个值是否为函数。
 * @param value 未知类型的值，需要检查是否为函数。
 * @returns 返回一个布尔值，如果该值是函数则为true，否则为false。
 */
const isFunction = (value: unknown): value is (...args: any) => any =>
  typeof value === 'function'

/**
 * 检查一个值是否为字符串。
 * @param value 未知类型的值，需要检查是否为字符串。
 * @returns 返回一个布尔值，如果该值是字符串则为true，否则为false。
 */
const isString = (value: unknown): value is string => typeof value === 'string'

/**
 * 检查一个值是否为布尔值。
 * @param value 未知类型的值，需要检查是否为布尔值。
 * @returns 返回一个布尔值，如果该值是布尔值则为true，否则为false。
 */
const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean'

/**
 * 检查一个值是否为数字。
 * @param value 未知类型的值，需要检查是否为数字。
 * @returns 返回一个布尔值，如果该值是数字则为true，否则为false。
 */
const isNumber = (value: unknown): value is number => typeof value === 'number'

/**
 * 检查一个值是否为undefined。
 * @param value 未知类型的值，需要检查是否为undefined。
 * @returns 返回一个布尔值，如果该值为undefined则为true，否则为false。
 */
const isUndefined = (value: unknown): value is undefined =>
  typeof value === 'undefined'

/**
 * 检查一个值是否为数组。
 * @param value 未知类型的值，需要检查是否为数组。
 * @returns 返回一个布尔值，如果该值是数组则为true，否则为false。
 */
const isArray = (value: unknown): value is any[] => Array.isArray(value)

export default {
  isObject,
  isFunction,
  isString,
  isBoolean,
  isNumber,
  isUndefined,
  isArray,
}
