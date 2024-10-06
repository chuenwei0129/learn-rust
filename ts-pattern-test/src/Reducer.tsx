import { useReducer } from 'react'
import { match, P } from 'ts-pattern'

// 定义状态类型 State, 包括闲置（idle），加载中（loading），成功（success）和错误（error）
type State<T = string> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

// 定义事件类型 Event，包括获取（fetch），成功（success），错误（error）和取消（cancel）
type Event<T = string> =
  | { type: 'fetch' }
  | { type: 'success'; data: T }
  | { type: 'error'; error: Error }
  | { type: 'cancel' }

// 定义初始化状态
const initState: State = {
  status: 'idle',
}

// 定义 reducer 函数，通过匹配 state 和 event 返回新的 state
const reducer = (state: State, event: Event): State =>
  // 有时需要同时对两个值进行匹配。
  // 这里我们对状态和事件进行模式匹配，并返回新状态。
  match<[State, Event], State>([state, event])
    // 第一个参数是模式：你期望的值的形状
    // 用于这个分支。
    .with([{ status: 'loading' }, { type: 'success' }], ([, { data }]) => ({
      status: 'success',
      data,
    }))
    // 第二个参数是如果数据匹配给定模式时将调用的函数。
    // 数据结构的类型被窄化到模式允许的内容。
    .with(
      [{ status: 'loading' }, { type: 'error', error: P.select() }],
      (error) => ({
        status: 'error',
        error,
      })
    )
    .with([{ status: 'loading' }, { type: 'cancel' }], () => initState)
    // 如果需要排除一个值，可以使用
    // “not” 模式。它是一个函数，接受一个模式
    // 并返回它的相反值。
    .with([{ status: P.not('loading') }, { type: 'fetch' }], () => ({
      status: 'loading',
    }))
    // `P._` 是一个通配符，它将匹配任何值。
    // 你可以在顶层使用它，或者在数据结构中使用。
    .with(P._, () => state)
    // `exhaustive` 执行匹配子句，并返回值
    // .exhaustive();
    // 你也可以使用 `otherwise`，它接受一个处理程序返回
    // 默认值。它等价于 `with(P._, handler).exhaustive()`。
    .otherwise(() => state)

// 导出默认函数组件 App
export default function App() {
  const [state, dispatch] = useReducer(reducer, initState)
  const isLoading = state.status === 'loading'

  return (
    <div className="App">
      {match(state)
        // 匹配 error 状态，展示错误信息
        .with({ status: 'error' }, ({ error }) => (
          <>
            <h1>错误！</h1>
            <p>错误信息是 "{error.message}"</p>
          </>
        ))
        // 匹配 idle 状态，展示闲置信息
        .with({ status: 'idle' }, () => (
          <>
            <h1>闲置</h1>
            <p>目前没有任何操作</p>
          </>
        ))
        // 匹配 loading 状态，展示加载信息
        .with({ status: 'loading' }, () => (
          <>
            <h1>加载中...</h1>
            <p>（你可以点击 success, error 或 cancel）</p>
          </>
        ))
        // 匹配 success 状态，展示成功信息
        .with({ status: 'success' }, ({ data }) => (
          <>
            <h1>获取成功！</h1>
            <p>数据: {data}</p>
          </>
        ))
        .exhaustive()}
      {/* // 按钮触发 fetch 事件 */}
      <button disabled={isLoading} onClick={() => dispatch({ type: 'fetch' })}>
        获取
      </button>
      {/* // 按钮触发 success 事件 */}
      <button
        disabled={!isLoading}
        onClick={() => dispatch({ type: 'success', data: '获取的数据' })}
      >
        成功
      </button>
      {/* // 按钮触发 error 事件 */}
      <button
        disabled={!isLoading}
        onClick={() =>
          dispatch({ type: 'error', error: new Error('错误消息') })
        }
      >
        错误
      </button>
      {/* // 按钮触发 cancel 事件 */}
      <button
        disabled={!isLoading}
        onClick={() => dispatch({ type: 'cancel' })}
      >
        取消
      </button>
      <p>根据当前状态，一些事件不应有任何效果。</p>
      <p>
        'success'、'error' 和 'cancel' 事件只有在当前处于加载状态时才有意义。
      </p>
    </div>
  )
}
