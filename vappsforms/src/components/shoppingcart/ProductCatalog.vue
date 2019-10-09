<template>
  <div>
    <div class="catalog container">
      <Alert v-if="alert" v-bind:message="alert"></Alert>
      <h1 class="page-header">Product Catalog</h1>
      <input class="form-control" placeholder="Enter product name" v-model="filterInput">
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
          <tr v-for="product in filterBy(enabledProducts, filterInput)" :key="product.id">
            <td>{{ product.code }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.category.name }}</td>
            <td>{{ product.unitOfMeasurement.abbreviation }}</td>
            <td>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/Alert';

import ModalDirection from "@/components/common/ProductModal";

export default {
  name: 'catalog',
  data () {
    return {
      products: [],
      alert: '',
      filterInput: '',
      modalOpen: true
    }
  },  
  computed: {
      /**
       * https://vuejs.org/v2/guide/list.html
       * Displaying Filtered/Sorted Results
       */
      enabledProducts: function () {          
          return this.products.filter(function (product) {
              //console.log(product);
              return product.enabled;
          });
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
    },
    filterBy (list, value) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
      return list.filter(function (product) {
        return product.name.indexOf(value) >  -1;
      });
    }
  },
  created: function () {
    if (this.$route.query.alert) {
      this.alert = this.$route.query.alert;
    }
    this.fetchProducts();
  },
  components: {
    Alert,
    ModalDirection
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>