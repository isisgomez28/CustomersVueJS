<template>
  <div class="catalog container">
    <div class="row">
      <div class="col-md-8 order-md-1">
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
                  <b-button-group>
                    <b-button variant="success" v-on:click="addItem(product)">Add</b-button>
                  </b-button-group>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Your cart</span>
          <span class="badge badge-secondary badge-pill">{{ cartItems.length }}</span>
        </h4>
        
        <ul class="list-group mb-3" v-for="item in cartItems" :key="item.id">
          <li class="list-group-item d-flex justify-content-between lh-condensed">
             <div>
                <h6 class="my-0"> {{ item.name }} </h6>
                <small class="text-muted">{{ item.unit }}</small>
              </div>              
              <b-button variant="danger" v-on:click="removeItem(item.id)">Remove ({{ item.qty }})</b-button>
          </li>
        </ul>

        <form class="card p-2">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="First Name" v-model="orderHeader.firstName">
          </div>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Last Name" v-model="orderHeader.lastName">
          </div>
          <div class="input-group-append">
            <input type="text" class="form-control" placeholder="Delivery To" v-model="orderHeader.deliveryTo">
            <button type="submit" class="btn btn-secondary">Send</button>
          </div>
        </form>
      </div>
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
      modalOpen: true,
      orderHeader: {
        date: new Date(),
        deliveryTo: '',
        firstName: '',
        lastName: ''
      },
      cartItems: []
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
    },
    addItem: function (product) {
      //console.log("Ok" + product.name);

      var itemIndex = this.cartItems.findIndex( (item) => item.id === product.id);

      if (itemIndex === -1) {
        let nItem = {
          id: product.id,
          name: product.name,
          description: product.description,
          unit: product.unitOfMeasurement.abbreviation,
          qty: 1
        };

        this.cartItems.push(nItem);
      }
      else {
        this.cartItems[itemIndex].qty++;
      }    
    },
    removeItem: function (id) {
      var itemIndex = this.cartItems.findIndex( (item) => item.id === id);
      this.cartItems.splice(itemIndex, 1);
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