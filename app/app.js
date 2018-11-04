import Vue from "nativescript-vue";
import MessageBus from '@/services/MessageBus'
import firebase from "nativescript-plugin-firebase";
import config from "@/shared/firebase-config";

import RadListView from "nativescript-ui-listview/vue";

Vue.use(RadListView);

Vue.registerElement("Carousel", () => require("nativescript-carousel").Carousel);
Vue.registerElement("CarouselItem", () => require("nativescript-carousel").CarouselItem);

Vue.config.silent = (TNS_ENV === 'production');
import LineDetails from '@/components/views/LineDetails';

new Vue({
  render: h => h('frame', [h(LineDetails)]),
  created() {
    firebase.init(config)
      .then((instance) => {
        firebase.addAuthStateListener((data) => {
          MessageBus.$emit('authStateChanged', data)
        })
      })
      .catch(err => console.error(err))
  }
}).$start();
