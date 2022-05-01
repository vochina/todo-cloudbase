<template>
  <q-card>
    <modal-header>添加任务</modal-header>

    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">

        <modal-task-name
          :name.sync="taskToSubmit.name"
          ref="modalTaskName"/>

        <modal-due-date
          :dueDate.sync="taskToSubmit.dueDate"
          ref="modalTaskDueDate"/>

        <modal-due-time
          v-show="taskToSubmit.dueDate"
          :dueTime.sync="taskToSubmit.dueTime"
          ref="modalTaskDueTime"/>

      </q-card-section>

      <modal-buttons></modal-buttons>
    </form>
  </q-card>
</template>

<script>
import {mapActions} from 'vuex'
import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'

export default {
  mixins: [mixinAddEditTask],
  data() {
    return {
      taskToSubmit: {
        name: '',
        dueDate: '',
        dueTime: '',
        completed: false,
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['addTask']),
    submitTask() {
      this.addTask(this.taskToSubmit)
      this.$emit('close');
    }
  }
}
</script>

<style>

</style>
