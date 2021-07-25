<template>
  <div>
    <h2>{{ title }}</h2>
    <div>
      <div v-if="error">{{ error }}</div>
      <div v-else-if="loading">Loading...</div>
      <main v-else>
        <div v-for="movie in movies" :key="movie.id">
          <router-link
            :to="{ name: 'MovieDetails', params: { id: movie.id, type } }"
            >{{ movie.title }}</router-link
          >
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      loading: true,
      movies: [],
    };
  },
  mounted() {
    this.fetchMovies();
  },
  watch: {
    moviesUrl() {
      this.fetchMovies();
    },
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
  methods: {
    async fetchMovies() {
      try {
        const rsp = await fetch(this.moviesUrl);

        if (rsp.ok) {
          this.movies = await rsp.json();
        } else {
          this.error = rsp.statusText ?? "Failed to load data";
        }
      } catch (error) {
        this.error = error?.message ?? "Failed to load data";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
