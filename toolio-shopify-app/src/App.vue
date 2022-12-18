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
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    
  </v-app>
</template>

<script>
  export default {
    name: "App"
  }
</script>
