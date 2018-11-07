import Vue from "nativescript-vue";
import firebase from "nativescript-plugin-firebase";
import config from "@/shared/firebase-config";

import RadListView from "nativescript-ui-listview/vue";
Vue.use(RadListView);

Vue.registerElement("Carousel", () => require("nativescript-carousel").Carousel);
Vue.registerElement("CarouselItem", () => require("nativescript-carousel").CarouselItem);
Vue.registerElement("YoutubePlayer", () => require("nativescript-youtubeplayer").YoutubePlayer)

Vue.config.silent = (TNS_ENV === 'production');
import LineList from '@/components/views/LineList';

import store from '@/store';

new Vue({
  render: h => h('frame', [h(LineList)]),
  created() {
    firebase.init(config)
      .then(() => {})
      .catch(err => console.error(err))
  },
  store
}).$start();
