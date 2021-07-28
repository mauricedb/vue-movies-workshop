<template>
  <div>
    <h2>{{ title }}</h2>
    <div>
      <div v-if="error">{{ error }}</div>
      <div v-else-if="loading">Loading...</div>
      <div v-else>
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          :type="type"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from "vue";
import { useStore } from "vuex";
import MovieCard from "../components/MovieCard.vue";
import { toRefs } from "@vue/reactivity";

export default {
  components: {
    MovieCard,
  },
  props: {
    moviesUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const url = toRefs(props).moviesUrl;
    const key = toRefs(props).type;
    watchEffect(() => {
      store.dispatch("fetchData", { url: url.value, key: key.value });
    });

    const movies = computed(() => store.state[key.value]);
    const error = computed(() => store.state[`${key.value}Error`]);
    const loading = computed(() => store.state[`${key.value}Loading`]);

    return {
      error,
      loading,
      movies,
    };
  },
};
</script>

<style scoped></style>
