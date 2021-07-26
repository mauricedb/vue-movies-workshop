<template>
  <div>
    <router-link :to="{ name: 'MovieDetails', params: { id: movie.id, type } }">
      {{ movie.title }}
      <span :title="movie.vote_average">
        ({{ movie.vote_average | stars }})
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object,
    type: String,
  },
  filters: {
    stars(value) {
      return "".padEnd(value / 2, "★").padEnd(5, "☆");
    },
  },
};
</script>

<style scoped></style>
