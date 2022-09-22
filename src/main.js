// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App";

import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: "#3a3a3a",
    secondary: "#c75ba9",
    accent: "#8c9eff",
    red: "#c83b3b",
    error: "#b71c1c"
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
