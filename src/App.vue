<template>
  <v-app>
    <v-card color="cyan" dark tile flat height=200></v-card>
    <v-card raised light class="content-container mx-auto">
      <v-container>
        <h1 class="display-2 font-weight-regular page-title">Children's Church Registration</h1>
        
        <registration-form v-on:doneRegistering="registered = true" v-if="!registered"></registration-form>
        <done-page v-else></done-page>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
import RegistrationForm from "./components/RegistrationForm";
import DonePage from './components/DonePage';

export default {
  name: "App",
  components: {
    RegistrationForm,
    DonePage
  },
  data: function() {
    return {
      registered: false
    }
  }
};
</script>

<style>
.content-container {
  width: 800px;
  margin-top: -100px;
}

@media(max-width: 850px) {
  .content-container {
    width: 600px;
  }
}

@media(max-width: 650px) {
  .content-container {
    width: 100%;
    border-radius: 0;
    box-shadow: none !important;

    margin-top: -150px;
  }
}
</style>
