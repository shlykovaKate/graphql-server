import {
  getAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum
} from '../services/albums.services.js';
import { getArtist } from '../../artists/services/artists.services.js';
import { getBand } from '../../bands/services/bands.services.js';
import { getTrack } from '../../tracks/services/tracks.services.js';
import { getGenre } from '../../genres/services/genres.services.js';
import { ApolloError } from 'apollo-server-errors';

export default {
  Query: {
    async album(parent, args) {
      const data = await getAlbum(args.id);
      return data.data;
    },
    async albums(parent, args, context, info) {
      const data = await getAlbums(args.limit, args.offset);
      return data.data.items;
    }
  },
  Album: {
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
    tracks(parent) {
      const { trackIds } = parent;
      return trackIds && trackIds.map(async (trackId) => {
        const data = trackId && await getTrack(trackId);
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
    async createAlbum(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await createAlbum({...args}, context.token);
      return data.data;
    },
    async deleteAlbum(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await deleteAlbum(args.id, context.token);
      return data.data;
    },
    async updateAlbum(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const {id, ...inputData} = args;
      const data = await updateAlbum(id, inputData, context.token);
      return data.data;
    }
  }
}
