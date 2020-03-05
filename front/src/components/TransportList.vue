<template>
  <div>
    <b-nav vertical pills v-if="transports.length > 0">
      <b-nav-item v-for="trans in transports" :active="transport === trans">
        <a @click="selectTransport(trans)">{{ trans.title }}</a>
        <sup>
          <a @click="editTransport(trans.id)" title="Edit transport"><i class="fa fa-sm fa-edit"></i></a>
          <a @click="deleteTransport(trans.id)" title="Delete transport"><i class="fa fa-sm fa-trash"></i></a>
        </sup>
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>

var Db = require('../services/db.js')

export default {
  name: 'transport-list',
  props: ['transport', 'transports'],
  data () {
    return {
    }
  },
  methods: {
    selectTransport (trans) {
      // this.transport = trans
      // console.log(this.transport)
      // alert('dmData.tbTransport.FindKey([dmData.tbTransportHereTransportId.Value]);')
      this.$emit('select', trans)
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
    deleteTransport (id) {
      this.$emit('delete', id)
    },
    loadTransport (trans) {
      this.$emit('edit', trans)
    }
  }
}
</script>

<style>
</style>

