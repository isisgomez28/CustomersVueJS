<template>
  <div class="productdetails container">
    <router-link to="/">Back</router-link>
    <h1 class="page-header">Product Details</h1>
    
    <div class="row">
        <div class="col-md-8 order-md-1">
            <form v-on:submit="saveProduct">
                <div class="well">
                    <h4>Product Info</h4>
                    <div class="form-group">
                        <label>Code</label>
                        <input type="text" class="form-control" minlength="4" maxlength="10" required placeholder="Product Code" v-model="product.code">
                    </div>
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" minlength="4" maxlength="50" required placeholder="Product Name" v-model="product.name">
                    </div>
                    <div class="form-group">
                        <label>Enable</label>
                        <custom-switch v-model="customSwitch"></custom-switch>
                        <!-- <input type="checkbox" class="form-control" v-model="product.enabled"> -->
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea type="text" class="form-control" minlength="10" maxlength="150" required placeholder="Description" v-model="product.description"></textarea>
                    </div>            
                </div>
                <div class="well">
                    <h4>Product Complements</h4>
                    <div class="row">
                        <div class="form-group col-md-6 mb-3">
                            <label>Unit of Measurement</label>
                            <!-- <p>{{ product.unitOfMeasurement.abbreviation }}</p> -->
                            <!-- 
                              Some improvements for use this in a modal.
                              It' a best practice to bind the v-select data.someObject or I assume that
                              this is the thread for the idea https://stackoverflow.com/questions/51392719/set-initial-vuetify-v-select-value
                            -->
                            <v-select label="abbreviation" :options="unitsOfMeasurements" v-model="defaultUnit"></v-select>
                        </div>
                        <div class="form-group col-md-6 mb-3">
                            <label>Category</label>
                            <!-- <p>{{ product.category.name }}</p> -->
                            <!-- 
                              Some improvements for use this in a modal.
                              It' a best practice to bind the v-select data.someObject or I assume that
                              this is the thread for the idea https://stackoverflow.com/questions/51392719/set-initial-vuetify-v-select-value
                            -->
                            <v-select label="name" :options="categories" v-model="defaultCategory">{{ product.category.name }}</v-select>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import Switch from './common/switch.vue';
export default {
  name: 'productdetails',
  data () {
    return {
      product: {
          code: '',
          name: '',
          description: '',
          enabled: true,
          unitOfMeasurement: {},
          category: {}
      },
      customSwitch: false,
      defaultUnit: {},
      defaultCategory: {},
      unitsOfMeasurements: [],
      categories: []
    }
  },
  components: {
    customSwitch: Switch
  },
  methods: {
    fetchProduct(id) {
      this.$http.get('http://localhost:5000/api/products/'+id)
          .then(function(response){
            this.product = response.body;
            this.defaultUnit = response.body.unitOfMeasurement;
            this.defaultCategory = response.body.category;
            this.customSwitch = this.product.enabled;
          });     

      console.log(this.product);
    },
    saveProduct(e) {
        console.log("previous to oProduct ");

        let oProduct = {
            code: this.product.code,
            name: this.product.name,
            description: this.product.description,
            enabled: this.customSwitch,
            unitOfMeasurementId: this.defaultUnit.id,
            categoryId: this.defaultCategory.id
        };

        /**
         * This is a workaround for create and update the product using the same form.
         * First we have the PUT method else the POST method.
         */

        if (this.$route.params.id) {
          this.$http.put("http://localhost:5000/api/products/" + this.$route.params.id, oProduct)
              .then(function (response) {
                console.log(response.body);
                this.$router.push({path: '/', query: {alert: "Product Updated"}});
              });
        }
        else {
          this.$http.post("http://localhost:5000/api/products", oProduct)
            .then(function (response){
                console.log(response.body);
                this.$router.push({path: '/', query: {alert: "Product Added"}});
          });
        }       
        
        e.preventDefault();
    },
    fetchUnitsOfMeasurements () {
        this.$http.get('http://localhost:5000/api/UnitsOfMeasurements')
        .then(function (response) {
            this.unitsOfMeasurements = response.body;
        });
    },
    fetchCategories () {
        this.$http.get('http://localhost:5000/api/categories')
        .then(function (response) {
            this.categories = response.body;
        });
    } 
  },
  created: function () {
    this.fetchUnitsOfMeasurements();
    this.fetchCategories();
    
    /**
     * Validating the presence of the product ID
     * this is for use in a one component, for modal purpose.
     */
    if (this.$route.params.id) {
      this.fetchProduct(this.$route.params.id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
  </style>
