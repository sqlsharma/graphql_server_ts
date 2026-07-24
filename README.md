# graphql_server_ts
# Query types

**Query example:By Title:**
query {
  movieByTitle(title: "Anaconda") {
    title
    year
    imdbID
  }
}

**Query example with imdbId:**

query {
  movie(imdbId: "tt0111161") {
    title
    year
    imdbID
  }
}
