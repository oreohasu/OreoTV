<script setup lang="ts">
import type { SegmentedItem } from '~/components/segmented/types'

definePageMeta({
  layout: 'page',
})

type BangumiTab = 'calendar' | 'bangumi' | 'special'

const activeTab = ref<BangumiTab>('calendar')
const tabs = computed((): SegmentedItem[] => {
  return [
    { label: '每日放送', value: 'calendar' },
    { label: '番剧', value: 'bangumi' },
    { label: '剧场版', value: 'special' },
  ]
})

const currentTitlte = computed(() => {
  return activeTab.value === 'calendar' ? '来自 Bangumi 番组计划的精选内容' : '来自豆瓣的精选内容'
})

const weekdays = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']

const currentWeekDay = computed(() => {
  return (new Date().getDay() || 7) - 1
})
const selectedWeekDay = ref(currentWeekDay.value)

const { data: calendarData } = await useFetch('/api/douban/bangumi/calendar.list')

const currentCalendarData = computed(() => {
  return calendarData.value?.at(selectedWeekDay.value)
})

function handleSelectWeekDay(idx: number) {
  selectedWeekDay.value = idx
}
</script>

<template>
  <div class="w-full" flex="~ col">
    <div class="mb8" flex="~ col gap2">
      <div class="text-5xl text-gray-900 font-bold dark:text-white">
        动漫
      </div>
      <div class="op50">
        {{ currentTitlte }}
      </div>
    </div>
    <Segmented v-model="activeTab" :tabs="tabs" class="mb8">
      <template #calendar>
        <div flex="~ gap4">
          <div
            v-for="(weekday, idx) in weekdays"
            :key="weekday"
            class="cursor-pointer"
            :class="idx === selectedWeekDay ? 'bg-red' : ''"
            @click="handleSelectWeekDay(idx)"
          >
            {{ weekday }}
          </div>
        </div>
      </template>
      <template #bangumi>
        <div>这是一个番剧的内容</div>
      </template>
      <template #special>
        <div>这是一个剧场版的内容</div>
      </template>
    </Segmented>
    <div
      v-if="activeTab === 'calendar' && calendarData"
      class="gap-x-12 gap-y-20 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
    >
      <div
        v-for="bangumi in currentCalendarData?.items"
        :key="bangumi.id"
        class="group oreo-border rounded-3xl bg-#fafafa w-full cursor-pointer shadow-xs dark:bg-white/20"
      >
        <div class="mb4 rounded-3xl bg-#fafafa aspect-[1/1] relative overflow-hidden">
          <NuxtImg
            :src="bangumi.images.large.replace('http://', 'https://')"
            :alt="bangumi.name_cn || bangumi.name"
            loading="lazy"
            quality="100"
            format="webp"
            densities="x1 x2"
            class="h-full w-full object-cover"
          />
          <div
            v-if="bangumi.rating"
            class="px1.5 py0.5 rounded-full bg-white/50 items-center left-4 top-4 absolute backdrop-blur dark:bg-#121212/50"
            flex="~ gap1"
          >
            <div i-material-symbols:kid-star class="text-sm text-#f9d114" />
            <div class="text-12px">
              {{ bangumi.rating.score }}
            </div>
          </div>
        </div>
        <div class="px4 pb8" flex="~ col">
          <div class="w-full" flex="~ col gap0.5">
            <div class="text-sm font-bold line-clamp-1">
              {{ bangumi.name_cn || bangumi.name }}
            </div>
            <div class="text-12px op50 line-clamp-1">
              {{ bangumi.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      豆瓣资源
    </div>
  </div>
</template>
