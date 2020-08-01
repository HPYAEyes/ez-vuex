import Vue from 'vue'
import Vuex from './my-vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num: 0,
    firstName: 'pengyu',
    lastName: 'huang'
  },
  getters: {
    name: (state) => state.firstName + state.lastName
  },
  mutations: {
    add(state, payload) {
      state.num += payload.num;
    }
  },
  actions: {
    addAsync({ commit }, payload) {
      setTimeout(() => {
        commit('add', payload)
      }, 1000)
    }
  },
  modules: {
  }
})
