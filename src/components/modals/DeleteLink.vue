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
        <span class="headline">Удаление перехода</span>
      </v-card-title>
      <v-card-text>
        Вы действительно хотите удалить переход?
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="show = false"
        >
          Отмена
        </v-btn>
        <v-btn
          color="error"
          text
          @click="deleteLink"
        >
          Удалить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteLink',
  data: () => ({
    show: false,
  }),
  methods: {
    deleteLink() {
      this.$emit('delete', this.item);
      this.show = false;
    },
  },
  props: [
    'item',
  ],
};
</script>

<style scoped>

</style>
