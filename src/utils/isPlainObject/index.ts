import typeChecks from '../typeChecks'

const { isObject } = typeChecks

/**
 * 检查一个对象是否为纯对象（plain object）。
 * @param obj 任意类型的值，待检查是否为纯对象。
 * @returns {boolean} 如果是纯对象则返回true，否则返回false。
 */
const isPlainObject = (obj: any) => {
  // 首先检查obj是否为对象
  if (!isObject(obj)) {
    return false
  }

  // 初始化proto为obj，然后通过循环向上遍历对象的原型链
  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  // 当obj的原型链顶端与proto相等时，说明obj是一个纯对象
  return Object.getPrototypeOf(obj) === proto
}

export default isPlainObject
