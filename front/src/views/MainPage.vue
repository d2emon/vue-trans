<template>
  <div id="wrapper">
    <main>
      <v-row>
        <v-col class="md6">
          <location
            :value="location"
            v-on:select="selectLocation"
          />
        </v-col>
        <v-col class="md6">
          <transport
            :location="location"
            v-on:go="selectLocation"
          />
        </v-col>
      </v-row>
    </main>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  components: {
    Location: () => import('@/components/Location'),
    Transport: () => import('@/components/Transport'),
  },
  data: () => ({
    location: null,
  }),
  methods: {
    open (link) {
      // this.$electron.shell.openExternal(link)
    },
    selectLocation (location) {
      this.location = location
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
