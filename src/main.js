import { createApp } from "vue";
import App from "./App.vue";
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from "./router.js";
import store from "./store/index.js";
const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
