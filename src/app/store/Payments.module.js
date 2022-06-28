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
  [types.UPLOAD_CSV](context, data) {
    return new Promise((resolve, reject) => {
      ApiService.PostRequest("/upload-transactions", data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  [types.GET_BATCH_TRANSACTION](context, data) {
    return new Promise((resolve, reject) => {
      // ApiService.PostRequest("/execute-batch-payout", data)
      ApiService.PostRequest("/get-batch-transactions", data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  [types.BATCH](context, data) {
    return new Promise((resolve, reject) => {
      ApiService.PostRequest("/batch", data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  [types.DELETE_BATCH](context, data) {
    return new Promise((resolve, reject) => {
      ApiService.PostRequest("/delete-batch", data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  [types.EXECUTE_BATCH_PAYOUT](context, data) {
    return new Promise((resolve, reject) => {
      ApiService.PostRequest("/execute-batch-payout", data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  [types.USER_ACCOUNT_BALANCE](context, data) {
    return new Promise((resolve, reject) => {
      ApiService.PostRequest("/user-account-balance", data)
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