<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title
          class="absolute-center">
          任务管理
        </q-toolbar-title>

        <q-btn
          v-if="!loggedIn"
          to="/auth"
          flat
          icon-right="account_circle"
          label="登录"
          class="absolute-right"
        />

        <q-btn-dropdown
          v-else
          class="absolute-right"
          flat
          label="账号"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">设置</div>
              <q-toggle v-model="show12HourTimeFormat" label="12小时格式"/>
              <q-toggle v-model="showTasksInOneList" label="单一列表显示"/>
            </div>

            <q-separator vertical inset class="q-mx-lg"/>

            <div class="column items-center">
              <q-avatar size="72px">
                <img src="https://todo.tzwe.com/images/avatar/boy-avatar.png">
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">{{ email }}</div>

              <q-btn
                @click="logoutUser"
                color="primary"
                label="退出"
                push
                size="sm"
                v-close-popup
              />
            </div>
          </div>
        </q-btn-dropdown>

      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label"
          exact
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label
          header
        >
          菜单
        </q-item-label>
        <q-item
          v-for="nav in navs"
          :key="nav.label"
          clickable
          exact
          :to="nav.to"
          class="text-white"
        >
          <q-item-section
            v-if="nav.icon"
            avatar
          >
            <q-icon :name="nav.icon"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-if="$q.platform.is.electron"
          @click="quitApp"
          clickable
          exact
          class="text-grey-4 absolute-bottom"
        >
          <q-item-section avatar>
            <q-icon name="power_settings_new"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>退出</q-item-label>
          </q-item-section>
        </q-item>

<!--        <q-item-->
<!--          class="text-white text-caption absolute-bottom"-->
<!--        >-->
<!--          <q-item-label>-->
<!--            「Powered by <a class="text-warning" style="text-decoration: none" target="_blank" href="https://webify.cloudbase.net">CloudBase Webify</a>」-->
<!--          </q-item-label>-->
<!--        </q-item>-->

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'

export default {
  name: 'Layout',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      navs: [
        {
          label: '待办',
          icon: 'list',
          to: '/'
        },
        {
          label: '设置',
          icon: 'settings',
          to: '/settings'
        }
      ]
    }
  },
  computed: {
    ...mapState('auth', ['loggedIn', 'email']),
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
    ...mapActions('auth', ['logoutUser', 'getUserEmail']),
    quitApp() {
      this.$q.dialog({
        title: '退出',
        message: '是否确认退出应用？',
        ok: {
          'label': '退出',
          'flat': true
        },
        cancel: {
          'label': '取消',
          'flat': true
        },
        persistent: true
      }).onOk(() => {
        if (this.$q.platform.is.electron) {
          require('electron').ipcRenderer.send('quit-app')
        }
      })
    }
  },
  mounted() {
    this.getUserEmail()
  }
}
</script>
<style lang="scss">
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}

.q-drawer {
  .q-router-link--exact-active {
    color: white !important;
  }
}
</style>
