import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MovieList from "../views/MovieList.vue";
import MovieDetails from "../views/MovieDetails.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/top-rated-movies",
    name: "TopRatedMovies",
    component: MovieList,
    props: {
      moviesUrl: `${process.env.VUE_APP_API_ORIGIN}/top-rated-movies`,
      title: "Top Rated Movies",
      type: "top-rated",
    },
  },
  {
    path: "/popular-movies",
    name: "PopularMovies",
    component: MovieList,
    props: {
      moviesUrl: `${process.env.VUE_APP_API_ORIGIN}/popular-movies`,
      title: "Popular Movies",
      type: "popular",
    },
  },
  {
    path: "/movie-details/:type/:id",
    name: "MovieDetails",
    component: MovieDetails,
    props: true,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
