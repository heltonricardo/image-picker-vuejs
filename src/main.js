import Vue from "vue";
import App from "./App.vue";

import VueResource from "vue-resource";
import VueRouter from "vue-router";
import { routes } from "./routes";
import "./directives/Transform";
import VeeValidate from "vee-validate";
import msg from "./pt_BR";
import "./assets/css/teste.css"
// Para importar algo dentro da pasta node_modules não usamos o "./":
import "bootstrap/dist/css/bootstrap.css"

Vue.use(VueResource);
Vue.http.options.root = "http://localhost:3000";
Vue.use(VueRouter);

/* Quando a propriedade e o valor tem o mesmo nome, é possível usar apenas um
 * nome no lugar de "routes: routes".
 */
const router = new VueRouter({ routes, mode: "history" });

Vue.use(VeeValidate, {
  locale: "pt_BR",
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

// A mesma técnica do exemplo acima:
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
