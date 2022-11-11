import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import DiscoverView from '../views/Discover/DiscoverView.vue'
import MyView from '../views/My/MyView.vue'
import SearchView from '../views/Search/SearchView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  // /dist/index.html
  // {
  //   path: '/dist/index.html',
  //   redirect: '/home'
  // },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      keep: true
    }
  },
  {
    path: '/discover',
    name: 'discover',
    component: DiscoverView,
    meta: {
      keep: true
    }
  },
  {
    path: '/my',
    name: 'my',
    component: MyView,
    meta: {
      keep: false
    }
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
    meta: {
      keep: false
    }
  },
  {
    path: '/search/artist',
    name: 'artist',
    component: () => import('@/views/Search/ArtistView.vue'),
    meta: {
      keep: false,
      hidden: true
    },
  },
  {
    path: '/search/artist/mv/:id',
    name: 'mv',
    component: () => import('@/views/Search/MvView.vue'),
    meta: {
      keep: false,
      hidden: true,
      hiddenCol: true
    }
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
