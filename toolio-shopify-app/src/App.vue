<template>
  <v-app>
    <v-app-bar app outlined fixed color="white">
      <!-- TO DO: Toolio + Shopify icon -->
      <v-toolbar-title>Toolio Shopify Store</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container fluid id="mainContainer">
        <v-row class="">
          <v-col cols="12" md="3" sm="4"></v-col>
          <v-col cols="12" md="6" sm="4" class="d-flex justify-center">
            <search-bar @searchProduct="getProducts($event)" />
            <!-- <v-btn class="rounded-l-0" color="indigo" dark>Search</v-btn> -->
          </v-col>
          <v-col cols="12" md="3" sm="4"></v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="2"></v-col>
          <v-col cols="12" md="8">
            <products-table :products="this.products" 
              :noProductsFound="noProductsFound" 
              :isLoading="isLoading" 
              :isSearchStarted="isSearchStarted"
            />
          </v-col>
          <v-col cols="12" md="2"></v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import SearchBar from '@/components/SearchBar.vue';
  import ProductsTable from '@/components/ProductsTable.vue'
  //const dotenv = require("dotenv").config();
  
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
