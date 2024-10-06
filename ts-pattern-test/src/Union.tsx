import { match, P } from 'ts-pattern'

/**
 * # TS Pattern `P.union` 示例
 *
 * `P.union` 让你尝试多种模式，并且如果其中一个匹配就成功。
 *
 * 当你想要在同一个代码分支中处理多种可能的情况（但不是全部情况）时，它特别有用。
 */

type Response =
  | { type: 'video'; data: { format: 'mp4' | 'webm'; src: string } }
  | { type: 'image'; data: { extension: 'gif' | 'jpg' | 'png'; src: string } }
  | { type: 'text'; data: string; tags: { name: string; id: number }[] }

const someFunction = (response: Response) =>
  match(response)
    .with(
      {
        type: 'image',
        data: { extension: P.union('jpg', 'png') },
      },
      /**
       * image: {
       *   type: "image";
       *   data: { src: string; extension: "jpg" | "png" };
       * }
       */
      (image) => (
        <>
          这是一个 jpg 或 png 图片: <b>{image.data.src}</b>
        </>
      )
    )
    .with(
      {
        // P.union 也可以接受更复杂的模式
        data: P.union(
          { format: 'mp4' as const },
          { extension: 'gif' as const }
        ),
      },
      /**
       * res: { type: "video", data: {format: "mp4" } }
       *    | { type: "image", data: {format: "gif" } }
       */
      () => <>这可能是一个 gif 或 mp4 视频!</>
    )
    .with({ type: 'text', tags: P.array({ name: P.select() }) }, (tagNames) => (
      <>
        这是一个带标签的文本 <b>{tagNames.join(', ')}</b>!
      </>
    ))
    .otherwise(() => <>这是其他东西</>)

export const Union = () => {
  const inputs: Response[] = [
    { type: 'image', data: { extension: 'jpg', src: 'image.jpg' } },
    { type: 'image', data: { extension: 'gif', src: 'image.gif' } },
    { type: 'image', data: { extension: 'png', src: 'image.png' } },
    {
      type: 'text',
      data: 'Hello',
      tags: [
        { name: 'tag1', id: 0 },
        { name: 'tag2', id: 1 },
      ],
    },
    { type: 'video', data: { format: 'mp4', src: 'video.mp4' } },
    { type: 'video', data: { format: 'webm', src: 'video.webm' } },
  ]
  return (
    <>
      <ul>
        {inputs.map((input, index) => (
          <li key={index}>
            <p>
              类型: <b>{input.type}</b>
              {' -> '}
              {someFunction(input)}
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}
