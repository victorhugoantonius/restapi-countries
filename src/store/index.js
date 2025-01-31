import { createStore } from "vuex";
import countriesModule from "./country/index.js";
const store = createStore({
  modules: {
    countries: countriesModule,
  },
});

export default store;
