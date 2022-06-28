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
  [types.UPDATE_PASSWORD](context, data) {
    return new Promise((resolve, reject) => {
      ApiService.PostRequest("/change-password", data)
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