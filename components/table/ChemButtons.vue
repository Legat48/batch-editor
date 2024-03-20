<template>
  <div class="buttons">
    <div v-if="!noClick" class="buttons__title">
      Химические элементы:
    </div>
    <div class="buttons__wrap">
      <ChemButton
        v-for="item of options"
        :key="item.id"
        v-model="arrValue"
        :item="item"
        :no-click="noClick"
        :change="check(item)"
        class="buttons__item"
      />
      <ChemButtonAdd
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
  name: 'ChemButtons',
  props: {
    value: {
      type: Array,
      require: true
    },
    noClick: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/require-default-prop
    options: {
      type: Array,
      require: true
    },
    oldObg: {
      type: Object,
      default: null
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
    check (item) {
      if (this.oldObg) {
        console.log('this.oldObg', this.oldObg, this.oldObg[`element_${item.element_num}`], this.oldObg[`element_${item.element_num}`] && (item.element_content !== this.oldObg[`element_${item.element_num}`].element_content))
        return (this.oldObg[`element_${item.element_num}`] && (item.element_abbr !== this.oldObg[`element_${item.element_num}`].element_abbr || item.element_content !== this.oldObg[`element_${item.element_num}`].element_content || item.element_assim !== this.oldObg[`element_${item.element_num}`].element_assim)) || !this.oldObg[`element_${item.element_num}`]
        // return (this.oldObg[`element_${item.element_num}`] && (item.element_abbr !== this.oldObg[`element_${item.element_num}`].element_abbr || item.element_content !== this.oldObg[`element_${item.element_num}`].element_content || item.element_assim !== this.oldObg[`element_${item.element_num}`].element_assim)) || !this.oldObg[`element_${item.element_num}`]
      } else {
        return false
      }
    }
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
    gap: 6px;
    width: 100%;
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
