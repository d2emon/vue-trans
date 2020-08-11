<template>
  <v-card class="main-form">
    <v-container>
      <v-row>
        <v-col md="5">
          <v-row>
            <v-container>
              <location-lookup v-model="locationId" />
              <v-card>
                <v-container>
                  <location
                    v-if="location"
                    :value="location"
                    @input="setLocation"
                    @changeLocation="changeLocation"
                    @search="filterLocations"
                    @addLink="onAddLink"
                    @deleteLink="onDeleteLink"
                  />
                </v-container>
              </v-card>
            </v-container>
          </v-row>
        </v-col>
        <v-col md="7">
          <v-row>
            <v-toolbar
              light
              flat
            >
              <v-toolbar-title>
                Транспорт
              </v-toolbar-title>
              <v-spacer />
              <v-btn
                color="primary"
                dark
              >
                Добавить
              </v-btn>
            </v-toolbar>
            <v-container>
              <v-card>
                <v-row>
                  <v-col md="6">
                    <transport
                      :transport="currentTransport || []"
                      @change="selectTransport"
                    />
                  </v-col>
                  <v-col md="6">
                    <transport
                      :transport="transport || []"
                      @change="selectTransport"
                    />
                    <v-toolbar id="db-navigator-3">
                      <v-toolbar-items>
                        <v-btn
                          id="button-1"
                        >
                          Button1
                        </v-btn>
                      </v-toolbar-items>
                    </v-toolbar>
                  </v-col>
                </v-row>
                <v-data-table
                  v-if="selectedTransport"
                  :headers="transportLinksHeaders"
                  :items="transportLinks"
                  :items-per-page="15"
                >
                  <template v-slot:top>
                    <v-toolbar
                      light
                      flat
                    >
                      <v-toolbar-title>
                        {{ selectedTransport.transportType }}
                        №{{ selectedTransport.routeId}}
                      </v-toolbar-title>
                    </v-toolbar>
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-btn
                      class="mr-2"
                      icon
                      text
                      :disabled="item.locationId === locationId"
                      @click="changeLocation(item.locationId)"
                    >
                      <v-icon
                        small
                      >
                        mdi-arrow-right
                      </v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-card>
            </v-container>
          </v-row>
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
    LocationLookup: () => import('@/components/LocationLookup.vue'),
    Location: () => import('@/components/Location.vue'),
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
export default class MainPage extends Vue {
  location!: Location | undefined;

  transport!: TransportData[];

  currentTransport!: TransportData[] | undefined;

  selectedTransport: TransportData | null = null;

  get locationModel() {
    return this.location;
  }

  set locationModel(value) {
    console.log(value, this);
  }

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
</script>

<style scoped>
</style>
