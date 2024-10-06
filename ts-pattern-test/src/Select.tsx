import { match, P } from 'ts-pattern'

/**
 * # TS Pattern 选择示例
 *
 * 这里是一个选择部分输入并在处理函数中使用它的示例。
 */

type Event<T = string> =
  | { status: 'fetch'; id: number }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

const selectExample = (input: Event) =>
  match(input)
    /**
     * `P.select()` 可以在模式中的任何位置使用，
     * 并且对应的值将作为第一个参数注入到处理函数中。
     * 完整的输入始终可作为第二个参数使用。
     */
    .with(
      { status: 'success', data: P.select() },
      (data) => `data was selected. data: ${data}`
    )
    /**
     * 你可以使用 `P.select('name')` 为选择命名。
     *
     * 使用命名选择时，匹配的值将注入到包含从输入数据结构中选择的所有值的 `selections` 对象中。
     *
     * 注意：你可以有多个命名选择，但只能有一个匿名选择。
     */
    .with(
      { status: 'error', error: P.select('error') },
      ({ error }) =>
        `err was selected. typeof err = ${typeof error}, msg: ${error.message}`
    )
    /**
     * 如果你想有条件地选择一个属性，
     * 你还可以将子模式传递给 `P.select`：
     */
    // .with(
    //   { event: P.select({ type: 'success' }) },
    //   (event) => `A success event containing "${event.data}" was selected.`
    // )
    /**
     * 你可能不需要使用 select！
     * 如果你不使用它，输入将作为第一个参数传递给你的处理函数。在大多数情况下，
     * 在处理函数中解构输入是可以的！
     */
    .with({ status: 'fetch' }, ({ id }) => `fetching the resource n°${id}!`)
    .otherwise(() => '')

export const Select = () => {
  return (
    <>
      <p>{selectExample({ status: 'fetch', id: 10 })}</p>
      <p>{selectExample({ status: 'success', data: 'Hello!' })}</p>
      <p>{selectExample({ status: 'error', error: new Error('Oh, no.') })}</p>
    </>
  )
}
