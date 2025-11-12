<script setup lang="ts">
import { appName } from '~/constants'

const routes = computed(() => {
  return [
    { name: '首页', path: '/', icon: 'i-lucide:house' },
    { name: '电影', path: '/movie', icon: 'i-lucide:film' },
    { name: '剧集', path: '/series', icon: 'i-lucide:tv' },
    { name: '动漫', path: '/bangumi', icon: 'i-lucide-lab:frog-face' },
    { name: '综艺', path: '/show', icon: 'i-lucide-lab:fan-handheld' },
    { name: '直播', path: '/live', icon: 'i-lucide:radio' },
  ]
})
</script>

<template>
  <div
    class="text-lg py2 pl4 pr2 rounded-full bg-white shadow-xs items-center right-40 justify-center fixed z-100 dark:bg-#121212"
    flex="~ gap3"
    border="~ solid #e5e5e5 dark:#36363a dark:bg-#262626"
  >
    <span class="text-xl text-gray-900 font-bold mr4 select-none dark:text-white">{{ appName }}</span>
    <DarkToggle class="op50 cursor-pointer transition-opacity duration-250 hover:op100" />
    <AvatarRoot class="align-middle rounded-full inline-flex h8 w8 select-none items-center justify-center overflow-hidden">
      <AvatarImage
        class="rounded-[inherit] h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        alt="Colm Tuite"
      />
      <AvatarFallback
        class="text-sm leading-1 font-medium bg-white flex h-full w-full items-center justify-center dark:text-stone-300 dark:bg-stone-800"
        :delay-ms="600"
      >
        CT
      </AvatarFallback>
    </AvatarRoot>
  </div>
</template>
