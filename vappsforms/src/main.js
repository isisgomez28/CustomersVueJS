// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Products from './components/Products'
import NewProduct from './components/NewProduct'
import About from './components/About'

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', component: Products},
    {path: '/about', component: About},
    {path: '/newproduct', component: NewProduct}
  ]
})

/* eslint-disable no-new */
new Vue({
  router,
  template: `
    <div id="app">
      <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 class="my-0 mr-md-auto font-weight-normal">Inventory App</h5>
        <nav class="my-2 my-md-0 mr-md-3">
          <router-link to="/" class="p-2 text-dark">Home</router-link>
          <router-link to="/about" class="p-2 text-dark">About</router-link>
        </nav>
        <router-link to="/newproduct" class="btn btn-outline-primary">New Product</router-link>
      </div>      
      <router-view></router-view>
    </div>
  `
}).$mount('#app')
