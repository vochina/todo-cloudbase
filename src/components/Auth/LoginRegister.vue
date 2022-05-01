<template>
  <form @submit.prevent="submitForm">

    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary"/>
        </template>
        {{ tab | titleTranslate }}账号
      </q-banner>
    </div>

    <div class="row q-mb-md">
      <q-input
        v-model="formData.email"
        :rules="[ val=> isValidEmailAddress(val) || '请输入正确的邮箱地址']"
        lazy-rules=""
        ref="email"
        outlined
        class="col"
        label="邮箱"
        stack-label/>
    </div>

    <div class="row q-mb-md">
      <q-input
        v-model="formData.password"
        :rules="[ val => val.length >= 6 || '请至少输入6位数密码']"
        lazy-rules=""
        ref="password"
        type="password"
        outlined
        class="col"
        label="密码"
        stack-label/>
    </div>

    <div class="row">
      <q-space/>
      <q-btn type="submit" color="primary"
             :label="tab|titleTranslate"
      />
    </div>
  </form>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props: ['tab'],
  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['registerUser', 'loginUser']),
    isValidEmailAddress(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    submitForm() {
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab == 'login') {
          this.loginUser(this.formData)
        } else {
          this.registerUser(this.formData)
        }
      }
    }
  },
  filters: {
    titleTranslate(value) {
      if (value == 'login') {
        return '登录'
      } else {
        return '注册'
      }
    }
  }
}
</script>

<style scoped>

</style>
