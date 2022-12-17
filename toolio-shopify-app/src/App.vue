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
            <SearchBar />
            <!-- <v-btn class="rounded-l-0" color="indigo" dark>Search</v-btn> -->
          </v-col>
          <v-col cols="12" md="3" sm="4"></v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="2"></v-col>
          <v-col cols="12" md="8">
            <DataTable />
          </v-col>
          <v-col cols="12" md="2"></v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import DataTable from '@/components/DataTable.vue'
  import SearchBar from '@/components/SearchBar.vue';
</script>

<!-- <script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script> -->
