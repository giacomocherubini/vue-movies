<template>
  <div>
    <nav class="navblack">
      <div class="container">
        <div class="row">
          <div class="col-3 d-none d-sm-block">
            <h2>MOVIES</h2>
          </div>
          <div
            class="col-12 col-sm-9 d-flex justify-content-between justify-content-sm-end"
          >
            <a class="nav-link" href="#">
              <router-link to="/home" active-class="active"
                ><a class="fas fa-home fa-lg"
                  ><span class="d-none d-md-inline pl-3">Home</span></a
                >
              </router-link>
            </a>
            <a class="nav-link" href="#">
              <router-link to="/favorites" active-class="active"
                ><a class="fas fa-heart fa-lg"
                  ><span class="d-none d-md-inline pl-3">Favorites</span></a
                >
              </router-link>
            </a>
            <a class="nav-link" href="#">
              <router-link to="/cart" active-class="active"
                ><a class="fas fa-shopping-cart fa-lg"
                  ><span class="d-none d-md-inline pl-3">Cart</span></a
                >
              </router-link>
            </a>
            <a class="nav-link" href="#">
              <router-link to="/rentals" active-class="active"
                ><a class="fas fa-shopping-bag fa-lg"
                  ><span class="d-none d-md-inline pl-3">Rentals</span>
                </a>
              </router-link>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "navigator",
  data() {
    return {};
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
.navblack {
  background-color: black;
}

.active a {
  color: rgb(146, 148, 248);
}
</style>