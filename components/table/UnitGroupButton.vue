<template>
  <div
    class="button__btn btn"
  >
    {{ item.group_name }}
    <svg
      v-if="!noClick && !noDel"
      v-ripple
      class="button__del-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      @click="deleteElem(item.unit_group_id)"
    >
      <path d="M28 2L2.00004 28" stroke="#fff" stroke-width="3.29174" stroke-linecap="round" />
      <path d="M2 2L28 28" stroke="#fff" stroke-width="3.29174" stroke-linecap="round" />
    </svg>
  </div>
</template>

<script>

export default {
  name: 'UnitGroupButton',
  props: {
    value: {
      type: Array,
      require: true
    },
    noDel: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      required: true
    },
    noClick: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    arrValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  },
  mounted () {
  },
  methods: {
    deleteElem (id) {
      console.log('id', id)
      this.arrValue = this.value.filter(e => e.unit_group_id !== id)
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  &__wrap {
    position: relative;
    display: flex;
    padding: 10px!important;

    padding: 5px;
    opacity: 1 !important;
  }
  &__title {
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: 500;
    max-width: calc(100% - 30px);
    color: var(--color-text-1);
  }
  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 0 13px;
    border-radius: 120px !important;
    height: sizeIncr(30, 30) !important;
    font-weight: 500 !important;
    font-size: 14px !important;
    color: var(--color-text-white-1) !important;
    background-color: var(--color-btn-1) !important;
    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    white-space: nowrap;
    @include transition;
    &_disabled {
      pointer-events: none;
    }
  }
  &__icon {
    margin-right: 13px;
    width: 24px;
    height: 24px;
  }
  &__item {
    display: flex;
    align-items: center;
    height: 40px;
  }
  &__text {
    font-weight: 500;
    font-size: sizeIncr(14, 16);
    line-height: 17px;
    color: var(--color-text-1);
  }
  &__svg {
    width: 16px;
    height: 16px;
  }
  &__del-icon {
    padding-right: 10px;
    position: relative;
    right: -10px;
    width: 24px;
    height: 14px;
  }
}
</style>
<style>
  .button__wrap {
    display: block !important;
    opacity: 1 !important;
  }
  .v-menu__content  {
    border-radius: 4px !important;
    overflow: hidden !important;
  }
</style>
