<template>
  <div class="function-wrapper">
    <input
      type="search"
      placeholder="search for a country..."
      id="search-country"
      @input="searchInput"
      v-model="searchValue"
    />
    <div class="dropdown-menu" @click="handleToggle">
      <p>Filter by Region <span>▼</span></p>
      <transition name="dropdown">
        <!-- Ganti v-if dengan v-show -->
        <ul v-show="isToggle" class="dropdown-links">
          <li
            v-for="region in regions"
            class="country-link"
            :key="region"
            @click="showRegion(region)"
          >
            {{ region }}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup(_, context) {
    let isToggle = ref(false);
    const searchValue = ref("");
    const store = useStore();
    const regions = computed(() => store.getters["countries/getRegions"]);
    const handleToggle = () => {
      isToggle.value = !isToggle.value;
    };
    const showRegion = (value) => {
      context.emit("show-region", value);
    };
    const searchInput = () => {
      console.log(searchValue.value);
      context.emit("search-input", searchValue.value);
    };
    return {
      regions,
      handleToggle,
      isToggle,
      showRegion,
      searchValue,
      searchInput,
    };
  },
};
</script>

<style scoped>
.function-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

#search-country {
  padding: 1rem 0;
  text-transform: capitalize;
  width: 70%;
  margin-left: 1rem;
  border-radius: 10px;
  border: 1px solid lightgray;
}
#search-country::placeholder {
  padding-left: 1rem;
}

#search-country:focus {
  padding-left: 1rem;
  padding-right: 1rem;
}

#search-country:focus::placeholder {
  padding: 0;
}
.dropdown-menu {
  cursor: pointer;
  width: 40%;
  align-self: flex-start;
  background: white;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.5);
  margin-left: 1rem;
  padding: 0.5rem 0;
  border-radius: 10px;
  border: 1px solid lightgray;
  position: relative;
  font-size: 0.9rem;
}
.dropdown-menu p {
  display: flex;
  justify-content: space-around;
}
li {
  list-style: none;
}
.dropdown-links {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  width: 100%;
  background: white;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  border: 1px solid lightgray;
}
.country-link {
  margin: 0.2rem 0.4rem;
}

/* Transition Animations */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

/* When the dropdown is entering (open) */
.dropdown-enter, /* Initial state */
.dropdown-leave-to /* Final state when closing */ {
  opacity: 0;
  transform: translateY(-10px); /* Hidden and shifted up */
}

/* When the dropdown has fully entered (open) */
.dropdown-enter-to {
  opacity: 1;
  transform: translateY(0); /* Final state after open */
}

/* When the dropdown is leaving (close) */
.dropdown-leave {
  opacity: 1;
  transform: translateY(0); /* Starting state when closing */
}

@media screen and (min-width: 675px) {
  .function-wrapper {
    display: grid;
    width: 90%;
    grid-template-columns: 1fr 300px;
    margin: 1rem auto;
  }
  #search-country {
    max-width: 70%;
  }
  .dropdown-menu {
    justify-self: end;
    width: 50%;
    padding: 0.5rem;
  }
}
</style>
