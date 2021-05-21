<template>
  <div id="app">
    <navigator></navigator>
    <router-view />
  </div>
</template>


<script>
import navigator from "./components/Navigator.vue";

export default {
  name: "App",
  components: {
    navigator,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
}

#app {
  font-family: "Montserrat", sans-serif;
  background-image: url("../img/kodi.jpg");
  min-height: 100vh;
  background-size: 100%;
  background-position: top;
  color: white;
}
</style>

