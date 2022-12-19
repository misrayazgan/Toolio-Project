<template>
  <v-data-table 
    :headers="headers"
    class="elevation-1"
    :items="products"
    :items-per-page="20"
    :footer-props="{
      'items-per-page-options': [10, 20, 30, 40, 50]
    }"
    :loading="isLoading"
    loading-text="Loading..."
  >
    <template v-if="isSearchStarted && noProductsFound" v-slot:no-data>
      No products found with the given title.
    </template>
    <template v-else-if="!isSearchStarted" v-slot:no-data>
      Start searching to display products.
    </template>
  </v-data-table>
</template>

<script>
  export default {
    props: {
      products: Array,
      noProductsFound: Boolean,
      isLoading: Boolean,
      isSearchStarted: Boolean
    },

    data () {
      return {
        headers: [
          { text: 'ID', align: 'start', value: 'id' },
          { text: 'Title', value: 'title' },
        ]
      }
    }
  }
</script>

<style></style>