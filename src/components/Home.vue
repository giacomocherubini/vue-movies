<template>
  <div>
    <searchfilms></searchfilms>
    <foundmovies></foundmovies>
  </div>
</template>

<script>
import searchfilms from "../components/SearchFilms.vue";
import foundmovies from "../components/FoundMovies.vue";

export default {
  name: "home",
  components: {
    searchfilms,
    foundmovies,
  },
  data() {
    return {};
  },
};
</script>