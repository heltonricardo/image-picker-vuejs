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
      let valor = binding.value || 90;

      if (binding.modifiers.antihorario) current -= valor;
      else current += valor;

      if (binding.modifiers.animar) el.style.transition = "transform .3s";

      el.style.transform = `rotate(${current}deg)`;
    });
  }
});
