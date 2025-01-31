<template>
  <div class="pagination-container">
    <button
      v-for="page in totalPages"
      :key="page"
      @click="changePage(page)"
      :class="{ active: page === currPage }"
      class="pagination-button"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["countries"],
  emits: ["change-page"],
  setup(props, context) {
    const currPage = ref(1);
    const perPage = ref(20);
    const router = useRouter();

    const totalPages = computed(() => {
      return Math.ceil(props.countries.length / perPage.value);
    });

    onMounted(() => {
      currPage.value = 1;
      router.replace({ path: "/home", query: { page: currPage.value } });
    });

    const changePage = (page) => {
      currPage.value = page;

      router.push({ path: "/home", query: { page: currPage.value } });

      const start = (currPage.value - 1) * perPage.value;
      const end = start + perPage.value;
      const pages = props.countries.slice(start, end);

      context.emit("change-page", pages);
    };

    return { totalPages, changePage, currPage };
  },
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
}

.pagination-button {
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border: 1px solid crimson;
  background-color: #ffffff;
  color: crimson;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;
}

.pagination-button:hover {
  background-color: crimson;
  color: white;
}

.pagination-button.active {
  background-color: crimson;
  color: white;
  border-color: crimson;
}

.pagination-button:disabled {
  background-color: #f0f0f0;
  color: #ccc;
  cursor: not-allowed;
}

.pagination-button:focus {
  outline: none;
}
</style>
