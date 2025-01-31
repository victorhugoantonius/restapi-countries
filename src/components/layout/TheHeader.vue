<template>
  <nav>
    <h2 class="nav-title">Where in the world?</h2>
    <dark-mode></dark-mode>
  </nav>
</template>

<script>
import DarkMode from "./DarkMode.vue";
export default {
  components: {
    DarkMode,
  },
  setup() {},
};
</script>

<style scoped>
nav {
  background: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5); /* Black with 50% opacity */
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  align-items: center;
  font-size: 0.75rem;
}

@media screen and (min-width: 675px) {
  nav {
    padding: 0 2.5rem;
  }
}
</style>
