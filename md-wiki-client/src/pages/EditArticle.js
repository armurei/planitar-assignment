import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import ReactCommonmark from 'react-commonmark'
import { getArticle, putArticle } from '../utils/api'
import Page from '../components/Page'
import Header from '../components/Header'
import uiStrings from '../constants/uiStrings-EN'

function EditArticle () {
  const [content, setContent] = useState('')
  const [previewing, setPreviewing] = useState(false)
  const { name } = useParams()
  const history = useHistory()

  useEffect(() => {
    getArticle(name)
      .then(json => setContent(json))
      .catch(error => console.error(error))
  }, [name])

  function handleSave (event) {
    event.preventDefault()
    putArticle(name, content)
      .then(() => history.push(`/${name}`))
      .catch(error => console.error(error))
  }

  return (
    <Page>
      <Header name={name} />
      {previewing && <ReactCommonmark source={content} />}
      {!previewing &&
        <form type='text' onSubmit={handleSave}>
          <textarea type='text' value={content} onChange={event => setContent(event.target.value)} />
        </form>}
      <section>
        <button onClick={handleSave}>
          {uiStrings.saveButton}
        </button>
        <Link to={`/${name}`}>
          <button>
            {uiStrings.cancelButton}
          </button>
        </Link>
        <label>
          <input type='checkbox' checked={previewing} onChange={() => setPreviewing(!previewing)} />
          {uiStrings.previewToggle}
        </label>
      </section>
    </Page>
  )
}

export default EditArticle
