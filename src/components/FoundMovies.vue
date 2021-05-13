<template>
  <div>
    <p v-if="isFetching">sto caricando ....</p>
    <p v-if="apiError">{{ apiError }}</p>

    <div v-if="apiData.results">
      <div class="container">
        <div class="row">
          <div
            class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 p-1"
            v-for="film in arrayMovies"
            :key="film.id"
          >
            <div class="bg-black body-shadow my-card" @mouseleave="onImgExit()">
              <div class="wrapper">
                <img
                  class="img-fluid my-img"
                  v-if="activeMovieId != film.id"
                  @mouseover="onImgHover(film.id)"
                  :src="`${urlImgBase}${film.poster_path}`"
                  alt=""
                />

                <div v-if="activeMovieId == film.id" class="p-3">
                  <div class="card bg-black">
                    <div class="card-body">
                      <p class="card-text">
                        Titolo:
                        <span class="text-grey">
                          {{ film.original_title }}</span
                        >
                      </p>
                      <p class="card-text">
                        Data di uscita:
                        <span class="text-grey">{{ film.release_date }}</span>
                      </p>
                      <p class="card-text">
                        Voto:
                        <span class="text-grey">{{ film.vote_average }}</span>
                      </p>
                      <div class="d-flex justify-content-center">
                        <button
                          v-if="!isMovieInFavorite(film.id)"
                          @click="addToFavorites(film)"
                          class="btn p-2"
                        >
                          Aggiungi ai preferiti
                        </button>

                        <button
                          v-if="!isMovieInCart(film.id)"
                          @click="addToCart(film)"
                          class="btn p-2"
                        >
                          Aggiungi al carrello
                        </button>
                      </div>
                      <img
                        :src="`${urlImgBase}${film.backdrop_path}`"
                        class="img-fluid mt-3 body-shadow"
                        alt="..."
                      />
                    </div>
                  </div>

                  <div class="red col-12" v-if="isMovieInFavorite(film.id)">
                    &hearts;
                  </div>
                  <div class="col-12" v-if="isMovieInCart(film.id)">
                    Aggiunto nel carrello
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "foundmovies",
  computed: {
    ...mapGetters({
      apiData: "searchMovies/getApiData",
      arrayMovies: "searchMovies/getArrayMovies",
      favorites: "favoritesMovies/getFavoritesMovies",
      cart: "cart/getCart",
      activeMovieId: "searchMovies/getActiveMovieId",
      urlImgBase: "searchMovies/getUrlImgBase",
      isFetching: "searchMovies/getIsFetching",
      apiError: "searchMovies/getApiError",
    }),
  },
  methods: {
    ...mapMutations({
      addToFavorites: "favoritesMovies/addMovieToFavorites",
      addToCart: "cart/addMovieToCart",
      setActiveMovieId: "searchMovies/setActiveMovieId",
    }),
    onImgHover(filmId) {
      this.setActiveMovieId(filmId);
    },
    onImgExit() {
      this.setActiveMovieId(null);
    },
    isMovieInFavorite(id) {
      const moviesInFavoriteWithId = this.favorites.filter(function (film) {
        return id === film.id;
      });
      return moviesInFavoriteWithId.length === 1;
    },
    isMovieInCart(id) {
      const moviesInCartWithId = this.cart.filter(function (film) {
        return id === film.id;
      });
      return moviesInCartWithId.length === 1;
    },

    /*     passaSopraImg(filmId) {
      this.$emit("passa-sopra-img", filmId);
    },
    esciImg() {
      this.$emit("esci-img");
    }, */
  },
};
</script>

<style scoped>
.red {
  color: red;
  font-size: 30px;
}

.my-card {
  height: 420px;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid black;
  overflow: hidden;
}

.my-img {
  min-height: 100%;
  /*   min-width: 100%; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
}

.my-img2 {
  min-height: 100%;
  display: flex;
  justify-content: end;
  /*   min-width: 100%; */
  top: 0;
  right: 0;
  margin: auto;
}

.btn {
  font-size: 10px;
  color: #f4f4f4;
  text-transform: uppercase;
  text-decoration: none;
  border: 1px solid rgb(146, 148, 248);
  color: #f4f4f4;
}

.btn:hover {
  box-shadow: 1px 1px 25px 10px rgba(146, 148, 248, 0.4);
}

.bg-black {
  background-color: black;
}

.text-grey {
  color: grey;
}

/* .body-shadow {
  box-shadow: inset 0px 0px 40px 40px rgba(56, 56, 56, 0.438);
  opacity: 0.9;
} */

@media screen and (max-width: 575px) {
  .my-card {
    height: 400px;
  }
  .my-img {
    width: auto;
  }
}
</style>