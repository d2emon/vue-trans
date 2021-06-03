<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-toolbar-title class="headline text-uppercase">
      <span>Transport</span>
    </v-toolbar-title>

    <template
      v-for="(item, itemId) in menu"
    >
      <v-menu
        v-if="item.items"
        :key="itemId"
        offset-y
        open-on-hover
      >
        <template
          v-slot:activator="{ on }"
        >
          <v-btn
            text
            v-on="on"
          >
            {{ item.title }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(subItem, subItemId) in item.items"
            :key="subItemId"
            :to="subItem.to"
          >
            <v-list-item-title>
              {{ subItem.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        v-else
        :key="itemId"
        text
        :to="item.to"
      >
        {{ item.title }}
      </v-btn>
    </template>

    <v-spacer></v-spacer>

  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { MenuItem } from '@/data/mainMenu';

@Component
class AppHeader extends Vue {
  @Prop({ type: Array, default: [] })
  menu!: MenuItem[];
}

export default AppHeader;
</script>
