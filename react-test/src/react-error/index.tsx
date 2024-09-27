import Error from './Error'
import ErrorBoundary from './ErrorBoundary'

export default function ErrorTest() {
  return (
    <>
      <ErrorBoundary>
        <Error />
      </ErrorBoundary>
    </>
  )
}
