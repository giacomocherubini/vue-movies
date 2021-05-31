<template>
  <div class="padding-25 d-flex justify-content-center align-items-center">
    <input
      type="text"
      v-model="title"
      name="nome"
      class="border-radius my-input bg-grey pl-2"
    />
    <a
      href="#"
      class="btn fas fa-search fa-lg my-search pr-2"
      @click="invia()"
    ></a>
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
  border-radius: 10px;
}

.my-input {
  text-decoration: none;
  border: 2px solid rgb(146, 148, 248);
}

.my-input,
.my-search {
  color: white;
}

.my-search {
  border: 0;
}

.my-input:hover,
.my-search:hover {
  box-shadow: 1px 1px 25px 10px rgba(146, 148, 248, 0.4);
}

.my-input:focus {
  outline: none;
}

.bg-grey {
  background-color: rgb(26, 26, 26);
}
</style>