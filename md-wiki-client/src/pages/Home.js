import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getArticles } from '../utils/api'
import Page from '../components/Page'
import uiStrings from '../constants/uiStrings-EN'

function Home () {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    getArticles()
      .then(json => setArticles(json))
      .catch(error => console.error(error))
  }, [])

  return (
    <Page>
      <h2>{uiStrings.homeHeader}</h2>
      <h4>{uiStrings.articlesListHeader}</h4>
      {articles.map((article, idx) => (
        <li key={idx}>
          <Link to={`/${article}`}>{article}</Link>
        </li>
      ))}
    </Page>
  )
}

export default Home
