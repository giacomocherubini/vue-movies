<template>
  <div v-if="moviesCart[0]">
    <h3 class="pr-15">Totale carrello: {{ totalSpend }}</h3>
    <h3 class="pr-15">Totale film: {{ numberFilms }}</h3>
    <h3 class="pr-15" v-if="isDiscountActive">Sconto applicato</h3>
    <button v-on:click="addMovieToRentals(film)">Noleggia film</button>
    <div class="container-cart">
      <div class="container">
        <h1 class="pr-15">CART</h1>
      </div>
      <div class="container">
        <div
          class="card"
          @mouseleave="onImgExit()"
          v-for="film in moviesCart"
          :key="film.id"
        >
          <img
            v-if="activeMovieIdCart != film.id"
            @mouseover="onImgHover(film.id)"
            :src="`${urlImgBase}${film.poster_path}`"
            alt=""
          />

          <div v-if="activeMovieIdCart == film.id" class="scheda">
            <h4>Titolo: {{ film.original_title }}</h4>
            <h4>Data di uscita: {{ film.release_date }}</h4>
            <h4>Voto: {{ film.vote_average }}</h4>
          </div>
          <button @click="removeMovieFromCart(film.id)">
            Rimuovi dal carrello
          </button>
          <!--           <button @click="removeFilmCart(film.id)">Rimuovi dal carrello</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "cart",
  computed: {
    ...mapGetters({
      moviesCart: "cart/getCart",
      activeMovieIdCart: "cart/getActiveFilmIdCart",
      totalSpend: "cart/getTotalSpend",
      numberFilms: "cart/getAmountOfMoviesInCart",
      isDiscountActive: "cart/getIsDiscountActive",
      urlImgBase: "searchMovies/getUrlImgBase",
    }),
  },
  methods: {
    ...mapMutations({
      addMovieToRentals: "rentedMovies/addMovieToRentals",
      removeMovieFromCart: "cart/removeMovieFromCart",
      setActiveMovieId: "cart/setActiveMovieId",
    }),
    onImgHover(filmId) {
      this.setActiveMovieId(filmId);
    },
    onImgExit() {
      this.setActiveMovieId(null);
    },

    /* passaSopraImgCarrello(filmId) {
      this.$emit("passa-sopra-img-carrello", filmId);
    },
    esciImgCarrello() {
      this.$emit("esci-img-carrello");
    },
    rimuoviFilmCarrello(filmId) {
      this.$emit("rimuovi-film-carrello", filmId);
    }, */
  },
};
</script>
