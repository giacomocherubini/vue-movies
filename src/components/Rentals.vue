<template>
  <div v-if="rentedFilms[0]" class="pr-15">
    <div class="container-rented">
      <div class="container">
        <h1 class="pr-15">RENTED</h1>
      </div>
      <div class="container">
        <div v-for="film in rentedFilms" :key="film.id">
          <h3>Titolo: {{ film.original_title }}</h3>
        </div>
      </div>
    </div>
    <!--     <button v-on:click="$emit('completa-acquisto')">Noleggia</button> -->
  </div>
</template>

<script>
export default {
  name: "rental",
  props: {
    rentedFilms: Array,
  },
};
</script>
