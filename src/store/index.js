import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    login_user: null,
    addresses: [],
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user;
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },
    toggleSideMenu(state) {
      state.drawer = !state.drawer;
    },
    addAddress(state, { id, address }) {
      address.id = id;
      state.addresses.push(address);
    },
    updateAddress(state, { id, address }) {
      const index = state.address.findIndex((address) => address.id === id);
      state.address[index] = address;
    },
    deleteAddress(state, { id }) {
      const index = state.addresses.findIndex((address) => address.id === id);
      state.addresses.splice(index, 1);
    },
  },
  actions: {
    // user をstoreに保存する
    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    // firebase からユーザーの登録アドレスを取得してきて、addAddress() でstoreに保存する
    fetchAddresses({ getters, commit }) {
      firebase
        .firestore()
        .collection(`users/${getters.uid}/addresses`)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            commit("addAddress", { id: doc.id, address: doc.data() });
          });
        });
    },
    // ユーザーをstoreから削除する （nullにする）
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },
    // Googleアカウント認証を使ったログイン機能
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider();
      // リダイレクトで戻ってくる
      firebase.auth().signInWithRedirect(google_auth_provider);
    },
    logout() {
      firebase.auth().signOut();
    },
    toggleSideMenu({ commit }) {
      commit("toggleSideMenu");
    },
    // アドレスをfirestoreに保存したあとに、storeに保存する
    addAddress({ getters, commit }, address) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/addresses`)
          .add(address)
          .then((doc) => {
            commit("addAddress", { id: doc.id, address });
          });
      }
    },
    // 連絡先情報の更新
    updateAddress({ getters, commit }, { id, address }) {
      if (getters.id) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/address`)
          .doc(id)
          .update(address)
          .then(() => {
            commit("updateAddress", { id, address });
          });
      }
    },
    // 連絡先情報の削除
    deleteAddress({ getters, commit }, { id }) {
      if (getters.id) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/address`)
          .doc(id)
          .delete()
          .then(() => {
            commit("deleteAddress", { id });
          });
      }
    },
  },
  getters: {
    // googleアカウントの情報、firebaseのユーザー情報を取得する
    userName: (state) => (state.login_user ? state.login_user.displayName : ""),
    photoURL: (state) => (state.login_user ? state.login_user.photoURL : ""),
    uid: (state) => (state.login_user ? state.login_user.uid : null),
    getAddressById: (state) => (id) =>
      state.addresses.find((address) => address.id === id),
  },
  modules: {},
});
