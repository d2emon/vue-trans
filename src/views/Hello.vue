<template>
  <hello-world />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  components: {
    HelloWorld: () => import('@/components/HelloWorld.vue'),
  },
});
</script>
