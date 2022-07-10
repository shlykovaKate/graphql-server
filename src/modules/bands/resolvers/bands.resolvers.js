import {
  getBands,
  getBand,
  createBand,
  updateBand,
  deleteBand
} from '../services/bands.services.js';
import { getGenre } from '../../genres/services/genres.services.js';
import { getArtist } from '../../artists/services/artists.services.js';
import { ApolloError } from 'apollo-server-errors';

export default {
  Query: {
    async band(parent, args) {
      const data = await getBand(args.id);
      return data.data;
    },
    async bands(parent, args, context, info){
      const data = await getBands(args.limit, args.offset);
      return data.data.items;
    }
  },
  Band: {
    genres(parent) {
      const { genresIds } = parent;
      return genresIds && genresIds.map(async (genreId) => {
        const data = genreId && await getGenre(genreId);
        return data.data;
      });
    },
    members(parent) {
      const { members } = parent;
      return members && members.map(async (member) => {
        const data = member && member.artist && await getArtist(member.artist);
        return {...member, artist: data.data};
      });
    }
  },
  Mutation: {
    async createBand(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await createBand({...args}, context.token);        
      return data.data;
    },
    async deleteBand(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await deleteBand(args.id, context.token);
      return data.data;
    },
    async updateBand(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const {id, ...inputData} = args;
      const data = await updateBand(id, inputData, context.token);
      return data.data;
    }
  }
}
