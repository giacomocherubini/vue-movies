<template>
  <div>
    <h5>{{ title }}</h5>
    <h5>{{ date }}</h5>
    <h5>{{ vote }}</h5>
  </div>
</template>

<script>
export default {
  name: "feature",
  props: {
    title: String,
    date: String,
    vote: String,
  },
};
</script>

<style scoped>
</style>