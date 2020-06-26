import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactCommonmark from 'react-commonmark'
import { getArticle } from '../utils/api'
import Page from '../components/Page'
import Header from '../components/Header'
import uiStrings from '../constants/uiStrings-EN'

function Article () {
  const [content, setContent] = useState('')
  const { name } = useParams()

  useEffect(() => {
    getArticle(name)
      .then(json => setContent(json.length ? json : uiStrings.articleNotFound))
      .catch(error => console.error(error))
  }, [name])

  return (
    <Page>
      <Header name={name} displayEditButton />
      <ReactCommonmark source={content} />
    </Page>
  )
}

export default Article
