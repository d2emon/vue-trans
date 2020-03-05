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
        <span class="headline">Переход</span>
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
  mapActions,
  mapState,
} from 'vuex';

export default Vue.extend({
  name: 'AddLink',
  components: {
    LocationLookup: () => import('@/components/LocationLookup.vue'),
  },
  computed: {
    ...mapState('locations', [
      'locations',
    ]),
    itemId: {
      get() {
        return this.item && this.item.locationId;
      },
      set(value) {
        this.item = value && this.locations.find(item => (item.locationId === value));
      },
    },
  },
  data: () => ({
    item: null,
    show: false,
  }),
  methods: {
    resetItem() {
      this.item = this.defaultItem;
    },
    close() {
      this.show = false;
      setTimeout(this.resetItem, 0);
    },
    save() {
      this.$emit('save', this.item);
      this.close();
    },
  },
  props: [
    'defaultItem',
  ],
  watch: {
    show(value) {
      return value || this.close();
    },
  },
  mounted() {
    this.resetItem();
  },
});
</script>

<style scoped>

</style>
