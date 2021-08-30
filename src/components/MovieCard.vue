<template>
  <v-card elevation="3" class="mx-auto my-3" max-width="500">
    <router-link :to="{ name: 'MovieDetails', params: { id: movie.id, type } }">
      <v-img :src="imageUrl" height="281" width="500" />
      <v-card-title>
        {{ movie.title }}
        <span :title="movie.vote_average"> ({{ voteAsStars }}) </span>
      </v-card-title>
    </router-link>
  </v-card>
</template>

<script>
export default {
  props: {
    movie: Object,
    type: String,
  },
  computed: {
    voteAsStars() {
      return "".padEnd(this.movie.vote_average / 2, "★").padEnd(5, "☆");
    },
    imageUrl() {
      return "https://image.tmdb.org/t/p/w500" + this.movie.backdrop_path;
    },
  },
};
</script>

<style scoped>
a:link,
a:visited {
  color: blue;
}
</style>
