<template>
  <v-autocomplete
    v-model="locationId"
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
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { Location } from '@/store/modules/locations/types';

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
  locationId = 0;

  locations!: Location[];

  search = '';

  value!: number;

  fetchLocations!: (value: string) => Promise<Location[]>;

  getLocation(locationId?: number): Location | null {
    return locationId
      ? (this.locations.find((item) => (item.locationId === locationId)) || null)
      : null;
  }

  async findLocations(value: string) {
    if (!value || (value === this.search)) {
      return;
    }
    await this.fetchLocations(value);
  }

  setValue(value: number) {
    const result = this.getLocation(value);
    this.locationId = result ? Number(result.locationId) : 0;
    this.search = result ? String(result.locationName) : '';
  }

  mounted() {
    this.setValue(this.value);
  }

  @Watch('locationId')
  onLocationIdChange(value?: number) {
    this.$emit('input', value);
  }

  @Watch('search')
  async onSearch(value: string) {
    await this.findLocations(value);
  }

  @Watch('value')
  onValue(value: number) {
    this.setValue(value);
  }
}
</script>

<style scoped>

</style>
