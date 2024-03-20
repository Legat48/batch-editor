<template>
  <table v-if="!preload" class="table">
    <thead>
      <tr class="table__row table__row_header">
        <th
          v-for="(header, index) of headersBatches"
          :key="`header${header.key}${index}`"
          v-ripple
          class="table__item table__item_header"
        >
          {{ header.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, indexRow) of content" :key="`row${indexRow}`" v-ripple class="table__row" @click="!$event.target.classList.contains('table__item-btn_copy') && openBatchesModal(row)">
        <td
          v-for="(item, indexItem) of headersBatches"
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
            <div v-if="item.key === 'elemInfo'" class="table__elem-wrap">
              <ChemButtons v-ripple :no-click="true" :options="row[`${item.key}`]" />
            </div>
            <div v-if="item.key === 'unitGroupInfo'" class="table__elem-wrap">
              <UnitGroupButtons v-ripple :no-click="true" :options="row[`${item.key}`]" />
            </div>
            <div
              v-if="item.key === 'status'"
              class="table__status"
              :class="{
                'table__status_1': row[`${item.key}`] === 'I' || row[`${item.key}`] === 'A',
                'table__status_2': row[`${item.key}`] === 'C',
                'table__status_3': row[`${item.key}`] === 'F' || row[`${item.key}`] === null,
              }"
            >
              {{ row[`${item.key}`] === 'I' ? 'Исп.' : row[`${item.key}`] === 'C' ? 'Изр.' : row[`${item.key}`] === 'A' ? 'Наз.' :'Отм.' }}
            </div>
            <div v-if="item.key === 'date_create' || item.key === 'date_edit'" class="table__text">
              {{ createdDate(row[`${item.key}`]) }}
            </div>
            <div
              v-if="item.key !== 'fill_factor'
                && item.key !== 'status'
                && item.key !== 'unitGroupInfo'
                && item.key !== 'elemInfo'
                && item.key !== 'date_create'
                && item.key !== 'date_edit'"
              class="table__text"
            >
              {{ row[`${item.key}`] }}
            </div>
            <svg
              v-if="$store.getters.userEditor && indexItem === headersBatches.length - 1"
              v-ripple
              class="table__item-btn table__item-btn_mla btn"
              width="31"
              height="30"
              viewBox="0 0 31 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.27905 20.25V24H10.0291L21.0891 12.94L17.3391 9.19L6.27905 20.25ZM23.989 10.04C24.3791 9.65 24.3791 9.02 23.989 8.63L21.6491 6.29C21.2591 5.9 20.6291 5.9 20.2391 6.29L18.4091 8.12L22.1591 11.87L23.989 10.04Z"
                fill="white"
              />
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
  name: 'TableBatch',
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
    headersBatches () {
      const arr = []
      for (const item of this.$store.getters.getSelectedMatTypeFilter) {
        if (item.active) {
          arr.push(item.id)
        }
      }
      return this.$store.getters['headers/getHeadersBatches'](arr)
    },
    content () {
      return this.$store.getters.getFilterBatches
    }
  },
  mounted () {
  },
  methods: {
    createdDate (date) {
      if (date) {
        return createdDate(date)
      } else {
        return ''
      }
    },
    openBatchesModal (item) {
      // настройки модального окна при открытии
      const data = {
        title: 'Редактировать партию',
        icon: 'edit',
        type: 'batch',
        id: `${item.id}${item.batch_create_unitid}`,
        fix: true,
        copyID: '',
        obgUnit: {
          optionsMaterial: true,
          optionsStatus: true,
          buttonsElem: true,
          buttonsUnitGroup: true,
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
  width: 100%;
  color: var(--color-text-1);
  background-color: var(--color-bg-white-1);
  border-collapse: collapse;
  font-size: 14px;
  overflow: auto;
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
      inset: -1px 0 auto 0;
      z-index: 3;
      border-bottom: 0px solid var(--color-border-1);
      font-weight: 500;
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
    padding: 5px;
    &_header {
      position: relative;
      user-select: none;
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
