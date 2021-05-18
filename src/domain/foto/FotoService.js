export default class FotoService {
  constructor(resource) {
    // o query (get) não pega a parte de /id da url
    this._resource = resource("v1/fotos{/id}");
  }

  lista() {
    return this._resource.query().then(
      res => res.json(),
      err => {
        console.log(err);
        throw new Error(
          "Não foi possível obter as imagens. Por favor tente mais tarde."
        );
      }
    );
  }

  cadastra(foto) {
    if (foto._id) {
      return this._resource.update({ id: foto._id }, foto);
    }
    return this._resource.save(foto);
  }

  apaga(id) {
    return this._resource.delete({ id }).then(null, err => {
      console.log(err);
      throw new Error(
        "Não foi possível remover a imagem. Por favor tente mais tarde."
      );
    });
  }

  busca(id) {
    return this._resource.get({ id }).then(res => res.json());
  }
}
