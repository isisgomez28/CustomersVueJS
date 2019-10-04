<template>
  <div class="products container">
    <h1 class="page-header">Products</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Category</th>
          <th>Und. Med.</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products">
          <td>{{ product.code }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.category.name }}</td>
          <td>{{ product.unitOfMeasurement.abbreviation }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'products',
  data () {
    return {
      products: []
    }
  },
  methods: {
    fetchProducts () {
      this.$http.get('https://localhost:5001/api/Products')
        .then(function (response) {
          console.log(response.body);
          this.products = response.body;
        });
    }
  },
  created: function () {
    this.fetchProducts();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
