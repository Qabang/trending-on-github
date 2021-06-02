import { StarFill, ShareFill } from 'react-bootstrap-icons'
import ThemeContext from '../contexts/ThemeContext'
import { useContext } from 'react'

function Card(props) {
  const { theme } = useContext(ThemeContext)

  const {
    author,
    name,
    langColor,
    description,
    url,
    stars,
    forks,
    language,
    avatar,
  } = props.data

  function goTo(url) {
    window.location.href = url
  }

  return (
    <section
      style={{ border: '4px solid' + langColor }}
      className={`card-wrapper ${theme}`}
      onClick={() => goTo(url)}
    >
      <section className="author">
        <div className="title">{author}</div>
        {avatar && <img src={avatar} alt={`avatar for ${author}`} />}
      </section>
      <section className="repo">
        <h2>{name}</h2>
        <p>
          {description ? (
            description
          ) : (
            <span className="no-data">No description available</span>
          )}
        </p>
        <section className="stats">
          <div>
            {language ? (
              language
            ) : (
              <span className="no-data">No specific language</span>
            )}
          </div>
          <div>
            <ShareFill />
            {forks}
          </div>
          <div>
            <StarFill />
            {stars}
          </div>
        </section>
      </section>
    </section>
  )
}

export default Card
