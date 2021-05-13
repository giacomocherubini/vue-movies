<template>
  <div class="padding-25 d-flex justify-content-center">
    <input
      type="text"
      v-model="title"
      name="nome"
      class="border-radius my-input bg-grey"
    />
    <a href="#" class="btn fas fa-search my-search p-1" @click="invia()"></a>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "searchfilms",
  data() {
    return {
      title: "",
    };
  },
  computed: {
    ...mapGetters({
      getQuery: "searchMovies/getQuery",
    }),
  },
  methods: {
    ...mapMutations({
      setQuery: "searchMovies/setQuery",
    }),
    ...mapActions({
      fetchMovies: "searchMovies/fetchFilms",
    }),
    invia() {
      this.setQuery(this.title);
      this.fetchMovies();
    },
  },
};
</script>

<style scoped>
.search_input {
  width: 30%;
}
.padding-25 {
  padding: 25px;
}

.border-radius {
  border-radius: 5px;
}

.my-input,
.my-search {
  text-decoration: none;
  border: 1px solid rgb(146, 148, 248);
  color: white;
}

.my-input:hover,
.my-search:hover {
  box-shadow: 1px 1px 25px 10px rgba(146, 148, 248, 0.4);
}

.bg-grey {
  background-color: rgb(26, 26, 26);
}
</style>