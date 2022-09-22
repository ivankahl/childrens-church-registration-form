import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";

const opts = {
  icons: {
    iconfont: "mdi"
  }
};
Vue.use(Vuetify);

export default new Vuetify(opts);
