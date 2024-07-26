import { createStore } from 'vuex';
import {login, logout} from './routes/auth';
import VuexPersistence from 'vuex-persist';

const auth = createStore({
  state: {
    user: null,
    isAuthenticated: false,
    isChief : false,
    isAdminOrganization : false
  },
  mutations: {
    SET_USER(state, user) {
      console.log(user)
      state.user = user;
      state.isAuthenticated = !!user;
      state.isChief = user.role == 0
      state.isAdminOrganization = user.organization_is_admin
    },
    LOGOUT(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isChief = false;
      state.isAdminOrganization = false;
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
    isChief: state => state.isChief,
    isAdminOrganization: state => state.isAdminOrganization
  },
  plugins: [
    new VuexPersistence({
      storage: window.localStorage
    }).plugin
  ]
});

export default auth;
