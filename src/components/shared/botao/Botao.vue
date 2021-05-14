<template>
  <button @click="disparaAcao()" class="botao botao-perigo" :type="tipo">
    {{ rotulo }}
  </button>
</template>

<script>
export default {
  props: ["tipo", "rotulo"],
  methods: {
    disparaAcao() {
      /* O emit dispara um evento. Quem responderá a esse evento é o componente
       * pai. Também é possível enviar dados, no caso enviamos uma data no
       * código comentado.
       */
      if (confirm("Confirma operação?")) {
        this.$emit("botaoAtivado");
        // this.$emit("botaoAtivado", new Date());
      }
    },
  },
};
</script>

<style scoped>
.botao {
  display: inline-block;
  padding: 10px;
  border-radius: 3px;
  margin: 10px;
  font-size: 1.2rem;
  color: white;
}

.botao-perigo {
  background: firebrick;
}

.botao-padrao {
  background: darkcyan;
}
</style>