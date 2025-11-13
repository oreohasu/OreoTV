<script setup lang="ts">
import type { NavigatorItem } from './types'
import AppTabsIndicator from '../app-tabs-indicator.vue'

const props = defineProps<{
  navs: NavigatorItem[]
  defaultValue?: string
}>()

const router = useRouter()

const activeNav = defineModel<string>()

const getDefaultValue = computed(() => {
  return props.defaultValue || props.navs[0]?.path
})

watch(activeNav, (newVal) => {
  router.push({ path: newVal })
}, {
  immediate: true,
})
</script>

<template>
  <TabsRoot
    v-model="activeNav"
    :default-value="getDefaultValue"
  >
    <TabsList class="px1 py2 oreo-border rounded-full bg-white/20 inline-flex select-none shadow-xs relative backdrop-blur dark:bg-#121212/50">
      <AppTabsIndicator />
      <TabsTrigger
        v-for="nav in navs"
        :key="nav.name"
        :value="nav.path"
        class="text-sm font-semibold px4 py1 rounded-full cursor-pointer transition-opacity duration-250 relative z-100"
        :class="[
          activeNav === nav.path
            ? 'text-gray-900 dark:text-white'
            : 'op50 hover:op100',
        ]"
      >
        <div class="items-center justify-center" flex="~ gap2">
          <div :class="nav.icon" class="text-lg" />
          <span> {{ nav.name }}</span>
        </div>
      </TabsTrigger>
    </TabsList>
  </TabsRoot>
</template>
