import { createStore } from "vuex";

const store = createStore({
  state: {
    now: new Date(),
  },
  mutations: {
    tick(state) {
      state.now = new Date();
    },
    dataLoading(state, payload) {
      state[payload.key] = null;
      state[`${payload.key}Loading`] = true;
    },
    dataLoaded(state, payload) {
      state[payload.key] = payload.data;
      state[`${payload.key}Loading`] = false;
    },
  },
  actions: {
    async fetchData(ctx, payload) {
      if (!ctx.state[payload.key]) {
        ctx.commit("dataLoading", payload);

        try {
          const rsp = await fetch(payload.url);

          if (rsp.ok) {
            ctx.commit("dataLoaded", {
              data: await rsp.json(),
              key: payload.key,
            });
          }
        } catch (error) {
          console.log(error?.message ?? "Failed to load data");
        }
      }
    },
  },
  modules: {},
});

setInterval(() => store.commit("tick"), 1000);

export default store;
