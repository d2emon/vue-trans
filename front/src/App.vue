<template>
  <v-app>
    <v-container>
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* CSS */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}
</style>
