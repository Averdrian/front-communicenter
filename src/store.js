import { createStore } from 'vuex';
import {login, logout} from './routes/auth';

const auth = createStore({
  state: {
    user: null,
    isAuthenticated: false,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    LOGOUT(state) {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      let user = await login(credentials.email, credentials.password);
      commit('SET_USER', user.data.user);
    },
    async logout({ commit }) {
      await logout();
      commit('LOGOUT');
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
  }
});

export default auth;
