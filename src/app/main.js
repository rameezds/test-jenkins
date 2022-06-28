import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "../plugins/vuetify";
import VueAxios from "vue-axios";
import axios from "axios";
import css from "../common/styles/custom.scss";
import VueMask from "v-mask";
import AppService from "../services/Api";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(vuetify);
Vue.use(VueMask);

AppService.init();

new Vue({
  router,
  store,
  vuetify,
  VueAxios,
  axios,
  css,
  render: (h) => h(App),
}).$mount("#app");
