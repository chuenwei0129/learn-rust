import { ErrorBoundary } from 'react-error-boundary'
// import Error from './Error'
import ErrorWrap from './ErrorWrap'

export default function NpmErrorTest() {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        return (
          <div>
            <p>出错了：</p>
            <div>{error.message}</div>
          </div>
        )
      }}
    >
      {/* <Error /> */}
      {/* 并不一定是 ErrorBoundary 的 children，任意层级的子组件都可以 */}
      <ErrorWrap />
    </ErrorBoundary>
  )
}
