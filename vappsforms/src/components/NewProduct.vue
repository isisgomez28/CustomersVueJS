<template>
  <div class="newproduct container">
    <h1 class="page-header">New Product</h1>
    
    <div class="row">
        <div class="col-md-8 order-md-1">
            <form v-on:submit="addNewProduct">
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
                        <label>Description</label>
                        <textarea type="text" class="form-control" minlength="10" maxlength="150" required placeholder="Description" v-model="product.description"></textarea>
                    </div>            
                </div>
                <div class="well">
                    <h4>Product Complements</h4>
                    <div class="row">
                        <div class="form-group col-md-6 mb-3">
                            <label>Unit of Measurement</label>
                            <v-select label="abbreviation" :options="unitsOfMeasurements" :reduce="abbreviation => abbreviation.id" v-model="product.unitOfMeasurementId"></v-select>
                        </div>
                        <div class="form-group col-md-6 mb-3">
                            <label>Category</label>
                            <v-select label="name" :options="categories" :reduce="name => name.id" v-model="product.categoryId"></v-select>
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
export default {
  name: 'newproduct',
  data () {
    return {
      product: {
          code: '',
          name: '',
          description: ''
      },
      unitsOfMeasurements: [],
      categories: []
    }
  },
  methods: {
    addNewProduct(e) {
        console.log();
        e.preventDefault();          
    },
    fetchUnitsOfMeasurements () {
        this.$http.get('https://localhost:5001/api/UnitsOfMeasurements')
        .then(function (response) {
            console.log(response.body);
            this.unitsOfMeasurements = response.body;
        });
    },
    fetchCategories () {
        this.$http.get('https://localhost:5001/api/categories')
        .then(function (response) {
            console.log(response.body);
            this.categories = response.body;
        });
    }
  },
  created: function () {
    this.fetchUnitsOfMeasurements();
    this.fetchCategories();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
