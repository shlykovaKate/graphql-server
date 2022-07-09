import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import albumsResolvers from './modules/albums/resolvers/albums.resolvers.js';
import artistsResolvers from './modules/artists/resolvers/artists.resolvers.js';
import userResolvers, { token } from './modules/users/resolvers/user.resolvers.js';
import { resolve } from 'path';
import process from 'process';
import dotenv from 'dotenv';

dotenv.config({path: resolve((process.cwd(), '.env'))});
const PORT = process.env.PORT || 4000;

const rootResolver = {};

const graphqlResolver = [rootResolver, albumsResolvers, artistsResolvers, userResolvers];

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
  }
});

server.listen({port:PORT}).then(({ url }) => {
  console.log(`
    Server is running!
    Listening on port ${PORT}
    Server ready at ${url}
  `);
});
