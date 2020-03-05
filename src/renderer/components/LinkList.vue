<template>
  <div>
    <b-modal id="linkEditor" :title="location.title" v-model="editingLink" @ok="linkSubmit">
      <b-form>
        <b-form-group label-for="linkFrom">
          <b-form-select id="linkFrom" v-model="linkData.fromLocation">
            <template slot="first">
              <option :value="null">Please select an option</option>
            </template>
            <option v-for="l in locations" :value="l.id">{{ l.title }}</option>
          </b-form-select>
        </b-form-group>
        <b-form-group label-for="linkTo">
          <b-form-select id="linkTo" v-model="linkData.toLocation">
            <template slot="first">
              <option :value="null">Please select an option</option>
            </template>
            <option v-for="l in locations" :value="l.id">{{ l.title }}</option>
          </b-form-select>
        </b-form-group>
      </b-form>
    </b-modal>
    <b-button-toolbar>
      <b-button-group class="mx-1">
        <b-btn @click="editLink(null)">Add</b-btn>
      </b-button-group>
    </b-button-toolbar>
    <b-nav vertical>
      <b-nav-item v-for="link in links">
        <a @click="goLocation(link)">
          <span v-if="fromHere(link)">{{ link.toLocation.title }}</span>
          <span v-else>From: {{ link.fromLocation.title }}</span>
        </a>
        <sup>
          <a @click="editLink(link.id)" title="Edit link"><i class="fa fa-sm fa-edit"></i></a>
          <a @click="editLink(link.id)" title="Delete link"><i class="fa fa-sm fa-trash"></i></a>
        </sup>
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
var Db = require('../store/db.js')

export default {
  name: 'link-list',
  props: ['location', 'locations'],
  data () {
    return {
      selected: null,

      editingLink: false,
      linkData: { fromLocation: null, toLocation: null },
      link: null,
      links: []
    }
  },
  methods: {
    goLocation (link) {
      this.$emit('go', link)
    },
    fromHere (link) {
      return link.fromHere(this.location)
    },
    editLink (id) {
      if (!id) {
        this.loadLink(new Db.LinkModel({ fromLocation: this.location, toLocation: null }))
        return
      }

      var doc = this
      Db.LinkModel.findById(id, function (err, model) {
        if (err) {
          alert(err)
          return
        }

        doc.loadLink(model)
      })
    },
    loadLink (link) {
      this.link = link
      this.editingLink = true
      if (link.fromLocation) {
        this.linkData.fromLocation = link.fromLocation.id
      } else {
        this.linkData.fromLocation = null
      }
      if (link.toLocation) {
        this.linkData.toLocation = link.toLocation.id
      } else {
        this.linkData.toLocation = null
      }
    },
    linkSubmit () {
      var doc = this
      var link = this.link
      Db.LocationModel.findById(this.linkData.fromLocation, function (err, model) {
        if (err) {
          alert(err)
          return
        }

        link.fromLocation = model
        link.save(function (err) {
          if (err) {
            alert(err)
            return
          }

          doc.$emit('update')
        })
      })
      Db.LocationModel.findById(this.linkData.toLocation, function (err, model) {
        if (err) {
          alert(err)
          return
        }

        link.toLocation = model
        link.save(function (err) {
          if (err) {
            alert(err)
            return
          }

          doc.$emit('update')
        })
      })
      this.editingLink = false
    }
  },
  watch: {
    location: function (val) {
      var doc = this
      val.getLinks(function (err, models) {
        if (err) {
          alert(err)
          return
        }

        doc.links = models
      })
    }
  }
}
</script>

<style>
</style>

