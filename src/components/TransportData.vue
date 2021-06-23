<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
    >
      <v-toolbar-title>
        Транспорт
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        text
      >
        Добавить
      </v-btn>
    </v-toolbar>
    <v-container>
      <v-row>
        <v-col md="6">
          <location-links
            v-if="selectedTransport"
            :title="`${selectedTransport.transportType} №${selectedTransport.routeId}`"
            :links="transportLinks"
            @addLink="addTransportLink"
            @deleteLink="deleteTransportLink"
            @input="onTransportChange"
          />
        </v-col>
        <v-col md="6">
          <transport
            :transport="currentTransport || []"
            @change="selectTransport"
          />
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
    LocationLinks: () => import('@/components/LocationLinks.vue'),
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

  addTransportLink(link: Location) {
    this.$emit('addTransportLink', link.locationId);
  }

  deleteTransportLink(link: Location) {
    this.$emit('deleteTransportLink', link.locationId);
  }

  onTransportChange(value: Location) {
    this.$emit('transportChange', value);
  }
}
export default TransportDataComponent;
</script>

<style scoped>

</style>
