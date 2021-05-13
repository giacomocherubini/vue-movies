<template>
  <div v-if="favoritesMovies[0]">
    <div class="container-favorite">
      <div class="container">
        <h1>FAVORITE FILM</h1>
      </div>
      <div class="container">
        <div
          class="card"
          @mouseleave="onImgExit()"
          v-for="film in favoritesMovies"
          :key="film.id"
        >
          <img
            v-if="activeMovieIdFavorite != film.id"
            @mouseover="onImgHover(film.id)"
            :src="`${urlImgBase}${film.poster_path}`"
            alt=""
          />

          <div v-if="activeMovieIdFavorite == film.id" class="scheda">
            <h4>Titolo: {{ film.original_title }}</h4>
            <h4>Data di uscita: {{ film.release_date }}</h4>
            <h4>Voto: {{ film.vote_average }}</h4>
          </div>
          <button @click="removeMovieFromFavorite(film.id)">
            Rimuovi dai preferiti
          </button>
          <button v-if="!isMovieInCart(film.id)" @click="addToCart(film)">
            Aggiungi al carrello
          </button>
          <span v-if="isMovieInCart(film.id)"> è gia nel carrello</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "favorite",
  computed: {
    ...mapGetters({
      favoritesMovies: "favoritesMovies/getFavoritesMovies",
      cart: "cart/getCart",
      activeMovieIdFavorite: "favoritesMovies/getActiveMovieIdFavorite",
      urlImgBase: "searchMovies/getUrlImgBase",
    }),
  },
  methods: {
    ...mapMutations({
      removeMovieFromFavorite: "favoritesMovies/removeMovieFromFavorite",
      addToCart: "cart/addMovieToCart",
      setActiveMovieId: "favoritesMovies/setActiveMovieId",
    }),
    onImgHover(filmId) {
      this.setActiveMovieId(filmId);
    },
    onImgExit() {
      this.setActiveMovieId(null);
    },
    isMovieInCart(id) {
      const moviesInCartWithId = this.cart.filter(function (film) {
        return id === film.id;
      });
      return moviesInCartWithId.length === 1;
    },

    /* passaSopraImgPreferiti(filmId) {
      this.$emit("passa-sopra-img-preferiti", filmId);
    },
    esciImgPreferiti() {
      this.$emit("esci-img-preferiti");
    }, */
  },
};
</script>
