<template>
  <div
    class="multiple-select"
  >
    <div v-if="title" class="multiple-select__title">
      {{ title }}:
    </div>
    <div class="multiple-select__wrap">
      <button
        v-for=" item of valueObg"
        :key="item.id"
        v-ripple
        class="multiple-select__item-arr"
        :class="{'multiple-select__item-arr_active' : item.active}"
        @click.stop="switchItem(item)"
      >
        <div class="multiple-select__icon" :class="{'multiple-select__icon_active' : item.active}" />
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: [String, Number, Object, null],
      default: '',
      require: true
    },
    title: {
      type: String,
      default: ''
    },
    deactivated: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedMatType: null,
      valueObg: {}
    }
  },
  computed: {
    valueArr () {
      return this.$store.getters.getSelectedMatTypeFilter
    },
    valid () {
      return this.selectedMatType !== null
    },
    optionsMatType () {
      return this.$store.getters.getOptionsMatType
    }
  },
  mounted () {
    this.updateValueObg()
  },
  methods: {
    updateValueObg () {
      const obg = {}
      const arr = JSON.parse(JSON.stringify(this.optionsMatType))
      for (const item of arr) {
        obg[item.id] = {
          ...item,
          active: !!this.valueArr.find(e => e.id === item.id)
        }
      }
      this.valueObg = obg
    },
    switchItem (item) {
      this.valueObg[item.id].active = !item.active
      const newArr = []
      for (const e of Object.values(JSON.parse(JSON.stringify(this.valueObg)))) {
        newArr.push(e)
      }
      this.$store.commit('setSelectedMatTypeFilter', newArr)
    }
  }
}
</script>

<style lang="scss" scoped>
.multiple-select {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 7px;
  &__wrap {
    position: relative;
    display: flex;
    gap: 5px;
  }
  &__wrap-top-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
  }
  &__title {
    margin-right: auto;
    font-size: 16px;
    font-weight: 500;
    color: var(--color-text-1);
  }
  &__item-arr {
    position: relative;
    z-index: 3px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 4px;
    padding:  0 12px;
    height: 40px;
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text-2);
    background-color: var(--color-btn-4);
    @include transition;
    &_active {
      background-color: var(--color-no-error-light);
    }
  }
  &__icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 2px solid var(--color-text-2);
    border-radius: 100px;
    &::after {
      position: relative;
      top: -1px;
      content: '';
      border-top: 2px solid var(--color-text-2);
      border-left: 2px solid var(--color-text-2);
      width: 40%;
      height: 70%;
      transform: rotate(-135deg);
      opacity: 0;
      @include transition;
    }
    &_active::after  {
      opacity: 1;
    }
  }
  .v-menu__content  {
    border-radius: 4px !important;
    overflow: hidden !important;
  }
}
</style>

<style lang="scss">
.multiple-select__btn .v-btn__content {
  flex: none !important;
  flex-direction: column !important;
  gap: 9px;
  padding: 4px sizeIncr(10, 15) sizeIncr(10, 15);
  width: 100%;
  height: 100%;
}
</style>
