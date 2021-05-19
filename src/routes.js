/* O Cadastro não foi importado como Home para que possamos fazer o que é
 * chamado de lazy loading. Supondo que o usuário acesse com muito mais
 * frequência a Home, criando a função que retorna o Cadastro fará com que esses
 * arquivos só sejam carregados quando a página for acessada, e não quando a
 * aplicação é carregada, como acontece com a Home. O procedimento citado serve
 * para quando ocorre build do projeto através do comando "npm run build". Após
 * executar esse comando, copie o index.html e a pasta dist para o servidor.
 */
import Home from "./components/home/Home";
const Cadastro = () =>
  System.import("./components/cadastro/Cadastro").then(m => m.default);

export const routes = [
  { path: "/", name: "home", component: Home, titulo: "Home", menu: true },
  {
    path: "/cadastro",
    name: "cadastro",
    component: Cadastro,
    titulo: "Cadastro",
    menu: true
  },
  {
    path: "/cadastro/:id",
    name: "altera",
    component: Cadastro,
    menu: false
  },
  {
    path: "*",
    component: Home,
    menu: false
  }
];
