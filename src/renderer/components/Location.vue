<template>
  <div>
    <b-row>
      <b-col>
        <b-card>
        <div slot="header">
        <b-button-toolbar>
          <b-button-group class="mx-1">
            <b-btn :disabled="locationId <= 0" @click="selectLocation(0)">&laquo;</b-btn>
            <b-btn :disabled="locationId <= 0" @click="selectLocation(locationId - 1)">&lsaquo;</b-btn>
          </b-button-group>
          <b-dropdown class="mx-1" :text="location.title">
            <b-dropdown-item v-for="(l, index) in locations" @click="selectLocation(index)">{{ l.title }}</b-dropdown-item>
          </b-dropdown>
          <b-button-group class="mx-1">
            <b-btn @click="addLocation">Add</b-btn>
          </b-button-group>
          <b-button-group class="mx-1">
            <b-btn :disabled="locationId >= locations.length - 1" @click="selectLocation(locationId + 1)">&rsaquo;</b-btn>
            <b-btn :disabled="locationId >= locations.length - 1" @click="selectLocation(locations.length - 1)">&raquo;</b-btn>
          </b-button-group>
        </b-button-toolbar>
        </div>
        <b-form @submit="formSubmit">
          <b-form-group label-for="locationIndex">
            <b-form-input id="loocationIndex" type="text" :value="locationId + ' of ' + locations.length" plaintext></b-form-input>
          </b-form-group>  
          <b-form-group label-for="location">
            <b-form-input id="location" type="text" :value="location" plaintext></b-form-input>
          </b-form-group>  
          <b-form-group label-for="field1">
            <b-form-input id="field1" type="text" v-model="location.id" plaintext></b-form-input>
          </b-form-group>  
          <b-form-group label-for="field2">
            <b-form-input id="field2" type="text" v-model="location.title"></b-form-input>
          </b-form-group>  
          <b-form-group label-for="field3">
            <b-form-textarea id="field3" v-model="location.description" :rows="5"></b-form-textarea>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="secondary">Reset</b-button>
        </b-form>
        <div slot="footer">
          <link-list :location="location" :locations="locations" v-on:go="goLocation" v-on:update="fetchData"></link-list>
        </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import LinkList from './LinkList'

var Db = require('../store/db.js')

export default {
  name: 'location',
  components: {
    LinkList
  },
  computed: {
    locationId () {
      return this.locations.indexOf(this.location)
    }
  },
  data () {
    return {
      selected: null,

      location: new Db.LocationModel(),
      locations: [],

      editingLink: false,
      linkData: { fromLocation: null, toLocation: null },
      link: null,
      links: []
    }
  },
  methods: {
    formSubmit () {
      var doc = this
      this.location.save(function (err) {
        if (err) {
          alert(err)
          return
        }

        alert(doc.location)
        doc.fetchData()
      })
    },
    loadLocation (location) {
      this.location = location

      var doc = this
      Db.LinkModel.find({ $or: [
        { 'fromLocation._id': location.id },
        { 'toLocation._id': location.id }
      ]}, function (err, models) {
        if (err) {
          alert(err)
          return
        }

        doc.links = models
      })
    },
    selectLocation (id) {
      this.loadLocation(this.locations[id])
    },
    goLocation (link) {
      if (this.fromHere(link)) {
        this.loadLocation(link.toLocation)
      } else {
        this.loadLocation(link.fromLocation)
      }
    },
    goTransport () {
      alert('dmData.tbLocations.FindKey([dmData.tbTransportLinksLocationId.Value]);')
    },
    selectTransport () {
      alert('dmData.tbTransport.FindKey([dmData.tbTransportHereTransportId.Value]);')
    },
    addLocation () {
      this.location = new Db.LocationModel()
    },
    fromHere (link) {
      if (!this.location) { return false }
      if (!link.fromLocation) { return false }
      return (this.location.id === link.fromLocation.id)
    },
    editLink (id) {
      if (!id) {
        this.loadLink(new Db.LinkModel({ fromLocation: this.location, toLocation: null }))
        return
      }

      var doc = this
      Db.LinkModel.findById(id, function (err, model) {
        if (err) {
          alert(err)
          return
        }

        doc.loadLink(model)
      })
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
      this.editingLink = false
    },
    addPoint () {
      // dmData.tbTransportLinks.Append;
      alert('dmData.tbTransportLinksLocationId.Value := dmData.tbLocationsId.Value;')
    },
    fetchData () {
      var doc = this
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
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style>
</style>

