import './style.scss'

export default function page() {
  return (
    <div>
      <h1>Hello World</h1>
      <ul>
        <li className="item-1">Item 1</li>
        <li className="item-2">Item 2</li>
        <li id="item-3">Item 3</li>
      </ul>

      {/* 插值语法 */}
      <p className="hello-world">hello-world</p>
      <p className="world-hello">world-hello</p>

      {/* 嵌套 */}
      <div className="nesting"></div>

      {/* @for */}
      <div className="box-1">box-1</div>
      <div className="box-2">box-2</div>
      <div className="box-3">box-3</div>

      {/* @each in */}
      <div className="box-red">box-red</div>
      <div className="box-yellow">box-yellow</div>
      <div className="box-blue">box-blue</div>
    </div>
  )
}
