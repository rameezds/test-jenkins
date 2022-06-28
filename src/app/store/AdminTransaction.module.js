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
  // history table 
  [types.ADMIN_TRANSACTION](context, data) {
    console.log("api", data);
    return new Promise((resolve , reject) => {
      ApiService.GetRequest("http://localhost:3000/history")
        .then((response) => {
          resolve(response);
          
        })
        .catch((err) => {
          reject(err)
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