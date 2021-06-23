<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
    >
      {{ value ? value.locationName : 'Неизвестно' }}
      <v-spacer />
      <v-btn
        v-if="!isEditing"
        text
        @click="edit"
      >
        Редактировать
      </v-btn>
    </v-toolbar>

    <v-container
      v-if="isEditing"
    >
      <location-form
        :value="value"
        @input="save"
        @cancel="cancelEdit"
      />
    </v-container>
    <v-container v-else-if="value">
      <v-row>
        <v-col>
          <v-card-title>
            {{ value.locationName }}
          </v-card-title>
          <v-card-text v-html="value.description" />
        </v-col>
        <v-col>
          <v-container>
            <v-card>
              <location-links
                :links="links"
                @addLink="addLink"
                @deleteLink="deleteLink"
                @input="onChange"
              />
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
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
    LocationForm: () => import('@/components/forms/LocationForm.vue'),
    LocationLinks: () => import('@/components/LocationLinks.vue'),
  },
  props: [
    'value',
  ],
})
class LocationComponent extends Vue {
  value!: Location;

  isEditing = false;

  locationId = 0;

  name = '';

  description = '';

  defaultLocation: Location = {
    locationId: 0,
    locationName: '',
    description: '',
  };

  get links(): Location[] | undefined {
    return this.value.links;
  }

  setLocation(location: Location) {
    const {
      locationId,
      locationName,
      description,
    } = location;
    this.locationId = locationId || 0;
    this.name = locationName || '';
    this.description = description || '';
  }

  edit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  save(value: Location) {
    this.$emit('input', value);
    this.isEditing = false;
  }

  addLink(link: Location) {
    this.$emit('addLink', link.locationId);
  }

  deleteLink(link: Location) {
    this.$emit('deleteLink', link.locationId);
  }

  onChange(value: Location) {
    this.$emit('input', value);
  }

  @Watch('value')
  onValue(location: Location) {
    this.setLocation(location);
  }

  @Watch('links')
  onLinks(value?: Location[]) {
    console.log(value, this.links);
  }

  mounted() {
    this.setLocation(this.value);
  }
}
export default LocationComponent;
</script>

<style scoped>

</style>
