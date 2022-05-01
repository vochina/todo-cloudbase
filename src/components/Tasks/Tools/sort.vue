<template>
  <q-select
    filled
    v-model="sortBy"
    :options="options"
    emit-value
    map-options
    class="col q-ml-sm"
    label="排序"
    stack-label/>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  data() {
    return {
      options: [
        {
          label: '名称',
          value: 'name'
        },
        {
          label: '日期',
          value: 'dueDate'
        }
      ],
    }
  },
  computed: {
    ...mapState('tasks', ['sort']),
    sortBy: {
      get() {
        return this.sort
      },
      set(value) {
        this.setSort(value)
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['setSort'])
  }
}
</script>

<style scoped>
.q-select {
  flex: 0 0 112px;
}
</style>
