// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'         //var Vue = require('./Vue')
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
<<<<<<< HEAD
=======
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
>>>>>>> a8784f5b72640b65e61278a1f69a7478b8c48357


Vue.use(ElementUI);
Vue.config.productionTip = false

<<<<<<< HEAD
Vue.prototype.ajax=axios;
Vue.prototype.qs=qs;
=======
Vue.prototype.ajax = axios;
Vue.prototype.qs = qs;
// Vue.prototype.ajax = axios;
>>>>>>> a8784f5b72640b65e61278a1f69a7478b8c48357

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data : {

  }
})

