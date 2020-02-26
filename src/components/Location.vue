<template>
  <v-container>
    <v-text-field
      id="db-text-1"
      v-model="locationId"
      readonly
    ></v-text-field>
    <v-text-field
      id="db-edit-1"
      v-model="name"
    ></v-text-field>
    <v-textarea
      id="db-memo-1"
      v-model="description"
    ></v-textarea>
  </v-container>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'Location',
  props: [
    'location',
  ],
  computed: {
    locationId: {
      get() { return this.location.id; },
      set(value) {
        this.$emit('change', {
          id: value,
          locationName: this.location.locationName,
          description: this.location.description,
        });
      },
    },
    name: {
      get() { return this.location.locationName; },
      set(value) {
        this.$emit('change', {
          id: this.location.id,
          locationName: value,
          description: this.location.description,
        });
      },
    },
    description: {
      get() { return this.location.description; },
      set(value) {
        this.$emit('change', {
          id: this.location.id,
          locationName: this.location.locationName,
          description: value,
        });
      },
    },
  },
});
</script>

<style scoped>

</style>
