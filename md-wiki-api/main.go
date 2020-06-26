package main

import (
  "log"
  "net/http"
  "github.com/armurei/planitar-assignment/md-wiki-api/routes"
)

func main() {
  http.HandleFunc("/articles/", routes.ArticlesHandler)
  log.Fatal(http.ListenAndServe(":9090", nil))
}
