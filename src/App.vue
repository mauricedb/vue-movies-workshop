<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/top-rated-movies">Top Rated Movies</router-link> |
      <router-link to="/popular-movies">Popular Movies</router-link> |
      <router-link to="/about">About</router-link> |
      <Clock />
    </nav>

    <main id="main">
      <router-view />
    </main>
  </div>
</template>

<script>
import Clock from "./components/Clock.vue";

export default {
  components: {
    Clock,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#main {
  width: 600px;
  margin: 0 auto;
}
</style>
