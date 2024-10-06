import * as React from 'react'
import { match, isMatching, P } from 'ts-pattern'

/**
 * # TS Pattern 未定义输入示例
 *
 * 这里是一个使用 `isMatching` 和模式对未知输入进行类型化的示例。
 */

/**
 * 首先，我们定义一个模式来描述
 * 我们希望从 API 接收到的内容：
 */
const userPattern = {
  name: P.string,
  postCount: P.number,
  posts: P.array({ title: P.string }),
  age: P.optional(P.number),
}

/**
 * 然后，我们使用 `P.infer` 把模式转换为类型。
 * 如果我们想在函数签名中引用这个类型，这是非常有用的！
 */

type User = P.infer<typeof userPattern>

/**
 * 使用 isMatching 创建类型保护
 */
const isUserList = isMatching(P.array(userPattern))

const fakeFetchUsers = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Alice', postCount: 20, posts: [] },
        { name: 'Bob', postCount: 49, posts: [] },
        { name: 'Peter', postCount: 9, posts: [] },
      ])
    }, 300)
  })

type State = { isLoading: true } | { isLoading: false; data: User[] }

export const Api = () => {
  const [state, setState] = React.useState<State>({
    isLoading: true,
  })

  React.useEffect(() => {
    // `users` 的类型是未知的
    fakeFetchUsers().then((users) => {
      // `typedUsers` 的类型是: User[]
      const typedUsers = isUserList(users) ? users : []

      setState({ isLoading: false, data: typedUsers })
    })
  }, [])

  return (
    <div>
      {match(state)
        .with({ isLoading: false }, ({ data: users }) =>
          users.map((user) => (
            <p key={user.name}>
              {user.name} 有 {user.postCount} 篇帖子。
            </p>
          ))
        )
        .with({ isLoading: true }, () => <p>加载中...</p>)
        .exhaustive()}
    </div>
  )
}
