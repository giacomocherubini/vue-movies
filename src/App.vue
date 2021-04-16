<template>
  <div id="app">
    <searchmovies
      v-bind:search="query"
      v-on:change-input="
        query = $event.target.value;
        fetchfilms($event);
      "
    ></searchmovies>

    <!--         <div v-if="this.rentedFilms[0]" class="pr-15">
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
    </div> -->

    <rental :rentedFilms="this.rentedFilms"> </rental>

    <!-- sezione carrello   -->
    <cart
      :filmCart="this.filmCart"
      :totalSpend="this.totalSpend"
      :numberFilms="this.numberFilms"
      :discount="this.discount"
      @completa-acquisto="rentFilms"
      @esci-img-carrello="esciImmagineCarrello"
      @passa-sopra-img-carrello="passaSopraImmagineCarrello"
      @rimuovi-film-carrello="removeFilmCart"
      :activeFilmIdCart="this.activeFilmIdCart"
      :urlImgBase="this.url_img_base"
    ></cart>

    <!--     <div v-if="this.filmCart[0]">
      <h3 class="pr-15">Totale carrello: {{ this.totalSpend }}</h3>
      <h3 class="pr-15">Totale film: {{ this.numberFilms }}</h3>
      <h3 class="pr-15" v-if="discount">Sconto applicato</h3>
      <button @click="rentFilms()">Noleggia film</button>
      <div class="container-cart">
        <div class="container">
          <h1 class="pr-15">CART</h1>
        </div>
        <div class="container">
          <div
            class="card"
            @mouseleave="activeFilmIdCart = null"
            v-for="film in filmCart"
            :key="film.id"
          >
            <img
              v-if="activeFilmIdCart != film.id"
              @mouseover="activeFilmIdCart = film.id"
              :src="`${url_img_base}${film.poster_path}`"
              alt=""
            />

            <div v-if="activeFilmIdCart == film.id" class="scheda">
              <h4>Titolo: {{ film.original_title }}</h4>
              <h4>Data di uscita: {{ film.release_date }}</h4>
              <h4>Voto: {{ film.vote_average }}</h4>
            </div>
            <button @click="removeFilmCart(film.id)">
              Rimuovi dal carrello
            </button>
          </div>
        </div>
      </div>
    </div> -->

    <!-- sezione preferiti   -->
    <favorite
      :favoriteFilm="this.favoriteFilm"
      :activeFilmIdFavorite="this.activeFilmIdFavorite"
      @esci-img-preferiti="esciImmaginePreferiti"
      @passa-sopra-img-preferiti="passaSopraImmaginePreferiti"
      @rimuovi-film-dentro-preferiti="removeFilm"
      @aggiungi-film-dentro-carrello="addFilmCart"
      :urlImgBase="this.url_img_base"
    ></favorite>

    <!--     <div v-if="this.favoriteFilm[0]">
      <div class="container-favorite">
        <div class="container">
          <h1>FAVORITE FILM</h1>
        </div>
        <div class="container">
          <div
            class="card"
            @mouseleave="activeFilmIdFavorite = null"
            v-for="film in favoriteFilm"
            :key="film.id"
          >
            <img
              v-if="activeFilmIdFavorite != film.id"
              @mouseover="activeFilmIdFavorite = film.id"
              :src="`${url_img_base}${film.poster_path}`"
              alt=""
            />

            <div v-if="activeFilmIdFavorite == film.id" class="scheda">
              <h4>Titolo: {{ film.original_title }}</h4>
              <h4>Data di uscita: {{ film.release_date }}</h4>
              <h4>Voto: {{ film.vote_average }}</h4>
            </div>
            <button @click="removeFilm(film.id)">Rimuovi dai preferiti</button>
            <button @click="addFilmCart(film)">Aggiungi al carrello</button>
          </div>
        </div>
      </div>
    </div>
 -->
    <!-- sezione film ricercati   -->
    <p v-if="this.isFetching">sto caricando ....</p>
    <p v-if="this.apiError">{{ this.apiError }}</p>

    <foundmovies
      :apiData="this.apiData"
      :arrayFilms="this.arrayfilms"
      :urlImgBase="this.url_img_base"
      :activeFilmId="this.activeFilmId"
      @passa-sopra-img="passaSopraImmagine"
      @esci-img="esciImmagine"
      @aggiungi-film="addFilm"
      @aggiungi-film-dentro-carrello="addFilmCart"
    ></foundmovies>

    <!--     <div v-if="this.apiData.results">
      <div class="container">
        <div
          class="card"
          @mouseleave="activeFilmId = null"
          v-for="film in arrayfilms"
          :key="film.id"
        >
          <img
            v-if="activeFilmId != film.id"
            @mouseover="activeFilmId = film.id"
            :src="`${url_img_base}${film.poster_path}`"
            alt=""
          />

          <div v-if="activeFilmId == film.id" class="scheda">
            <h4>Titolo: {{ film.original_title }}</h4>
            <h4>Data di uscita: {{ film.release_date }}</h4>
            <h4>Voto: {{ film.vote_average }}</h4>
            <button @click="addFilm(film)">Aggiungi ai preferiti</button>
            <button @click="addFilmCart(film)">Aggiungi al carrello</button>
          </div>
        </div>

        <div v-if="heart">
          <img src="./assets/heart.png" alt="" />
        </div>

      </div>
    </div> -->
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

import searchmovies from "./components/SearchFilms.vue";
import rental from "./components/Rentals.vue";
import cart from "./components/Cart.vue";
import favorite from "./components/Favorites.vue";
import foundmovies from "./components/FoundMovies.vue";
/* import feature from "./components/FeatureTab.vue"; */

export default {
  name: "App",
  components: {
    searchmovies,
    rental,
    cart,
    favorite,
    foundmovies,
    /*     feature, */
  },
  data() {
    return {
      api_key: "98b8b4576cbd2fa355ca9f0c79a15767",
      url_base: "https://api.themoviedb.org/3/search/movie?api_key=",
      url_img_base: "https://image.tmdb.org/t/p/w200",
      img_film: "",
      query: "",
      apiData: {},
      isFetching: false,
      apiError: "",
      arrayfilms: [],
      activeFilmId: null,
      activeFilmIdFavorite: null,
      activeFilmIdCart: null,
      favoriteFilm: [],
      filmCart: [],
      totalSpend: 0,
      discount: false,
      numberFilms: 0,
      rentedFilms: [],
      /*       idFavoriteFilm: [], */
    };
  },
  watch: {
    totalSpend: function () {
      if (this.numberFilms > 2 && this.discount == false) {
        this.totalSpend = this.totalSpend - 5;
        this.discount = true;
      } else if (this.numberFilms < 3 && this.discount == true) {
        this.discount = false;
        this.totalSpend = this.totalSpend + 5;
      }
    },
  },

  methods: {
    fetchfilms(e) {
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
    },
    addFilm(film) {
      this.favoriteFilm.push(film);
      /*       this.idFavoriteFilm = film.id; */
      console.log("arrayfilms", this.favoriteFilm);
    },

    removeFilm(filmToDeleteId) {
      console.log("filmToDeleteId", filmToDeleteId);
      this.favoriteFilm = this.favoriteFilm.filter(function (item) {
        console.log("itemid", item.id);
        return filmToDeleteId != item.id;
      });
    },
    addFilmCart(film) {
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
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "monterrat", sans-serif;
  background-color: black;
  min-height: 100vh;
  padding: 25px;
  background-size: 100%;
  background-position: top;
  color: aqua;
}

.container,
.container-favorite,
.container-rented {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  border: 1px solid greenyellow;
}

.container-favorite {
  margin-bottom: 100px;
}

.card {
  border: 1px solid aqua;
  width: 25%;
  padding: 10px;
}

.pr-15 {
  padding-right: 15px;
}
button {
  margin: 5px;
}
</style>

