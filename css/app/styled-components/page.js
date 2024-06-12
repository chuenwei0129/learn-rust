'use client'

import styled, { css, createGlobalStyle, keyframes } from 'styled-components'
import './style.css' // 引入普通 CSS 文件

// 样式冲突
const MyComponent = styled.div`
  background-color: green;
`

// 定义一个 styled-components 的 Button 组件
const StyledButton = styled.button`
  && {
    background-color: red; /* 提升优先级，确保背景色为红色 */
    color: black; /* 提升优先级，确保文字颜色为黑色 */
    padding: 15px; /* 提升优先级，确保内边距为 15px */
  }
`

// Adapting based on props
const Button = styled('button')`
  background: ${(props) => (props.$primary ? '#BF4F74' : 'white')};
  color: ${(props) => (props.$primary ? 'white' : '#BF4F74')};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
`

// Extending Styles
const DashedButton = styled(Button)`
  border-style: dashed;
  color: black;
`

const ReversedButton = (props) => (
  // eslint-disable-next-line react/no-children-prop
  <Button {...props} children={props.children.split('').reverse()} />
)

const MyLink = ({ className, children }) => (
  <a className={className} href="#">
    {children}
  </a>
)

const StyledMyLink = styled(MyLink)`
  color: palevioletred;
`

// 传递 props
// 如果样式化目标是一个简单元素（例如 styled.div ），styled-components 会将任何已知的 HTML 属性传递给 DOM。
// 如果它是一个自定义的 React 组件（例如 styled(MyComponent) ），styled-components 会将所有 props 传递。

const MyInput = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.$inputColor ?? '#BF4F74'};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`

// 伪元素、伪选择器和嵌套
const Thing = styled.div`
  color: blue;

  &:hover {
    color: red; // <Thing> when hovered
  }

  & ~ & {
    background: tomato; // <Thing> as a sibling of <Thing>, but maybe not directly next to it
  }

  & + & {
    background: lime; // <Thing> next to <Thing>
  }

  &.something {
    background: orange; // <Thing> tagged with an additional CSS class ".something"
  }

  .something-else & {
    border: 1px solid; // <Thing> inside another element labeled ".something-else"
  }
`

const Input = styled.input.attrs({ type: 'checkbox' })``

const Label = styled.label`
  align-items: center;
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`

const LabelText = styled.span`
  ${(props) => {
    switch (props.$mode) {
      case 'dark':
        return css`
          background-color: black;
          color: white;
          ${Input}:checked + && {
            color: blue;
          }
        `
      default:
        return css`
          background-color: white;
          color: black;
          // && 双和符号指的是组件的一个实例
          /* && === LabelText*/
          ${Input}:checked + && {
            color: red;
          }
        `
    }
  }}
`

// && 双和符号单独具有一种称为“优先级提升”的特殊行为；如果您正在处理混合的 styled-components 和 vanilla CSS 环境，可能存在冲突的样式，这可能很有用：

const Text = styled.div`
  && {
    color: blue;
  }
`

const GlobalStyle = createGlobalStyle`
   ${Text} {
     color: yellow;
   }
 `

const Something = styled.div`
  color: blue;
  & > .something {
    border: 1px solid red;
    display: block;
  }
`

// 默认值
const InputAttrs = styled.input.attrs((props) => ({
  // we can define static props
  type: 'text',
  // or we can define dynamic ones
  $size: props.$size ?? '1em',
}))`
  color: #bf4f74;
  font-size: 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;

  /* here we use the dynamically computed prop */
  margin: ${(props) => props.$size};
  padding: ${(props) => props.$size};
`

// attrs 覆盖
const InputPasswordAttrs = styled(InputAttrs).attrs({
  type: 'password',
})``

// 动画
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`

// 媒体查询
const MediaButton = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;

  /* Media Queries */
  @media (max-width: 768px) {
    background-color: #555555; /* Darker background for smaller screens */
    font-size: 14px;
    padding: 12px 28px;
  }

  @media (max-width: 480px) {
    background-color: #333333; /* Even darker background for even smaller screens */
    font-size: 12px;
    padding: 10px 24px;
  }
`

export default function page() {
  return (
    <>
      <MediaButton>MediaButton</MediaButton>
      <StyledButton className="button">Styled Button</StyledButton>
      <h1
        css={`
          color: var(--primary-color);
        `}
      >
        hello world
      </h1>
      <h1
        css={`
          background: papayawhip;
          color: red;
        `}
      >
        hello styled-components
      </h1>
      <Rotate css="color: blue;">&lt; 💅🏾 &gt;</Rotate>
      <InputAttrs placeholder="A small text input" />
      <InputPasswordAttrs placeholder="A bigger text input" $size="2em" />
      <Something>
        <label htmlFor="foo-button" className="something">
          Mystery button
        </label>
        <button id="foo-button">what do I do</button>
      </Something>
      <Button>Default Button</Button>
      <Button $primary>Primary Button</Button>
      <DashedButton>Dashed Button</DashedButton>
      <Button as={'a'} href="#">
        Link with Default Button
      </Button>
      <Button as={ReversedButton}>
        Custom Button with Normal Button styles
      </Button>
      <MyLink>Unstyled, boring Link</MyLink>
      <StyledMyLink>Styled, exciting Link</StyledMyLink>
      <MyInput defaultValue="@probablyup" type="text" />
      <MyInput defaultValue="@geelen" type="text" $inputColor="rebeccapurple" />
      <Thing>Hello world!</Thing>
      <Thing>How ya doing?</Thing>
      <Thing className="something">The sun is shining...</Thing>
      <div>Pretty nice day today.</div>
      <Thing>Don&#39;t you think?</Thing>
      <div className="something-else">
        <Thing>Splendid.</Thing>
      </div>
      <Label>
        <Input defaultChecked />
        <LabelText>Foo</LabelText>
      </Label>
      <Label>
        <Input />
        <LabelText $mode="dark">Foo</LabelText>
      </Label>
      <GlobalStyle />
      <Text>I&#39;m blue, da ba dee da ba daa</Text>

      <MyComponent className="red-bg">MyComponent</MyComponent>
    </>
  )
}
