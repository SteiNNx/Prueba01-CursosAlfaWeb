<template>
  <b-container>
    <b-row>
      <b-col class="my-4" cols="12">
        <h1>Login de Usuario</h1>
      </b-col>
      <b-col class="my-4" cols="12">
        <b-form @submit.stop.prevent>
          <label for="text-password">Correo</label>
          <b-form-input
            type="text"
            id="text-password"
            v-model="user.email"
          ></b-form-input>

          <label for="text-password">Contraseña</label>
          <b-form-input
            type="password"
            id="text-password"
            v-model="user.password"
          ></b-form-input>
          <b-alert class="mt-2" v-model="showDismissibleAlert">
            {{ errorMsg }}
          </b-alert>
        </b-form>
      </b-col>
      <b-col class="my-4" cols="12">
        <b-row align-h="center">
          <b-col cols="2">
            <b-button class="w-100" variant="success" @click="ingresar">Iniciar</b-button>
          </b-col>
          <b-col cols="2">
            <b-button class="w-100" variant="danger" @click="cleanForm"
              >Limpiar Formulario</b-button
            >
          </b-col>
          <b-col cols="2">
            <b-button class="w-100" variant="warning">Limpiar Validacion</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { errorCodeToStringLabelFirebase } from "@/constants/utils";

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errorMsg: null,
      showDismissibleAlert: false,
    };
  },
  methods: {
    ...mapActions(["setUserLogin"]),
    async ingresar() {
      const { email, password } = this.user;
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          console.log("Succesfylly login");
          console.log(response);
          this.setUserLogin(response?.user?.providerData[0]?.email);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
          this.errorMsg = errorCodeToStringLabelFirebase(error.code);
          this.showDismissibleAlert = true;
        });
    },
    cleanForm() {
      this.user = {
        email: "",
        password: "",
      };
    },
  },
};
</script>

<style></style>
