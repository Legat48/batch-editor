<template>
  <label class="select">
    <div class="select__title">
      {{ title }}
    </div>

    <v-select
      v-model="selectedValue"
      :items="options"
      item-value="id"
      item-text="name"
      hide-details
      solo
      append-icon="mdi-chevron-down"
      class="select__select"
    />
  </label>
</template>

<script>
export default {
  name: 'TableSelect',
  props: {
    value: {
      type: Number,
      default: 0,
      require: true
    },
    title: {
      type: String,
      default: '',
      require: true
    },
    // eslint-disable-next-line vue/require-default-prop
    options: {
      type: Array,
      require: true
    }
  },
  computed: {
    selectedValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  flex-direction: column;
  gap: sizeIncr(5, 10);
  padding: 7px sizeIncr(10, 15) sizeIncr(10, 15);
  border-radius: 4px;
  width: sizeIncr(150, 240);
  height: 78px;
  color: var(--color-text-1);
  background-color: var(--color-bg-2);
  box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.15);
  &__title {
    font-size: sizeIncr(14, 16);
    line-height: 100%;
    font-weight: 500;
  }
  &__select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 28px;
    border-radius: 5px;
    background-color: var(--color-bg-white-1);
  }
}
</style>
<style lang="scss">
.select__select {
  .v-input__control {
    height: 28px !important;
    min-height: auto !important;
  }
}
.theme--light.v-select .v-select__selections {
  color: var(--color-text-1) !important;
}
.v-sheet.v-list {
  border-radius: 4px !important;
  padding: 0 !important;
}

</style>
<style>
.v-select {
  flex: none;
}
</style>
