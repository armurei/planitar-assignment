const base = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000'

export const getArticles = () => {
  return fetch(`${base}/articles/`)
    .then(response => response.json())
}

export const getArticle = name => {
  return fetch(`${base}/articles/${name}`)
    .then(response => {
      if (response.status === 404) return ''
      return response.json()
    })
}

export const putArticle = (name, content) => {
  return fetch(`${base}/articles/${name}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'text/html'
    },
    body: content
  })
}
