<template>
  <router-link :to="`/home/${cName}`">
    <article class="each-country">
      <img :src="cImg" alt="" />
      <div class="country-info">
        <h2>{{ cName }}</h2>
        <div class="country-detail">
          <p><span>Population:</span> {{ cPopulation }}</p>
          <p><span>Region:</span> {{ cRegion }}</p>
          <p><span>Capital:</span> {{ cCapital }}</p>
        </div>
      </div>
    </article>
  </router-link>
</template>

<script>
import { computed } from "vue";
export default {
  props: ["name", "population", "capital", "region", "img"],
  setup(props) {
    const populationStr = computed(() => {
      const str = props.population.toString();
      let tempStr = [];
      for (let i = 0; i < str.length; i++) {
        if ((str.length - i) % 3 === 0 && i !== 0) {
          tempStr.push(".");
        }
        tempStr.push(str[i]);
      }
      return tempStr.join("");
    });

    return {
      cName: props.name,
      cPopulation: populationStr,
      cCapital: props.capital,
      cRegion: props.region,
      cImg: props.img,
    };
  },
};
</script>

<style scoped>
.each-country {
  width: 300px;
  height: 300px;
  background: white;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  justify-self: center;
  margin-top: 1.5rem;
}

a {
  text-decoration: none;
  color: black;
}

.each-country img {
  width: 100%;
  height: 60%;
  object-fit: cover;
  object-position: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.country-info h2 {
  letter-spacing: 1px;
}

.country-info {
  align-self: center;
  margin-left: 1.5rem;
  font-size: 0.9rem;
}

.country-detail p {
  margin: 0.2rem 0;
}
</style>
