<template>
  <nav>
    <ul>
      <li v-for="(rota, i) in rotas" :key="i">
        <router-link :to="rota.path">{{ rota.titulo }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { routes } from "../../../routes";

export default {
  data() {
    return {
      rotas: routes.filter(route => route.menu),
    };
  },
};
</script>

<style scoped>
</style>