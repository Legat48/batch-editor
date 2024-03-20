<template>
  <div class="table">
    <button v-if="$store.getters.userEditor && switchTable === 0" v-ripple class="table__btn-add btn" @click="addBatch()">
      <svg
        class="table__icon-add"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <path d="M14 2V26" stroke="white" stroke-width="2.4" stroke-linecap="round" />
        <path d="M2 14L26 14" stroke="white" stroke-width="2.4" stroke-linecap="round" />
      </svg>
      Создать
    </button>
    <TableHeader />
    <div class="table__wrap">
      <transition name="table-slide">
        <TableTable v-if="switchTable === 0" class="table__table" :type="0" />
      </transition>
      <transition name="table-slide-right">
        <TableTable v-if="switchTable === 1" class="table__table" :type="1" />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTable',
  computed: {
    switchTable () {
      return this.$store.getters.getSwitch
    }
  },
  methods: {
    addMaterial () {
      // настройки модального окна при открытии
      const data = {
        title: 'Добавить материал',
        icon: 'add',
        type: 'material',
        id: '',
        copyID: '',
        obgUnit: {
          // optionsMatType: true,
          // optionsUsageTag: true,
          buttonsMatType: true,
          inputMaterialName: true,
          inputMaterialFullName: true,
          inputWeightMeterMin: true,
          inputWeightMeterMax: true,
          inputСost: true
        }
      }
      this.$store.dispatch('dialog/setDialog', data)
    },
    addBatch () {
      // настройки модального окна при открытии
      const data = {
        title: 'Добавить партию',
        icon: 'add',
        type: 'batch',
        id: '',
        copyID: '',
        obgUnit: {
          buttonsMaterial: true,
          optionsMaterial: true,
          inputPathNumber: true,
          inputBatchNoExtra: true,
          inputBatchScada: true,
          inputPathWeight: true,
          inputBatchLength: true,
          inputWeightMeterWire: true,
          inputWeightMeterFiller: true,
          inputBatchMatDensity: true,
          inputComment: true,
          inputFillingFactor: true
        }
      }
      this.$store.dispatch('dialog/setDialog', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  position: relative;
  height: 100%;
  &__wrap {
    position: relative;
    max-height: calc(100vh - var(--height-header) - 150px);
    overflow-y: scroll;
  }
  &__btn-add {
    position: absolute;
    inset: auto 60px 30px auto;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 35px;
    z-index: 11;
    font-size: 30px;
    font-weight: 500;
    border-radius: 4px;
    color: var(--color-text-white-1);
    background-color: var(--color-btn-1);
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    @include transition;
    &:hover {
      background-color: var(--color-active);
      box-shadow: 0 0 0 4px var(--color-btn-1);
      .table__icon-add {
        transform: rotate(90deg);
      }
    }
    &:active {
      background-color: var(--color-active);
      box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
      .table__icon-add {
        transform: rotate(180deg);
      }
    }
  }
  &__icon-add {
    @include transition;
    pointer-events: none;
    width: 30px;
    height: 30px;
  }
}
.table-slide-enter-active,
.table-slide-leave-active {
  transition-property: box-shadow, border, outline, color, background-color, transform, fill, stroke, opacity, filter, font-weight, font-size;
  transition-duration: 0.05s;
  transition-timing-function: ease-in-out;
}
.table-slide-enter,
.table-slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.table-slide-right-enter-active,
.table-slide-right-leave-active {
  @include transition;
}
.table-slide-right-enter,
.table-slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
