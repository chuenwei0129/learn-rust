import { match, P } from 'ts-pattern'

/**
 * # TS Pattern `P.not` 示例
 */

/**
 * 将鼠标悬停在值上查看类型是如何
 * 窄化以匹配模式。
 */

type InputValue =
  | string
  | number
  | boolean
  | { key: string }
  | string[]
  | [number, number]

const notMatch = (value: InputValue) =>
  match(value)
    /**
     * 你可以使用 `P.not(subpattern)` 来匹配除了子模式外的任何东西：
     */
    .with(P.not(P.string), (value) => `value 不是一个字符串: ${value}`)
    .with(P.string, (value) => `value 是一个字符串: ${value}`)
    // 这两个 case 足够使此表达式完全覆盖，
    // 但你当然可以使用任何其他带有 P.not 的模式：
    // .with(P.not([P.number, P.number]), () => ...)
    // .with(P.not(P.array(P.string)), () => ...)
    .exhaustive()

export const Not = () => {
  const inputs: InputValue[] = [
    'Hello', // 字符串
    20, // 数字
    true, // 布尔值
    { key: 'value' }, // 对象
    ['bonjour', 'hola'], // 字符串数组
    [1, 2], // 数字元组
  ]
  return (
    <div>
      {inputs.map((value, i) => (
        <p key={i}>{notMatch(value)}</p>
      ))}
    </div>
  )
}
