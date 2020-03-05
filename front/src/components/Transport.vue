<template>
  <v-card>
    <v-toolbar>
      <v-btn @click="editTransport(null)" title="Add transport"><i class="fa fa-sm fa-plus"></i></v-btn>
    </v-toolbar>

    <!-- v-modal id="transportEditor" title="Editing transport" v-model="editingTransport" @ok="transportSubmit">
      <b-form>
        <b-form-group label-for="transportTitle" v-if="transport">
          <b-form-input id="transportTitle" type="text" v-model="transport.title"></b-form-input>
        </b-form-group>
      </b-form>
    </v-modal -->

    <v-container>
      <v-row>
        <v-col md="6">
          <transport-list :transport="transport" :transports="transportHere" v-on:select="selectTransport" v-on:edit="editTransport" v-on:delete="deleteTransport"></transport-list>
        </v-col>
        <v-col md="6">
          <transport-list :transport="transport" :transports="transports" v-on:select="selectTransport" v-on:edit="editTransport" v-on:update="fetchData"></transport-list>
        </v-col>
      </v-row>
    </v-container>

    <v-card-actions>
      <transport-path v-if="transport" :transport="transport" :location="location" v-on:go="goTransport"></transport-path>
    </v-card-actions>
  </v-card>
</template>

<script>
import TransportList from './TransportList'
import TransportPath from './TransportPath'

// var Db = require('../services/db.js')

export default {
  name: 'transport',
  components: {
    TransportList,
    TransportPath
  },
  props: [
    'location',
  ],
  data: () => ({
    editingTransport: false,
    transport: null,
    transports: [],
    transportHere: []
  }),
  methods: {
    goTransport (link) {
      this.$emit('go', link)
    },
    selectTransport (transport) {
      this.transport = transport
    },
    editTransport (transport) {
      this.editingTransport = true
      this.selectTransport(transport)
    },
    deleteTransport (id) {
      // this.editTransport(id)
      alert(id)
    },
    transportSubmit () {
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

        /*
      Db.TransportModel.find({}, function (err, models) {
        if (err) {
          alert(err)
          return
        }

        doc.transports = models
      })

      Db.TransportModel.find({}, function (err, models) {
        if (err) {
          alert(err)
          return
        }

        doc.transportHere = models
      })
         */
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style>
</style>
