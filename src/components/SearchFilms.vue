<template>
  <div>
    <input
      class="search_input"
      v-bind:value="search"
      v-on:keypress="$emit('change-input', $event)"
    />
  </div>
</template>

<script>
export default {
  name: "searchmovies",
  props: {
    search: { type: String },
  },
};
</script>

<style scoped>
.search_input {
  width: 30%;
}
</style>