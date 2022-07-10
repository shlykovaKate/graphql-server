import {
  getTracks,
  getTrack,
  createTrack,
  updateTrack,
  deleteTrack
} from '../services/tracks.services.js';
import { getArtist } from '../../artists/services/artists.services.js';
import { getBand } from '../../bands/services/bands.services.js';
import { getGenre } from '../../genres/services/genres.services.js';
import { getAlbum } from '../../albums/services/albums.services.js';
import { ApolloError } from 'apollo-server-errors';

export default {
  Query: {
    async track(parent, args) {
      const data = await getTrack(args.id);
      return data.data;
    },
    async tracks(parent, args, context, info){
      const data = await getTracks(args.limit, args.offset);
      return data.data.items;
    }
  },
  Track: {
    async album(parent) {
      const { albumId } = parent;
      const data = albumId && await getAlbum(albumId);
      return data.data;
    },
    artists(parent) {
      const { artistsIds } = parent;
      return artistsIds && artistsIds.map(async (artistId) => {
        const data = artistId && await getArtist(artistId);
        return data.data;
      });
    },
    bands(parent) {
      const { bandsIds } = parent;
      return bandsIds && bandsIds.map(async (bandId) => {
        const data = bandId && await getBand(bandId);
        return data.data;
      });
    },
    genres(parent) {
      const { genresIds } = parent;
      return genresIds && genresIds.map(async (genreId) => {
        const data = genreId && await getGenre(genreId);
        return data.data;
      });
    }
  },
  Mutation: {
    async createTrack(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await createTrack({...args}, context.token);
      return data.data;
    },
    async deleteTrack(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await deleteTrack(args.id, context.token);
      return data.data;
    },
    async updateTrack(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const {id, ...inputData} = args;
      const data = await updateTrack(id, inputData, context.token);
      return data.data;
    }
  }
}
