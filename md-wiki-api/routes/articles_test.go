package routes

import (
  "strings"
  "testing"
	"net/http"
	"net/http/httptest"
)

func TestPutArticleCreate(test *testing.T) {
  articleName := "page1"
  articleContent := strings.NewReader("this page contains some interesting info")
  request, error := http.NewRequest("PUT", "/articles/" + articleName, articleContent)

	if error != nil {
		test.Fatal(error)
	}

	recorder := httptest.NewRecorder()
	handler := http.HandlerFunc(ArticlesHandler)
	handler.ServeHTTP(recorder, request)

  expectedStatus := http.StatusCreated
	if status := recorder.Code; status != expectedStatus {
		test.Errorf("Handler returned status %d, was expecting %d", status, expectedStatus)
	}

	expectedBody := ``
  body := recorder.Body.String()
  body = strings.TrimSuffix(body, "\n")
	if body != expectedBody {
    test.Errorf("Handler returned body %s, was expecting %s", body, expectedBody)
  }
}

func TestPutArticleUpdate(test *testing.T) {
  articleName := "page1"
  articleContent := strings.NewReader("this page has been updated to remove anything interesting")
  request, error := http.NewRequest("PUT", "/articles/" + articleName, articleContent)

	if error != nil {
		test.Fatal(error)
	}

	recorder := httptest.NewRecorder()
	handler := http.HandlerFunc(ArticlesHandler)
	handler.ServeHTTP(recorder, request)

  expectedStatus := http.StatusOK
	if status := recorder.Code; status != expectedStatus {
		test.Errorf("Handler returned status %d, was expecting %d", status, expectedStatus)
	}

	expectedBody := ``
  body := recorder.Body.String()
  body = strings.TrimSuffix(body, "\n")
	if body != expectedBody {
    test.Errorf("Handler returned body %s, was expecting %s", body, expectedBody)
  }
}

func TestPutArticleBadRequest(test *testing.T) {
  articleName := ""
  articleContent := strings.NewReader("this page has an empty name")
  request, error := http.NewRequest("PUT", "/articles/" + articleName, articleContent)

	if error != nil {
		test.Fatal(error)
	}

	recorder := httptest.NewRecorder()
	handler := http.HandlerFunc(ArticlesHandler)
	handler.ServeHTTP(recorder, request)

  expectedStatus := http.StatusBadRequest
	if status := recorder.Code; status != expectedStatus {
		test.Errorf("Handler returned status %d, was expecting %d", status, expectedStatus)
	}

	expectedBody := ``
  body := recorder.Body.String()
  body = strings.TrimSuffix(body, "\n")
	if body != expectedBody {
    test.Errorf("Handler returned body %s, was expecting %s", body, expectedBody)
  }
}

func TestGetArticlesList(test *testing.T) {
  request, error := http.NewRequest("GET", "/articles/", nil)

	if error != nil {
		test.Fatal(error)
	}

	recorder := httptest.NewRecorder()
	handler := http.HandlerFunc(ArticlesHandler)
	handler.ServeHTTP(recorder, request)

  expectedStatus := http.StatusOK
	if status := recorder.Code; status != expectedStatus {
		test.Errorf("Handler returned status %d, was expecting %d", status, expectedStatus)
	}

	expectedBody := `["page1"]`
  body := recorder.Body.String()
  body = strings.TrimSuffix(body, "\n")
	if body != expectedBody {
    test.Errorf("Handler returned body %s, was expecting %s", body, expectedBody)
  }
}

func TestGetArticle(test *testing.T) {
  articleName := "page1"
  request, error := http.NewRequest("GET", "/articles/" + articleName, nil)

	if error != nil {
		test.Fatal(error)
	}

	recorder := httptest.NewRecorder()
	handler := http.HandlerFunc(ArticlesHandler)
	handler.ServeHTTP(recorder, request)

  expectedStatus := http.StatusOK
	if status := recorder.Code; status != expectedStatus {
		test.Errorf("Handler returned status %d, was expecting %d", status, expectedStatus)
	}

	expectedBody := `"this page has been updated to remove anything interesting"`
  body := recorder.Body.String()
  body = strings.TrimSuffix(body, "\n")
	if body != expectedBody {
    test.Errorf("Handler returned body %s, was expecting %s", body, expectedBody)
  }
}

func TestGetArticleNotFound(test *testing.T) {
  articleName := "page2"
  request, error := http.NewRequest("GET", "/articles/" + articleName, nil)

	if error != nil {
		test.Fatal(error)
	}

	recorder := httptest.NewRecorder()
	handler := http.HandlerFunc(ArticlesHandler)
	handler.ServeHTTP(recorder, request)

  expectedStatus := http.StatusNotFound
	if status := recorder.Code; status != expectedStatus {
		test.Errorf("Handler returned status %d, was expecting %d", status, expectedStatus)
	}

	expectedBody := ``
  body := recorder.Body.String()
  body = strings.TrimSuffix(body, "\n")
	if body != expectedBody {
    test.Errorf("Handler returned body %s, was expecting %s", body, expectedBody)
  }
}
