// import Vue from "vue";
import Store from "../app/store/index";
// import VueRouter from "vue-router";
// Vue.use(VueRouter);


// const RouteService = {
//   routeGuard(to, from, next) {

  let RouteService = function routeGuard(to, from, next) {
    // console.log("param", param);
    // console.log("getUser", Store.getters.getRoleAndPermission);

    if (Store.state.auth.token) {
      next();
    } else {
      next("/signin");
    }
  }

// const router = new VueRouter({
 
//   RouteService,
// });
export default RouteService;