import { Formik } from 'formik'
import { useContext } from 'react'
import useApi from '../customHooks/useApi'
import ThemeContext from '../contexts/ThemeContext'

import '../styles/form.css'

function FormFilter(props) {
  const { theme } = useContext(ThemeContext)
  const languages = useApi('https://api.trending-github.com/github/languages')
  const spokenLanguages = useApi(
    'https://api.trending-github.com/github/spoken-languages'
  )

  let defaultValues = {
    spokenLanguage: '',
    codelang: '',
  }

  return (
    <Formik
      initialValues={defaultValues}
      onSubmit={(values, formData) => {
        props.parentCallback(values)
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        values,
      }) => (
        <form className="filter" onSubmit={handleSubmit}>
          {spokenLanguages && (
            <label htmlFor="spokenLanguage">
              Spoken Language:
              <select
                name="spokenLanguage"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.spokenLanguage}
              >
                <option value="">-- Select spoken language --</option>
                {spokenLanguages.map((value, index) => (
                  <option value={value.code} key={value.code}>
                    {value.language}
                  </option>
                ))}
              </select>
            </label>
          )}
          {languages && (
            <label htmlFor="codelang">
              Language:
              <select
                name="codelang"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.codelang}
              >
                <option value="">-- Select language --</option>
                {languages.map((value, index) => (
                  <option value={value} key={index}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          )}
          <div className={`submit-wrap ${theme}`}>
            <input type="submit" value="Filter" />
          </div>
        </form>
      )}
    </Formik>
  )
}

export default FormFilter
