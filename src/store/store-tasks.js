import Vue from 'vue'
import {Notify, uid} from 'quasar'
import {cloudbaseAuth, cloudbaseDb} from "boot/cloudbase";
import {showErrorMessage} from "src/functions/function-show-error-message";

const state = {
  tasks: {
    // "ID1": {
    //   name: 'A Go to shop',
    //   completed: true,
    //   dueDate: '2021/01/18',
    //   dueTime: '18:20'
    // },
    // "ID2": {
    //   name: 'C Get bananas',
    //   completed: false,
    //   dueDate: '2021/01/20',
    //   dueTime: '18:50'
    // },
    // "ID3": {
    //   name: 'B Get apples',
    //   completed: false,
    //   dueDate: '2021/01/21',
    //   dueTime: '09:20'
    // }
  },
  search: '',
  sort: 'name',
  tasksDownloaded: false
}

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload)
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id)
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload)
  },
  loadTasks(state, tasks) {
    state.tasks = tasks
  },
  clearTasks(state) {
    state.tasks = {}
  },
  setSearch(state, value) {
    state.search = value
  },
  setSort(state, value) {
    state.sort = value
  },
  setTasksDownloaded(state, value) {
    state.tasksDownloaded = value
  }
}

const actions = {
  updateTask({dispatch}, payload) {
    dispatch('cbUpdateTask', payload)
  },
  deleteTask({dispatch}, id) {
    dispatch('cbDeleteTask', id)
  },
  addTask({dispatch}, task) {
    task.id = uid()
    dispatch('cbAddTask', task)
  },
  setSearch({commit}, value) {
    commit('setSearch', value)
  },
  setSort({commit}, value) {
    commit('setSort', value)
  },

  cbReadData({commit}) {
    let userId = cloudbaseAuth.currentUser.uid
    let ref = cloudbaseDb.collection('tasks')
      .where({_openid: userId})
      .watch({
        onChange: (snapshot) => {
          //console.log("监听数据变化:", snapshot);
          if (snapshot.msgType == 'INIT_EVENT') {
            cloudbaseDb.collection('tasks')
              .get()
              .then((res) => {
                let tasks = res.data
                let newTasks = {}
                tasks.forEach(function (data) {
                  newTasks[data.id] = data
                })
                commit('loadTasks', newTasks)
                commit('setTasksDownloaded', true)
              })
          } else {
            if (snapshot.docChanges.length !== 0) {
              if (snapshot.docChanges[0].dataType == 'add') {
                let payload = snapshot.docChanges[0].doc
                commit('addTask', payload)
              } else if (snapshot.docChanges[0].dataType == 'update') {
                let payload = snapshot.docChanges[0].doc
                commit('updateTask', payload)
              } else if (snapshot.docChanges[0].dataType == 'remove') {
                let payload = snapshot.docChanges[0].doc
                commit('deleteTask', payload.id)
              }
            } else {
              commit('setTasksDownloaded', true)
            }
          }
        },
        onError: (error) => {
          // console.log("监听数据错误：", error);
        }
      });
    // console.log(ref)
  },

  cbAddTask({}, payload) {
    cloudbaseDb.collection('tasks')
      .doc(payload.id)
      .set(payload)
      .then(function () {
        Notify.create('任务已添加')
      })
      .catch(function (error) {
        showErrorMessage(error)
      });
  },
  cbUpdateTask({}, payload) {
    cloudbaseDb.collection('tasks')
      .doc(payload.id)
      .update(payload)
      .then(function (res) {
        if (Object.keys(payload).length == 5) {
          Notify.create('任务已更新')
        }
      })
      .catch(function (e) {
        showErrorMessage(e)
      });
  },

  cbDeleteTask({}, taskId) {
    cloudbaseDb.collection('tasks')
      .doc(taskId)
      .remove()
      .then((res) => {
        Notify.create('任务已删除')
      })
      .catch((e) => {
        showErrorMessage(e)
      });
  }
}

const getters = {
  tasksSorted: (state) => {
    let tasksSorted = {},
      keysOrdered = Object.keys(state.tasks)

    keysOrdered.sort((a, b) => {
      let taskAProp = state.tasks[a][state.sort].toLowerCase(),
        taskBProp = state.tasks[b][state.sort].toLowerCase()

      if (taskAProp > taskBProp) return 1
      else if (taskAProp < taskBProp) return -1
      else return 0
    })

    keysOrdered.forEach((key) => {
      tasksSorted[key] = state.tasks[key]
    })

    return tasksSorted
  },
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted,
      tasksFiltered = {}
    if (state.search) {
      Object.keys(tasksSorted).forEach(function (key) {
        let task = tasksSorted[key],
          taskNameLowerCase = task.name.toLowerCase(),
          searchLowerCase = state.search.toLowerCase()
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task
        }
      })
      return tasksFiltered
    }
    return tasksSorted
  },
  tasksTodo: (state, getters) => {
    let taskFiltered = getters.tasksFiltered
    let tasks = {}
    Object.keys(taskFiltered).forEach(function (key) {
      let task = taskFiltered[key]
      if (!task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },
  tasksCompleted: (state, getters) => {
    let taskFiltered = getters.tasksFiltered
    let tasks = {}
    Object.keys(taskFiltered).forEach(function (key) {
      let task = taskFiltered[key]
      if (task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
