This is the md-wiki REST api for part 1 of the Planitar home assignment.

## Building the Server

```
go run main.go
```

#### or

```
go build -o main
./main
```

The server will be accessible at http://localhost:9090.

## Tests

```
go test ./...
```

This will run the entire test suite.

## Endpoints

#### Get Articles List
Returns a JSON array containing the names of all articles in the wiki.

**URL:** /articles/

**Method:** GET

**Success Response Code:** 200

**Success Response Content:** ["article0", "article1", ...]

#### Get Article
Returns the text content of a single article.

**URL:** /articles/:name

**Method:** GET

**Required URL Params:** name=[string]

**Success Response Code:** 200

**Success Response Content:** "article content"

#### Put Article
Creates a new article, or overwrites an existing artcle with content from the
request body.

**URL:** /articles/:name

**Method:** PUT

**Required URL Params:** name=[string]

**Body Content Type:** text/html

**Success Response Code:** 200 or 201

**Success Response Content:** "article content"
