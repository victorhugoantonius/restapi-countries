import { createRouter, createWebHistory } from "vue-router";
import CountriesHome from "./pages/CountriesHome.vue";
import notFound from "./pages/notFound.vue";
import CountriesDetail from "./pages/CountriesDetail.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: CountriesHome, query: { page: 1 } },
    { path: "/home/:countryName", component: CountriesDetail, props: true },
    { path: "/:notFound(.*)", component: notFound },
  ],
});

export default router;
