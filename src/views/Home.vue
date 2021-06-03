<template>
  <v-container>
    <v-card>
      <v-container>
        <main-page />
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  components: {
    MainPage: () => import('@/components/MainPage.vue'),
  },
});
</script>
