import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userLogin: null,
  },
  mutations: {
    SET_USER_LOGIN(state, payload) {
      state.userLogin = payload;
    }
  },
  actions: {
    setUserLogin({ commit }, userParams) {
      commit('SET_USER_LOGIN', userParams);
    }
  },
  modules: {
  }
})
