<template>
  <div v-if="favoriteFilm[0]">
    <div class="container-favorite">
      <div class="container">
        <h1>FAVORITE FILM</h1>
      </div>
      <div class="container">
        <div
          class="card"
          @mouseleave="esciImgPreferiti()"
          v-for="film in favoriteFilm"
          :key="film.id"
        >
          <img
            v-if="activeFilmIdFavorite != film.id"
            @mouseover="passaSopraImgPreferiti(film.id)"
            :src="`${urlImgBase}${film.poster_path}`"
            alt=""
          />

          <div v-if="activeFilmIdFavorite == film.id" class="scheda">
            <h4>Titolo: {{ film.original_title }}</h4>
            <h4>Data di uscita: {{ film.release_date }}</h4>
            <h4>Voto: {{ film.vote_average }}</h4>
          </div>
          <button @click="$emit('rimuovi-film-dentro-preferiti', film.id)">
            Rimuovi dai preferiti
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
  name: "favorite",
  props: {
    favoriteFilm: Array,
    urlImgBase: String,
    activeFilmIdFavorite: {
      type: Number,
      required: false,
      default: null,
    },
  },
  methods: {
    passaSopraImgPreferiti(filmId) {
      this.$emit("passa-sopra-img-preferiti", filmId);
    },
    esciImgPreferiti() {
      this.$emit("esci-img-preferiti");
    },
  },
};
</script>
