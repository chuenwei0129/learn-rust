import { match, P } from 'ts-pattern'

/**
 * # TS Pattern 基础示例
 */

/**
 * 鼠标悬停在值上，可以看到如何类型
 * 被模式匹配所缩小。
 */

type InputValue =
  | string
  | number
  | boolean
  | { someKey: string }
  | string[]
  | [number, number]

const basicMatch = (value: InputValue) =>
  match(value)
    /**
     * 模式可以是数字、字符串、
     * 布尔值或其他任何字面量。
     *
     * 这个值会被传递回处理函数，
     * 但它的类型会通过模式进行优化。
     */
    .with(20, () => (
      <p>
        值是 <b>20</b>!
      </p>
    ))
    .with('Hola', () => (
      <p>
        值是 <b>"Hola"</b>!
      </p>
    ))
    .with(true, () => (
      <p>
        值是 <b>true</b>!
      </p>
    ))
    /**
     * `P` 模块提供了通配符模式
     * 来匹配某种类型的所有值。
     */
    .with(P.string, (value) => (
      <p>
        值是 <b>字符串</b>: {value}
      </p>
    ))
    .with(P.number, (value) => (
      <p>
        值是 <b>数字</b>: {value}
      </p>
    ))
    .with(P.boolean, (value) => (
      <p>
        值是 <b>布尔值</b>: {value}
      </p>
    ))
    /**
     * 模式可以是对象。
     * 为了匹配，输入必须是对象，且所有
     * 在模式中定义的属性也必须匹配。
     *
     * 在这种情况下，输入必须是一个包含
     * `someKey` 属性且值为 "some value" 的对象。
     */
    .with({ someKey: 'some value' }, () => (
      <p>
        value.someKey 等于 <b>"some value"</b>
      </p>
    ))
    /**
     * 模式可以以任何可能的方式嵌套，
     * 因此你可以在对象中使用 `P.string` 通配符。
     */
    .with({ someKey: P.string }, (value) => (
      <p>
        值是一个对象。 <b>value.someKey = "{value.someKey}"</b>
      </p>
    ))
    /**
     * 模式可以是数组。它们会匹配
     * 如果输入是相同长度的数组，并且
     * 所有元素都匹配。
     *
     * 这个会匹配值为 `["hello"]` 的情况：
     */
    .with(['hello'], () => (
      <p>
        值等于 <b>["hello"]</b>
      </p>
    ))
    /**
     * 而这个会匹配任意长度为 2 的数组，
     * 第一个元素为 "hello" 第二个元素为字符串。
     */
    .with(['hello', P.string], (value) => (
      <p>
        Hello, <b>{value[1]}</b>!
      </p>
    ))
    /**
     * `P.array(subpattern)` 匹配输入是数组且
     * 子模式匹配数组中每个项。
     *
     * 这个匹配字符串数组：
     */
    .with(P.array(P.string), (value) => (
      <p>
        值是 <b>字符串数组</b>: {value}
      </p>
    ))
    /**
     * `P._` 模式会匹配任何值。
     *
     * 注意这里 `value` 被推断为
     * [number, number]，因为这是唯一
     * 在 `InputValue` 联合中匹配此模式的类型。
     */
    .with([10, P._], () => (
      <p>
        值是元组且第一个元素是 <b>10</b>!
      </p>
    ))
    .with([P.number, P.number], (value) => (
      <p>
        值是 <b>两个数字的元组</b>: {value}
      </p>
    ))
    /**
     * `.exhaustive()` 结束模式匹配
     * 表达式并返回结果。它还确保

     * 一个 `NonExhaustiveError<Remaining>` 类型检查
     * 错误。
     *
     * 试试注释掉一个 `.with` 语句！
     */
    .exhaustive()

export const Basic = () => {
  const inputs: InputValue[] = [
    'Welcome!',
    ['hello'],
    ['hello', 'world'],
    10,
    true,
    { someKey: 'some value' },
    { someKey: 'value' },
    ['bonjour', 'hola'],
    [1, 2],
    [10, 100],
    20,
  ]
  return (
    <div>
      {inputs.map((value, i) => (
        <span key={i}>{basicMatch(value)}</span>
      ))}
    </div>
  )
}
