// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'Vue'         //var Vue = require('./Vue')
import App from './App'
import router from './router'
import store from './store'
import qs from 'qs'
import 'element-ui/lib/theme-chalk/display.css';
import infiniteScroll from 'vue-infinite-scroll';


<<<<<<< HEAD
Vue.use(infiniteScroll)
Vue.use(ElementUI);
=======
Vue.use(ELEMENT);
>>>>>>> 17887f8b625746016b2507356e4501fba266b159
Vue.config.productionTip = false

Vue.prototype.ajax = axios;
Vue.prototype.qs = qs;

/* eslint-disable no-new */
 new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data : {

  }
})

