<template>
  <div>
    <the-function
      @show-region="setRegion"
      @search-input="setInput"
    ></the-function>
    <section class="countries-list">
      <countries-item
        v-for="country in currentPageCountries"
        :key="country.name"
        :name="country.name"
        :population="country.population"
        :region="country.region"
        :capital="country.capital ? country.capital[0] : ''"
        :img="country.img"
      ></countries-item>
    </section>
    <countries-pagination
      :countries="currCountries"
      @change-page="setPageCountries"
    ></countries-pagination>
  </div>
</template>

<script>
import TheFunction from "@/components/layout/TheFunction.vue";
import CountriesItem from "@/countries/CountriesItem.vue";
import CountriesPagination from "@/countries/CountriesPagination.vue";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  components: {
    TheFunction,
    CountriesItem,
    CountriesPagination,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const router = useRouter();
    console.log(router);
    const region = ref(""); // Current selected region
    const search = ref("");

    // Computed properties to get countries from the store
    const countries = computed(() => store.getters["countries/getCountries"]);
    const firstPageCountries = computed(
      () => store.getters["countries/loadFirstPage"]
    );
    const regionCountries = computed(
      () => store.getters["countries/getRegionCountries"]
    );
    const searchCounties = computed(
      () => store.getters["countries/getSearchCountries"]
    );

    // Set Region and load countries for that region
    const setRegion = (value) => {
      region.value = value;
      search.value = "";
      route.query.page = 1;
      store.dispatch("countries/loadCountriesPerRegion", region.value);
    };

    const setInput = (value) => {
      search.value = value;
      region.value = "";
      route.query.page = 1;
      store.dispatch("countries/loadSearchCountries", search.value);
      console.log(searchCounties.value.length);
    };

    // Compute the list of countries to display based on the current page
    const currentPageCountries = computed(() => {
      const currentPage = parseInt(route.query.page) || 1;

      if (region.value) {
        // Paginasi untuk countries dalam region
        const start = (currentPage - 1) * 20;
        const end = start + 20;
        return regionCountries.value.slice(start, end);
      }
      if (search.value) {
        const start = (currentPage - 1) * 20;
        const end = start + 20;
        return searchCounties.value.slice(start, end);
      } else {
        // Paginasi untuk countries secara keseluruhan
        if (currentPage === 1) {
          return firstPageCountries.value; // Display first page countries
        }
        const start = (currentPage - 1) * 20;
        const end = start + 20;
        return countries.value.slice(start, end); // Paginate based on selected page
      }
    });

    const currCountries = computed(() => {
      if (region.value) return regionCountries.value;
      if (search.value) return searchCounties.value;
      return countries.value;
    });

    // Set page countries on page change (via pagination component)
    const setPageCountries = (newPage) => {
      route.query.page = newPage;
    };

    return {
      countries,
      setPageCountries,
      firstPageCountries,
      currentPageCountries,
      route,
      setRegion,
      regionCountries,
      region,
      setInput,
      currCountries,
    };
  },
};
</script>

<style scoped>
.countries-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.5rem;
  width: 90%;
  margin: 0 auto;
}
</style>
