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
  [types.API_KEY_DATA](context, data) {
    console.log("API_KEY_DATA", data);
    return new Promise((resolve ,reject) => {
      ApiService.PostRequest("/users" , data)
        .then((response) => {
          resolve(response);
          
        })
        .catch((err) => {
            reject(err)
        //   console.log("catch", res);
        });
    });
  },
  // VERIFY_PASSWORD 
  [types.VERIFY_PASSWORD](context, data) {
    console.log("API_KEY_DATA", data);
    return new Promise((resolve ,reject) => {
      ApiService.PostRequest("/api-key", data)
        .then((response) => {
          resolve(response);
          
        })
        .catch((err) => {
            reject(err)
        //   console.log("catch", res);
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