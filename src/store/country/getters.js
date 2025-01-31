export default {
  getCountries(state) {
    return state.countries;
  },
  getRegionCountries(state) {
    return state.regionCountries;
  },
  getSearchCountries(state) {
    return state.searchCountries;
  },
  loadFirstPage(state) {
    return state.countries.filter((_, index) => index < 20);
  },
  getRegions(state) {
    return state.countries.reduce((acc, curr) => {
      if (!acc.includes(curr.region)) acc.push(curr.region);
      return acc;
    }, []);
  },
  filterCountries: (state) => (data) => {
    return state.countries.filter((country) => country.region.includes(data));
  },
  filterSearchCountries: (state) => (data) => {
    return state.countries.filter((country) =>
      country.name.toLowerCase().includes(data.toLowerCase())
    );
  },
};
