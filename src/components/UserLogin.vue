<template>
  <div class="text-white m-2">
    <div v-if="userLogin === null" @click="ingresar">
      <label>Ingresar</label>
      <b-icon icon="arrow-right-circle-fill"></b-icon>
    </div>
    <div v-else @click="salir">
      {{ userLogin }}
      <b-icon icon="arrow-left-circle-fill"></b-icon>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getAuth } from "firebase/auth";

export default {
  computed: {
    ...mapState(["userLogin"]),
  },
  mounted() {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setUserLogin(user.email);
        this.$router.push("/");
      }
    });
  },
  methods: {
    ...mapActions(["setUserLogin"]),
    salir() {
      getAuth()
        .signOut()
        .then(() => {
          this.$router.push("/ingresar");
          this.setUserLogin(null);
        });
    },
    ingresar() {
      this.$router.push("/ingresar");
    },
  },
};
</script>

<style></style>
