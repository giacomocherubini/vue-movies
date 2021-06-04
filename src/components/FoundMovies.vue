<template>
  <div>
    <div v-if="apiData.results">
      <div class="container pb-5">
        <div class="row">
          <div class="col-12 text-center">
            <p v-if="isFetching">sto caricando ....</p>
            <p v-if="apiError">{{ apiError }}</p>
          </div>

          <div
            class="col-6 col-sm-6 col-md-4 col-lg-3 mb-3 p-1 cr"
            v-for="film in arrayMovies"
            :key="film.id"
          >
            <div
              class="bg-black my-card d-flex justify-content-center"
              @mouseleave="onImgExit()"
            >
              <div class="wrapper">
                <img
                  class="img-fluid my-img"
                  v-if="activeMovieId != film.id"
                  @mouseover="onImgHover(film.id)"
                  :src="`${urlImgBase}${film.poster_path}`"
                  alt=""
                />

                <div
                  v-if="activeMovieId == film.id"
                  class="p-3 d-flex justify-content-center"
                >
                  <div class="card bg-black">
                    <div class="card-body">
                      <p class="card-text">
                        <span class="light-blue original-title">
                          {{ film.original_title }}</span
                        >
                      </p>
                      <p class="card-text release-date">
                        Release date:
                        <span class="light-blue">{{ film.release_date }}</span>
                      </p>
                      <p class="card-text rating">
                        Rating:
                        <span class="light-blue">{{ film.vote_average }}</span>
                      </p>
                      <img
                        :src="`${urlImgBase}${film.backdrop_path}`"
                        class="img-fluid mt-3 body-shadow img-backdrop"
                        alt="..."
                      />
                      <div class="mt-4 d-flex justify-content-center">
                        <button
                          v-if="!isMovieInFavorite(film.id)"
                          @click="addToFavorites(film)"
                          class="btn text-white p-2 rounded-pill mr-1 fas fa-heart fa-lg"
                        ></button>
                        <button
                          class="btn p-2 rounded-pill red mr-1 fas fa-heart fa-lg"
                          v-if="isMovieInFavorite(film.id)"
                          @click="removeMovieFromFavorite(film.id)"
                        ></button>
                        <button
                          v-if="!isMovieInCart(film.id)"
                          @click="addToCart(film)"
                          class="btn text-white p-2 rounded-pill ml-1 fas fa-cart-plus fa-lg"
                        ></button>
                        <button
                          v-if="isMovieInCart(film.id)"
                          @click="removeMovieFromCart(film.id)"
                          class="btn p-2 rounded-pill light-blue ml-1 fas fa-shopping-cart fa-lg"
                        ></button>
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
      removeMovieFromCart: "cart/removeMovieFromCart",
      removeMovieFromFavorite: "favoritesMovies/removeMovieFromFavorite",
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
.cr {
  transition: transform 0.8s ease-in-out;
}
.cr:hover {
  transform: scale(1.06);
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
  text-transform: uppercase;
  text-decoration: none;
  border: 2px solid rgb(146, 148, 248);
}

.btn:hover {
  box-shadow: 1px 1px 25px 10px rgba(146, 148, 248, 0.4);
}

.bg-black {
  background-color: black;
}

@media screen and (max-width: 525px) {
  .my-card {
    height: 370px;
  }
}

@media screen and (max-width: 475px) {
  .my-card {
    height: 340px;
  }
}

@media screen and (max-width: 414px) {
  .my-card {
    height: 300px;
  }
}

@media screen and (max-width: 365px) {
  .my-card {
    height: 275px;
  }

  .original-title {
    font-size: 0.6rem;
  }

  .rating {
    display: none;
  }
}

@media screen and (max-width: 320px) {
  .my-card {
    height: 250px;
  }
  .release-date {
    display: none;
  }
}

@media screen and (max-width: 280px) {
  .my-card {
    height: 220px;
  }
}

@media screen and (max-width: 575px) {
  .my-img {
    height: 100%;
    width: auto;
    max-width: none;
  }
  .img-backdrop {
    display: none;
  }

  .release-date {
    display: none;
  }
}

@media screen and (min-width: 576px) and (max-width: 767px) {
  .card-body {
    font-size: 0.8rem;
  }

  .my-card {
    height: 400px;
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .my-card {
    height: 360px;
  }
  .card-body {
    font-size: 0.75rem;
  }
}

@media screen and (min-width: 992px) and (max-width: 1199px) {
  .card-body {
    font-size: 0.8rem;
  }
  .my-card {
    height: 360px;
  }
}
</style>