import './style.css'

export default function page() {
  return (
    <div className="container">
      <h1 id="title">Hello, CSS!</h1>
      <p className="content">This is a content.</p>
      <p className="content">This is another content.</p>
      <ul id="list">
        <li id="item">Item 1</li>
        <li className="active">Item 2</li>
        <li>Item 3</li>
      </ul>
      <div className="container">
        <p>Inside container</p>
      </div>
    </div>
  )
}
