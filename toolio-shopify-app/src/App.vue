<template>
  <v-app>

    <v-app-bar app elevation="1" fixed color="#19293e" dark>
      <v-img
        class="mx-2"
        src="./assets/toolio_logo.png"
        max-height="20"
        max-width="20"
        contain
      ></v-img>      
      <v-toolbar-title>Toolio Shopify Store</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container fluid class="mt-6">
        <v-row >
          <v-col cols="12" md="6" offset-md="3">
            <search-bar @searchProduct="getProducts($event)" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" offset-md="3">
            <products-table :products="this.products" 
              :noProductsFound="noProductsFound" 
              :isLoading="isLoading" 
              :isSearchStarted="isSearchStarted"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    
  </v-app>
</template>

<script>
  import SearchBar from '@/components/SearchBar.vue';
  import ProductsTable from '@/components/ProductsTable.vue'
  
  export default {
    name: "App",

    components: {
      SearchBar,
      ProductsTable
    },

    data () {
      return {
        products: [],
        noProductsFound: false,
        isLoading: false,
        isSearchStarted: false
      }
    },

    methods: {
      async getProducts(titleToSearch) {
        this.products = [];
        this.noProductsFound = false;
        this.isLoading = true;
        this.isSearchStarted = true;

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
          .catch(error => console.log(error));
      }
    }
  }
</script>
