import {
  getGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre
} from '../services/genres.services.js';
import { ApolloError } from 'apollo-server-errors';

export default {
  Query: {
    async genre(parent, args) {
      const data = await getGenre(args.id);
      return data.data;
    },
    async genres(parent, args, context, info){
      const data = await getGenres(args.limit, args.offset);
      return data.data.items;
    }
  },
  Mutation: {
    async createGenre(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await createGenre({...args}, context.token);
      return data.data;
    },
    async deleteGenre(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await deleteGenre(args.id, context.token);
      return data.data;
    },
    async updateGenre(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const {id, ...inputData} = args;
      const data = await updateGenre(id, inputData, context.token);
      return data.data;
    }
  }
}
