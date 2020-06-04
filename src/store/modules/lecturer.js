const state = {
  classData: '',
  rollCallParamsTemporaryStorage: ''
}

const mutations = {
  SET_CLASSDATA (state, classData) {
    state.classData = classData
  },
  TEMPORARY_STORAGE_ROLLCALL_PARAMS (state, params) {
    state.rollCallParamsTemporaryStorage = params
  },
  EDIT_ATTENDANCE (state, { StudentId, attend }) {
    state.classData.StudentInfo.some(student => {
      if (student.StudentId === StudentId) {
        student.Attendance = attend
        return true
      }
    })
  }
}

const actions = {
  storeClassData ({ commit }, classData) {
    commit('SET_CLASSDATA', classData)
  },
  storeTempRollCallParams ({ commit }, params) {
    commit('TEMPORARY_STORAGE_ROLLCALL_PARAMS', params)
  },
  editAttendance ({ commit }, options) {
    commit('EDIT_ATTENDANCE', options)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
