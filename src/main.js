import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import App from './App.vue'

Vue.use(Vuex)

Vue.config.productionTip = false

const searchMoviesModule = {
  namespaced: true,
  state: () => {
    return {
      api_key: "98b8b4576cbd2fa355ca9f0c79a15767",
      url_base: "https://api.themoviedb.org/3/search/movie?api_key=",
      url_img_base: "https://image.tmdb.org/t/p/w342",
      img_movie: "",
      query: "",
      apiData: {},
      isFetching: false,
      apiError: "",
      arrayMovies: [],
      activeMovieId: null,
    }
  },
  getters: {
    getApiKey: (state) => {
      return state.api_key
    },
    getUrlBase: (state) => {
      return state.url_base
    },
    getUrlImgBase: (state) => {
      return state.url_img_base
    },
    getImgMovie: (state) => {
      return state.img_movie
    },
    getQuery: (state) => {
      return state.query
    },
    getApiData: (state) => {
      return state.apiData
    },
    getIsFetching: (state) => {
      return state.isFetching
    },
    getApiError: (state) => {
      return state.apiError
    },
    getArrayMovies: (state) => {
      return state.arrayMovies
    },
    getActiveMovieId: (state) => {
      return state.activeMovieId
    }
  },
  mutations: {
    setQuery: (state, movieName) => {
      state.query = movieName
    },
    onFetchInit(state) {
      state.isFetching = true;
    },
    onFetchSuccess(state, moviesData) {
      state.apiData = moviesData;
      state.arrayMovies = moviesData.results;
      state.img_film = moviesData.results.poster_path;
      state.isFetching = false;
    },
    onFetchFailure(state, errorMessage) {
      state.isFetching = false;
      state.apiError = errorMessage;
    },
    setActiveMovieId(state, movieId) {
      state.activeMovieId = movieId;
    }
  },
  actions: {

    fetchFilms(context) {
      context.commit('onFetchInit')
      fetch(`${context.state.url_base}${context.state.api_key}&query=${context.state.query}`)
        .then(res => res.json())
        .then(data => {
          context.commit('onFetchSuccess', data)
        })
        .catch(error => {
          context.commit('onFetchFailure', error.message)
        })
    }
  }

}

const favoritesMoviesModule = {
  namespaced: true,
  state: () => {
    return {
      favoritesMovies: [],
      activeMovieIdFavorite: null,
    }
  },
  getters: {
    getFavoritesMovies(state) {
      return state.favoritesMovies
    },
    getActiveMovieIdFavorite(state) {
      return state.activeMovieIdFavorite
    },
  },
  mutations: {
    addMovieToFavorites(state, movie) {
      state.favoritesMovies.push(movie)
    },
    removeMovieFromFavorite(state, movieId) {
      const indexOfMovieInStateArray = state.favoritesMovies.map(item => item.id).indexOf(movieId);
      state.favoritesMovies.splice(indexOfMovieInStateArray, 1);
    },
    setActiveMovieId(state, movieId) {
      state.activeMovieIdFavorite = movieId;
    },
  }
}

const cartModule = {
  namespaced: true,
  state: () => {
    return {
      moviesCart: [],
      activeMovieIdCart: null,
    }
  },
  getters: {
    getCart(state) {
      return state.moviesCart
    },
    getActiveFilmIdCart(state) {
      return state.activeFilmIdCart
    },
    getAmountOfMoviesInCart(state) {
      return state.moviesCart.length
    },
    getTotalSpend(state, getters) {
      if (getters.getIsDiscountActive) {
        return (getters.getAmountOfMoviesInCart * 5) - 5
      }
      return getters.getAmountOfMoviesInCart * 5
    },
    getIsDiscountActive(state, getters) {
      return getters.getAmountOfMoviesInCart > 2
    }

  },
  mutations: {
    addMovieToCart(state, movie) {
      state.moviesCart.push(movie)
    },
    removeMovieFromCart(state, movieId) {
      const indexOfMovieInStateArray = state.moviesCart.map(item => item.id).indexOf(movieId);
      state.moviesCart.splice(indexOfMovieInStateArray, 1);
    },
    setActiveMovieId(state, movieId) {
      state.activeMovieIdCart = movieId;
    },
    removeAllMovieFromCart(state) {
      state.moviesCart = [];
    },

  }
}

const rentedMoviesModule = {
  namespaced: true,
  state: () => {
    return []
  },
  getters: {
    getRentedMovies: (state) => {
      return state
    }
  },
  mutations: {
    addMovieToRentals(state, movie) {
      state.push(movie)
    }
  },
}

const store = new Vuex.Store({
  modules: {
    searchMovies: searchMoviesModule,
    favoritesMovies: favoritesMoviesModule,
    cart: cartModule,
    rentedMovies: rentedMoviesModule,
  }
})

new Vue({
  store: store,
  router,
  render: h => h(App),
}).$mount('#app')