<template>
  <div class="corpo">
    <nav>
      <ul>
        <li v-for="(rota, i) in rotas" :key="i">
          <router-link :to="rota.path">{{ rota.titulo }}</router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { routes } from "./routes";

export default {
  data() {
    return {
      rotas: routes,
    };
  },
};
</script>

<style>
.corpo {
  font-family: Helvetica, sans-serif;
  width: 96%;
  margin: 0 auto;
}
</style>
