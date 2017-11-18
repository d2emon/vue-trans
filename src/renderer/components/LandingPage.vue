<template>
  <div id="wrapper">
    <main>
      <b-row>
        <b-col md="6">
          <location></location> 
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
import Location from './Location'

export default {
  name: 'landing-page',
  components: {
    Location
  },
  data () {
    return {
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
    goTransport () {
      alert('dmData.tbLocations.FindKey([dmData.tbTransportLinksLocationId.Value]);')
    },
    selectTransport () {
      alert('dmData.tbTransport.FindKey([dmData.tbTransportHereTransportId.Value]);')
    },
    addPoint () {
      // dmData.tbTransportLinks.Append;
      alert('dmData.tbTransportLinksLocationId.Value := dmData.tbLocationsId.Value;')
    }
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

main {
  /* display: flex; */
  /* justify-content: space-between; */
}

/* main > div { flex-basis: 50%; } */
</style>
