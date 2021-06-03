<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col md="4">
          <location-lookup v-model="lookupLocationId" />
        </v-col>
        <v-col>
          <location
            v-if="location"
            v-model="locationModel"
            @changeLocation="changeLocation"
            @search="filterLocations"
            @addLink="onAddLink"
            @deleteLink="onDeleteLink"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import {
  Location,
} from '@/store/modules/locations/types';

@Component({
  components: {
    LocationLookup: () => import('@/components/LocationLookup.vue'),
    Location: () => import('@/components/Location.vue'),
  },
})
class LocationData extends Vue {
  @Prop({ type: Number, default: 0 })
  locationId!: number;

  @Prop({ type: Object })
  location!: Location | undefined;

  get lookupLocationId() {
    return this.locationId;
  }

  set lookupLocationId(value) {
    this.$emit('changeLocation', value);
  }

  get locationModel() {
    return this.location;
  }

  set locationModel(value) {
    this.$emit('setLocation', value);
  }

  filterLocations(value: string) {
    this.$emit('filterLocations', value);
  }

  changeLocation(locationId: number) {
    this.$emit('changeLocation', locationId);
  }

  onAddLink(linkId: number) {
    this.$emit('addLink', linkId);
  }

  onDeleteLink(linkId: number) {
    this.$emit('deleteLink', linkId);
  }

  async created() {
    this.$emit('filterLocations', '');
  }
}
export default LocationData;
</script>

<style scoped>

</style>
