export default {
  async loadCountriesFromAPI(context) {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    const borderCountries = data.filter((country) =>
      Object.keys(country).includes("borders")
    );
    const filteredData = borderCountries.map((country) => {
      return {
        name: country.name.common,
        img: country.flags.png,
        officialName: country.name.official,
        region: country.region,
        subregion: country.subregion,
        capital: country.capital,
        tld: country.tld,
        currencies: country.currencies,
        languages: country.languages,
        borders: country.borders,
        population: country.population,
      };
    });
    console.log(filteredData);
    context.commit("setCountries", filteredData);
  },
  async loadDetailedCountriesFromAPI(_, countryName) {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`
    );
    const data = await response.json();
    const detailedCountry = await Promise.all(
      data.map(async (country) => {
        const borderCountries = await Promise.all(
          country.borders.map(async (code) => {
            console.log(code);
            const response = await fetch(
              `https://restcountries.com/v3.1/alpha/${code}`
            );
            const data = await response.json();
            return data[0].name.common;
          })
        );
        return {
          name: country.name.common,
          img: country.flags.png,
          officialName: country.name.official,
          region: country.region,
          subregion: country.subregion,
          capital: country.capital,
          tld: country.tld,
          currencies: country.currencies,
          languages: country.languages,
          borders: borderCountries || [],
          population: country.population,
        };
      })
    );
    return detailedCountry;
  },
  loadCountriesPerRegion(context, region) {
    console.log(region);
    context.commit(
      "setRegionCountries",
      context.getters.filterCountries(region)
    );
  },
  loadSearchCountries(context, value) {
    console.log(value);
    context.commit(
      "setSearchCountries",
      context.getters.filterSearchCountries(value)
    );
  },
};
