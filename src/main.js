// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.use(
  vuetify /* , {
  theme: {
    primary: "#3a3a3a",
    secondary: "#c75ba9",
    accent: "#8c9eff",
    red: "#c83b3b",
    error: "#b71c1c"
  }
} */
);

/* eslint-disable no-new */
new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
