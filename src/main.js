import Vue from "vue";
import App from "./App.vue";

import VueResource from "vue-resource";
import VueRouter from "vue-router";
import { routes } from "./routes";
import "./directives/Transform";

Vue.use(VueResource);
Vue.use(VueRouter);

/* Quando a propriedade e o valor tem o mesmo nome, é possível usar apenas um
 * nome no lugar de "routes: routes".
 */
const router = new VueRouter({ routes, mode: "history" });

// A mesma técnica do exemplo acima:
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
