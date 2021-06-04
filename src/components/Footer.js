import { Formik } from 'formik'
import ThemeContext from '../contexts/ThemeContext'
import { useContext } from 'react'

import '../styles/footer.css'

function Footer() {
  const { theme } = useContext(ThemeContext)

  return (
    <footer className={theme}>
      <div className="content-wrapper footer">
        <section className="App-description">
          <p>
            This application is created using the public API{' '}
            <a
              href="https://docs.trending-github.com/"
              target="_blank"
              rel="noreferrer"
            >
              Trending-Github
            </a>
            .
          </p>
          <p>
            Trending-Github is a public API available for everyone, allowing you
            to get the repositories currently trending on Github, filtered by
            period, programming language and spoken language!
          </p>
        </section>
        <Formik
          // Disable the validation on change to only run validation on submit.
          validateOnChange={false}
          initialValues={{ email: '' }}
          // Validate needs to be before the onSubmit call otherwise it triggers
          // after a successfull submit.
          validate={(values) => {
            const errors = {}

            // Check if empty. Else check that it is a valid email adress.
            if (values.email.trim() === '') {
              errors.email = "The email field can't be empty"
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address'
            }

            return errors
          }}
          // Submit form and empty the values.
          onSubmit={(values, { resetForm }) => {
            resetForm({ email: '' })
            alert('Din email ' + values.email + ' har registrerats! 🎉')
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, values }) => (
            <form className="newsletter" onSubmit={handleSubmit}>
              <div className="h2">Sign up for our newsletter</div>
              <div className="input-wrapper">
                <label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="email@example.com"
                    value={values.email}
                    className={errors.email && 'error'}
                  />
                </label>
              </div>
              <div className="submit-wrap">
                <input type="submit" value="Sign up" />
              </div>
              <div className="errors">{errors.email}</div>
            </form>
          )}
        </Formik>
      </div>
    </footer>
  )
}

export default Footer
