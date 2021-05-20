<template>
  <button
    @click="disparaAcao()"
    class="botao"
    :class="estiloDoBotao"
    :type="tipo"
  >
    {{ rotulo }}
  </button>
</template>

<script>
export default {
  props: {
    tipo: {
      type: String,
      required: true
    },
    rotulo: {
      type: String,
      required: true
    },
    confirmacao: Boolean,
    estilo: String
  },

  methods: {
    disparaAcao() {
      /* O emit dispara um evento. Quem responderá a esse evento é o componente
       * pai. Também é possível enviar dados, no caso enviamos uma data no
       * código comentado.
       */
      if (this.confirmacao) {
        if (confirm("Confirma operação?")) {
          this.$emit("botaoAtivado");
          // this.$emit("botaoAtivado", new Date());
        }
        return;
      }
      this.$emit("botaoAtivado");
    }
  },

  computed: {
    estiloDoBotao() {
      if (this.estilo == "perigo") return "botao-perigo";
      return "botao-padrao";
    }
  }
};
</script>

<style scoped lang="sass">
@import "./Botao.scss"
</style>
