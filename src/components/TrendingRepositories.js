import useApi from '../customHooks/useApi'
import Card from './Card'
import { useParams } from 'react-router-dom'

import '../styles/card.css'

function TrendingRepositories(props) {
  let repos = ''
  let { interval } = useParams()
  let { spokenLanguage, codelang } = props.data
  let url = 'https://api.trending-github.com/github/repositories'
  let query = '?'

  if (spokenLanguage) {
    query += `spokenLanguage=${spokenLanguage}&`
  }
  if (codelang) {
    query += `language=${codelang}&`
  }
  if (interval) {
    query += `period=${interval}&`
  } else {
    query += `period=daily&`
    interval = 'daily'
  }

  // Get repositories.
  repos = useApi(url + query)

  let isRepos = false
  let isLoading = true

  // Check if we have got any answers from the repositories.
  if (repos) {
    // Check if there was any matching repositories.
    isRepos = repos.length > 0 ? false : true

    // Disable loader
    isLoading = false
  }

  return (
    <>
      <section>
        <div className="filter-choise">
          <ul>
            {spokenLanguage && <li>{spokenLanguage}</li>}
            {codelang && <li>{codelang}</li>}
            {interval && <li>{interval}</li>}
          </ul>
        </div>
        {isLoading && (
          <div className="loading-dots">
            <div className="loading-dots--dot"></div>
            <div className="loading-dots--dot"></div>
            <div className="loading-dots--dot"></div>
          </div>
        )}
        {repos &&
          repos.map((repo) => (
            <Card key={repo.author + '-' + repo.name} data={repo} />
          ))}
        {isRepos && (
          <div className="not-found">
            Sorry we couldn't find any repositories...
          </div>
        )}
      </section>
    </>
  )
}

export default TrendingRepositories
