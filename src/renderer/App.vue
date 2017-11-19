<template>
  <div id="app">
    <b-container>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.css'

export default {
  name: 'vue-trans'
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
