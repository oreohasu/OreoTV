<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
  html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  color-scheme: dark;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #fafafa;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: #f1f1f1;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}
</style>
