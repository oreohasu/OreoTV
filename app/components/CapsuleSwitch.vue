<script setup lang="ts">
import { TabsList, TabsRoot, TabsTrigger } from 'reka-ui'

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

const triggerRefs = ref<(HTMLElement | null)[]>([])
const listRef = ref<HTMLElement>()
const indicatorStyle = ref({ left: 0, width: 0 })

const activeIndex = computed(() =>
  props.options.findIndex(opt => opt.value === props.modelValue),
)

function updateIndicator() {
  const trigger = triggerRefs.value[activeIndex.value]
  const list = (listRef.value as any)?.$el || listRef.value

  if (!trigger || !list) {
    return
  }

  const triggerRect = trigger?.getBoundingClientRect()
  const listRect = list.getBoundingClientRect()

  indicatorStyle.value = {
    left: triggerRect.left - listRect.left,
    width: triggerRect.width,
  }
}

function setTriggerRef(el: any, index: number) {
  triggerRefs.value[index] = el?.$el || el
}

watch(activeIndex, () => {
  nextTick(updateIndicator)
})

onMounted(() => {
  nextTick(updateIndicator)
})
</script>

<template>
  <TabsRoot
    :model-value="modelValue"
    @update:model-value="(val) => val && emit('update:modelValue', val)"
  >
    <TabsList
      ref="listRef"
      p1 rounded-full inline-flex relative
      class="bg-#f5f5f5 dark:bg-#262626"
      :class="props.class"
    >
      <div
        v-show="indicatorStyle.width > 0"
        rounded-full bg-white transition-left duration-250 ease-out bottom-1 top-1 absolute
        class="dark:bg-#121212"
        :style="{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
        }"
      />

      <TabsTrigger
        v-for="(opt, index) in options"
        :key="opt.value"
        :ref="(el) => setTriggerRef(el, index)"
        :value="opt.value"
        text-sm font-semibold p2 rounded-full min-w-18 cursor-pointer transition-opacity duration-250 relative z-1
        :class="[
          modelValue === opt.value
            ? 'text-gray-900 dark:text-white'
            : 'op50 hover:op75',
        ]"
      >
        {{ opt.label }}
      </TabsTrigger>
    </TabsList>
  </TabsRoot>
</template>
