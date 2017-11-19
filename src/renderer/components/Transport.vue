<template>
  <b-card>
    <transport-list></transport-list>
    <transport-path></transport-path>
  </b-card>
</template>

<script>
import TransportList from './TransportList'
import TransportPath from './TransportPath'

export default {
  name: 'transport',
  components: {
    TransportList,
    TransportPath
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
