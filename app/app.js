import Vue from "nativescript-vue";
import firebase from "nativescript-plugin-firebase";
import config from "@/shared/firebase-config";

import RadListView from "nativescript-ui-listview/vue";
Vue.use(RadListView);

Vue.registerElement("Carousel", () => require("nativescript-carousel").Carousel);
Vue.registerElement("CarouselItem", () => require("nativescript-carousel").CarouselItem);
Vue.registerElement("YoutubePlayer", () => require("nativescript-youtubeplayer").YoutubePlayer);
Vue.registerElement("RadSideDrawer", () => require("nativescript-ui-sidedrawer").RadSideDrawer);

import ViewContainer from '@/components/containers/ViewContainer'
Vue.component('ViewContainer', ViewContainer)

Vue.config.silent = (TNS_ENV === 'production');
import HomeScreen from '@/components/views/HomeScreen';

import store from '@/store';

new Vue({
  render: h => h('frame', [h(HomeScreen)]),
  created() {
    firebase.init(config)
      .then(() => {})
      .catch(err => console.error(err))
  },
  store
}).$start();
