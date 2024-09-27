import { lazy, Suspense } from 'react'

const LazyComp = lazy(() => import('./Lazy'))

export default function SuspenseUse() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComp />
      </Suspense>
    </div>
  )
}
