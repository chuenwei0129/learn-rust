import { match, P } from 'ts-pattern'

/**
 * # TS Pattern `P.when` 示例
 *
 * `P.when` 允许你使用守卫函数检查输入值。
 * 守卫函数是一个接收你的值并返回布尔值的谓词函数。
 * 如果你曾经使用过 `array.filter`，这一点应该很熟悉。
 *
 * TS-Pattern 提供了两种使用守卫函数的方法：
 *  - 你可以将其作为第二个参数传递给 `with()`。
 *  - 你可以使用 `P.when` 函数，在模式定义中返回一个守卫模式。
 **/

type Option<T> = { type: 'some'; value: T } | { type: 'none' }

const optionalFizzBuzz = (optionalNumber: Option<number>) =>
  match(optionalNumber)
    /**
     * 你可以使用 `P.when` 模式来确保你的输入子集符合某个条件。
     * 传递给 `P.when` 的函数必须返回 `true` 才能执行处理程序。
     */
    .with(
      {
        type: 'some',
        value: P.when((value) => value % 5 === 0 && value % 3 === 0),
      },
      () => 'fizzbuzz'
    )
    /**
     * 或者你可以在模式之后添加一个守卫函数。
     * 它接收输入并且必须返回 `true` 才能执行处理程序。
     */
    .with(
      { type: 'some' },
      /**
       * `someNumber` 被推断为 { type: "some"; value: number }
       * 基于作为第一个参数提供的模式。
       */
      (someNumber) => someNumber.value % 3 === 0,
      () => 'fizz'
    )
    .with(
      { type: 'some' },
      // 你也可以使用解构
      ({ value }) => value % 5 === 0,
      () => 'buzz'
    )
    // 对于所有其他数字，只需将它们转换为字符串。
    .with({ type: 'some' }, ({ value }) => value.toString())
    // 如果是 none，就返回 "nope"
    .with({ type: 'none' }, () => 'nope')
    .exhaustive()

export const When = () => (
  <>
    {Array.from({ length: 20 })
      .fill(0)
      .map(
        (_, index): Option<number> =>
          index !== 0 ? { type: 'some', value: index } : { type: 'none' }
      )
      .map(optionalFizzBuzz)
      .map((text, i) => (
        <p key={i}>{text}</p>
      ))}
  </>
)
