import { createStore } from "vuex";
import router from "../router/index";
import axios from "axios";
const state = {
  isUserLoggedIn: "",
  loggedInUserId: "",
  numOfCategories: "",
  listOfCategories: [],
  listOfLocations: [],
  listOfItems: [],
};
const getters = {};
const mutations = {
  redirectTO(state, payload) {
    router.push({ name: payload });
  },
  isLoggedInUser(state) {
    let user = localStorage.getItem("user-info");
    if (user) {
      state.isUserLoggedIn = true;
      state.loggedInUserId = JSON.parse(user).id;
    } else {
      state.isUserLoggedIn = true;
    }
  },
  async displayAllCategories(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/categories?userId=${payload.userIdIs}&locationId=${payload.locationIdIs}`
    );

    if (result.status == 200) {
      state.listOfCategories = result.data;
      state.numOfCategories = state.listOfCategories.length;
    }
  },
  async canUserAccessThisLocation(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/locations?userId=${payload.userIdIs}&id=${payload.locationIdIs}`
    );
    if (result.status == 200) {
      state.listOfLocations = result.data;
      if (state.listOfLocations.length !== 1) {
        this.commit("redirectTO", payload.redirectTOPage);
        // console.log(state.listOfLocations);
      }
    }
  },
  async canUserAccessThisCategory(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/categories?userId=${payload.userIdIs}&locationId=${payload.locationIdIs}&id=${payload.catIdIs}`
    );
    if (result.status == 200) {
      state.listOfCategories = result.data;
      if (state.listOfCategories.length !== 1) {
        this.commit("redirectTO", payload.redirectTOPage);
      }
    }
  },
  async canUserAccessThisItem(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/items?userId=${payload.userIdIs}&locId=${payload.locationIdIs}&id=${payload.itemIdIs}`
    );
    if (result.status == 200) {
      state.listOfItems = result.data;
      if (state.listOfItems.length < 1) {
        this.commit("redirectTO", payload.redirectTOPage);
      }
    }
  },
};
const actions = {
  redirectTO({ commit }, payload) {
    commit("redirectTO", payload.val);
  },
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
