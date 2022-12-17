<template>
  <!-- <v-text-field
    label="Search Product"
    class="rounded-r-0"
  ></v-text-field> -->
  <v-text-field
    v-model="searchText"
    placeholder="Search product..."
    prepend-inner-icon="mdi-magnify"
    outlined
    dense
    clearable
    @keydown.enter="searchProduct()"
    color="indigo"
  ></v-text-field>
</template>

<script>
  export default {
    data () {
      return {
        searchText: ""
      }
    },

    methods: {
        searchProduct()
        {
            console.log("search text:", this.searchText);
        }
    }
  }
</script>

<style></style>