<template>
  <b-container>
    <b-row>
      <b-col class="my-4" cols="12">
        <h1>Registro de Usuario</h1>
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
        </b-form>
      </b-col>
      <b-col class="my-4" cols="12">
        <b-row align-h="center">
          <b-col cols="2">
            <b-button class="w-100" variant="success" @click="registrar"
              >Registrar</b-button
            >
          </b-col>
          <b-col cols="2">
            <b-button class="w-100" variant="danger">Limpiar Formulario</b-button>
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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Register",
  data() {
    return { user: { email: "", password: "" } };
  },
  methods: {
    async registrar() {
      const { email, password } = this.user;
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          console.log("Succesfylly registered");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
