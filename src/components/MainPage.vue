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
            <v-container>
              <v-card>
                <v-row>
                  <v-col md="6">
                    <v-data-table
                      id="db-grid-2"
                      :headers="transportHere.headers"
                      :items="transportHere.items"
                      :items-per-page="5"
                    ></v-data-table>
                  </v-col>
                  <v-col md="6">
                    <v-data-table
                      id="db-grid-4"
                      :headers="transport.headers"
                      :items="transport.items"
                      :items-per-page="5"
                    ></v-data-table>
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
                  id="db-grid-3"
                  :headers="transportLinks.headers"
                  :items="transportLinks.items"
                  :items-per-page="5"
                ></v-data-table>
                <v-toolbar id="db-navigator-2">
                  <v-toolbar-items>
                  </v-toolbar-items>
                </v-toolbar>
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
import { Location } from '@/store/modules/locations/types';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';

interface Link {
  name: string;
  locationName: string;
}

@Component({
  components: {
    LocationLookup: () => import('@/components/LocationLookup.vue'),
    Location: () => import('@/components/Location.vue'),
  },
  computed: {
    ...mapState('locations', [
      'location',
      'locations',
      'filtered',
    ]),
  },
  methods: {
    ...mapActions('locations', [
      'fetchLocation',
      'fetchLocations',
      'saveLocation',
      'addLink',
      'deleteLink',
    ]),
  },
})
export default class MainPage extends Vue {
  location!: Location | undefined;

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

  transport = {
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'left',
        sortable: false,
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Iron (%)', value: 'iron' },
    ],
    items: [],
  };

  transportHere = {
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'left',
        sortable: false,
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Iron (%)', value: 'iron' },
    ],
    items: [],
  };

  transportLinks = {
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'left',
        sortable: false,
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Iron (%)', value: 'iron' },
    ],
    items: [],
  };

  addLink!: (payload: {}) => void;

  deleteLink!: (payload: {}) => void;

  fetchLocations!: (value: string) => Promise<Location[]>;

  fetchLocation!: (value: number) => void;

  saveLocation!: (location: Location) => void;

  setLocation(location: Location) {
    this.saveLocation(location);
  }

  setLocationId(locationId: number) {
    this.locationId = locationId;
  }

  async filterLocations(value: string) {
    await this.fetchLocations(value);
  }

  changeLocation(locationId: number) {
    this.$router.push(`/location/${locationId}`);
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
    this.locationId = Number();
  }
}
</script>

<style scoped>
</style>
