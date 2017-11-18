<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <b-row>
        <b-col md="6">
          <b-row>
            <b-col>
              <b-form @submit="formSubmit">
                <b-form-group label-for="field1">
                  <b-form-input id="field1" type="text" v-model="location.id" plaintext></b-form-input>
                </b-form-group>  
                <b-form-group label-for="field2">
                  <b-form-input id="field2" type="text" v-model="location.name"></b-form-input>
                </b-form-group>  
                <b-form-group label-for="field3">
                  <b-form-textarea id="field3" v-model="location.description" :rows="5"></b-form-textarea>
                </b-form-group>  
              </b-form>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-nav vertical>
                <b-nav-item v-for="link in links" @click="goLocation">{{ link.name }}</b-nav-item>
              </b-nav>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              {{ location }}
              <b-button-toolbar>
                <b-button-group>
                  <b-btn>First</b-btn>
                  <b-btn>Second</b-btn>
                  <b-btn>Third</b-btn>
                </b-button-group> 
              </b-button-toolbar>
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
export default {
  name: 'landing-page',
  data () {
    return {
      location: {
        id: 'id',
        name: 'LocationName',
        description: 'Description'
      },
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
      links: [
        { name: 'ConnectName 1' },
        { name: 'ConnectName 2' },
        { name: 'ConnectName 3' }
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
    formSubmit () {
      alert('Submit')
    },
    goLocation () {
      alert('dmData.tbLocations.FindKey([dmData.tbLinksConnectId.Value]);')
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
