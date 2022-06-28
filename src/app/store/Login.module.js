import ApiService from "../../services/Api";
import * as types from "../../constants/Store";

//states types
const state = {
  errors: null,
  user: {},
  permissions: null,
  role: null,
  token: null,

  title: "",
  sideBar: null,
};

//getters types
const getters = {
  getUser(state) {
    return state.user;
  },

  getRoleAndPermission(state) {
    return { role: state.role, permission: state.permissions };
  },
};

//actions types
const actions = {
  [types.LOGIN]({commit}, data) {
    return new Promise((resolve, reject) => {
      ApiService.PostRequest("/login", data)
        .then((response) => {
          localStorage.setItem("token", response.data.accessToken);
          commit(types.LOGIN, response.data);
          resolve(response);
        })
        .catch((err) => {
          reject(err)
          // console.log("catch", err.response);
          
        });
    });
  },

  [types.FORGOT_PASSWORD](context,data) {
    return new Promise((resolve, reject) => {
      console.log(data, "mydata")
      ApiService.PostRequest("/forgot-password", data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },

  [types.NEW_PASSWORD](context,data) {
    return new Promise((resolve) => {
      ApiService.PostRequest("/set-password", data)
        .then((response) => {
          resolve(response);
        })
        .catch((res) => {
          console.log("catch", res);
        });
    });
  },

  setSideBarItem({ commit }, payload) {
    commit("setSideBarItem", payload);
  },
};

//mutations
const mutations = {
  [types.LOGIN](state, data) {
    state.user = data.user;
    state.permissions = data.rolesWithPermission.permissions;
    state.role = data.user.roles;
    state.token = data.accessToken;
    state.errors = {};
  },

  setSideBar(state, data) {
    // state.dashboardRoute = data.dashboard;
    state.sideBar = data.items;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
