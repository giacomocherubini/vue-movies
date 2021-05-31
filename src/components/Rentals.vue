<template>
  <div v-if="rentedMovies[0]" class="">
    <div class="container pb-3">
      <h1 class="p-3">RENTED</h1>
      <div class="mb-1 p-1" v-for="film in rentedMovies" :key="film.id">
        <div class="row rented bg-black mt-3 p-4 rounded-pill">
          <div class="col-sm-3 col-lg-2 container-img pl-5">
            <img
              :src="`${urlImgBase}${film.poster_path}`"
              alt=""
              class="img-locandina"
            />
          </div>

          <div
            class="col-6 col-sm-6 col-md-7 col-lg-8 d-flex align-items-center"
          >
            <h5 class="sky-blue">{{ film.original_title }}</h5>
          </div>
          <div
            class="col-6 col-sm-3 col-md-2 col-lg-2 d-flex align-items-center justify-content-end"
          >
            <h5 class="">Price 5€</h5>
          </div>
        </div>
      </div>
    </div>

    <!--     <button v-on:click="$emit('completa-acquisto')">Noleggia</button> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "rental",
  computed: {
    ...mapGetters({
      rentedMovies: "rentedMovies/getRentedMovies",
      urlImgBase: "searchMovies/getUrlImgBase",
    }),
  },
};
</script>

<style scoped>
.img-locandina {
  height: 120px;
}

.bg-black {
  background: rgba(0, 0, 0, 0.5);
}

.sky-blue {
  color: #9ac7fa;
}

@media screen and (max-width: 575px) {
  .container-img {
    display: none;
  }
}
</style>