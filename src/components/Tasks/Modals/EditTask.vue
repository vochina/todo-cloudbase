<template>
  <q-card>
    <modal-header>编辑任务</modal-header>

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
  props: ['task', 'id'],
  data() {
    return {
      taskToSubmit: {}
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask']),
    submitTask() {
      this.updateTask({
        id: this.id,
        name: this.taskToSubmit.name,
        completed: this.taskToSubmit.completed,
        dueDate: this.taskToSubmit.dueDate,
        dueTime: this.taskToSubmit.dueTime
      })
      this.$emit('close');
    }
  },
  mounted() {
    this.taskToSubmit = Object.assign({}, this.task)
  }
}
</script>

<style>

</style>
