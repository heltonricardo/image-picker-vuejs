<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>

    <input
      type="search"
      class="filtro"
      placeholder="filtre por parte do título"
      v-on:input="filtro = $event.target.value"
    />

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="(foto, i) in fotosComFiltro" :key="i">
        <meu-painel :titulo="foto.titulo">
          <img-responsiva :url="foto.url" :titulo="foto.titulo" />
          <botao tipo="button" rotulo="Remover"/>
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel";
import ImagemResponsiva from "../shared/imagem-responsiva/ImageResponsiva";
import Botao from "../shared/botao/Botao";

export default {
  components: {
    "meu-painel": Painel,
    "img-responsiva": ImagemResponsiva,
    botao: Botao
  },

  computed: {
    fotosComFiltro() {
      if (this.filtro == "") {
        return this.fotos;
      } else {
        const exp = new RegExp(this.filtro.trim(), "i");
        return this.fotos.filter((foto) => exp.test(foto.titulo));
      }
    },
  },

  data() {
    return {
      titulo: "Image Picker",
      fotos: [],
      filtro: "",
    };
  },

  created() {
    this.$http
      .get("http://localhost:3000/v1/fotos")
      .then((res) => res.json())
      .then((fotos) => (this.fotos = fotos));
  },
};
</script>

<style>
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}
</style>
