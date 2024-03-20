<template>
  <table v-if="!preload && headersMaterials" class="table">
    <thead>
      <tr class="table__row table__row_header">
        <th
          v-for="(header, index) of headersMaterials"
          :key="`header${header.key}${index}`"
          v-ripple
          class="table__item table__item_header"
          :class="{'table__item_chem' : header.key === 'elemInfo'}"
        >
          {{ header.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, indexRow) of content"
        :key="`row${indexRow}`"
        v-ripple
        class="table__row"
        :class="{'table__row_disabled': !$store.getters.userEditor}"
        @click="!$event.target.classList.contains('table__item-btn_copy') && openMaterialModal(row, $event.target.classList)"
      >
        <td
          v-for="(item, indexItem) of headersMaterials"
          :key="`item${indexItem}`"
          class="table__item"
        >
          <div
            class="table__item-content"
            :class="{'table__item-content_group': item.key === 'unitGroupInfo' || item.key === 'elemInfo'}"
          >
            <div v-if="item.key === 'fill_factor' && row[`${item.key}`]" class="table__text">
              {{ row[`${item.key}`] }}%
            </div>
            <div v-if="item.key === 'date_create' || item.key === 'date_edit'" class="table__text">
              {{ createdDate(row[`${item.key}`]) }}
            </div>
            <div
              v-if="item.key === 'usage_tag'"
              class="table__status "
              :class="{
                'table__status_1': row[`${item.key}`] === 1,
                'table__status_2': row[`${item.key}`] !== 1
              }"
            >
              {{ row[`${item.key}`] === 1 ? 'Исп.' : 'Не исп.' }}
            </div>
            <div v-if="item.key === 'elemInfo'" class="table__elem-wrap">
              <ChemButtons v-ripple :no-click="true" :options="row[`${item.key}`]" />
            </div>
            <div v-if="item.key === 'unitGroupInfo'" class="table__elem-wrap">
              <UnitGroupButtons v-ripple :no-click="true" :options="row[`${item.key}`]" />
            </div>
            <div
              v-if="item.key !== 'elemInfo' &&
                item.key !== 'unitGroupInfo' &&
                item.key !== 'fill_factor' &&
                item.key !== 'date_create' &&
                item.key !== 'usage_tag' &&
                item.key !== 'date_edit'"
              class="table__text"
            >
              {{ row[`${item.key}`] }}
            </div>
            <svg
              v-if="$store.getters.userEditor && indexItem === headersMaterials.length - 1"
              v-ripple
              class="table__item-btn table__item-btn_mla btn"
              width="31"
              height="30"
              viewBox="0 0 31 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.27905 20.25V24H10.0291L21.0891 12.94L17.3391 9.19L6.27905 20.25ZM23.989 10.04C24.3791 9.65 24.3791 9.02 23.989 8.63L21.6491 6.29C21.2591 5.9 20.6291 5.9 20.2391 6.29L18.4091 8.12L22.1591 11.87L23.989 10.04Z" fill="white" />
            </svg>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { createdDate } from '~/helpers/createdDate'
export default {
  name: 'TableMaterial',
  props: {
    type: {
      type: Number,
      require: true,
      default: 0
    }
  },
  data () {
    return {
      startId: '',
      preload: false,
      isDraggbleColumn: null
    }
  },
  computed: {
    switchTable () {
      return this.$store.getters.getSwitch
    },
    headersMaterials () {
      const arr = []
      for (const item of this.$store.getters.getSelectedMatTypeFilter) {
        if (item.active) {
          arr.push(item.id)
        }
      }
      return this.$store.getters['headers/getHeadersMaterials'](arr)
    },
    content () {
      return this.$store.getters.getFilterMaterials
    }
  },
  methods: {
    createdDate (date) {
      if (date) {
        return createdDate(date)
      } else {
        return ''
      }
    },

    openMaterialModal (item) {
      // настройки модального окна при открытии
      const data = {
        title: 'Редактировать материал',
        icon: 'edit',
        type: 'material',
        id: item.id,
        copyID: '',
        fix: true,
        obgUnit: {
          optionsMatType: true,
          inputMaterialName: true,
          inputMaterialFullName: true,
          buttonsElem: true,
          buttonsUnitGroup: true,
          inputWeightMeterWireDefault: true,
          inputWeightMeterFillerDefault: true,
          inputWeightDefault: true,
          inputFillingFactor: true,
          inputMatDensity: true,
          inputСost: true,
          optionsUsageTag: true
        }
      }
      this.$store.dispatch('dialog/setDialog', data)
    },
    elemModal (item) {
      // настройки модального окна при открытии
      const data = {
        title: 'Редактировать хим состав',
        icon: 'edit',
        type: 'materialElem',
        id: item.id,
        copyID: '',
        fix: true,
        obgUnit: {
          buttonsElem: true,
          buttonsAdd: true
        }
      }
      this.$store.dispatch('dialog/setDialog', data)
    },
    copyMaterialModal (item) {
      // настройки модального окна при открытии
      const data = {
        title: `Копировать материал ${item.name}`,
        icon: 'copy',
        type: 'material',
        id: item.id,
        copyID: '',
        obgUnit: {
          optionsMatType: true,
          buttonsElem: true,
          buttonsUnitGroup: true,
          inputMaterialName: true,
          inputMaterialFullName: true,
          inputWeightMeterMin: true,
          inputWeightMeterMax: true,
          inputСost: true,
          optionsUsageTag: true

        }
      }
      this.$store.dispatch('dialog/setDialog', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  max-height: calc(100vh - var(--height-header) - 110px);
  color: var(--color-text-1);
  background-color: var(--color-bg-white-1);
  border-collapse: collapse;
  font-size: sizeIncr(12, 14);
  &__row {
    height: 60px;
    border-bottom: 1px solid var(--color-border-1);
    cursor: pointer;
    &:hover {
      background-color: var(--color-bg-white-1);
    }
    &:active {
        background-color: var(--color-bg-white-1);
    }
    &_disabled {
      pointer-events: none;
    }
    &_header {
      position: sticky;
      inset: 0 0 auto 0;
      z-index: 3;
      border-bottom: 0px solid var(--color-border-1);
      font-weight: 500;
      line-height: 110%;
      background-color: #fff;
      &:hover {
        background-color: var(--color-bg-white-1);
      }
      &:active {
        background-color: var(--color-bg-white-1);
      }
    }
  }
  &__item {
    height: 60px;
    padding: 5px sizeIncr(5, 10) ;
    &_header {
      position: relative;
      text-align: left;
      @include transition;
      &::before {
        content: '';
        position: absolute;
        inset: auto 0 0 0;
        height: 2px;
        background-color: var(--color-border-1);
      }
      &::after {
        content: '';
        position: absolute;
        inset:  0 0 0 auto;
        width: 1px;
        background-color: var(--color-border-1);
        opacity: 0.3;
      }
      &:hover {
        background-color: var(--color-bg-1);
      }
      &:active {
        background-color: var(--color-border-1);
      }
    }
    &_chem {
    min-width: 300px;
    }
  }
  &__item-btn {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    @include transition;
    background-color: var(--color-btn-1);
    &:hover {
      background-color: var(--color-active);
      box-shadow: 0 0 0 3px var(--color-btn-1);
    }
    &:active {
      background-color: var(--color-active);
      box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    }
    &_mla {
      margin-left: auto;
    }
  }

  &__item-content {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 100%;
    &_group {
      min-width: 145px;
    }
  }
  &__status {
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 7px;
    font-weight: 500;
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    &_1 {
      background-color: var(--color-no-error);
    }
    &_2 {
      color: var(--color-text-white-1);
      background-color: var(--color-btn-2);
    }
    &_3 {
      color: var(--color-text-white-1);

      background-color: var(--color-error);
    }
  }
}
</style>
