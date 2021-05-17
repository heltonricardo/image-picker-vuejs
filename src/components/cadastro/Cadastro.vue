<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <form @submit.prevent="grava">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <!-- Usar os dois fluxos de dados unidirecionais como:
        @input="foto.titulo = $event.target.value"    e    :value="foto.titulo"
        é equivalente a usar o v-model="foto.titulo" (fluxo bidirecional) -->
        <input id="titulo" autocomplete="off" v-model.lazy="foto.titulo" />
      </div>

      <!-- O modifier lazy só faz a associação de dados quando deixamos aquele
      campo, quando "vamos para outro campo". Já quando usamos v-show, o campo
      só será atualizado quando o que for passado para v-show for verdadeiro.
      Lembrando que uma string vazia é false para javascript. -->
      <div class="controle">
        <label for="url">URL</label>
        <input id="url" autocomplete="off" v-model.lazy="foto.url" />
        <imagem-responsiva
          :titulo="foto.titulo"
          :url="foto.url"
          v-show="foto.url"
        />
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea
          id="descricao"
          autocomplete="off"
          v-model="foto.descricao"
        ></textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit" />
        <router-link to="/"
          ><meu-botao rotulo="VOLTAR" tipo="button"
        /></router-link>
      </div>
    </form>
  </div>
</template>

<script>
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
import Foto from "../../domain/foto/Foto";

export default {
  components: {
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao,
  },
  data() {
    return {
      foto: new Foto(),
    };
  },

  methods: {
    grava() {
      this.resource.save(this.foto).then(
        () => (this.foto = new Foto()),
        (err) => console.log(err)
      );
    },
  },

  created() {
    this.resource = this.$resource("v1/fotos");
  },
};
</script>

<style scoped>
.centralizado {
  text-align: center;
}
.controle {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.controle label {
  display: block;
  font-weight: bold;
}

.controle label + input,
.controle textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

.centralizado {
  text-align: center;
}
</style>