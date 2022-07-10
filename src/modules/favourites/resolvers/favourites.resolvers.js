import {
  getFavourites,
  addToFavourites,
  removeToFavourites
} from '../services/favourites.services.js';
import { getArtist } from '../../artists/services/artists.services.js';
import { getBand } from '../../bands/services/bands.services.js';
import { getTrack } from '../../tracks/services/tracks.services.js';
import { getGenre } from '../../genres/services/genres.services.js';
import { ApolloError } from 'apollo-server-errors';

export default {
  Query: {
    async favourites(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await getFavourites(context.token);
      return data.data;
    }
  },
  Favourites: {
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
    async addTrackToFavourites(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await addToFavourites({type: "tracks", id: args.id}, context.token);
      return data.data;
    },
    async addBandToFavourites(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await addToFavourites({type: "bands", id: args.id}, context.token);
      return data.data;
    },
    async addArtistToFavourites(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await addToFavourites({type: "artists", id: args.id}, context.token);
      return data.data;
    },
    async addGenreToFavourites(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await addToFavourites({type: "genres", id: args.id}, context.token);
      return data.data;
    },
    async removeTrackToFavourites(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await removeToFavourites({type: "tracks", id: args.id}, context.token);
      return data.data;
    },
    async removeBandToFavourites(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await removeToFavourites({type: "bands", id: args.id}, context.token);
      return data.data;
    },
    async removeArtistToFavourites(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await removeToFavourites({type: "artists", id: args.id}, context.token);
      return data.data;
    },
    async removeGenreToFavourites(parent, args, context, info) {
      if (!context.token) throw new ApolloError('You must be logged!', "YOU_MUST_BE_LOGGED");
      const data = await removeToFavourites({type: "genres", id: args.id}, context.token);
      return data.data;
    }
  }
}
