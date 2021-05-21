<template>
  <div v-if="rentedMovies[0]" class="">
    <div class="container pb-3">
      <h1 class="p-3">RENTED</h1>
      <div class="mb-1 p-1" v-for="film in rentedMovies" :key="film.id">
        <div class="row bg-black mt-3 p-3 rounded-pill">
          <div class="col-2 pl-5">
            <img
              :src="`${urlImgBase}${film.poster_path}`"
              alt=""
              class="img-locandina"
            />
          </div>

          <div class="col-8 d-flex align-items-center">
            <h3 class="sky-blue">{{ film.original_title }}</h3>
          </div>
          <div class="col-2 d-flex align-items-center">
            <h3 class="">Prezzo 5€</h3>
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

.yellow {
  color: yellow;
}
</style>