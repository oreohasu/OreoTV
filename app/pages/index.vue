<script setup lang="ts">
definePageMeta({
  layout: 'home',
})

const online = useOnline()

const router = useRouter()

function go() {
  router.push('/bangumi')
}
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
    <div>
      <button
        text-sm btn m-3
        @click="go"
      >
        GO
      </button>
    </div>
    <InputEntry />
  </div>
</template>
