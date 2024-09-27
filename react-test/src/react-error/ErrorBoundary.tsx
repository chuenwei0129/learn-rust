import { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  message?: string
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log(
      '🚀 ~ ErrorBoundary ~ getDerivedStateFromError ~ getDerivedStateFromError:'
    )

    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('🚀 ~ ErrorBoundary ~ componentDidCatch ~ componentDidCatch:')
    console.log(error, errorInfo)
  }

  render() {
    console.log('🚀 ~ ErrorBoundary ~ render ~ render:')
    if (this.state.hasError) {
      return <div>出错了： {this.state.message}</div>
    }

    return this.props.children
  }
}

export default ErrorBoundary
