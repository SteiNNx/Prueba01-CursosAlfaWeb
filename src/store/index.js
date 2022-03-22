import Vue from 'vue'
import Vuex from 'vuex'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { errorCodeToStringLabelFirebase } from "@/constants/utils";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userLogin: null,
    userMsjError: null,
    cursos: [],
  },
  mutations: {
    SET_USER_LOGIN(state, payload) {
      state.userLogin = payload;
    },
    SET_COURSES(state, payload) {
      state.cursos = payload;
    },
    SET_USER_MSJ_ERROR(state, payload) {
      state.userMsjError = payload;
    },
  },
  actions: {
    setUserLogin({ commit }, userParams) {
      commit('SET_USER_LOGIN', userParams);
    },
    setCourses({ commit }, coursesParams) {
      commit('SET_COURSES', coursesParams);
    },
    async registerUser({ commit }, userParam) {
      const { email, password } = userParam;
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          commit('SET_USER_MSJ_ERROR', null);
        })
        .catch((error) => {
          console.log(error);
          commit('SET_USER_MSJ_ERROR', errorCodeToStringLabelFirebase(error.code));
        });
    },
    async loginUser({ commit }, userParam) {
      const { email, password } = userParam;
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          commit('SET_USER_MSJ_ERROR', null);
        })
        .catch((error) => {
          console.log(error);
          commit('SET_USER_MSJ_ERROR', errorCodeToStringLabelFirebase(error.code));
        });;
    },
    getUserLogin({ commit }) {
      getAuth().onAuthStateChanged((user) => {
        if (user) {
          commit('SET_USER_LOGIN', user.email);
        }
      });
    },
    async logoutUser({ commit }) {
      await getAuth()
        .signOut()
        .then(() => {
          commit('SET_USER_LOGIN', null);
        });
    },
    cleanUserMsjError({ commit }) {
      commit('SET_USER_MSJ_ERROR', null);
    },
  },
  getters: {
    getAlumnosPermitidos({ cursos }) {
      const countAlumnosPermitidos = cursos.reduce(
        (previusValue, currentValue) => previusValue + parseInt(currentValue.cupos),
        0
      );
      return countAlumnosPermitidos;
    },
    getAlumnosInscritos({ cursos }) {
      const countAlumnosInscritos = cursos.reduce(
        (previusValue, currentValue) => previusValue + parseInt(currentValue.inscritos),
        0
      );
      return countAlumnosInscritos;
    },
    getAlumnosCuposRestantes({ cursos }, getters) {
      return getters.getAlumnosPermitidos - getters.getAlumnosInscritos;
    },
    getCursosTerminados({ cursos }) {
      const countCoursesFinished = cursos
        ?.filter((curso) => curso?.terminado)
        ?.length
      return countCoursesFinished;
    },
    getCursosActivos({ cursos }) {
      const countCoursesActive = cursos
        ?.filter((curso) => !curso?.terminado)
        ?.length
      return countCoursesActive;
    },
    getTotalCursos({ cursos }) {
      const countCourses = cursos?.length
      return countCourses;
    },
  },
  modules: {
  }
})
