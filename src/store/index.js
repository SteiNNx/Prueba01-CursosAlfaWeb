import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userLogin: null,
    cursos: [],
  },
  mutations: {
    SET_USER_LOGIN(state, payload) {
      state.userLogin = payload;
    },
    SET_COURSES(state, payload) {
      state.cursos = payload;
    }
  },
  actions: {
    setUserLogin({ commit }, userParams) {
      commit('SET_USER_LOGIN', userParams);
    },
    setCourses({ commit }, coursesParams) {
      commit('SET_COURSES', coursesParams);
    }
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
