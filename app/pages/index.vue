<script setup lang="ts">
definePageMeta({
  layout: 'home',
})

const online = useOnline()

const { data } = await useFetch('/api/douban/bangumi/calendar.list')

const activeTab = ref('home')
const tabs = [
  { label: '首页', value: 'home' },
  { label: '收藏', value: 'favorites' },
  { label: '最近热门', value: 'hot' },
]
</script>

<template>
  <div>
    <ClientOnly>
      <Suspense>
        <PageView v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div>
        <template #fallback>
          <div op50 italic>
            <span animate-pulse>Loading...</span>
          </div>
        </template>
      </Suspense>
      <template #fallback>
        <div op50>
          <span animate-pulse>...</span>
        </div>
      </template>
    </ClientOnly>
    <Segmented v-model="activeTab" :tabs="tabs" />
    <InputEntry />
  </div>
</template>
