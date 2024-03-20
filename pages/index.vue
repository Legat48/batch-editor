<!-- eslint-disable vue/html-indent -->
<template>
  <div v-if="!$store.getters.getLoading" class="content">
    <BaseTable class="content__wrap" />
    <ModalForm />
  </div>
  <div v-else class="content content_pre-loaded ">
    <PreLoaded />
  </div>
</template>

<script>
export default {
  middleware: ['fetchHeaders'],
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
    this.$store.commit('setLoading', false)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.content {
  .content {
  &_pre-loaded {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__wrap {
    width: 100%;
    border: 3px solid var(--color-border-1) ;
    border-radius: 4px;
    height: calc(100vh - (var(--height-header) + 4px) - 30px);
    background-color: var(--color-bg-white-1);
    box-shadow: 1px 4px 4px 2px rgba(0, 0, 0, 0.15);
  }
}
}
</style>
