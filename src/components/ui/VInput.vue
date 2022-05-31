<template>
  <div
    class="inputGroup is-sm"
    :class="[attrs.class, { 'has-iconClear': value }]"
    :style="attrs.style"
  >
    <input
      class="inputGroup-input input is-sm"
      v-bind="inputAttrs"
      type="text"
      v-model="value"
      :placeholder="props.placeholder"
    />
    <span v-if="value" class="inputGroup-iconClear" @click.stop="clear()">
      <CloseIcon class="inlineSvg" />
    </span>
  </div>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { ref, watch, useAttrs, computed } from 'vue'
import CloseIcon from '@/assets/icons/close.svg'

const attrs = useAttrs()

const inputAttrs = computed(() => {
  let returnObj = {}
  for (const attr in attrs) {
    if (attr !== 'class' || attr !== 'style') {
      returnObj[attr] = attrs[attr]
    }
  }
  return returnObj
})

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

// component value
const value = ref(props.modelValue)
watch(value, (newValue) => {
  emit('update:modelValue', newValue)
})

// methods
const clear = () => {
  value.value = ''
}
</script>

<style lang="scss" scoped>
.inlineSvg {
  width: auto;
  height: 1.25em;
  fill: currentColor;
  vertical-align: -0.15em;
}
</style>
