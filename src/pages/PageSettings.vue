<template>
  <q-page padding>
    <q-list
      class="q-mb-md"
      bordered
      padding>
      <q-item-label header>设置</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>使用12小时格式显示时间</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle
            color="blue"
            v-model="show12HourTimeFormat"
            val="battery"/>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>任务在一个列表显示</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle
            color="blue"
            v-model="showTasksInOneList"
            val="battery"/>
        </q-item-section>
      </q-item>

    </q-list>
    <q-list bordered padding>
      <q-item-label header>更多</q-item-label>

      <q-item
        to="/settings/help"
        tag="label"
        v-ripple>
        <q-item-section>
          <q-item-label>帮助</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right"/>
        </q-item-section>
      </q-item>

      <q-item
        @click="visitOurWebsite"
        tag="label"
        v-ripple>
        <q-item-section>
          <q-item-label>访问我们的主页</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right"/>
        </q-item-section>
      </q-item>

      <q-item
        @click="emailUs"
        tag="label"
        v-ripple>
        <q-item-section>
          <q-item-label>给我们发邮件</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right"/>
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {openURL} from 'quasar'

export default {
  computed: {
    ...mapGetters('settings', ['settings']),
    show12HourTimeFormat: {
      get() {
        return this.settings.show12HourTimeFormat
      },
      set(value) {
        this.setShow12HourTimeFormat(value)
      }
    },
    showTasksInOneList: {
      get() {
        return this.settings.showTasksInOneList
      },
      set(value) {
        this.setShowTasksInOneList(value)
      }
    }
  },
  methods: {
    ...mapActions('settings', ['setShow12HourTimeFormat', 'setShowTasksInOneList']),
    visitOurWebsite() {
      openURL('https://github.com/vochina/todo-cloudbase')
    },
    emailUs() {
      window.location.href = 'mailto:vacker@qq.com?subject=任务管理使用反馈'
    }
  }
}
</script>

<style>

</style>
