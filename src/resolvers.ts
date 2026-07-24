type ResolverContext = {
  dataSources: {
    moviesAPI: {
      getMovie: (imdbId: string) => Promise<any>;
      getMovieByTitle: (title: string) => Promise<any>;
    };
    // personalizationAPI?: { getFavorites: () => Promise<any> };
  };
};

const books_c = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const authors_c = [
  {
    authorname: 'Kate Chopin',
  },
  {
    authorname: 'Paul J Dsaniels',
  },
];

export const resolvers = {
  Query: {
    books: () => books_c,
    auth: () => authors_c,
    movie: async (
      _: unknown,
      { imdbId }: { imdbId: string },
      { dataSources }: ResolverContext
    ) => {
      const resp = await dataSources.moviesAPI.getMovie(imdbId);
      return {
        title: resp?.Title ?? null,
        year: resp?.Year ?? null,
        imdbID: resp?.imdbID ?? null,
      };
    },
    movieByTitle: async (
      _: unknown,
      { title }: { title: string },
      { dataSources }: ResolverContext
    ) => {
      const resp = await dataSources.moviesAPI.getMovieByTitle(title);
      return {
        title: resp?.Title ?? null,
        year: resp?.Year ?? null,
        imdbID: resp?.imdbID ?? null,
      };
    },
    // mostViewedMovies: async (_, __, { dataSources }) => {
    //   return dataSources.moviesAPI.getMostViewedMovies();
    // },
    // favorites: async (_, __, { dataSources }) => {
    //   return dataSources.personalizationAPI.getFavorites();
    // },
  },
};

export default resolvers;
