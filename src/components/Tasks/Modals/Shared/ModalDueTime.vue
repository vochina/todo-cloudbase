<template>
  <div
    class="row q-mb-sm">
    <q-input
      outlined
      clearable
      :value="dueTime"
      @input="$emit('update:dueTime',$event)"
      :rules="[val => !!val || '时间不能为空 ']"
      ref="dueTime"
      class="col"
      label="完成时间">
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time
              @input="$emit('update:dueTime',$event)"
              :value="dueTime">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat/>
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ['dueTime']
}
</script>

<style>

</style>
