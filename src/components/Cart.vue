<template>
  <div v-if="filmCart[0]">
    <h3 class="pr-15">Totale carrello: {{ totalSpend }}</h3>
    <h3 class="pr-15">Totale film: {{ numberFilms }}</h3>
    <h3 class="pr-15" v-if="discount">Sconto applicato</h3>
    <button v-on:click="$emit('completa-acquisto')">Noleggia film</button>
    <div class="container-cart">
      <div class="container">
        <h1 class="pr-15">CART</h1>
      </div>
      <div class="container">
        <div
          class="card"
          @mouseleave="esciImgCarrello()"
          v-for="film in filmCart"
          :key="film.id"
        >
          <img
            v-if="activeFilmIdCart != film.id"
            @mouseover="passaSopraImgCarrello(film.id)"
            :src="`${urlImgBase}${film.poster_path}`"
            alt=""
          />

          <div v-if="activeFilmIdCart == film.id" class="scheda">
            <h4>Titolo: {{ film.original_title }}</h4>
            <h4>Data di uscita: {{ film.release_date }}</h4>
            <h4>Voto: {{ film.vote_average }}</h4>
          </div>
          <button @click="rimuoviFilmCarrello(film.id)">
            Rimuovi dal carrello
          </button>
          <!--           <button @click="removeFilmCart(film.id)">Rimuovi dal carrello</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cart",
  props: {
    totalSpend: Number,
    numberFilms: Number,
    discount: Boolean,
    filmCart: Array,
    urlImgBase: String,
    activeFilmIdCart: {
      type: Number,
      required: false,
      default: null,
    },
  },
  methods: {
    passaSopraImgCarrello(filmId) {
      this.$emit("passa-sopra-img-carrello", filmId);
    },
    esciImgCarrello() {
      this.$emit("esci-img-carrello");
    },
    rimuoviFilmCarrello(filmId) {
      this.$emit("rimuovi-film-carrello", filmId);
    },
  },
};
</script>
