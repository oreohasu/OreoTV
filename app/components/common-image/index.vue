<script setup lang="ts">
import type { CommonImageProps } from './types'

const props = withDefaults(defineProps<CommonImageProps>(), {
  aspectRatio: '1/1',
})

const isLoading = ref(true)
const showImage = ref(false)

const MIN_LOADING_TIME = 250
const loadStartTime = ref(0)

async function handleLoad() {
  const elapsed = Date.now() - loadStartTime.value
  const remaining = MIN_LOADING_TIME - elapsed

  if (remaining > 0) {
    await new Promise(resolve => setTimeout(resolve, remaining))
  }

  isLoading.value = false
  showImage.value = true
}

watch(() => props.src, (_) => {
  isLoading.value = true
  showImage.value = false
  loadStartTime.value = Date.now()
}, {
  immediate: true,
})
</script>

<template>
  <div
    class="rounded-3xl bg-#fafafa relative overflow-hidden dark:bg-white/20"
    :class="props.class"
    :style="{ aspectRatio }"
  >
    <Transition name="fade">
      <div
        v-if="isLoading"
        class="skeleton-shimmer inset-0 absolute"
      />
    </Transition>

    <NuxtImg
      :src="src"
      :alt="alt"
      loading="lazy"
      densities="x1 x2"
      class="h-full w-full transition-opacity duration-250 object-cover"
      :class="{ op0: !showImage, op100: showImage }"
      @load="handleLoad"
    />

    <slot name="overlay" />
    <slot name="badge" />
    <slot />
  </div>
</template>

<style scoped>
.skeleton-shimmer {
  background: linear-gradient(90deg, #e5e7eb 0%, #d1d5db 50%, #e5e7eb 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
