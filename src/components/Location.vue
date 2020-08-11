<template>
  <v-container>
    <v-toolbar
      light
      flat
    >
      <v-btn
        color="primary"
        dark
        @click="save"
      >
        Сохранить
      </v-btn>
    </v-toolbar>
    <v-text-field
      label="Название"
      v-model="name"
    ></v-text-field>
    <v-textarea
      label="Описание"
      v-model="description"
    ></v-textarea>
    <v-data-table
      :headers="linksHeaders"
      :items="links"
      :items-per-page="5"
    >
      <template v-slot:top>
        <v-toolbar
          light
          flat
        >
          <v-toolbar-title>
            Переходы
          </v-toolbar-title>
          <v-spacer />
          <add-link-dialog
            :defaultItem="defaultLocation"
            @save="addLink"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark
                v-on="on"
              >
                Добавить
              </v-btn>
            </template>
          </add-link-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.locationId="{ item, value }">
        {{ item }}
        {{ value }}

        {{ item.locationName }}
        <v-edit-dialog
          :return-value.sync="item.locationId"
        >
          <template v-slot:input>
            {{ item.locationId }}
            {{ item.locationName }}
            <location-lookup v-model="value" />
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <delete-link-dialog
          :item="item"
          @delete="deleteLink"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              class="mr-2"
              icon
              text
              v-on="on"
            >
              <v-icon
                small
              >
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
        </delete-link-dialog>
        <v-btn
          class="mr-2"
          icon
          text
          @click="goLocation(item)"
        >
          <v-icon
            small
          >
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-toolbar id="db-navigator-1">
      <v-toolbar-items>
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Location } from '@/store/modules/locations/types';
import Component from "vue-class-component";
import {Watch} from "vue-property-decorator";

interface DataHeader {
  text: string,
  value: string,
  sortable?: boolean,
}

interface LocationData {
  locationId?: number,
  name?: string,
  description?: string,

  defaultLocation: Location,
  linksHeaders: DataHeader[],
}

@Component({
  components: {
    AddLinkDialog: () => import('@/modals/AddLink.vue'),
    DeleteLinkDialog: () => import('@/modals/DeleteLink.vue'),
    LocationLookup: () => import('@/components/LocationLookup.vue'),
  },
  props: [
    'value',
  ],
})
export default class LocationComponent extends Vue {
  value!: { links: any };

  locationId?: number;

  name?: string;

  description?: string;

  defaultLocation: Location = {
    locationId: 0,
    locationName: '',
    description: '',
  };

  linksHeaders: DataHeader[] = [
    { text: 'Переход', value: 'locationId' },
    { text: 'Действия', value: 'actions', sortable: false },
  ];

  get links() {
    return this.value.links;
  }

  setLocation(location: Location) {
    const {
      locationId,
      locationName,
      description,
    } = location;
    this.locationId = locationId;
    this.name = locationName;
    this.description = description;
  }

  save() {
    this.$emit('input', {
      locationId: this.locationId,
      locationName: this.name,
      description: this.description,
    });
  }

  addLink(link: Location) {
    this.$emit('addLink', link.locationId);
  }

  goLocation(item: Location) {
    this.$emit('changeLocation', item.locationId);
  }

  deleteLink(link: Location) {
    this.$emit('deleteLink', link.locationId);
  }

  setLink(link: Location) {
    console.log(link);
  }

  @Watch('value')
  onValue(location: Location) {
    this.setLocation(location);
  }

  @Watch('links')
  onLinks(value: any) {
    console.log(value);
  }

  mounted() {
    this.setLocation(this.value);
  }
}
</script>

<style scoped>

</style>
