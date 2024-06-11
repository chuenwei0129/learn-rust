export default function page() {
  return (
    <div>
      {/* margin 重叠 */}
      <div className="size-20 bg-red-400 mb-10"></div>
      <div className="size-20 bg-blue-400 mt-20"></div>
      <br />

      {/* bfc 阻止 margin 重叠 */}
      <div className="overflow-hidden">
        <div className="size-20 bg-red-400 mb-10"></div>
      </div>
      <div className="size-20 bg-blue-400 mt-20"></div>

      <br />
      {/* 这也是 margin 重叠 */}
      <div className="size-[200px] bg-slate-200 mt-10 ml-10">
        <div className="size-[100px] bg-red-400 mt-20 ml-20 "></div>
      </div>
      <br />

      {/* bfc 解决 margin 重叠 */}
      <div className="size-[200px] bg-slate-200 mt-10 ml-10 overflow-auto">
        <div className="size-[100px] bg-red-400 mt-20 ml-20 "></div>
      </div>

      <br />
      {/* 浮动元素导致文字环绕效果 */}
      <div className="size-10 bg-red-400 float-left"></div>
      <p>
        我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字
        我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字
        我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字
      </p>

      <br />

      {/* bfc 内部元素不会影响外部元素 */}
      <div className="overflow-hidden">
        <div className="size-10 bg-red-400 float-left"></div>
      </div>
      <p>
        我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字
        我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字
        我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字
      </p>

      <br />

      {/* clear 也可以清除浮动影响 */}
      <div className="size-10 bg-red-400 float-left"></div>
      <p className="clear-left">
        我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字
        我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字
        我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字
      </p>

      {/* BFC 的区域不会与浮动元素重叠。 */}
      <div className="w-[200px] h-[100px] float-left bg-red-400"></div>
      <div className="bg-blue-400 h-[100px] overflow-hidden">
        我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字
      </div>

      <br />
      {/* 解决高度塌陷问题 */}
      <div className="overflow-auto w-[200px] min-h-20 bg-red-400">
        <div className="w-[100px] bg-blue-400 h-[100px] float-left"></div>
      </div>

      <br />
      {/* 高度塌陷 */}
      <div className="w-[200px] min-h-20 bg-red-400">
        <div className="w-[100px] bg-blue-400 h-[100px] float-left"></div>
      </div>
    </div>
  )
}
