import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Transaction from "../components/Transactions/BatchTransaction.vue";
import TransactionHistory from "../components/AdminHistory/AdminHistory.vue";

import Overview from "../components/OverView/OverView.vue";
import Payments from "../components/Payments/Payments.vue";
import User from "../components/User/User.vue";
import UserProfile from "../components/UserProfile/UserProfile.vue";
import Admin from "../components/AdminHistory/AdminHistory.vue";
import Roles from "../components/RolesPermission/Roles.vue";
import Merchant from "../components/Merchant/Merchant.vue";
import ApiKey from "../components/ApiKey/ApiKey.vue";

import Store from "../store/index.js";
import RouteService from "../../services/RouteGuard";

Vue.use(VueRouter);

// functiono, from, next) {
//   console.log("getUser", Store.state.auth.token);

//   if (Store.state.auth.token) {
//     next();
//   } else {
//     next("/signin");
//   }
// }

const routes = [
  {
    path: "/signin",
    name: "Signin",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "signin" */ "../views/SignIn.vue"),
    beforeEnter: (to, from, next) => {
      // console.log(RouteService, "RouteService")
      if (localStorage.getItem("token") && Store.state.auth.token) {
        next("/transactions");
      } else {
        next();
      }
    },
  },
  {
    path: "/forgot-password",
    name: "Forgot-Password",
    component: () =>
      import(
        /* webpackChunkName: "forgot-password" */ "../views/ForgetPassword.vue"
      ),
  },
  {
    path: "/new-password/:token/:email",
    // path: "/new-password",
    name: "New-Password",
    component: () =>
      import(/* webpackChunkName: "new-password" */ "../views/NewPassword"),
  },
  {
    path: "/password-success",
    name: "Password-reset-successfully",
    component: () =>
      import(
        /* webpackChunkName: "password-success" */ "../views/PasswordSuccess.vue"
      ),
  },
  {
    path: "/consent-approve",
    name: "Consent Approve",
    component: () =>
      import(
        /* webpackChunkName: "consent-approve" */ "../components/Consent/Consent.vue"
      ),
  },
  {
    path: "/",
    component: Dashboard,
    redirect: "/payments",
    children: [
      {
        path: "transactions",
        component: Transaction,
        name: "transactions",
        // beforeEnter: RouteService("hi"),
        beforeEnter: RouteService,
      },
      {
        path: "transactions-history",
        component: TransactionHistory,
        name: "Transactions History",
        beforeEnter: RouteService,
      },
      {
        path: "overview",
        component: Overview,
        name: "overview",
      },
      {
        path: "payments",
        component: Payments,
        name: "payments",
        beforeEnter: RouteService,
      },
      {
        path: "users",
        component: User,
        name: "users",
        beforeEnter: RouteService,
      },
      {
        path: "admin",
        component: Admin,
        name: "admin",
        beforeEnter: RouteService,
      },
      {
        path: "roles",
        component: Roles,
        name: "roles",
        beforeEnter: RouteService,
      },
      {
        path: "merchant",
        component: Merchant,
        name: "merchant",
        beforeEnter: RouteService,
      },
      {
        path: "Api-Key",
        component: ApiKey,
        name: "Api-Key",
        beforeEnter: RouteService,
      },
      {
        path: "user-profile",
        component: UserProfile,
        name: "User Profile",
        beforeEnter: RouteService,
      },
    ],
  },
  // Redirect for 404 not found
  {
    path: "*",
    component: Dashboard,
    redirect: "google.com",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
