<template>
  <v-card>
    <v-toolbar>
      <v-btn
        icon
        :disabled="locId <= 0"
        @click="selectLocation(0)"
      >&laquo;</v-btn>
      <v-btn
        icon
        :disabled="locId <= 0"
        @click="selectLocation(locId - 1)"
      >&lsaquo;</v-btn>
      <v-spacer />
      <v-btn
        icon
        @click="addLocation"
        title="Add location"
      >
        <i class="fa fa-sm fa-plus"></i>
      </v-btn>
      <v-spacer />
      <v-btn
        icon
        :disabled="locId >= locations.length - 1"
        @click="selectLocation(locId + 1)"
      >&rsaquo;</v-btn>
      <v-btn
        icon
        :disabled="locId >= locations.length - 1"
        @click="selectLocation(locations.length - 1)"
      >&raquo;</v-btn>
      <v-spacer />
      <v-btn
        icon
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <!-- b-dropdown class="mx-1" :text="loc.title">
        <b-dropdown-item v-for="(l, index) in locations" @click="selectLocation(index)">{{ l && l.title }}</b-dropdown-item>
      </b-dropdown -->
    </v-toolbar>

    <v-container>
      <v-form
        v-if="loc"
        @submit="formSubmit"
      >
        <v-text-field
          label="Title"
          v-model="loc.title"
        ></v-text-field>
        <v-textarea
          label="Description"
          v-model="loc.description"
          :rows="5"
        ></v-textarea>

        <v-btn
          type="submit"
          color="primary"
        >
          Submit
        </v-btn>
        <v-btn
          type="reset"
          color="error"
        >
          Reset
        </v-btn>
      </v-form>
    </v-container>

    <v-card-actions>
      <link-list
        :location="loc"
        :locations="locations"
        v-on:go="goLocation"
        v-on:update="fetchData"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

// var Db = require('../store/db.js')


export default {
  name: 'location',
  components: {
    LinkList: () => import('@/components/LinkList.vue'),
  },
  props: [
      'value',
  ],
  computed: {
    ...mapState('db', ['locationModel']),
    loc () { return this.value || this.locationModel; },
    locId () { return this.locations.indexOf(this.loc); },
  },
  data: () => ({
    selected: null,

    locations: [],

    link: null,
    links: [],
  }),
  methods: {
    formSubmit () {
      this.loc.save()
        .then(() => {
            console.log(this.loc);
            this.fetchData();
        })
        .catch(console.error);
    },
    loadLocation (loc) {
      this.loc = loc;
      this.linkModel.find(
        /*
        { $or: [
          { 'fromLocation._id': loc.id },
          { 'toLocation._id': loc.id }
        ]}
        */
      )
        .then((models) => {
          this.links = models;
        })
        .catch(console.error)
        .then(() => this.$emit('select', loc));
    },
    selectLocation (locId) {
      this.loadLocation(this.locations[locId])
    },
    goLocation (link) {
      this.loadLocation(
        this.fromHere(link)
          ? link.toLocation
          : link.fromLocation
      );
    },
    addLocation () {
      this.loc = this.locationModel;
    },
    fromHere (link) {
      if (!this.loc) { return false; }
      if (!link.fromLocation) { return false; }
      return (this.loc.id === link.fromLocation.id)
    },
    editLink (id) {
      if (!id) {
        // this.loadLink(new Db.LinkModel({ fromLocation: this.loc, toLocation: null }))
        return
      }

      var doc = this
      /*
      Db.LinkModel.findById(id, function (err, model) {
        if (err) {
          alert(err)
          return
        }

        doc.loadLink(model)
      })
       */
    },
    loadLink (link) {
      this.editingLink = true
      if (link.fromLocation) {
        this.linkData.fromLocation = link.fromLocation.id
      } else {
        this.linkData.fromLocation = null
      }
      if (link.toLocation) {
        this.linkData.toLocation = link.toLocation.id
      } else {
        this.linkData.toLocation = null
      }
    },
    linkSubmit () {
      var doc = this
      var link = this.link
      /*
      Db.LocationModel.findById(this.linkData.fromLocation, function (err, model) {
        if (err) {
          alert(err)
          return
        }

        link.fromLocation = model
        link.save(function (err) {
          if (err) {
            alert(err)
            return
          }

          doc.fetchData()
        })
      })
      Db.LocationModel.findById(this.linkData.toLocation, function (err, model) {
        if (err) {
          alert(err)
          return
        }

        link.toLocation = model
        link.save(function (err) {
          if (err) {
            alert(err)
            return
          }

          doc.fetchData()
        })
      })
      */
      this.editingLink = false
    },
    addPoint () {
      // dmData.tbTransportLinks.Append;
      alert('dmData.tbTransportLinksLocationId.Value := dmData.tbLocationsId.Value;')
    },
    fetchData () {
      var doc = this
        /*
      Db.LocationModel.find({}, function (err, models) {
        if (err) {
          alert(err)
          return
        }

        doc.locations = models
        if (models.length <= 0) {
          doc.loadLocation(new Db.LocationModel())
        } else {
          doc.loadLocation(models[0])
        }
      })
         */
    }
  },
  watch: {
    value: function (val) {
      this.loadLocation(val)
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style>
</style>

