<template>
  <div class="row q-mb-sm">
    <q-input
      clearable
      outlined
      :value="dueDate"
      @input="$emit('update:dueDate',$event)"
      :rules="[val => !!val || '日期不能为空 ']"
      ref="dueDate"
      label="完成日期">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date
              @input="$emit('update:dueDate',$event)"
              :value="dueDate">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat/>
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ['dueDate']
}
</script>

<style>

</style>
