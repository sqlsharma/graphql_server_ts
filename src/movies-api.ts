import { RESTDataSource } from '@apollo/datasource-rest';

export class OMDbAPI extends RESTDataSource {
  override baseURL = 'https://www.omdbapi.com/';

  constructor(options?: { cache?: any }) {
    super();
    // Accept an options object for compatibility with callers that pass
    // `{ cache }` when constructing the data source.
    if (options?.cache) {
      (this as any).cache = options.cache;
    }
  }

  async getMovie(imdbId: string) {
    return this.get('', {
      params: {
        i: imdbId,
        apikey: 'f99dfbc1',
      },
    });
  }

  async getMovieByTitle(title: string) {
    return this.get('', {
      params: {
        t: title,
        apikey: 'f99dfbc1',
      },
    });
  }
}

 

// class MoviesAPI extends RESTDataSource {
//   override baseURL = 'https://movies-api.example.com/';

//   async getMovie(id: string): Promise<Movie> {
//     return this.get<Movie>(`movies/${encodeURIComponent(id)}`);
//   }

//   async getMostViewedMovies(limit = '10'): Promise<Movie[]> {
//     const data = await this.get('movies', {
//       params: {
//         per_page: limit,
//         order_by: 'most_viewed',
//       },
//     });

//     return data.results;
//   }
// }
