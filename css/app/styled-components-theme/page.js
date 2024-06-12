'use client'

// 创建主题配置文件 theme.js
const lightTheme = {
  body: '#FFFFFF',
  text: '#000000',
  toggleBorder: '#000000',
  background: '#FFFFFF',
}

const darkTheme = {
  body: '#000000',
  text: '#FFFFFF',
  toggleBorder: '#FFFFFF',
  background: '#000000',
}

// 创建全局样式文件 GlobalStyles.js

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }
`

// 创建一个主题切换按钮 Toggle.js
const Button = styled.button`
  background: ${({ theme }) => theme.body};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.6rem;
`

import styled, { createGlobalStyle, css } from 'styled-components'

const mixinCommonCSS = css`
  display: block;
  border: 2px solid black;
  padding: 0.6rem;
  border-radius: 30px;
  cursor: pointer;
`

const CommonButton = styled.button`
  color: red;
`

const FusionCommonButton = styled.button`
  ${mixinCommonCSS}
  color: yellow;
`

const StyledFusionCommonButton = styled(FusionCommonButton)`
  ${mixinCommonCSS}
  color: blue;
`

const Toggle = ({ theme, toggleTheme }) => {
  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </Button>
  )
}

// 实现主题切换逻辑 App.js
import { ThemeProvider } from 'styled-components'
import { useState } from 'react'

function App() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <Toggle theme={theme} toggleTheme={toggleTheme} />
        <p>This is a paragraph.</p>
        <CommonButton>CommonButton</CommonButton>
        <FusionCommonButton>FusionCommonButton</FusionCommonButton>
        <StyledFusionCommonButton>
          styledFusionCommonButton
        </StyledFusionCommonButton>
      </>
    </ThemeProvider>
  )
}

export default App
