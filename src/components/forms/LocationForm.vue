<template>
  <v-form>
    <v-text-field
      label="Название"
      v-model="name"
    ></v-text-field>

    <v-textarea
      label="Описание"
      v-model="description"
    ></v-textarea>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="error"
        @click="cancel"
      >
        Отменить
      </v-btn>
      <v-btn
        color="success"
        @click="save"
      >
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {
  Prop,
  Watch,
} from 'vue-property-decorator';
import { Location } from '@/store/modules/locations/types';

@Component
class LocationForm extends Vue {
  @Prop({ type: Object })
  value!: Location;

  locationId = 0;

  name = '';

  description = '';

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

  cancel() {
    this.$emit('cancel');
  }

  save() {
    this.$emit('input', {
      locationId: this.locationId,
      locationName: this.name,
      description: this.description,
    });
  }

  mounted() {
    this.setLocation(this.value);
  }

  @Watch('value')
  onValue(location: Location) {
    this.setLocation(location);
  }
}
export default LocationForm;
</script>

<style scoped>

</style>
