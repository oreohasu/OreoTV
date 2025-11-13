<script setup lang="ts">
import { appName } from '~/constants'

const { y } = useWindowScroll({ behavior: 'smooth' })
const isScrolled = computed(() => y.value > 20)

const navs = computed(() => {
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
  <div class="left-40 right-40 fixed z-100">
    <div class="items-center justify-between" flex="~">
      <span
        :class="isScrolled ? 'op0' : 'op100'"
        class="text-2xl text-gray-900 font-bold select-none transition-opacity ease-in-out dark:text-white"
      >
        {{ appName }}
      </span>
      <Navigator :navs="navs" />
      <div
        class="text-lg py1.5 pl4 pr2 oreo-border rounded-full bg-white/20 shadow-xs items-center justify-center backdrop-blur dark:bg-#121212/50"
        flex="~ gap3"
      >
        <div i-lucide-search class="op50 cursor-pointer transition-opacity duration-250 hover:op100" />
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
    </div>
  </div>
</template>
