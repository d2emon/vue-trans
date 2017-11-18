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
                  <b-form-input id="field1" type="text" v-model="text1" plaintext></b-form-input>
                  <input class="form-control-plaintext" value="Plain Text Value" readonly type="text"></input>
                </b-form-group>  
                <b-form-group label-for="field2">
                  <b-form-input id="field2" type="text" v-model="text2"></b-form-input>
                </b-form-group>  
                <b-form-group label-for="field3">
                  <b-form-textarea id="field3" v-model="text3" :rows="5"></b-form-textarea>
                </b-form-group>  
              </b-form>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-nav vertical>
                <b-nav-item>First</b-nav-item>
                <b-nav-item>Second</b-nav-item>
                <b-nav-item>Third</b-nav-item>
              </b-nav>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
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
                <b-nav-item>First</b-nav-item>
                <b-nav-item>Second</b-nav-item>
                <b-nav-item>Third</b-nav-item>
              </b-nav>
            </b-col>
            <b-col md="6">
              <b-nav vertical>
                <b-nav-item>First</b-nav-item>
                <b-nav-item>Second</b-nav-item>
                <b-nav-item>Third</b-nav-item>
              </b-nav>
            </b-col>
          </b-row>
          <b-row>
            <b-nav vertical>
              <b-nav-item>First</b-nav-item>
              <b-nav-item>Second</b-nav-item>
              <b-nav-item>Third</b-nav-item>
            </b-nav>
          </b-row>
          <b-row>
            <b-button-toolbar>
              <b-button-group>
                <b-btn>First</b-btn>
                <b-btn>Second</b-btn>
                <b-btn>Third</b-btn>
              </b-button-group> 
            </b-button-toolbar>
          </b-row>
          <b-row>
            <b-button-toolbar>
              <b-btn>First</b-btn>
            </b-button-toolbar>
          </b-row>
          <b-row>
            <b-button-toolbar>
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
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
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
