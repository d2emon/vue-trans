<template>
  <v-dialog
    v-model="show"
    max-width="500px"
  >
    <template v-slot:activator="{ on }">
      <slot
        name="activator"
        v-bind:on="on"
      />
    </template>

    <v-card>
      <v-card-title>
        <span class="headline">{{title}}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <location-lookup v-model="itemId" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="close"
        >
          Отмена
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="save"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  mapState,
} from 'vuex';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

@Component({
  components: {
    LocationLookup: () => import('@/components/LocationLookup.vue'),
  },
  computed: {
    ...mapState('locations', [
      'locations',
    ]),
  },
})
class AddLink extends Vue {
  @Prop({ type: String, default: 'Переход' })
  title!: string;

  @Prop({ type: Object })
  defaultItem!: Record<string, any>;

  item: any = null;

  locations!: any[];

  show = false;

  get itemId() {
    return this.item && this.item.locationId;
  }

  set itemId(value: any) {
    this.item = value && this.locations.find((item) => (item.locationId === value));
  }

  resetItem() {
    this.item = this.defaultItem;
  }

  close() {
    this.show = false;
    setTimeout(this.resetItem, 0);
  }

  save() {
    this.$emit('save', this.item);
    this.close();
  }

  mounted() {
    this.resetItem();
  }

  @Watch('show')
  onShowChange(value: boolean) {
    return value || this.close();
  }
}

export default AddLink;
</script>

<style scoped>

</style>
