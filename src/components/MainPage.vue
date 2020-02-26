<template>
  <v-card class="main-form">
    <v-container>
      <v-row>
        <v-col md="5">
          <v-row>
            <v-container>
              <v-card>
                <v-container>
                  <v-text-field
                    id="db-text-1"
                    v-model="locations.id"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    id="db-edit-1"
                    v-model="locations.locationName"
                  ></v-text-field>
                  <v-textarea
                    id="db-memo-1"
                    v-model="locations.description"
                  ></v-textarea>
                  <v-data-table
                    id="db-grid-1"
                    :headers="links.headers"
                    :items="links.items"
                    :items-per-page="5"
                  ></v-data-table>
                  <v-toolbar id="db-navigator-1">
                    <v-toolbar-items>
                    </v-toolbar-items>
                  </v-toolbar>
                </v-container>
              </v-card>
            </v-container>
          </v-row>
        </v-col>
        <v-col md="7">
          <v-row>
            <v-container>
              <v-card>
                <v-row>
                  <v-col md="6">
                    <v-data-table
                      id="db-grid-2"
                      :headers="transportHere.headers"
                      :items="transportHere.items"
                      :items-per-page="5"
                    ></v-data-table>
                  </v-col>
                  <v-col md="6">
                    <v-data-table
                      id="db-grid-4"
                      :headers="transport.headers"
                      :items="transport.items"
                      :items-per-page="5"
                    ></v-data-table>
                    <v-toolbar id="db-navigator-3">
                      <v-toolbar-items>
                        <v-btn
                          id="button-1"
                        >
                          Button1
                        </v-btn>
                      </v-toolbar-items>
                    </v-toolbar>
                  </v-col>
                </v-row>
                <v-data-table
                  id="db-grid-3"
                  :headers="transportLinks.headers"
                  :items="transportLinks.items"
                  :items-per-page="5"
                ></v-data-table>
                <v-toolbar id="db-navigator-2">
                  <v-toolbar-items>
                  </v-toolbar-items>
                </v-toolbar>
              </v-card>
            </v-container>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  mapState,
  // mapMutations,
} from 'vuex';

/*
object fmMain: TfmMain
  object DBText1: TDBText
  end
  object DBEdit1: TDBEdit
  end
  object DBMemo1: TDBMemo
  end
  object DBGrid1: TDBGrid
  end
  object DBNavigator1: TDBNavigator
  end

  object DBGrid2: TDBGrid
  end
  object DBGrid3: TDBGrid
  end
  object DBNavigator2: TDBNavigator
  end
  object Button1: TButton
  end
  object DBGrid4: TDBGrid
  end

  object DBNavigator3: TDBNavigator
  end
end

 */

export default Vue.extend({
  name: 'MainPage',
  computed: {
    ...mapState(['location']),
    /*
    locationId() { return this.location.locationId; },
    locationName: {
      get() { return this.location.name; },
      set(value) { this.location.name = value; },
    },
     */
  },
  data: () => ({
    locations: {
      id: 1,
      locationName: 'name',
      description: 'description',
    },
    links: {
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      items: [],
    },
    transport: {
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      items: [],
    },
    transportHere: {
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      items: [],
    },
    transportLinks: {
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      items: [],
    },
  }),
});
</script>

<style scoped>
.main-form {
  /*
    Left = 192
    Top = 114
    Width = 578
    Height = 559
    Caption = 'fmMain'
    Color = clBtnFace
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -11
    Font.Name = 'MS Sans Serif'
    Font.Style = []
    OldCreateOrder = False
    DesignSize = (
    570
    525)
    PixelsPerInch = 96
    TextHeight = 13

   */
}
#db-text-1 {
  width: 337px;
  height: 17px;
  /*
    Left = 0
    Top = 0
    Width = 337
    Height = 17
    DataField = 'Id'
    DataSource = dmData.dsLocations
   */
}
#db-edit-1 {
  /*
    Left = 0
    Top = 24
    Width = 315
    Height = 21
    Anchors = [akLeft, akTop, akRight]
    DataField = 'LocationName'
    DataSource = dmData.dsLocations
    TabOrder = 0
   */
}
#db-memo-1 {
  /*
    Left = 0
    Top = 48
    Width = 315
    Height = 241
    Anchors = [akLeft, akTop, akRight]
    DataField = 'Description'
    DataSource = dmData.dsLocations
    TabOrder = 1
   */
}
#db-grid-1 {
  /*
    Left = 0
    Top = 292
    Width = 315
    Height = 200
    Anchors = [akLeft, akRight, akBottom]
    DataSource = dmData.dsLinks
    TabOrder = 2
    TitleFont.Charset = DEFAULT_CHARSET
    TitleFont.Color = clWindowText
    TitleFont.Height = -11
    TitleFont.Name = 'MS Sans Serif'
    TitleFont.Style = []
    OnDblClick = DBGrid1DblClick
    Columns = <
      item
        Expanded = False
        FieldName = 'ConnectName'
        Visible = True
      end>
   */
}
#db-navigator-1 {
  /*
    Left = 76
    Top = 496
    Width = 240
    Height = 25
    DataSource = dmData.dsLocations
    Anchors = [akRight, akBottom]
    TabOrder = 3
   */
}
#db-grid-2 {
  /*
    Left = 322
    Top = 0
    Width = 109
    Height = 120
    Anchors = [akTop, akRight]
    DataSource = dmData.dsTransportHere
    TabOrder = 4
    TitleFont.Charset = DEFAULT_CHARSET
    TitleFont.Color = clWindowText
    TitleFont.Height = -11
    TitleFont.Name = 'MS Sans Serif'
    TitleFont.Style = []
    OnDblClick = DBGrid2DblClick
    Columns = <
      item
        Expanded = False
        FieldName = 'TransCode'
        Visible = True
      end>
   */
}
#db-grid-3 {
  /*
    Left = 322
    Top = 120
    Width = 241
    Height = 305
    Anchors = [akTop, akRight, akBottom]
    DataSource = dmData.dsTransportLinks
    TabOrder = 5
    TitleFont.Charset = DEFAULT_CHARSET
    TitleFont.Color = clWindowText
    TitleFont.Height = -11
    TitleFont.Name = 'MS Sans Serif'
    TitleFont.Style = []
    OnDblClick = DBGrid3DblClick
    Columns = <
      item
        Expanded = False
        FieldName = 'LocationName'
        Visible = True
      end>
   */
}
#db-navigator-2 {
  /*
    Left = 322
    Top = 496
    Width = 240
    Height = 25
    DataSource = dmData.dsTransport
    Anchors = [akRight, akBottom]
    TabOrder = 6
   */
}
#button-1 {
  /*
    Left = 491
    Top = 464
    Width = 75
    Height = 25
    Anchors = [akRight, akBottom]
    Caption = 'Button1'
    TabOrder = 7
    OnClick = Button1Click
   */
}
#db-grid-4 {
  /*
    Left = 438
    Top = 0
    Width = 121
    Height = 120
    Anchors = [akTop, akRight]
    DataSource = dmData.dsTransport
    TabOrder = 8
    TitleFont.Charset = DEFAULT_CHARSET
    TitleFont.Color = clWindowText
    TitleFont.Height = -11
    TitleFont.Name = 'MS Sans Serif'
    TitleFont.Style = []
    Columns = <
      item
        Expanded = False
        FieldName = 'TransCode'
        Width = 104
        Visible = True
      end
      item
        Expanded = False
        FieldName = 'Weight'
        Visible = True
      end>
   */
}
#db-navigator-3 {
  /*
    Left = 326
    Top = 432
    Width = 240
    Height = 25
    DataSource = dmData.dsTransportLinks
    Anchors = [akRight, akBottom]
    TabOrder = 9
   */
}
</style>
