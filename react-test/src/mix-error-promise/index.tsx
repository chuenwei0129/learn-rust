import { Suspense } from 'react'

let cache: any = null
const getData = () => {
  if (!cache) {
    const promise = fetch(
      `https://jsonplaceholder.typicode.com/users/1?_delay=5000`
    )
      .then((response) => response.json())
      .then((data) => {
        cache = data
      })
    throw promise
  }
  return cache
}

const Req = () => {
  const data = getData()
  return <div>{data.name}</div>
}

export default function MixPromiseError() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Req />
    </Suspense>
  )
}
