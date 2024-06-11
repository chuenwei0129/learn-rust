/* eslint-disable @next/next/no-img-element */
import './style.scss'

export default function page() {
  return (
    <div className="flex flex-1 gap-5">
      {/* 带有标题的卡片 */}
      <figure className="card card--has-title">
        <img src="https://placebear.com/g/200/200" alt="logo" />
        <figcaption>
          <a href="https://placebear.com/">placebear.com</a>
        </figcaption>
      </figure>

      {/* 不带标题的卡片 */}
      <figure className="card">
        <img src="https://placebear.com/g/200/200" alt="logo" />
      </figure>

      {/* 使用 has 的带标题的卡片 */}
      <figure className="card has-[figcaption]:flex-col has-[figcaption]:gap-4 has-[figcaption]:p-[20px]">
        <img src="https://placebear.com/g/200/200" alt="logo" />
        <figcaption className="text-[rgb(172,144,102)] text-[clamp(1.25rem,4vw+1.25rem,1.5rem)] hover:text-blue-300">
          <a href="https://placebear.com/">placebear.com</a>
        </figcaption>
      </figure>
    </div>
  )
}
