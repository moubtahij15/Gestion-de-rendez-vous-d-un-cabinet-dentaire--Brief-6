import { createStore } from "vuex";
import router from "../router/index";

// const state = {};
const getters = {};
const mutations = {
  redirectTo(state, payload) {
    router.push({ name: payload });
  },
  set(state, payload) {
    state.id_RDV = payload.id_RDV;
    state.sjt_RDV = payload.sjt_RDV;
    state.date_creneau = payload.date_creneau;
    state.id_client = payload.id_client;
    state.id_creneau = payload.id_creneau;
    // return payload.state.id_client;
  },
  reset(state) {
    state.id_RDV = "";
    state.sjt_RDV = "";
    state.date_creneau = "";
    state.id_client = "";
    state.id_creneau = "";
  },
};

const actions = {
  redirectTo({ commit }, payload) {
    // eslint-disable-next-line no-undef
    commit("redirectTo", payload.val);
  },
  setAction: ({ commit }, payload) => {
    commit("set", payload);
  },
};

export default createStore({
  state: {
    id_RDV: "",
    sjt_RDV: "",
    date_creneau: "",
    id_client: "",
    id_creneau: "",
    succesMsg: "Bien Updated",
  },
  getters,
  mutations,
  actions,
  modules: {},
});
