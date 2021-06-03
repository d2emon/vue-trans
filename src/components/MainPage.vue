<template>
  <v-card class="main-form">
    <v-container>
      <v-row>
        <v-col>
          <v-container>
            <location-data
              :location-id="locationId"
              :location="location"
              @input="setLocation"
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
          <v-container>
            <transport-data-component
              :location-id="locationId"
              :transport="transport"
              :current-transport="currentTransport"
              :selected-transport="selectedTransport"
              :transport-links="transportLinks"
              @selectTransport="selectTransport"
              @changeLocation="changeLocation"
            />
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  mapActions,
  mapState,
} from 'vuex';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import {
  Location,
  TransportData,
} from '@/store/modules/locations/types';

interface Link {
  name: string;
  locationName: string;
}

@Component({
  components: {
    LocationData: () => import('@/components/LocationData.vue'),
    TransportDataComponent: () => import('@/components/TransportData.vue'),
    Transport: () => import('@/components/Transport.vue'),
  },
  computed: {
    ...mapState('locations', [
      'location',
      'locations',
      'filtered',
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
class MainPage extends Vue {
  location!: Location | undefined;

  transport!: TransportData[];

  currentTransport!: TransportData[] | undefined;

  selectedTransport: TransportData | null = null;

  locationId = 0;

  links: Link[] = [
    { name: 'link1', locationName: 'Name' },
    { name: 'link2', locationName: 'Name' },
    { name: 'link3', locationName: 'Name' },
    { name: 'link4', locationName: 'Name' },
  ];

  transportLinksHeaders = [
    { text: 'Переход', value: 'locationName' },
    { text: 'Действия', value: 'actions', sortable: false },
  ];

  transportLinks: Location[] = [];

  addLink!: (payload: {}) => void;

  deleteLink!: (payload: {}) => void;

  fetchLocations!: (value: string) => Promise<Location[]>;

  fetchLocationTransport!: (locationId: number) => Promise<TransportData[]>;

  fetchLocation!: (value: number) => void;

  fetchTransportLinks!: (value: TransportData) => Promise<Location[]>;

  saveLocation!: (location: Location) => void;

  setLocation(location: Location) {
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
export default MainPage;
</script>

<style scoped>
</style>
