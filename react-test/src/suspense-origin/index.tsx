import { Suspense } from 'react'

let promise: Promise<void> | undefined, data: string | undefined

function fetchData(): string | undefined {
  if (data) return data
  promise = new Promise((resolve) => {
    setTimeout(() => {
      data = '取到的数据'
      resolve()
    }, 2000)
  })

  throw promise
}

const WithPromise = () => {
  const data = fetchData()
  return <div>{data}</div>
}

export default function SuspenseOrigin() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* 这里应该有您想要进行 Suspense 处理的组件 */}
        <WithPromise />
      </Suspense>
    </div>
  )
}
