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
    color="indigo"
    @keydown.enter="searchProduct()"
    :rules="rules"
  ></v-text-field>
</template>

<script>
  export default {
    data () {
      return {
        searchText: "",
        rules: []
      }
    },

    methods: {
        searchProduct() {
          if (this.searchText != null && this.searchText.length > 1)
          {
            // A title is entered into the search bar, send searchText to the parent component.
            this.$emit("searchProduct", this.searchText);
          }
        }
    }
  }
</script>

<style></style>