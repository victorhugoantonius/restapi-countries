<template>
  <div v-if="countryDetails" class="detail-container">
    <router-link
      class="back-link"
      :to="{ path: '/home', query: { Page: currentPage } }"
      >← Back</router-link
    >
    <section class="detail-content">
      <img :src="countryDetails.img" alt="" />
      <article class="detail-info">
        <h1 class="detail-name">{{ countryDetails.name }}</h1>
        <div class="first-info">
          <p>Official Name: {{ countryDetails.officialName }}</p>
          <p>Region: {{ countryDetails.region }}</p>
          <p>Sub-region: {{ countryDetails.subRegion }}</p>
          <p>Capital: {{ countryDetails.capital[0] }}</p>
        </div>
        <div class="second-info">
          <p>Top level domain: {{ countryDetails.tld[0] }}</p>
          <p>Currencies: {{ currencies }}</p>
          <p>Languages: {{ allLanguages }}</p>
        </div>
        <div class="borders">
          <router-link
            v-for="border in countryDetails.borders"
            :key="border"
            :to="`/home/${border}`"
          >
            {{ border }}
          </router-link>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
// import { useRoute } from "vue-router";
// import { useStore } from "vuex";
export default {
  data() {
    return {
      countryDetails: null,
      countryName: this.$route.params.countryName,
      currenciesCode: "",
      currentPage: 1,
      languages: [],
    };
  },
  computed: {
    currencies() {
      return this.countryDetails.currencies[this.currenciesCode].name;
    },
    allLanguages() {
      return this.languages
        .map((lang) => {
          return lang;
        })
        .join(",");
    },
  },
  watch: {
    async $route() {
      this.languages = [];
      this.countryName = this.$route.params.countryName;
      const detailedCountry = await this.$store.dispatch(
        "countries/loadDetailedCountriesFromAPI",
        this.countryName
      );
      this.countryDetails = detailedCountry[0];
      this.currenciesCode = Object.keys(detailedCountry[0].currencies)[0];
      this.languages.push(Object.values(detailedCountry[0].languages)[0]);
    },
  },
  async created() {
    const detailedCountry = await this.$store.dispatch(
      "countries/loadDetailedCountriesFromAPI",
      this.countryName
    );
    this.countryDetails = detailedCountry[0];
    this.currenciesCode = Object.keys(detailedCountry[0].currencies)[0];
    this.languages.push(Object.values(detailedCountry[0].languages)[0]);
  },
  beforeRouteLeave(to, _, next) {
    const confirmationLeave = confirm(
      "Are you sure you want to go back to the home page?"
    );

    if (confirmationLeave) {
      this.currentPage = to.query.page;
      next(); // Batalkan navigasi default
    }
  },
};
</script>

<style scoped>
a {
  margin: 0 0.5rem;
  gap: 1rem;
  text-decoration: none;
  background: white;
  border: 1px solid lightgray;
  letter-spacing: 0.5px;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 15px;
  padding: 0.25rem 0.75rem;
  color: black;
  transition: all 0.2s linear;
}

a:hover {
  background: lightgray;
  color: white;
  border-color: lightgray;
  transform: scale(1.05);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border: none;
}

p {
  font-size: 0.8rem;
  letter-spacing: 1px;
  margin: 0.75rem 0;
}

.detail-container {
  margin: 4rem;
}
.back-link {
  background: white;
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  padding: 0.25rem 0.75rem;
  color: black;
}
.detail-content {
  display: grid;
  width: 90%;
  margin: 1.5rem auto;
  justify-content: center;
}
.detail-content img {
  width: 250px;
  height: 200px;
  justify-self: center;
  /* object-fit: cover; */
  object-position: center;
}
.detail-info {
  margin: 1rem auto;
  justify-self: center;
  text-align: start;
  width: 100%;
}
.first-info,
.second-info {
  margin: 1rem 0.5rem;
}

.detail-name {
  margin: 0 0.5rem;
}

.borders {
  /* padding: 0; */
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 10px; /* Optional: Add space between grid items */
}

@media (min-width: 980px) {
  .detail-content {
    grid-template-columns: 600px 1fr; /* Two columns on wider screens */
    gap: 20px;
  }
  .detail-content img {
    align-self: center;
    height: 250px;
    width: 350px;
  }
  .detail-info {
    justify-self: start;
    /* width: 50%; */
  }
  .borders {
    text-align: center;
    min-width: 65%;
  }
  p {
    font-size: 1rem;
  }
  .detail-name {
    font-size: 1.5rem;
  }
}
</style>
