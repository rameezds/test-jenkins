import ApiService from "../../services/Api";
import * as types from "../../constants/Store";

import axios from "axios";

//states types
const state = {
  errors: null,
};

//getters types
const getters = {};

//actions types
const actions = {
  [types.CONSENT](context, data) {
    return new Promise((resolve, reject) => {
      ApiService.PostRequest("/consent-approve", data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },

  [types.LINK_EXPIRY](context, data) {
    return new Promise((resolve, reject) => {
      ApiService.PostRequest("/check-payouts-token", data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          // console.log("catch", res);
          reject(err);
        });
    });
  },
};

//mutations
const mutations = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
