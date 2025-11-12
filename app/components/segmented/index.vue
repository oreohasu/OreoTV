<script setup lang="ts">
import type { SegmentedItem } from './types'
import TabsIndicator from './tabs-indicator.vue'

const props = defineProps<{
  tabs: SegmentedItem[]
  defaultValue?: string
}>()

const activeTab = defineModel<string>()

const getDefaultValue = computed(() => {
  return props.defaultValue || props.tabs[0]?.value
})
</script>

<template>
  <TabsRoot
    v-model="activeTab"
    :default-value="getDefaultValue"
  >
    <TabsList
      mb8 px1 py2 rounded-full inline-flex shadow-xs relative
      border="~ solid #e5e5e5 dark:#36363a dark:bg-#262626"
    >
      <TabsIndicator />
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        text-sm font-semibold px4 py1 rounded-full cursor-pointer transition-opacity duration-250 relative z-20
        :class="[
          activeTab === tab.value
            ? 'text-gray-900 dark:text-white'
            : 'op50 hover:op100',
        ]"
      >
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>
    <template v-for="tab in tabs" :key="tab.value">
      <TabsContent :value="tab.value">
        <slot :name="tab.value" />
      </TabsContent>
    </template>
  </TabsRoot>
</template>
