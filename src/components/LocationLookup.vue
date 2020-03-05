<template>
  <v-autocomplete
    v-model="item"
    :loading="loading"
    :items="filtered"
    :search-input.sync="search"
    item-text="locationName"
    item-value="locationId"
    cache-items
    label="Локация"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import {
  mapActions,
  mapState,
} from 'vuex';

export default Vue.extend({
  name: 'LocationLookup',
  computed: {
    ...mapState('locations', [
      'filtered',
      'loading',
      'locations',
    ]),
  },
  data: () => ({
    item: null,
    search: '',
  }),
  methods: {
    ...mapActions('locations', [
      'fetchLocations',
    ]),
    filterLocations(value: string) {
      return this.fetchLocations(value)
        .then(() => console.log('lookup search', value));
    },
    searchItems(value: string) {
      return this.filterLocations(value);
    },
    setValue(value: number) {
      console.log(value);
      const result = value ? this.locations.find(item => item.locationId === value) : undefined;
      this.item = result && result.locationId;
      this.search = result && result.locationName;
    },
  },
  props: [
    'value',
  ],
  watch: {
    item(value) {
      console.log(value, this.item);
      const result = value ? this.locations.find(item => item.locationId === value) : undefined;
      console.log(result, value);
      this.$emit('input', value);
    },
    search(value) {
      console.log(value, this.value);
      return value && (value !== this.search) && this.searchItems(value);
    },
    value(value) {
      console.log(value);
      this.setValue(value);
    },
  },
  mounted() {
    console.log(this.value);
    this.setValue(this.value);
  },
});
</script>

<style scoped>

</style>
