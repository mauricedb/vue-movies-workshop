import { createStore } from "vuex";

const store = createStore({
  state: {
    now: new Date(),
  },
  mutations: {
    tick(state) {
      state.now = new Date();
    },
  },
  actions: {},
  modules: {},
});

setInterval(() => store.commit("tick"), 1000);

export default store;
