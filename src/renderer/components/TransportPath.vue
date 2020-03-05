<template>
  <div>
    <b-button-toolbar>
      <b-btn @click="addPoint">Add point</b-btn>
    </b-button-toolbar>
    <b-row>
      <b-nav vertical>
        <b-nav-item v-for="link in transport.locations">
          <a @click="goTransport(link)">{{ link.title }}</a>
          <sup>
            <a @click="editTransport(link.id)" title="Edit transport"><i class="fa fa-edit"></i></a>
            <a @click="deleteTransport(link.id)" title="Delete transport"><i class="fa fa-trash"></i></a>
          </sup>
        </b-nav-item>
      </b-nav>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'transport-path',
  props: [
    'transport',
    'location'
  ],
  data () {
    return {
    }
  },
  methods: {
    goTransport (link) {
      this.$emit('go', link)
    },
    editTransport (transport) {
    },
    deleteTransport (id) {
    },
    addPoint () {
      this.transport.locations.push(this.location)
      var doc = this
      this.transport.save(function (err) {
        if (err) {
          alert(err)
          return
        }

        doc.$emit('update')
      })
    }
  }
}
</script>

<style>
</style>

