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
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        {{ text }}
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

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
  name: 'DeleteLink',
})
class DeleteLink extends Vue {
  @Prop({ type: String, default: 'Удаление перехода' })
  title!: string;

  @Prop({ type: String, default: 'Вы действительно хотите удалить переход?' })
  text!: string;

  @Prop({ type: Object })
  item!: Record<string, any>;

  show = false;

  deleteLink() {
    this.$emit('delete', this.item);
    this.show = false;
  }
}

export default DeleteLink;
</script>

<style scoped>

</style>
