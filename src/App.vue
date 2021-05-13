<template>
  <div id="app">
    <navigator></navigator>
    <router-view />
  </div>
</template>


<script>
/* richiesta
DEVO AVERE UN CARRELLO IN CUI POSSO AGGIUGERE I FILM CHE VOGLIO COMPRARE OK   
I FILM CHE SONO DENTRO IL CARRELLO NON DEVONO AVERE IL BOTTONE AGGIUNGI A CARRELLO OK
MOSTRIAMO IL PREZZO TOTALE DEL CARRELLO DOVE OGNI FILM COSTA 5 EURO, SE ACQUISTO TRE O PIU FILM HO 5 EURO DI SCONTO OK
DEVO AVERE UNA LISTA NOLEGGIATI DOVE CI SARANNO TUTTI I FILM NOLEGGIATI ,QUANDO TERMINO L'ACQUISTO IL CARRELLO SI SVUOTA E I FILM FINISCONO NELLA LISTA NOLEGGIATI 
UN FILM CHE SI TROVA NELLA LISTA NOLEGGIATI DEVE POTER ESSERE RIMOSSO QUANDO VISTO 
MOSTRIAMO IL TOTALE DEI SINGOLI ACQUISTI 
SULLA LISTA PRINCIPALE DEI FILM UNA VOLTA NOLEGGIATO DEVE COMPARIRE UN TESTO CON SCRITTO NOLEGGIATO 

*/
/* import home from "./components/Home.vue"; */
/* import searchfilms from "./components/SearchFilms.vue"; */
/* import rental from "./components/Rentals.vue";
import cart from "./components/Cart.vue";
import favorite from "./components/Favorites.vue"; */
/* import foundmovies from "./components/FoundMovies.vue"; */
/* import { mapGetters, mapMutations } from "vuex"; */
/* import feature from "./components/FeatureTab.vue"; */
import navigator from "./components/Navigator.vue";

export default {
  name: "App",
  components: {
    navigator,
    /*     home, */
    /*     searchfilms, */
    /*     rental,
    cart,
    favorite, */
    /*     foundmovies, */
    /*     feature, */
  },
  data() {
    return {
      /*    api_key: "98b8b4576cbd2fa355ca9f0c79a15767",
      url_base: "https://api.themoviedb.org/3/search/movie?api_key=",
      url_img_base: "https://image.tmdb.org/t/p/w200",
      img_film: "", */
      /*       query: "", */
      /*       apiData: {}, */
      /*       isFetching: false,
      apiError: "",
      arrayfilms: [], */
      /* activeFilmId: null, */
      /*       activeFilmIdFavorite: null, */
      /*       activeFilmIdCart: null, */
      /*       favoriteFilm: [], */
      /*       filmCart: [], */
      /*       totalSpend: 0,
      discount: false,
      numberFilms: 0, */
      /*       rentedFilms: [], */
      /*       idFavoriteFilm: [], */
    };
  },

  /*   watch: {
    totalSpend: function () {
      if (this.numberFilms > 2 && this.discount == false) {
        this.totalSpend = this.totalSpend - 5;
        this.discount = true;
      } else if (this.numberFilms < 3 && this.discount == true) {
        this.discount = false;
        this.totalSpend = this.totalSpend + 5;
      }
    },
  }, */

  /*  methods: {
    /*   fetchfilms(e) {
      console.log(e);
      if (e.key == "Enter") {
        this.isFetching = true;
        fetch(`${this.url_base}${this.api_key}&query=${this.query}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            this.isFetching = false;
            this.apiData = data;
            this.arrayfilms = data.results;
            this.img_film = data.results.poster_path;
            console.log("immaginefilm", this.img_film);

            console.log("filmcercato", this.apiData);
          })
          .catch(() => {
            this.isFetching = false;
            this.apiError = "Qualcosa è andato storto";
          });
      }
    }, */
  /*     addFilm(film) {
      this.favoriteFilm.push(film);
    }, */

  /*     removeFilm(filmToDeleteId) {
      console.log("filmToDeleteId", filmToDeleteId);
      this.favoriteFilm = this.favoriteFilm.filter(function (item) {
        console.log("itemid", item.id);
        return filmToDeleteId != item.id;
      });
    }, */
  /*   addFilmCart(film) {
      this.filmCart.push(film);
      this.totalSpend = this.totalSpend + 5;
      this.numberFilms = this.numberFilms + 1;
      console.log("arrayfilmscarrello", this.filmCart);
      console.log("totalecarrello", this.totalSpend);
    },
    removeFilmCart(filmCartToDeleteId) {
      this.filmCart = this.filmCart.filter(function (item) {
        return filmCartToDeleteId != item.id;
      });
      this.totalSpend = this.totalSpend - 5;
      this.numberFilms = this.numberFilms - 1;
    },
    rentFilms() {
      this.rentedFilms = this.filmCart.map(function (item) {
        return item;
      });
      this.filmCart = [];
      console.log("film noleggiati", this.rentedFilms);
    },
    passaSopraImmagineCarrello(filmId) {
      this.activeFilmIdCart = filmId;
    },
    esciImmagineCarrello() {
      this.activeFilmIdCart = null;
    },
    passaSopraImmaginePreferiti(filmId) {
      this.activeFilmIdFavorite = filmId;
    },
    esciImmaginePreferiti() {
      this.activeFilmIdFavorite = null;
    },
    passaSopraImmagine(filmId) {
      this.activeFilmId = filmId;
    },
    esciImmagine() {
      this.activeFilmId = null;
    }, */
  /*   }, */
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
  font-family: "monterrat", sans-serif;
  background-image: url("../img/films2.jpg");
  min-height: 100vh;
  /*   width: 100%; */
  background-size: 100%;
  background-position: top;
  color: white;
}
</style>

