import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Article from './pages/Article'
import EditArticle from './pages/EditArticle'

function App () {
  return (
    <Switch>
      <Route exact path='/' children={<Home />} />
      <Route exact path='/:name' children={<Article />} />
      <Route exact path='/edit/:name' children={<EditArticle />} />
    </Switch>
  )
}

export default App
