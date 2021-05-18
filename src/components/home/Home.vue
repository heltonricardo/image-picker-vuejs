<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>

    <input
      type="search"
      class="filtro"
      placeholder="filtre por parte do título"
      v-on:input="filtro = $event.target.value"
    />

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="(foto, i) in fotosComFiltro" :key="i">
        <meu-painel :titulo="foto.titulo">
          <!-- Usando a diretiva meu-transform, podemos passar de diversas
          maneiras graças ao tratamento de modifiers e arg:
          v-meu-transform="15"
          v-meu-transform:aumentar="1.1"
          v-meu-transform:aumentar.animar="1.1"
          v-meu-transform:rotacionar.antihorario="15"
          -->
          <img-responsiva
            v-meu-transform:rotacionar.antihorario.animar="15"
            :url="foto.url"
            :titulo="foto.titulo"
          />
          <router-link :to="{ name: 'altera', params: { id: foto._id } }">
            <botao tipo="button" rotulo="ALTERAR" />
          </router-link>
          <!-- O "botao" é um componente que nós mesmos criamos, sendo assim,
           ele não está "preparado para receber uma ação de clique, pois não
           especificamos isso em sua criação. Então usamos .native para enviar o
           evento de clique para o verdadeiro componente nativo dentro do 
           componente que criamos. O atributo "confirmacao" precisa de v-bind
           para que o componente filho o entenda como valor/operação que está
           entre aspas, e não como uma string -->
          <botao
            tipo="button"
            rotulo="REMOVER"
            :confirmacao="true"
            estilo="perigo"
            @botaoAtivado="remove(foto)"
          />
          <!--  O argumento opcional $event é o valor que o botão (componente
          filho) enviou para a Home (componente pai) como forma de comunicação:
          <botao
            tipo="button"
            rotulo="REMOVER"
            @botaoAtivado="remove(foto, $event)"
          /> -->
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva";
import Botao from "../shared/botao/Botao";
import FotoService from "../../domain/foto/FotoService";

import transform from "../../directives/Transform";

export default {
  components: {
    "meu-painel": Painel,
    "img-responsiva": ImagemResponsiva,
    botao: Botao,
  },

  directives: {
    "meu-transform": transform,
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
      mensagem: "",
    };
  },

  methods: {
    /* Caso houvesse a comunicação do filho com o pai através do $event,
     * receberíamos via parâmertro: remove(foto, $event) e seria acessível
     * normalmente como, por exemplo, alert($event).
     */
    remove(foto) {
      this.service.apaga(foto._id).then(
        () => {
          const indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);
          this.mensagem = "Foto removida com sucesso!";
        },
        (err) => {
          console.log(err);
          this.mensagem = "Não foi possível remover a imagem.";
        }
      );
    },
  },

  created() {
    this.service = new FotoService(this.$resource);

    this.service.lista().then(
      (fotos) => (this.fotos = fotos),
      (err) => console.log(err)
    );
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