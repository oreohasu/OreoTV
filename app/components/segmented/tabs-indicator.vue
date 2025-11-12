<script setup lang="ts">
import type { TabsIndicatorProps } from 'reka-ui'
import { useForwardProps } from 'reka-ui'

const props = defineProps<TabsIndicatorProps>()

const delegatedProps = computed(() => {
  const { ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TabsIndicator
    v-bind="forwardedProps"
    class="rounded-full bg-#f5f5f5 h-[calc(100%-8px)] w-[--reka-tabs-indicator-size] translate-x-[--reka-tabs-indicator-position] transition-[width,transform] duration-250 bottom-1 left-0 absolute z-10 dark:bg-#333"
  >
    <slot />
  </TabsIndicator>
</template>
