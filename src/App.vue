<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>Movies</v-app-bar-title>
      <router-link to="/">
        <v-btn text>Home</v-btn>
      </router-link>
      <router-link to="/top-rated-movies">
        <v-btn text>Top Rated Movies</v-btn>
      </router-link>
      <router-link to="/popular-movies">
        <v-btn text>Popular Movies</v-btn>
      </router-link>
      <router-link to="/about">
        <v-btn text>About</v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn text>
        <Clock />
      </v-btn>
    </v-app-bar>
    <nav id="nav"></nav>

    <v-main id="main">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Clock from "./components/Clock.vue";

export default {
  components: {
    Clock,
  },
};
</script>
