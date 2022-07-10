import {
  getJWT,
  getUser,
  registerUser
} from '../services/users.services.js';
export let token = '';

export default {
  Query: {
    async jwt(parent, args, context) {
      const data = await getJWT(args.email, args.password);
      token = data.data.jwt;
      return data.data;
    },
    async user(parent, args) {
      const data = await getUser(args.id);
      return data.data;
    }
  },
  Mutation: {
    async register(parent, args) {
      const data = await registerUser(args.firstName, args.lastName, args.email, args.password);
      return data.data;
    },
  }
}
