<template>
  <div class="px40 py12" flex="~ col">
    <AppHeader />
    <main class="mt50 items-center" flex="~ col">
      <slot />
      <Footer />
      <div class="text-sm mx-auto mt5 text-center op25">
        [Page Layout]
      </div>
    </main>
  </div>
</template>
