import { MoonFill, SunFill } from 'react-bootstrap-icons'
import styled from 'styled-components'
import { useState } from 'react'
import { useContext } from 'react'

import ThemeContext from '../contexts/ThemeContext'

let Wrapper = styled.button`
  border: 1px solid #1c1e24;
  border-radius: 12px;
  width: 50px;
  min-height: 20px;
  padding: 2px;
  background: linear-gradient(rgba(28, 30, 36), rgba(97, 218, 251, 0.1));
  margin: 0 15px;
  cursor: pointer;
  display: flex;

  ${({ active }) =>
    active &&
    `
    border: 1px solid #d4c2fc;
    background: linear-gradient(rgba(212, 194, 252,1), rgba(255,255,255, 0.1));
    justify-content: flex-end;
  `}
`

let Slider = styled.div`
  width: 20px;
  height: 20px;
  background-color: #61dafb;
  border-radius: 10px;
  ${({ active }) =>
    active &&
    `
  background-color: #998FC7;
  `}
`
let Div = styled.div`
  display: flex;
  justify-content: center;
  margin: auto 0 10px auto;

  @media only screen and (max-width: 450px) {
    margin: auto auto 10px auto;
  }
`

function ThemeButton() {
  const [active, setActive] = useState(false)
  const { theme, setTheme } = useContext(ThemeContext)

  function handleSlide() {
    setActive(!active)

    // Toggle between light and dark css class.
    theme === 'dark' ? setTheme('light') : setTheme('dark')
  }

  return (
    <Div>
      <MoonFill className="slider-icon" />
      <Wrapper active={active} className="slider-wrapper" onClick={handleSlide}>
        <Slider active={active} onClick={handleSlide} />
      </Wrapper>
      <SunFill className="slider-icon" />
    </Div>
  )
}

export default ThemeButton
