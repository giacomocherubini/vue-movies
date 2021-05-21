<template>
  <div>
    <div v-if="apiData.results">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <p v-if="isFetching">sto caricando ....</p>
            <p v-if="apiError">{{ apiError }}</p>
          </div>

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
                        <span class="light-blue">
                          {{ film.original_title }}</span
                        >
                      </p>
                      <p class="card-text">
                        Data di uscita:
                        <span class="light-blue">{{ film.release_date }}</span>
                      </p>
                      <p class="card-text">
                        Voto:
                        <span class="light-blue">{{ film.vote_average }}</span>
                      </p>
                      <img
                        :src="`${urlImgBase}${film.backdrop_path}`"
                        class="img-fluid mt-3 body-shadow"
                        alt="..."
                      />
                      <div class="mt-4 d-flex justify-content-center">
                        <button
                          v-if="!isMovieInFavorite(film.id)"
                          @click="addToFavorites(film)"
                          class="btn p-2"
                        >
                          Aggiungi ai preferiti
                        </button>
                        <div
                          class="p-2 red fas fa-heart fa-lg"
                          v-if="isMovieInFavorite(film.id)"
                        ></div>
                        <button
                          v-if="!isMovieInCart(film.id)"
                          @click="addToCart(film)"
                          class="btn p-2"
                        >
                          Aggiungi al carrello
                        </button>
                        <div
                          class="p-2 light-blue fas fa-shopping-cart fa-lg"
                          v-if="isMovieInCart(film.id)"
                        ></div>
                      </div>
                    </div>
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
  },
};
</script>

<style scoped>
.red {
  color: red;
}

.light-blue {
  color: #cfd6e1;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  width: 100%;
}

.my-img2 {
  min-height: 100%;
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  margin: auto;
}

.btn {
  font-size: 10px;
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

.border-radius {
  border-radius: 5px;
}

@media screen and (max-width: 575px) {
  .my-card {
    height: 400px;
  }
  .my-img {
    width: auto;
  }
}
</style>