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
  <div flex="~ col" w-full>
    <div flex="~ col gap2" mb8>
      <div text-5xl text-gray-900 font-bold dark:text-white>
        动漫
      </div>
      <div op50>
        {{ currentTitlte }}
      </div>
    </div>
    <Segmented v-model="activeTab" :tabs="tabs" mb8>
      <template #calendar>
        <div flex="~ gap4">
          <div
            v-for="(weekday, idx) in weekdays"
            :key="weekday"
            cursor-pointer
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
      class="gap-x-12 gap-y-20 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))]"
    >
      <div
        v-for="bangumi in currentCalendarData?.items"
        :key="bangumi.id"
        class="group w-full cursor-pointer relative"
      >
        <div class="rounded-xl bg-gray-200 aspect-[2/3] relative overflow-hidden">
          <NuxtImg
            :src="bangumi.images.large"
            :alt="bangumi.name_cn || bangumi.name"
            loading="lazy"
            placeholder
            h-full w-full object-cover
            sizes="180px"
          />
        </div>
        <div flex="~ col gap0.5" mt2 w-full>
          <div line-clamp-1>
            {{ bangumi.name_cn || bangumi.name }}
          </div>
          <div text-sm op50 line-clamp-1>
            {{ bangumi.name }}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      豆瓣资源
    </div>
  </div>
</template>
