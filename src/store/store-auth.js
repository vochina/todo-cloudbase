import {LocalStorage, Loading, Notify, Dialog} from "quasar"
import {cloudbaseAuth, cloudbaseDb} from 'boot/cloudbase'
import {showErrorMessage} from "src/functions/function-show-error-message";

const state = {
  loggedIn: false,
  email: '',
}

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  },
  setEmail(state, value) {
    state.email = value
  }
}

const actions = {
  registerUser({}, payload) {
    Loading.show()
    cloudbaseAuth.signUpWithEmailAndPassword(payload.email, payload.password).then(response => {
      // 发送验证邮件成功
      Loading.hide()
      Dialog.create({
        title: '注册账号',
        message: '请查收邮箱确认邮件，确认后即可登录'
      })
    }).catch(error => {
      showErrorMessage(error.message)
    })
  },
  loginUser({commit}, payload) {
    Loading.show()
    cloudbaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        //console.log('登录：', response)
      })
      .catch(error => {
        showErrorMessage(error.message)
      })
  },
  logoutUser() {
    cloudbaseAuth.signOut();
  },
  getUserEmail({commit}) {
    if (cloudbaseAuth.hasLoginState() !== null) {
      commit('setEmail', cloudbaseAuth.currentUser.email)
    } else {
      commit('setEmail', '未登录')
    }
  },
  handleAuthStateChange({commit, dispatch}) {
    cloudbaseAuth.onLoginStateChanged(user => {
      Loading.hide()
      if (user) {
        commit('setLoggedIn', true)
        LocalStorage.set('loggedIn', true)
        if (this.$router.currentRoute.path !== '/') {
          this.$router.replace('/').catch(r => {
            // console.log('auth error', r)
          })
        }
        dispatch('tasks/cbReadData', null, {root: true})
      } else {
        commit('tasks/clearTasks', null, {root: true})
        commit('tasks/setTasksDownloaded', false, {root: true})
        commit('setLoggedIn', false)
        LocalStorage.set('loggedIn', false)

        if (this.$router.currentRoute.path !== '/auth') {
          this.$router.replace('/auth').catch(r => {
            // console.log('auth error', r)
          })
        }
      }
    })
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
