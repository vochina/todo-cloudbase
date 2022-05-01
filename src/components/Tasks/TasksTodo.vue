<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <list-header
        v-if="!settings.showTasksInOneList"
        bgColor="bg-orange-4"
      >待办事项
      </list-header>
      <q-list
        separator
        bordered>
        <task
          v-for="task in tasksTodo"
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
  props: ['tasksTodo'],
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
