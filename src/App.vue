<template>
  <v-app>
    <app-header :menu="mainMenu" />

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import mainMenu, { MenuItem } from '@/data/mainMenu';

@Component({
  components: {
    AppHeader: () => import('@/components/AppHeader.vue'),
  },
})
class App extends Vue {
  mainMenu: MenuItem[] = mainMenu
}

export default App;
</script>

<style>
blockquote {
  border-left: .25em solid #dfe2e5;
  color: #6a737d;
  padding: 0 1em;
}
</style>
