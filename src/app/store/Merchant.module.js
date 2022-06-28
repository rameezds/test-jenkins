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
  // Merchant table 
  [types.MERCHANT_DATA](context, data) {
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
  
  // MERCHANT_STATUS
  [types.MERCHANT_STATUS](context, data) {
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

  // ADD_MERCHANT
  [types.ADD_MERCHANT](context, data) {
    return new Promise((resolve, reject) => {
      ApiService.PostRequest("/create-user", data)
        .then((response) => {
          resolve(response);
          
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // DELETE_BRAND 
  [types.DELETE_BRAND](context, data) {
    return new Promise((resolve, reject) => {
      ApiService.PostRequest("/delete-user", data)
        .then((response) => {
          resolve(response);
          
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // EDIT_BRAND_DETAILS
  [types.EDIT_BRAND_DETAILS](context, data) {
    return new Promise((resolve, reject) => {
      ApiService.PostRequest("/update-brand", data)
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