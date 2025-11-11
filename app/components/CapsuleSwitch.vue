<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'

interface Option {
  label: string
  value: string
}

const props = defineProps<{
  options: Option[]
  modelValue: string
  class?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const containerRef = ref<HTMLDivElement>()
const buttonRefs = ref<HTMLButtonElement[]>([])
const indicatorStyle = ref({ left: 0, width: 0 })

const activeIndex = computed(() =>
  props.options.findIndex(opt => opt.value === props.modelValue),
)

function updateIndicatorPosition() {
  if (activeIndex.value >= 0 && buttonRefs.value[activeIndex.value] && containerRef.value) {
    const button = buttonRefs.value[activeIndex.value]
    const container = containerRef.value

    const buttonRect = button?.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    if (buttonRect && buttonRect.width > 0) {
      const left = buttonRect.left - containerRect.left
      indicatorStyle.value = {
        left: left % 2 === 0 ? left : left - 1,
        width: buttonRect.width,
      }
    }
  }
}

function handleChange(value: string) {
  emit('update:modelValue', value)
}

function setButtonRef(el: Element | ComponentPublicInstance | null, index: number) {
  if (el) {
    buttonRefs.value[index] = el as HTMLButtonElement
  }
}

watch(activeIndex, () => {
  nextTick(updateIndicatorPosition)
})

onMounted(() => {
  nextTick(updateIndicatorPosition)
})
</script>

<template>
  <div
    ref="containerRef"
    p1 rounded-full inline-flex relative
    border="~ solid #e1e4e8 dark:#36363a"
    class="bg-#eee dark:bg-black"
    :class="props.class"
  >
    <div
      v-if="indicatorStyle.width > 0"
      rounded-full bg-white transition-all duration-250 ease-out bottom-1 top-1 absolute
      class="dark:(border border-#e1e4e8 bg-transparent)"
      :style="{
        left: `${indicatorStyle.left}px`,
        width: `${indicatorStyle.width}px`,
      }"
    />

    <button
      v-for="(opt, index) in options"
      :key="opt.value"
      :ref="el => setButtonRef(el, index)"
      text-sm font-bold p2 rounded-full w20 cursor-pointer transition-all duration-250 relative
      :class="[
        modelValue === opt.value
          ? 'dark:text-white'
          : ' hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
      ]"
      @click="handleChange(opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>
