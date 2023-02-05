import { createApp } from "vue";
import App from "./App.vue";

import PrimeVue from "primevue/config";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";

createApp(App).use(PrimeVue).mount("#app");
