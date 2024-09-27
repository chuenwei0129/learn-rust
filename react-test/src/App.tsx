import ErrorTest from './react-error'
import NpmErrorTest from './npm-error'
import SuspenseUse from './suspense-use'
import SuspenseOrigin from './suspense-origin'
import MixPromiseError from './mix-error-promise'
import Parent from './children'
import RenderProps from './render-props'
import Type from './typescript'

// const Color = ({ children }: { children: React.ReactNode }) => {
//   return <div style={{ color: 'red' }}>{children}</div>
// }

function App() {
  console.log('App Render')

  return (
    <div>
      <ErrorTest />
      <hr />
      <NpmErrorTest />
      <hr />
      <SuspenseUse />
      <hr />
      <SuspenseOrigin />
      <hr />
      <MixPromiseError />
      <hr />
      <Parent>
        {/* 只是 jsx props */}
        {/* 和传递组件的区别应该是函数和对象数组的区别 */}
        {/* 函数重新执行是新的引用，对象还是的引用 */}
        <div className="box">hello world</div>
        <div className="box">hello vue</div>
        <div className="box">hello react</div>
        {/* 等价于下面 */}
        {/* <Color>
          <div className="box">world</div>
        </Color>
        <Color>
          <div className="box">react</div>
        </Color>
        <Color>
          <div className="box">vue</div>
        </Color> */}
      </Parent>
      <RenderProps></RenderProps>
      <hr />
      <Type />
    </div>
  )
}

export default App
