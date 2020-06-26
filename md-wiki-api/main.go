package main

import (
  "log"
  "net/http"
  "./routes"
)

func main() {
  http.HandleFunc("/articles/", routes.ArticlesHandler)
  log.Fatal(http.ListenAndServe(":9090", nil))
}
