/* Diretivas servem para criar comportamentos que podem ser aplicados em
 * qualquer componente. Use v-<nome da diretiva>.
 * el: elemento do DOM, o qual a diretiva manipula;
 * binding: permite acessar o valor passado para a diretiva;
 * vnode: para acessar elementos do DOM, porém está sendo depreciado.
 */

export default {
  bind(el, binding, vnode) {
    let current = 0;

    el.addEventListener("dblclick", function() {
      let valor = binding.value || 90;
      let efeito;

      if (!binding.arg || binding.arg == "rotacionar") {
        if (binding.modifiers.antihorario) current -= valor;
        else current += valor;

        efeito = `rotate(${current}deg)`;
      } else if (binding.arg == "aumentar") efeito = `scale(${valor})`;

      if (binding.modifiers.animar) el.style.transition = "transform .3s";
      el.style.transform = efeito;
    });
  }
};
