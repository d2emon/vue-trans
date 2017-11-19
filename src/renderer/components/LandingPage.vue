<template>
  <div id="wrapper">
    <main>
      <b-row>
        <b-col md="6">
          <location></location> 
        </b-col>
        <b-col md="6">
          <transport></transport>
        </b-col>
      </b-row>
    </main>
  </div>
</template>

<script>
import Location from './Location'
import Transport from './Transport'

export default {
  name: 'landing-page',
  components: {
    Location,
    Transport
  },
  data () {
    return {
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style>

  #wrapper {
    height: 100vh;
    padding: 30px 0px;
    /* width: 100vw; */
  }

main {
  /* display: flex; */
  /* justify-content: space-between; */
  background:
    radial-gradient(
      ellipse at top left,
      rgba(255, 255, 255, 1) 40%,
      rgba(229, 229, 229, .9) 100%
    );
}

/* main > div { flex-basis: 50%; } */
</style>
