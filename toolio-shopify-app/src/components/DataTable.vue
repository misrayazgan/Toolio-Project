<template>
    <!-- loading
    loading-text="Loading..." -->
  <v-data-table
    :headers="headers"
    class="elevation-1"
    :items="products"
    :items-per-page="20"
  ></v-data-table>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          { text: 'ID', align: 'start', value: 'id' },
          { text: 'Title', value: 'title' },
        ],
        products: []
      }
    },

    methods: {
      async getProducts() {
        const API_URL = "http://localhost:3000/products?title=table"; //cors related error
        fetch(API_URL)
          .then(response => {
            console.log("statusText", response.statusText);
            return response.json();
          })
          .then(products => {
            console.log("products:", products);
            if (products.products != null)
            {
              this.products = products.products;
            }
          })
          .catch(error => console.log(error));
      }
    },

    mounted () {
      this.getProducts();
    }
  }
</script>

<style></style>