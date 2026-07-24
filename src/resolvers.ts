type ResolverContext = {
  dataSources: {
    moviesAPI: {
      getMovie: (imdbId: string) => Promise<any>;
      getMostViewedMovies: () => Promise<any>;
    };
    // personalizationAPI?: { getFavorites: () => Promise<any> };
  };
};

const resolvers = {
  Query: {
    movie: async (
      _: unknown,
      { imdbId }: { imdbId: string },
      { dataSources }: ResolverContext
    ) => {
      return dataSources.moviesAPI.getMovie(imdbId);
    },
    // mostViewedMovies: async (_, __, { dataSources }) => {
    //   return dataSources.moviesAPI.getMostViewedMovies();
    // },
    // favorites: async (_, __, { dataSources }) => {
    //   return dataSources.personalizationAPI.getFavorites();
    // },
  },
};
