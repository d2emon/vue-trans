<template>
  <v-form>
    <location-lookup
      :value="value"
      @change="onChange"
    />
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Location } from '@/store/modules/locations/types';

@Component({
  components: {
    LocationLookup: () => import('@/components/LocationLookup.vue'),
  },
})
class LinkForm extends Vue {
  @Prop({ type: Object })
  value!: Location;

  onChange(value: Location) {
    this.$emit('input', value);
  }
}
export default LinkForm;
</script>

<style scoped>

</style>
