<template>
  <v-app>
    <app-header />

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  components: {
    AppHeader: () => import('@/components/AppHeader.vue'),
  },
})
export default class App extends Vue {}
</script>

<style>
blockquote {
  border-left: .25em solid #dfe2e5;
  color: #6a737d;
  padding: 0 1em;
}
</style>
