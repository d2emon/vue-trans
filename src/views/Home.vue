<template>
  <v-container>
    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-container>
              <location-lookup v-model="lookupLocationId" />
              <location
                v-if="location"
                v-model="locationModel"
                @changeLocation="changeLocation"
                @search="filterLocations"
                @addLink="onAddLink"
                @deleteLink="onDeleteLink"
              />
            </v-container>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <transport-data-component
              :location-id="locationId"
              :transport="transport"
              :current-transport="currentTransport"
              :selected-transport="selectedTransport"
              :transport-links="transportLinks"
              @selectTransport="selectTransport"
              @changeLocation="changeLocation"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import {
  mapActions,
  mapState,
} from 'vuex';
import {
  Location,
  TransportData,
} from '@/store/modules/locations/types';

@Component({
  components: {
    LocationLookup: () => import('@/components/LocationLookup.vue'),
    Location: () => import('@/components/Location.vue'),
    TransportDataComponent: () => import('@/components/TransportData.vue'),
  },
  computed: {
    ...mapState('locations', [
      'location',
      // 'locations',
      // 'filtered',
      'transport',
      'currentTransport',
    ]),
  },
  methods: {
    ...mapActions('locations', [
      'fetchLocation',
      'fetchLocations',
      'fetchLocationTransport',
      'saveLocation',
      'addLink',
      'deleteLink',
      'fetchTransportLinks',
    ]),
  },
})
class Home extends Vue {
  location!: Location | undefined;

  transport!: TransportData[];

  currentTransport!: TransportData[] | undefined;

  locationId = 0;

  selectedTransport: TransportData | null = null;

  transportLinks: Location[] = [];

  addLink!: (payload: {}) => void;

  deleteLink!: (payload: {}) => void;

  fetchLocation!: (value: number) => void;

  fetchLocations!: (value: string) => Promise<Location[]>;

  fetchLocationTransport!: (locationId: number) => Promise<TransportData[]>;

  fetchTransportLinks!: (value: TransportData) => Promise<Location[]>;

  saveLocation!: (location?: Location) => void;

  get lookupLocationId() {
    return this.locationId;
  }

  set lookupLocationId(value) {
    this.changeLocation(value);
  }

  get locationModel(): Location | undefined {
    return this.location;
  }

  set locationModel(value: Location | undefined) {
    this.setLocation(value);
  }

  setLocation(location?: Location) {
    this.saveLocation(location);
  }

  async setLocationId(locationId: number) {
    this.locationId = locationId;
    await this.fetchLocationTransport(locationId);
  }

  async filterLocations(value: string) {
    await this.fetchLocations(value);
  }

  changeLocation(locationId: number) {
    if (locationId !== this.locationId) {
      this.$router.push(`/location/${locationId}`);
    }
    window.scrollTo(0, 0);
  }

  async selectTransport(transport: TransportData) {
    this.selectedTransport = transport;
    this.transportLinks = await this.fetchTransportLinks(transport);
  }

  onAddLink(linkId: number) {
    return this.addLink({
      locationId: this.locationId,
      linkId,
    });
  }

  onDeleteLink(linkId: number) {
    return this.deleteLink({
      locationId: this.locationId,
      linkId,
    });
  }

  async created() {
    await this.filterLocations('');
  }

  mounted() {
    this.setLocationId(Number(this.$route.params.locationId));
  }

  @Watch('locationId')
  onLocationIdChange(value: number) {
    return this.fetchLocation(value);
  }

  @Watch('$route')
  onRouteChange(value: Route) {
    this.setLocationId(Number(value.params.locationId));
  }
}
export default Home;
</script>
