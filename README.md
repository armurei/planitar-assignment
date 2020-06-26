This is the dockerized md-wiki app for part 3 of the Planitar home assignment.

## Build the app

```
docker build -t md-wiki:2019 .
```

This will create a single docker image for the entire app, under the name
"md-wiki" with the tag "2019".

```
docker run -ti -p 8080:8080 md-wiki:2019
```

This will create a container from the image. The client will be accessible at
http://localhost:8080, and the REST server will be accessible at
http://localhost:8080/api/.
