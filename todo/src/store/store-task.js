import Vue from 'vue';
import { uid, Notify } from 'quasar';
import { firebaseDb, firebaseAuth } from 'boot/firebase';
import { showErrorMessage } from '../functions/function-show-error-message';

const state = {
  tasks:{
  },
  search: '',
  sort: 'name',
  tasksDownloaded: false
}

const actions = {
  updateTask({ dispatch }, payload) {
    dispatch('fbUpdateTask', payload)
  },
  deleteTask({ dispatch }, id) {
    dispatch('fbDeleteTask', id)
  },
  addTask({ dispatch }, task) {
    let taskId = uid();
    let payload = {
      id:taskId,
      task: task
    };
    dispatch('fbAddTask', payload)
  },
  setSearch({commit}, value) {
    commit('setSearch', value)
  },
  setSort({commit}, value) {
    commit('setSort', value)
  },
  fbReadData({commit}) {
    let userId = firebaseAuth.currentUser.uid;
    let userTasks = firebaseDb.ref('tasks/' + userId);

    //initial check for data
    userTasks.once('value', snapshot => {
      commit('setTasksDownloaded', true);
    }, error => {
      if(error) {
        showErrorMessage(error.message);
        this.$router.replace('/auth')
      }
    }) 

    // child added
    userTasks.on('child_added', snapshot => {
      let task = snapshot.val();

      let payload = {
        id: snapshot.key,
        task: task
      }

      commit('addTask', payload)
    })

    //Child changed
    userTasks.on('child_changed', snapshot => {
      let task = snapshot.val();

      let payload = {
        id: snapshot.key,
        updates: task
      }

      commit('updateTask', payload)
    })

    // Child removed
    userTasks.on('child_removed', snapshot => {
      let taskId = snapshot.key;
      commit('deleteTask', taskId)
    })
  },
  fbAddTask({}, payload) {
    let userId = firebaseAuth.currentUser.uid;
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id);
    taskRef.set(payload.task, error => {
      if(error) {
        showErrorMessage(error.message)
      } else {
        Notify.create('Task added!')
      }
    })
  },
  fbUpdateTask({}, payload) {
    let userId = firebaseAuth.currentUser.uid;
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id);
    taskRef.update(payload.updates, error => {
      if(error) {
        showErrorMessage(error.message)
      } else {
        let keys = Object.keys(payload.updates);
        if(!(keys.includes('completed') && keys.length === 1)) {
          Notify.create('Task updated!')
        }
      }
    })
  },
  fbDeleteTask({}, taskId) {
    let userId = firebaseAuth.currentUser.uid;
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + taskId);
    taskRef.remove(error => {
      if(error) {
        showErrorMessage(error.message)
      } else {
        Notify.create('Task deleted')
      }
    })
  }
}

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id)
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
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

const getters = { 
  tasksSorted:(state) => {
    let tasksSorted = {},
        keysOrdered = Object.keys(state.tasks);

    keysOrdered.sort((a,b) => {
      let taskAProp = state.tasks[a][state.sort].toLowerCase(),
          taskBProp = state.tasks[b][state.sort].toLowerCase();
      if (taskAProp > taskBProp) return 1
      else if (taskAProp < taskBProp) return -1    
      else return 0
    })    
    
    keysOrdered.forEach((key) =>{
      tasksSorted[key] = state.tasks[key]
    })    

    return tasksSorted;
  },
  tasksFiltered:(state, getters) => {
    let taskSorted = getters.tasksSorted,
        tasksFiltered = {};
    if (state.search) {
      Object.keys(taskSorted).forEach(function(key) {
        let task = taskSorted[key],
            taskNameLowerCase = task.name.toLowerCase(),
            searchLowerCase = state.search.toLowerCase();
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task
        }
      })
      return tasksFiltered
    }
    return taskSorted
  },
  tasksTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {}
    Object.keys(tasksFiltered).forEach(function(key){
      let task = tasksFiltered[key]
      if(!task.completed) {
        tasks[key] = task
      }
    });    
    return tasks
  },
  tasksCompleted: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {}
    Object.keys(tasksFiltered).forEach(function(key){
      let task = tasksFiltered[key]
      if(task.completed) {
        tasks[key] = task
      }
    });    
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