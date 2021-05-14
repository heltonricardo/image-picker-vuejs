/* Diretivas servem para criar comportamentos que podem ser aplicados em
 * qualquer componente. Use v-<nome da diretiva>.
 * el: elemento do DOM, o qual a diretiva manipula;
 * binding: permite acessar o valor passado para a diretiva;
 *
 */
import Vue from "vue";

Vue.directive("meu-transform", {
  bind(el, binding, vnode) {
    let current = 0;

    el.addEventListener("dblclick", function() {
      let incremento = 90;
      let animacao = false;

      if (binding.value) {
        incremento = binding.value.incremento || incremento;
        animacao = binding.value.animacao || animacao;
      }

      current += incremento;
      if (animacao) el.style.transition = "transform .3s";
      el.style.transform = `rotate(${current}deg)`;
    });
  }
});
