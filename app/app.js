import Vue from "nativescript-vue";
import MessageBus from '@/services/MessageBus'
import firebase from "nativescript-plugin-firebase";
import config from "@/shared/firebase-config";

import RadListView from "nativescript-ui-listview/vue";

Vue.use(RadListView);

Vue.config.silent = (TNS_ENV === 'production');
import StationDetails from '@/components/views/StationDetails'

new Vue({
  render: h => h('frame', [h(StationDetails)]),
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
