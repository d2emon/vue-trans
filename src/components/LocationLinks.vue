<template>
  <v-data-table
    :headers="linksHeaders"
    :items="links"
    :items-per-page="5"
  >
    <template v-slot:top>
      <v-toolbar
        dark
        color="primary"
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
              text
              v-on="on"
            >
              Добавить
            </v-btn>
          </template>
        </add-link-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.locationId="{ item, value }">
      <router-link
        :to="`/location/${item.locationId}`"
      >
        {{ item.locationName }}
      </router-link>
      <v-edit-dialog
        :return-value.sync="item.locationId"
      >
        <template v-slot:input>
          <link-form
            :value="value"
            @input="onChange"
          />
        </template>
      </v-edit-dialog>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn
        class="mr-2"
        icon
        text
      >
        <v-icon
          small
        >
          mdi-pencil
        </v-icon>
      </v-btn>
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
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {
  Prop,
} from 'vue-property-decorator';
import { Location } from '@/store/modules/locations/types';

interface DataHeader {
  text: string;
  value: string;
  sortable?: boolean;
}

@Component({
  components: {
    AddLinkDialog: () => import('@/components/modals/AddLink.vue'),
    DeleteLinkDialog: () => import('@/components/modals/DeleteLink.vue'),
    LocationLookup: () => import('@/components/LocationLookup.vue'),
    LinkForm: () => import('@/components/forms/LinkForm.vue'),
  },
})
class LocationLinks extends Vue {
  @Prop({ type: Array })
  links!: Location[] | undefined;

  defaultLocation: Location = {
    locationId: 0,
    locationName: '',
    description: '',
  };

  linksHeaders: DataHeader[] = [
    { text: 'Переход', value: 'locationId' },
    { text: 'Действия', value: 'actions', sortable: false },
  ];

  addLink(link: Location) {
    this.$emit('addLink', link);
  }

  deleteLink(link: Location) {
    this.$emit('deleteLink', link);
  }

  onChange(value: Location) {
    this.$emit('input', value);
  }
}
export default LocationLinks;
</script>

<style scoped>

</style>
