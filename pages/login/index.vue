<!-- eslint-disable vue/html-indent -->
<template>
  <div class="content">
    <div class="content__wrap">
      <BaseLogin class="content__table" />
    </div>
  </div>
</template>

<script>
export default {
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 39px 25px;
  width: 100%;
  height: 100%;
  background-color: var(--color-bg-1);
  background-image: url("@/assets/images/login-bg.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom center;
  &__wrap {
    position: relative;
    top: -30px;
    border-radius: 4px;
    background-color: var(--color-bg-white-1);
    box-shadow: 1px 4px 4px 2px rgba(0, 0, 0, 0.15);
    overflow: hidden;
  }
  &__title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    font-size: 36px;
    color: var(--color-text-2);
  }
  &__icon {
    width: 40px;
    height: 40px;
  }
}
</style>
