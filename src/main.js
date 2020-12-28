import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";

Vue.config.productionTip = false;
// firebase

const firebaseConfig = {
  apiKey: "AIzaSyAZXDP4E4G-6Quup6iJel7RYxPv-u6kywE",
  authDomain: "my-address-book-d3432.firebaseapp.com",
  projectId: "my-address-book-d3432",
  storageBucket: "my-address-book-d3432.appspot.com",
  messagingSenderId: "477113429405",
  appId: "1:477113429405:web:a232ad1d5dabab02949374",
  measurementId: "G-6JFWK76Z8Z",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
