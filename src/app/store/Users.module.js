import ApiService from "../../services/Api";
import * as types from "../../constants/Store";

//states types
const state = {
  errors: null,
};

//getters types
const getters = {};

//actions types
const actions = {
  [types.USER_DATA](context, data) {
    return new Promise((resolve, reject) => {
      ApiService.PostRequest("/users", data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // INVITE USER
  [types.INVITE_USER](context, data) {
    return new Promise((resolve, reject) => {
      ApiService.PostRequest("/invite-user", data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // USER_STATUS
  [types.USER_STATUS](context, data) {
    return new Promise((resolve, reject) => {
      ApiService.PostRequest("/change-user-status", data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
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
