export default {
  state: {
    main: 0,
  },
  mutations: {
    DECREMENT_MAIN_COUNTER(state) { state.main--; },
    INCREMENT_MAIN_COUNTER(state) { state.main++; },
  },
  actions: {
    someAsyncTask: ({ commit }) => Promise.resolve(null)  /* do something async */
      .then(() => commit('INCREMENT_MAIN_COUNTER')),
  }
};
