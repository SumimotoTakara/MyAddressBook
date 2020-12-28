<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-side-icon
        v-show="$store.state.login_user"
        @click="toggleSideMenu"
      ></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <router-link
          :to="{ name: 'home' }"
          style="text-decoration: none; color: black"
        >
          <span>AdressBook</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$store.state.login_user">
        <v-btn @click="logout">ログアウト</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <SideNav></SideNav>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
import { mapActions } from "vuex";
import SideNav from "./components/SideNav";
export default {
  name: "App",
  components: { SideNav },
  data() {
    return {
      //
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setLoginUser(user);
        this.fetchAddresses();
        if (this.$router.currentRoute.name === "home") {
          this.$router.push({ name: "addresses" });
        }
      } else {
        this.deleteLoginUser();
        this.$router.push({ name: "home" });
      }
    });
  },
  methods: {
    ...mapActions([
      "toggleSideMenu",
      "setLoginUser",
      "logout",
      "deleteLoginUser",
      "fetchAddresses",
    ]),
  },
};
</script>
