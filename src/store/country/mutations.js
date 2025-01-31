export default {
  setCountries(state, payload) {
    state.countries = payload;
  },
  setRegionCountries(state, payload) {
    state.regionCountries = payload;
  },
  setSearchCountries(state, payload) {
    state.searchCountries = payload;
  },
};
