package routes

import (
  "io"
  "strings"
  "net/http"
  "encoding/json"
)

var wiki = make(map[string]string)

func ArticlesHandler(responseWriter http.ResponseWriter, request *http.Request) {
  // gets name of article passed as a URL parameter
  // name will be an empty string if no URL parameter was passed
  name := request.URL.Path[len("/articles/"):]

  switch request.Method {
    case http.MethodGet:
      if len(name) == 0 {
        getArticlesList(responseWriter)
      } else {
        getArticle(responseWriter, name)
      }
    case http.MethodPut:
      putArticle(responseWriter, request, name)
  }
}

func getArticlesList(responseWriter http.ResponseWriter) {
  // generates an array of strings, containing the name of each
  // article in the wiki
  names := []string{}
  for name, _ := range wiki {
    names = append(names, name)
  }

  responseWriter.Header().Set("Content-Type", "application/json")
  json.NewEncoder(responseWriter).Encode(names)
}

func getArticle(responseWriter http.ResponseWriter, name string) {
  if _, existing := wiki[name]; !existing {
    responseWriter.WriteHeader(http.StatusNotFound)
    return
  }

  responseWriter.Header().Set("Content-Type", "text/html")
  json.NewEncoder(responseWriter).Encode(wiki[name])
}

func putArticle(responseWriter http.ResponseWriter, request *http.Request, name string) {
  if len(name) == 0 {
    responseWriter.WriteHeader(http.StatusBadRequest)
    return
  }

  buffer := new(strings.Builder)
  io.Copy(buffer, request.Body)

  var code int
  if _, existing := wiki[name]; existing {
    code = http.StatusOK
  } else {
    code = http.StatusCreated
  }

  wiki[name] = buffer.String()
  responseWriter.WriteHeader(code)
}
