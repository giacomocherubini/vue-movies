<template>
  <div v-if="favoritesMovies[0]">
    <div class="container">
      <h1 class="pt-3">FAVORITE FILM</h1>
      <div
        class="my-card bg-black mt-5 overflow-hidden"
        v-for="film in favoritesMovies"
        :key="film.id"
      >
        <div class="row">
          <div class="col-7">
            <div class="row p-3">
              <div class="col-12">
                <img
                  v-if="activeMovieIdFavorite != film.id"
                  :src="`${urlImgBase}${film.poster_path}`"
                  alt=""
                  class="img-locandina"
                />
                <div class="d-inline-block pl-3">
                  <h3>{{ film.original_title }}</h3>
                  <h5 class="sky-blue">{{ film.release_date }}</h5>
                </div>
              </div>

              <div class="col-12">
                <p class="overview font-rem light-blue pt-3 overflow-hidden">
                  {{ film.overview }}
                </p>
              </div>
              <div class="col-12">
                <button
                  class="btn2 p-1 m-2"
                  @click="removeMovieFromFavorite(film.id)"
                >
                  Rimuovi dai preferiti
                </button>
                <button
                  class="btn2 p-1 m-2"
                  v-if="!isMovieInCart(film.id)"
                  @click="addToCart(film)"
                >
                  Aggiungi al carrello
                </button>
                <span
                  class="light-blue fas fa-shopping-cart fa-lg"
                  v-if="isMovieInCart(film.id)"
                ></span>
              </div>
            </div>
          </div>
          <div class="col-5 position-relative overflow-hidden">
            <img
              v-if="activeMovieIdFavorite != film.id"
              :src="`${urlImgBase}${film.backdrop_path}`"
              alt=""
              class="img-poster"
            />
            <div class="blur"></div>
          </div>
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
  },
};
</script>

<style scoped>
.img-poster {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: 100%;
}

.overflow-hidden {
  overflow: hidden;
}

.img-locandina {
  height: 120px;
}

.light-blue {
  color: #cfd6e1;
}

.btn2 {
  font-size: 10px;
  text-transform: uppercase;
  text-decoration: none;
  border: 1px solid rgb(146, 148, 248);
  color: #f4f4f4;
  background-color: black;
}

.btn2:hover {
  box-shadow: 1px 1px 25px 10px rgba(146, 148, 248, 0.4);
}

.bg-black {
  background-color: black;
}

.border-radius {
  border-radius: 100px;
}

.sky-blue {
  color: #9ac7fa;
}

.light-blue {
  color: #cfd6e1;
}
.body-shadow {
  box-shadow: inset 0px 0px 40px 40px rgba(56, 56, 56, 0.438);
}

.blur {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(to right, rgb(0, 0, 0) 1%, transparent 40%);
  display: inline-grid;
}

.font-rem {
  font-size: 1rem;
}

@media screen and (max-width: 767px) {
  .font-rem {
    font-size: 0.7rem;
  }
}

@media screen and (max-width: 575px) {
  .overview,
  .img-locandina {
    display: none;
  }
}
</style>