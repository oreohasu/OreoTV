<template>
  <div px40 pb8 pt12 flex="~ col gap8">
    <AppHeader />
    <main mt32 items-center flex="~ col">
      <slot />
      <Footer />
      <div text-sm mx-auto mt-5 text-center opacity-25>
        [Page Layout]
      </div>
    </main>
  </div>
</template>
