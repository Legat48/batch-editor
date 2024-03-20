<template>
  <div>
    <v-app v-if="true" class="app">
      <div class="app__base-wrap">
        <BaseHeader class="app__header" />
        <div class="app__main">
          <Nuxt />
        </div>
      </div>
    </v-app>
    <v-app v-else>
      <div class="app__preloaded">
        <PreLoaded />
      </div>
    </v-app>
  </div>
</template>
<script>

export default {
}
</script>

<style lang="scss" scoped>
.app {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: var(--color-bg-1) !important;
  &__base-wrap {
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr;
    grid-template-rows: calc(var(--height-header) + 4px) calc(100vh - (var(--height-header) + 4px));
    width: 100%;
    height: 100%;
    max-height: 100vh;
  }

  &__header {
    border-radius: 0 0 4px 4px;
    border-bottom: 3px solid var(--color-border-1) ;
    border-left: 3px solid var(--color-border-1) ;
    border-right: 3px solid var(--color-border-1) ;
    width: calc(100% - 40px);
    overflow: hidden;
  }

  &__main {
    width: 100%;
    padding: 15px 20px;
  }

  &__preloaded {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}</style>
