import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Favorites from '../components/Favorites.vue'
import Cart from '../components/Cart.vue'
import Rentals from '../components/Rentals.vue'

Vue.use(Router)

export default new Router({
    routes: [

        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/favorites',
            name: 'favorite',
            component: Favorites
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/rentals',
            name: 'rentals',
            component: Rentals
        }
    ]
}
);
