import {
  getArtists,
  getArtist,
  createArtist,
  updateArtist,
  deleteArtist
} from '../services/artists.services.js';
import { getBand } from '../../bands/services/bands.services.js';
import { ApolloError } from 'apollo-server-errors';

export default {
  Query: {
    async artist(parent, args) {
      const data = await getArtist(args.id);
      return data.data;
    },
    async artists(parent, args, context, info){
      const data = await getArtists(args.limit, args.offset);
      return data.data.items;
    }
  },
  Artist: {
    bands(parent) {
      const { bandsIds } = parent;
      return bandsIds && bandsIds.map(async (bandId) => {
        const data = bandId && await getBand(bandId);
        return data.data;
      });
    }
  },
  Mutation: {
    async createArtist(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await createArtist({...args}, context.token);
      return data.data;
    },
    async deleteArtist(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await deleteArtist(args.id, context.token);
      return data.data;
    },
    async updateArtist(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const {id, ...inputData} = args;
      const data = await updateArtist(id, inputData, context.token);
      return data.data;
    }
  }
}
