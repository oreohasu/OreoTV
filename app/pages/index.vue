<script setup lang="ts">
definePageMeta({
  layout: 'home',
})

const online = useOnline()

const { data } = await useFetch('/api/douban/bangumi/calendar.list')

const activeTab = ref('home')
const options = [
  { label: '首页', value: 'home' },
  { label: '收藏', value: 'favorites' },
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
    <CapsuleSwitch v-model="activeTab" :options="options" />
    <InputEntry />
  </div>
</template>
