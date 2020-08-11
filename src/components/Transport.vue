<template>
  <v-data-table
    :headers="transportHeaders"
    :items="transport"
    :items-per-page="10"
  >
    <template v-slot:top>
    </template>
    <template v-slot:item.routeId="{ item }">
      <v-btn
        @click="select(item)"
      >
        {{ item.routeId }}
      </v-btn>
    </template>
    <template v-slot:item.actions="{ }">
      <v-btn
        class="mr-2"
        icon
        text
      >
        <v-icon
          small
        >
          mdi-delete
        </v-icon>
      </v-btn>
      <v-btn
        class="mr-2"
        icon
        text
      >
        <v-icon
          small
        >
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { TransportData } from '@/store/modules/locations/types';

interface DataHeader {
  text: string;
  value: string;
  sortable?: boolean;
}

@Component({
  props: [
    'transport',
  ],
})
export default class LocationComponent extends Vue {
  transport!: TransportData[];

  transportHeaders: DataHeader[] = [
    { text: 'Вид', value: 'transportType' },
    { text: '№', value: 'routeId' },
    { text: 'Действия', value: 'actions', sortable: false },
  ];

  select(transport: TransportData) {
    this.$emit('change', transport);
  }
}
</script>
