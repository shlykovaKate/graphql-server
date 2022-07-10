import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import albumsResolvers from './modules/albums/resolvers/albums.resolvers.js';
import artistsResolvers from './modules/artists/resolvers/artists.resolvers.js';
import bandsResolvers from './modules/bands/resolvers/bands.resolvers.js';
import genresResolvers from './modules/genres/resolvers/genres.resolvers.js';
import tracksResolvers from './modules/tracks/resolvers/tracks.resolvers.js';
import favouritesResolvers from './modules/favourites/resolvers/favourites.resolvers.js';
import userResolvers, { token } from './modules/users/resolvers/user.resolvers.js';
import { resolve } from 'path';
import process from 'process';
import dotenv from 'dotenv';

dotenv.config({path: resolve((process.cwd(), '.env'))});
const PORT = process.env.PORT || 4000;

const rootResolver = {};

const graphqlResolver = [
  rootResolver,
  albumsResolvers,
  artistsResolvers,
  bandsResolvers,
  genresResolvers,
  tracksResolvers,
  favouritesResolvers,
  userResolvers
];

const schema = makeExecutableSchema({
  typeDefs: loadSchemaSync('src/modules/**/schemas/*.graphql', {
    loaders: [new GraphQLFileLoader()],
  }),
  resolvers: graphqlResolver
});

const server = new ApolloServer({
  schema,
  context: () => {
    return {token};
  },
  formatError: (err) => {
    if (err.extensions.code === 'BAD_USER_INPUT') {
      return new Error(`${err.message}`);
    }
    if (err.extensions.code === 'YOU_MUST_BE_LOGGED') {
      return new Error(`${err.message}`);
    }

    return err;
  }
});

server.listen({port:PORT}).then(({ url }) => {
  console.log(`
    Server is running!
    Listening on port ${PORT}
    Server ready at ${url}
  `);
});
