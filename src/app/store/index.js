import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import auth from "./Login.module";
import payment from "./Payments.module";
import transaction from "./Transaction.module";
import users from "./Users.module";
import admin from "./AdminTransaction.module";
import merchant from "./Merchant.module";
import consent from "./Consent.module";
import userProfile from "./UserProfile.module";
import Apikey from "./ApiKey.module"

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    auth: {},
    errors: null,
    user: {},
    permissions: null,
    role: null,
    token: null,
  };
};

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {},
  modules: {
    auth,
    payment,
    transaction,
    users,
    admin,
    merchant,
    consent,
    userProfile,
    Apikey
  },

  actions: {
    resetState: ({ commit }) => {
      commit("resetState");
    },
  },

  mutations: {
    resetState: (state) => {
      Object.assign(state, getDefaultState());
    },
  },
});
