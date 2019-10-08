<template>
  <div>
    <div class="products container">
      <Alert v-if="alert" v-bind:message="alert"></Alert>
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
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.code }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.category.name }}</td>
            <td>{{ product.unitOfMeasurement.abbreviation }}</td>
            <td>
              <router-link class="btn btn-default" v-bind:to="'/product/'+product.id">View</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>  
  </div>
</template>

<script>
import Alert from './Alert';

export default {
  name: 'products',
  data () {
    return {
      products: [],
      alert: '',
      modalOpen: false
    }
  },
  methods: {
    fetchProducts () {
      this.$http.get('http://localhost:5000/api/Products')
        .then(function (response) {
          //console.log(response.body);
          this.products = response.body;
        });
    },
    openModal() {
        this.modalOpen = !this.modalOpen;
    }
  },
  created: function () {
    if (this.$route.query.alert) {
      this.alert = this.$route.query.alert;
    }
    this.fetchProducts();
  },
  components: {
    Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>