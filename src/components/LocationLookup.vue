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
import Vue from 'vue'
import {
  mapActions,
  mapState,
} from 'vuex'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { Location } from '@/store/modules/locations/types'

@Component({
  computed: {
    ...mapState('locations', [
      'filtered',
      'loading',
      'locations',
    ]),
  },
  methods: {
    ...mapActions('locations', [
      'fetchLocations',
    ]),
  },
  props: [
    'value',
  ],
})
export default class LocationLookup extends Vue {
  item: any = null;

  locations!: any[];

  search = '';

  value!: number;

  fetchLocations!: (value: string) => Promise<Location[]>;

  filterLocations(value: string) {
    return this.fetchLocations(value)
      .then(() => console.log('lookup search', value));
  }

  searchItems(value: string) {
    return this.filterLocations(value);
  }

  setValue(value: number) {
    console.log(value);
    const result = value
      ? this.locations.find((item) => (item.locationId === value))
      : undefined;
    this.item = result && result.locationId;
    this.search = result && result.locationName;
  }

  mounted() {
    console.log(this.value);
    this.setValue(this.value);
  }

  @Watch('item')
  onItem(value: any) {
    console.log(value, this.item);
    const result = value
      ? this.locations.find((item) => (item.locationId === value))
      : undefined;
    console.log(result, value);
    this.$emit('input', value);
  }

  @Watch('search')
  onSearch(value: string) {
    console.log(value, this.value);
    return value && (value !== this.search) && this.searchItems(value);
  }

  @Watch('value')
  onValue(value: number) {
    console.log(value);
    this.setValue(value);
  }
}
</script>

<style scoped>

</style>
