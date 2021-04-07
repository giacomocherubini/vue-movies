<template>
  <div id="app">
    <searchmovies
      v-bind:search="query"
      v-on:change-input="
        query = $event.target.value;
        fetchfilms($event);
      "
    ></searchmovies>
    <p v-if="this.isFetching">sto caricando ....</p>
    <p v-if="this.apiError">{{ this.apiError }}</p>
    <div v-if="this.apiData.results">
      <div class="container">
        <div
          class="card"
          @mouseleave="activeFilmId = null"
          v-for="film in arrayfilms"
          :key="film.id"
        >
          <img
            v-if="activeFilmId != film.id"
            @mouseover="activeFilmId = film.id"
            :src="`${url_img_base}${film.poster_path}`"
            alt=""
          />
          <!--           <feature v-if="activeFilmId"> :title="" </feature> -->
          <div v-if="activeFilmId == film.id" class="scheda">
            <h4>Titolo: {{ film.original_title }}</h4>
            <h4>Data di uscita: {{ film.release_date }}</h4>
            <h4>Voto: {{ film.vote_average }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import searchmovies from "./components/SearchFilms.vue";
/* import feature from "./components/FeatureTab.vue"; */

export default {
  name: "App",
  components: {
    searchmovies,
    /*     feature, */
  },
  data() {
    return {
      api_key: "98b8b4576cbd2fa355ca9f0c79a15767",
      url_base: "https://api.themoviedb.org/3/search/movie?api_key=",
      url_img_base: "https://image.tmdb.org/t/p/w500",
      img_film: "",
      query: "",
      apiData: {},
      isFetching: false,
      apiError: "",
      arrayfilms: [],
      activeFilmId: null,
    };
  },
  methods: {
    fetchfilms(e) {
      console.log(e);
      if (e.key == "Enter") {
        this.isFetching = true;
        fetch(`${this.url_base}${this.api_key}&query=${this.query}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            this.isFetching = false;
            this.apiData = data;
            this.arrayfilms = data.results;
            this.img_film = data.results.poster_path;
            console.log("immaginefilm", this.img_film);

            console.log("filmcercato", this.apiData);
          })
          .catch(() => {
            this.isFetching = false;
            this.apiError = "Qualcosa è andato storto";
          });
      }
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "monterrat", sans-serif;
  background-color: black;
  min-height: 100vh;
  padding: 25px;
  background-size: 100%;
  background-position: top;
  color: aqua;
}

.container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  border: 1px solid greenyellow;
}

.card {
  border: 1px solid aqua;
  width: 25%;
  padding: 10px;
}
</style>
