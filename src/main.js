// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'Vue'         //var Vue = require('./Vue')
import App from './App'
import router from './router'
import store from './store'
import qs from 'qs'
import 'element-ui/lib/theme-chalk/display.css';
import infiniteScroll from 'vue-infinite-scroll';


Vue.use(ELEMENT);
Vue.config.productionTip = false

Vue.prototype.ajax = axios;
Vue.prototype.qs = qs;

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data : {

  },
  computed:{
    userPhoneNumber(){
      return store.state.userPhoneNumber;
    },
  }  
});
console.log(store.state.userPhoneNumber)
console.log(this)
