<template>
  <div>
    <router-link :to="{ name: 'MovieDetails', params: { id: movie.id, type } }">
      {{ movie.title }}
      <span :title="movie.vote_average"> ({{ ratingAsStars }}) </span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object,
    type: String,
  },
  computed: {
    ratingAsStars() {
      return "".padEnd(this.movie.vote_average / 2, "★").padEnd(5, "☆");
    },
  },
};
</script>

<style scoped></style>
