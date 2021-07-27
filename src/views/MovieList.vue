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
import MovieCard from "../components/MovieCard.vue";
import useFetchData from "../composables/useFetchData";
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
    const url = toRefs(props).moviesUrl;
    const { error, loading, data: movies } = useFetchData(url);

    return {
      error,
      loading,
      movies,
    };
  },
};
</script>

<style scoped></style>
