<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div
      :class="{ 'q-mt-lg' : !settings.showTasksInOneList}"
    >
      <list-header
        v-if="!settings.showTasksInOneList"
        bgColor="bg-green-4"
      >已完成
      </list-header>
      <q-list
        separator
        bordered>
        <task
          v-for="task in tasksCompleted"
          :key="task.id"
          :task="task"
          :id="task.id"
        ></task>
      </q-list>
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: ['tasksCompleted'],
  computed: {
    ...mapGetters('settings', ['settings'])
  },
  components: {
    'task': require('components/Tasks/Task.vue').default,
    'list-header': require('components/Shared/ListHeader.vue').default,
  }
}
</script>

<style>

</style>
