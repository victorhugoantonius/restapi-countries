<template>
  <the-header></the-header>
  <base-spinner v-if="isLoading"></base-spinner>
  <router-view v-slot="slotProps" v-else>
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  components: {
    TheHeader,
  },
  setup() {
    const isLoading = ref(false);
    const store = useStore();
    const loadCountries = async () => {
      isLoading.value = true;
      await store.dispatch("countries/loadCountriesFromAPI");
      isLoading.value = false;
    };
    loadCountries();
    return { isLoading };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Press+Start+2P&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Nunito Sans";
}
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Tambahkan ke main CSS global (misalnya, main.css) */
/* body[data-color-scheme="light"] {
  background-color: white;
  color: black;
}

body[data-color-scheme="dark"] {
  background-color: #121212;
  color: white;
} */
</style>
