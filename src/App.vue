<template>
  <div>
    <h1>{{ titulo }}</h1>
    <img :src="foto.url" :alt="foto.titulo" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      titulo: "Image Picker",
      foto: {
        url:
          "https://super.abril.com.br/wp-content/uploads/2018/05/filhotes-de-cachorro-alcanc3a7am-o-c3a1pice-de-fofura-com-8-semanas1.png",
        titulo: "Cachorro",
        
      },
    };
  },
};
</script>

<style>
</style>
