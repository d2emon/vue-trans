<template>
  <v-card>
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
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import {
  Location,
  TransportData,
} from '@/store/modules/locations/types';

@Component({
  components: {
    Transport: () => import('@/components/Transport.vue'),
  },
})
class TransportDataComponent extends Vue {
  @Prop({ type: Number, default: 0 })
  locationId!: number;

  @Prop({ type: Array, default: [] })
  transport!: TransportData[];

  @Prop({ type: Array, default: [] })
  currentTransport!: TransportData[];

  @Prop({ type: Object })
  selectedTransport!: TransportData | null;

  @Prop({ type: Array, default: [] })
  transportLinks!: Location[];

  transportLinksHeaders = [
    { text: 'Переход', value: 'locationName' },
    { text: 'Действия', value: 'actions', sortable: false },
  ];

  selectTransport(transport: TransportData) {
    this.$emit('selectTransport', transport);
  }

  changeLocation(locationId: number) {
    this.$emit('changeLocation', locationId);
  }
}
export default TransportDataComponent;
</script>

<style scoped>

</style>
