import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import mixins from "../mixins";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    apiResponse: null,
    allFomoTypes: null,
    fomoId: null,
    fomoType: null,
    fomoData: null,
    fomoTemplates: null,
    fomoVariables: null,
    fomoClanData: null,
    fomoReady: false,
    reviewData: null,
  },
  mutations: {
    toggleLoader: (state, payload) => {
      state.loading = payload;
    },
    toggleFomoReady: (state, payload) => {
      state.fomoReady = payload;
    },
    updateApiResponse: (state, payload) => {
      state.apiResponse = payload;
    },
    updateFomoId: (state, payload) => {
      state.fomoId = payload;
    },
    updateAllFomoTypes: (state, payload) => {
      state.allFomoTypes = payload;
    },
    updateFomoType: (state, payload) => {
      state.fomoType = payload;
    },
    updateFomoTemplates: (state, payload) => {
      state.fomoTemplates = payload;
    },
    updateFomoVariables: (state, payload) => {
      state.fomoVariables = payload;
    },
    updateFomoData: (state, payload) => {
      state.fomoData = payload;
    },
    updateFomoClanData: (state, payload) => {
      state.fomoClanData = payload;
    },
    updateReviewData: (state, payload) => {
      state.reviewData = payload;
    },
  },
  actions: {
    getFomo: ({ commit, state }) => {
      const url = mixins.getApiUrl(`fomo/getDetails?id=${state.fomoId}`);
      commit("toggleLoader", true);
      commit("toggleFomoReady", false);
      return Axios.get(url)
        .then(({ data }) => {
          const { attributes, relationship, includes, type } = data.data;
          commit("updateFomoType", type);
          commit("updateFomoData", attributes);
          commit("updateFomoClanData", relationship);
          commit("updateFomoTemplates", includes.templates);
          commit("updateFomoVariables", includes.dynamic_variables);
          commit("toggleFomoReady", true);
          return true;
        })
        .catch(({ response }) => {
          const msg = `<i class="fas fa-exclamation-circle"></i> ${response.data.errors.message}`;
          commit("updateApiResponse", msg);
          return false;
        })
        .finally(() => commit("toggleLoader", false));
    },
  },
  modules: {},
});
