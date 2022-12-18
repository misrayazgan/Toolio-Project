<template>
  <v-container fluid class="mt-6">
    <v-row >
      <v-col cols="12" md="8" offset-md="2">
        <search-bar @searchProduct="getProducts($event)" />
      </v-col>
    </v-row>
    <v-row v-if="displayError">
      <v-col cols="12" md="8" offset-md="2">
        <v-alert dense outlined dismissible type="error">
          Oops! Something went wrong.
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <products-table :products="this.products" 
          :noProductsFound="noProductsFound" 
          :isLoading="isLoading" 
          :isSearchStarted="isSearchStarted"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import SearchBar from '@/components/SearchBar.vue';
  import ProductsTable from '@/components/ProductsTable.vue'

  export default {
    name: "HomeView",

    components: {
      SearchBar,
      ProductsTable
    },

    data () {
      return {
        products: [],
        noProductsFound: false,
        isLoading: false,
        isSearchStarted: false,
        displayError: false
      }
    },

    methods: {
      async getProducts(titleToSearch) {
        this.products = [];
        this.noProductsFound = false;
        this.isLoading = true;
        this.isSearchStarted = true;
        this.displayError = false;

        const PORT = 3000;
        const API_URL = "http://localhost:" + PORT + "/products?title=" + titleToSearch;
        console.log("url", API_URL);
  
        fetch(API_URL)
          .then(response => {
            console.log("statusText", response.statusText);
            return response.json();
          })
          .then(products => {
            console.log("products:", products);
            this.isLoading = false;

            if (products.products != null)
            {
              this.products = products.products;
            }
            else
            {
              this.noProductsFound = true;
            }
          })
          .catch(error => {
            this.displayError = true;
            this.isLoading = false;
            console.log(error);
          });
      }
    }
  }
</script>
