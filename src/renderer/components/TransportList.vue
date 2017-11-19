<template>
  <div>
    <b-modal id="transportEditor" title="Editing transport" v-model="editingTransport" @ok="transportSubmit">
      <b-form>
        <b-form-group label-for="transportTitle" v-if="transport">
          <b-form-input id="transportTitle" type="text" v-model="transport.title"></b-form-input>
        </b-form-group>  
      </b-form>
    </b-modal>
    <b-button-toolbar>
      <b-button-group class="mx-1">
        <b-btn @click="editTransport(null)">Add</b-btn>
      </b-button-group> 
    </b-button-toolbar>
    <b-row>
      <b-col md="6">
        <b-nav vertical>
          <b-nav-item v-for="trans in transportHere">
            {{ trans.title }}
            <b-btn @click="editTransport(trans.id)">Edit</b-btn>
          </b-nav-item>
        </b-nav>
      </b-col>
      <b-col md="6">
        <b-nav vertical>
          <b-nav-item v-for="trans in transports">
            {{ trans.weight }}: {{ trans.title }}
            <b-btn @click="editTransport(trans.id)">Edit</b-btn>
          </b-nav-item>
        </b-nav>
      </b-col>
    </b-row>
  </div>
</template>

<script>

var Db = require('../store/db.js')

export default {
  name: 'transport-list',
  data () {
    return {
      editingTransport: false,

      transport: new Db.TransportModel(),
      transports: [],
      transportHere: []
    }
  },
  methods: {
    selectTransport () {
      alert('dmData.tbTransport.FindKey([dmData.tbTransportHereTransportId.Value]);')
    },
    editTransport (id) {
      if (!id) {
        this.loadTransport(new Db.TransportModel())
        return
      }

      var doc = this
      Db.TransportModel.findById(id, function (err, model) {
        if (err) {
          alert(err)
          return
        }

        doc.loadTransport(model)
      })
    },
    loadTransport (transport) {
      this.transport = transport
      this.editingTransport = true
    },
    transportSubmit () {
      console.log(this.transport)
      var doc = this
      this.transport.save(function (err) {
        if (err) {
          alert(err)
          return
        }

        doc.fetchData()
      })
    },
    fetchData () {
      var doc = this
      Db.TransportModel.find({}, function (err, models) {
        if (err) {
          alert(err)
          return
        }

        alert(models)
        doc.transports = models
        /*
        if (models.length <= 0) {
          doc.loadLocation(new Db.LocationModel())
        } else {
          doc.loadLocation(models[0])
        }
        */
      })
      Db.TransportModel.find({}, function (err, models) {
        if (err) {
          alert(err)
          return
        }

        alert(models)
        doc.transportHere = models
        /*
        if (models.length <= 0) {
          doc.loadLocation(new Db.LocationModel())
        } else {
          doc.loadLocation(models[0])
        }
        */
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

