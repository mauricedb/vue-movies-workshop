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
import { onMounted, ref, watch, watchEffect } from "vue";
import MovieCard from "../components/MovieCard.vue";

export default {
  components: {
    MovieCard,
  },
  setup(props) {
    const error = ref(null);
    const loading = ref(true);
    const movies = ref([]);

    async function fetchMovies() {
      try {
        const rsp = await fetch(props.moviesUrl);

        if (rsp.ok) {
          movies.value = await rsp.json();
        } else {
          error.value = rsp.statusText ?? "Failed to load data";
        }
      } catch (err) {
        error.value = err?.message ?? "Failed to load data";
      } finally {
        loading.value = false;
      }
    }

    // onMounted(fetchMovies);
    // watch(() => props.moviesUrl, fetchMovies);
    watchEffect(fetchMovies);

    return {
      error,
      loading,
      movies,
    };
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
};
</script>

<style scoped></style>
