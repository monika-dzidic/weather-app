import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import moment from 'moment';

import Toasted from 'vue-toasted';
Vue.use(Toasted, {
  theme: 'bubble',
  className: 'toasted-custom',
  duration: 4700,
  position: 'bottom-center',
  icon: 'error_outline',
  singleton: true,
  closeOnSwipe: true
});

Vue.filter("uppercase", function (value: any) {
  if (!value) return ''
  return value.toString().toUpperCase();
});

Vue.filter("date", function (value: any) {
  if (!value) return ''
  return moment(value).format("l");
});

Vue.filter("time", function (value: any) {
  if (!value) return ''
  return moment.unix(value).format("hh:mm a");
});

import firebase from "firebase/app";
firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
});


Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
