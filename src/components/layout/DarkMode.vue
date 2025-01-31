<template>
  <div class="nav-dark-mode-btn" @click="toggleDark">
    <i class="fa-solid fa-moon dark-mode-logo"></i>
    <p>Dark Mode</p>
  </div>
</template>

<script>
import { watchEffect } from "vue";
import { useDark, useToggle } from "@vueuse/core";

export default {
  setup() {
    const isDark = useDark({
      selector: "body",
      attribute: "data-color-scheme",
      valueDark: "dark",
      valueLight: "light",
      force: true, // Memastikan perubahan diterapkan
    });

    const toggleDark = useToggle(isDark);

    // Debugging: Lihat perubahan di console
    watchEffect(() => {
      console.log("Dark Mode:", isDark.value);
    });

    return { toggleDark, isDark };
  },
};
</script>

<style scoped>
.nav-dark-mode-btn {
  display: flex;
  align-items: center;
  font-weight: bold;
  gap: 0 0.6rem;
  cursor: pointer;
}

/* Perbaiki selector agar cocok dengan useDark() */
body[data-color-scheme="light"] {
  background-color: white;
  color: black;
  z-index: -1;
}

body[data-color-scheme="dark"] {
  background-color: #121212;
  color: white;
  z-index: -1;
}
</style>
