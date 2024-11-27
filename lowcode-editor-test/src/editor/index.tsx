// 用 [allotment](https://www.npmjs.com/package/allotment) 实现可拖动改变大小的 pane
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import EditArea from './components/EditArea'
import Materail from './components/Materail'
import Setting from './components/Setting'
import Header from './components/Header'

export default function ReactPlayground() {
  return (
    <div className="h-[100vh] flex flex-col">
      <div className="h-[60px] flex items-center border-b border-[#000]">
        <Header />
      </div>
      <Allotment>
        {/* 物料区 */}
        <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
          <Materail />
        </Allotment.Pane>
        {/* 画布 */}
        <Allotment.Pane>
          <EditArea />
        </Allotment.Pane>
        {/* 编辑 */}
        <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
          <Setting />
        </Allotment.Pane>
      </Allotment>
    </div>
  )
}
