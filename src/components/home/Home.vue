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
          <img-responsiva
            v-meu-transform="{animacao: true}"
            :url="foto.url"
            :titulo="foto.titulo"
          />
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
import ImagemResponsiva from "../shared/imagem-responsiva/ImageResponsiva";
import Botao from "../shared/botao/Botao";

export default {
  components: {
    "meu-painel": Painel,
    "img-responsiva": ImagemResponsiva,
    botao: Botao,
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

  methods: {
    // Caso houvesse a comunicação do filho com o pai através do $event:
    // remove(foto, $event) {
    remove(foto) {
      // alert($event);
      alert("Remover " + foto.titulo);
    },
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
