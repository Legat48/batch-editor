<template>
  <div class="buttons">
    <div v-if="!noClick" class="buttons__title">
      Относится к группе агрегатов:
    </div>
    <div class="buttons__wrap">
      <UnitGroupButton
        v-for="item of options"
        :key="item.id"
        v-model="arrValue"
        :item="item"
        :no-click="noClick"
        :no-del="noDel"
        class="buttons__item"
      />
      <UnitGroupButtonAdd
        v-if="!noClick"
        v-model="arrValue"
        :no-click="false"
        class="buttons__item"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnitGroupButtons',
  props: {
    value: {
      type: Array,
      require: true
    },
    noClick: {
      type: Boolean,
      default: false
    },
    noDel: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/require-default-prop
    options: {
      type: Array,
      require: true
    }
  },
  data: () => ({
  }),
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
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.buttons {
  &__title {
    font-size: sizeIncr(14, 18);
    font-weight: 500;
    margin-bottom: 8px;
  }
  &__select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 28px;
    border-radius: 5px;
    background-color: var(--color-bg-white-1);
  }
  &__wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    width: 100%;
  }
  &__btn {
   display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border-radius: 120px;
    padding: 0 8px;
    height: sizeIncr(30, 30);
    font-weight: 500;
    font-size: 14px;
    color: var(--color-text-white-1);
    background-color: var(--color-btn-2);
    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    @include transition;
    &_active {
      color: var(--color-text-white-1);
      background-color: var(--color-btn-1);
      .switch__icon path {
        fill: var(--color-text-white-1)
      }
    }
    &_disabled {
      pointer-events: none;
    }
  }
  &__del-icon {
    width: 14px;
    height: 14px;
  }
}
</style>
<style lang="scss">
.buttons__select {
  .v-input__control {
    height: 28px !important;
    min-height: auto !important;
  }
}
.theme--light.v-select .v-buttons__selections {
  color: var(--color-text-1) !important;
}
.v-sheet.v-list {
  border-radius: 4px !important;
  padding: 0 !important;
}

</style>
