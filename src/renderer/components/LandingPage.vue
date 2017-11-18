<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <b-row>
        <b-col md="6">
          <b-row>
            <b-col>
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
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-button-toolbar>
                <b-button-group class="mx-1">
                  <b-btn @click="editLink(null)">Add</b-btn>
                </b-button-group>
              </b-button-toolbar>
              <b-form v-if="editingLink" @submit="linkSubmit">
                <b-form-group label-for="linkFrom">
                  <b-form-select id="linkFrom" v-model="linkData.fromLocation">
                    <template slot="first">
                      <option :value="null">Please select an option</option>
                    </template>
                    <option v-for="l in locations" :value="l.id">{{ l.title }}</option>
                  </b-form-select>
                </b-form-group>
                <b-form-group label-for="linkTo">
                  <b-form-select id="linkTo" v-model="linkData.toLocation">
                    <template slot="first">
                      <option :value="null">Please select an option</option>
                    </template>
                    <option v-for="l in locations" :value="l.id">{{ l.title }}</option>
                  </b-form-select>
                </b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="secondary">Reset</b-button>
              </b-form>
              <b-nav vertical>
                <b-nav-item v-for="link in links">
                  <a @click="goLocation(link)">
                    <span v-if="fromHere(link)">{{ link.toLocation.title }}</span>
                    <span v-else>From: {{ link.fromLocation.title }}</span>
                  </a>
                  <b-btn @click="editLink(link.id)">Edit link</b-btn>
                </b-nav-item>
              </b-nav>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="6">
          <b-row>
            <b-col md="6">
              <b-nav vertical>
                <b-nav-item v-for="trans in transportHere">{{ trans.name }}</b-nav-item>
              </b-nav>
            </b-col>
            <b-col md="6">
              <b-nav vertical>
                <b-nav-item v-for="trans in transport">{{ trans.weight }}: {{ trans.name }}</b-nav-item>
              </b-nav>
            </b-col>
          </b-row>
          <b-row>
            <b-nav vertical>
              <b-nav-item v-for="link in transportLinks" @click="goTransport">{{ link.name }}</b-nav-item>
            </b-nav>
          </b-row>
          <b-row>
            <b-button-toolbar>
              {{ transport }}
              <b-button-group>
                <b-btn>First</b-btn>
                <b-btn>Second</b-btn>
                <b-btn>Third</b-btn>
              </b-button-group> 
            </b-button-toolbar>
          </b-row>
          <b-row>
            <b-button-toolbar>
              <b-btn @click="addPoint">Add point</b-btn>
            </b-button-toolbar>
          </b-row>
          <b-row>
            <b-button-toolbar>
              {{ transportLinks }}
              <b-button-group>
                <b-btn>First</b-btn>
                <b-btn>Second</b-btn>
                <b-btn>Third</b-btn>
              </b-button-group> 
            </b-button-toolbar>
          </b-row>
        </b-col>
      </b-row>
    </main>
  </div>
</template>

<script>
var Db = require('../store/db.js')

export default {
  name: 'landing-page',
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

      transport: [
        { name: 'TransCode 1', weight: 1 },
        { name: 'TransCode 2', weight: 2 },
        { name: 'TransCode 3', weight: 3 }
      ],
      transportHere: [
        { name: 'TransCode 1' },
        { name: 'TransCode 2' },
        { name: 'TransCode 3' }
      ],

      editingLink: false,
      linkData: { fromLocation: null, toLocation: null },
      link: null,
      links: [],
      transportLinks: [
        { name: 'ConnectName 4' },
        { name: 'ConnectName 5' },
        { name: 'ConnectName 6' }
      ]
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
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
      alert(location)
      Db.LinkModel.find({ $or: [
        { 'fromLocation._id': location.id },
        { 'toLocation._id': location.id }
      ]}, function (err, models) {
        if (err) {
          alert(err)
          return
        }

        alert(models)
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

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  /* display: flex; */
  /* justify-content: space-between; */
}

/* main > div { flex-basis: 50%; } */
</style>
