<template>
  <div>
    <b-button-toolbar>
      <b-btn @click="addPoint">Add point</b-btn>
    </b-button-toolbar>
    <b-row>
      <b-nav vertical>
        <b-nav-item v-for="link in transportLinks" @click="goTransport">{{ link.name }}</b-nav-item>
      </b-nav>
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
  </div>
</template>

<script>
export default {
  name: 'transport-path',
  data () {
    return {
      transportLinks: [
        { name: 'ConnectName 4' },
        { name: 'ConnectName 5' },
        { name: 'ConnectName 6' }
      ]
    }
  },
  methods: {
    goTransport () {
      alert('dmData.tbLocations.FindKey([dmData.tbTransportLinksLocationId.Value]);')
    },
    addPoint () {
      // dmData.tbTransportLinks.Append;
      alert('dmData.tbTransportLinksLocationId.Value := dmData.tbLocationsId.Value;')
    }
  }
}
</script>

<style>
</style>

