import Footer from './components/Footer'
import FormFilter from './components/FormFilter'
import ThemeButton from './components/ThemeButton'
import TrendingRepositories from './components/TrendingRepositories'

import ThemeContext from './contexts/ThemeContext'

import { useState } from 'react'
import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import styled from 'styled-components'

import './App.css'

const NavUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0;
  margin: 0 auto 30px;
  padding: 0 0 20px;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }

  ${({ theme }) =>
    theme === 'dark'
      ? 'border-bottom: 1px solid #61dafb'
      : 'border-bottom: 1px solid #1c1e24'}
`
const NavLi = styled.li`
  list-style-type: none;
  margin: 20px;
  font-size: 1.5rem;
`

function App() {
  const [Filter, setFilter] = useState('')
  const [theme, setTheme] = useState('dark')

  let handleCallback = (childData) => {
    setFilter(childData)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`App ${theme}`}>
        <header className={`App-header ${theme}`}>
          <div className="content-wrapper header">
            <ThemeButton />
            <h1>
              <span>🚀</span>Trending Github Repositories
            </h1>
          </div>
        </header>
        <section className="content-wrapper">
          <Router>
            <section className={`filter-section ${theme}`}>
              <nav className={theme}>
                <NavUl className={theme}>
                  <NavLi>
                    <NavLink exact activeClassName="selected" to="/">
                      Daily
                    </NavLink>
                  </NavLi>
                  <NavLi>
                    <NavLink exact activeClassName="selected" to="/weekly">
                      Weekly
                    </NavLink>
                  </NavLi>
                  <NavLi>
                    <NavLink exact activeClassName="selected" to="/monthly">
                      Monthly
                    </NavLink>
                  </NavLi>
                </NavUl>
              </nav>

              <FormFilter parentCallback={handleCallback} />
            </section>
            <Switch>
              <Route exact path="/">
                <section>
                  <TrendingRepositories data={Filter} />
                </section>
              </Route>
              <Route exact path="/:interval">
                <section>
                  <TrendingRepositories data={Filter} />
                </section>
              </Route>
            </Switch>
          </Router>
        </section>
        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
