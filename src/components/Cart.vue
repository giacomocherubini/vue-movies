<template>
  <div>
    <div v-if="moviesCart.length == 0" class="container text-center mt-5 py-5">
      <h1>YOUR CART IS EMPTY</h1>
    </div>
    <div v-else class="container py-3 pb-3">
      <h1>CART</h1>
      <div class="row my-5 py-3 cart-recap bg-black">
        <div
          class="
            col-12 col-md-3
            mb-4 mb-md-0
            confirm
            d-flex
            justify-content-center
            text-black
          "
        >
          <router-link class="d-block w-100" to="/rentals"
            ><button
              class="btn btn-rent d-block w-100 text-white rounded-pill"
              v-on:click="confirmCart()"
            >
              Rent movies
            </button>
          </router-link>
        </div>

        <div
          class="
            col-3 col-md-3
            d-flex
            justify-content-center
            align-items-center
          "
        >
          <h5 class="fas fa-film pr-2"></h5>
          <h5 class="d-none d-lg-inline">Total movies</h5>
          <h5 class="pl-2">{{ numberFilms }}</h5>
        </div>

        <div
          class="
            col-6 col-md-3
            d-flex
            justify-content-center
            align-items-center
          "
        >
          <h5 class="fas fa-money-bill-wave pr-2"></h5>
          <h5 class="d-none d-lg-inline">Total price</h5>
          <h5 class="pl-2">{{ totalSpend }} €</h5>
        </div>

        <div
          class="
            col-3 col-md-3
            d-flex
            justify-content-center
            align-items-center
          "
        >
          <h5
            class="fas fa-tags fas fa-check pr-2"
            v-if="isDiscountActive"
          ></h5>
          <h5 class="d-none d-lg-inline" v-if="isDiscountActive">
            Discount applied
          </h5>
        </div>
      </div>
      <div class="row">
        <div
          class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 p-1"
          @mouseleave="onImgExit()"
          v-for="film in moviesCart"
          :key="film.id"
        >
          <div class="my-card bg-black">
            <div
              class="
                wrapper
                d-flex
                flex-column
                justify-content-end
                overflow-hidden
              "
            >
              <img
                v-if="activeMovieIdCart != film.id"
                @mouseover="onImgHover(film.id)"
                :src="`${urlImgBase}${film.poster_path}`"
                alt=""
                class="img-movie"
              />

              <div class="container bg-white py-2 z-index-100">
                <div class="row">
                  <div class="col-12">
                    <h5 class="font-weight-bold truncate">
                      {{ film.original_title }}
                    </h5>
                  </div>
                  <div class="col-6">
                    <h6 class="font-weight-bold">Price: 5€</h6>
                  </div>
                  <div class="col-6 d-flex justify-content-end">
                    <h6 class="bg-black text-white p-1">
                      <span class="fas fa-star text-yellow"></span>
                      {{ film.vote_average }}
                    </h6>
                  </div>
                  <button
                    class="btn btn-remove ml-3 text-black rounded-pill"
                    @click="removeMovieFromCart(film.id)"
                  >
                    Remove from cart
                  </button>
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
      removeAllMovieFromCart: "cart/removeAllMovieFromCart",
      setActiveMovieId: "cart/setActiveMovieId",
    }),
    onImgHover(filmId) {
      this.setActiveMovieId(filmId);
    },
    onImgExit() {
      this.setActiveMovieId(null);
    },
    confirmCart() {
      this.moviesCart.forEach((element) => {
        this.addMovieToRentals(element);
        this.removeAllMovieFromCart();
      });
    },
  },
};
</script>

<style scoped>
.my-card {
  color: black;
  transition: transform 0.7s ease-in-out;
  height: 520px;
}
.my-card:hover {
  transform: scale(1.05);
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid black;
  overflow: hidden;
}

.img-movie {
  max-width: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: auto;
}

.btn-rent,
.btn-remove {
  font-size: 18px;
  text-transform: uppercase;
  text-decoration: none;
  border: 2px solid rgb(146, 148, 248);
}

.btn-remove {
  font-size: 12px;
}

.btn:hover {
  box-shadow: 1px 1px 25px 10px rgba(146, 148, 248, 0.4);
  background-color: rgba(146, 148, 248, 0.4);
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.z-index-100 {
  z-index: 100;
}
.text-yellow {
  color: yellow;
}

.text-white {
  color: white;
}
.text-black {
  color: black;
}
.bg-black {
  background-color: black;
}

.bg-white {
  background-color: white;
}

.text-grey {
  color: grey;
}

.border-radius {
  border-radius: 5px;
}

.cart-recap h5 {
  margin-bottom: 0;
}

@media screen and (max-width: 1199px) {
  .my-card {
    height: 460px;
  }
}

@media screen and (max-width: 767px) {
  .my-card {
    height: 500px;
  }
}

@media screen and (max-width: 575px) {
  .my-card {
    height: 900px;
  }
  .img-movie {
    height: 800px;
  }
  .confirm {
    padding-bottom: 20px;
  }
}

@media screen and (max-width: 525px) {
  .my-card {
    height: 850px;
  }
  .img-movie {
    height: 750px;
  }
}

@media screen and (max-width: 475px) {
  .my-card {
    height: 800px;
  }
  .img-movie {
    height: 700px;
  }
}

@media screen and (max-width: 425px) {
  .my-card {
    height: 740px;
  }
  .img-movie {
    height: 630px;
  }
}

@media screen and (max-width: 375px) {
  .my-card {
    height: 665px;
  }
  .img-movie {
    height: 550px;
  }
}

@media screen and (max-width: 325px) {
  .my-card {
    height: 585px;
  }
  .img-movie {
    height: 470px;
  }
}

@media screen and (max-width: 280px) {
  .my-card {
    height: 500px;
  }
  .img-movie {
    height: 400px;
  }
}
</style>