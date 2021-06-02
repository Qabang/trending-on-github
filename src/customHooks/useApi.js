import axios from 'axios'
import { useEffect, useState } from 'react'

const useApi = (url) => {
  const [data, setData] = useState('')

  useEffect(() => {
    setData('')
    axios.get(url).then((res) => {
      setData(res.data)
    })
  }, [url])

  return data
}

export default useApi
