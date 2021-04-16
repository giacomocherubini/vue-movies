<template>
  <div v-if="apiData.results">
    <div class="container">
      <div
        class="card"
        @mouseleave="esciImg()"
        v-for="film in arrayFilms"
        :key="film.id"
      >
        <img
          v-if="activeFilmId != film.id"
          @mouseover="passaSopraImg(film.id)"
          :src="`${urlImgBase}${film.poster_path}`"
          alt=""
        />

        <div v-if="activeFilmId == film.id" class="scheda">
          <h4>Titolo: {{ film.original_title }}</h4>
          <h4>Data di uscita: {{ film.release_date }}</h4>
          <h4>Voto: {{ film.vote_average }}</h4>
          <button @click="$emit('aggiungi-film', film)">
            Aggiungi ai preferiti
          </button>
          <button @click="$emit('aggiungi-film-dentro-carrello', film)">
            Aggiungi al carrello
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "moundmovies",
  props: {
    apiData: Object,
    arrayFilms: Array,
    urlImgBase: String,
    activeFilmId: {
      type: Number,
      required: false,
      default: null,
    },
  },
  methods: {
    passaSopraImg(filmId) {
      this.$emit("passa-sopra-img", filmId);
    },
    esciImg() {
      this.$emit("esci-img");
    },
  },
};
</script>