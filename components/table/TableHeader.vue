<template>
  <div class="header">
    <BaseLabel
      v-if="switchTable === 0"
      v-model="batchFilter"
      :color="true"
      :reset="true"
      :search="true"
      :title="'Поиск по № партии*'"
      :placeholder="'12345L'"
      :help="'Введите номер партии'"
    />
    <!-- <TableSelect
      v-if="optionsStatus && switchTable === 0"
      v-model="selectedStatus"
      :title="'Статус:'"
      :options="optionsStatus"
      class="header__select"
    /> -->
    <BaseLabel
      v-if="switchTable === 1"
      v-model="materialFilter"
      :color="true"
      :reset="true"
      :search="true"
      :title="'Поиск по материалу'"
      :placeholder="'12345L'"
      :help="'Введите название материала'"
    />
    <TableSelect
      v-if="optionsUsage && switchTable === 1"
      v-model="selectedUsage"
      :title="'Признак использования:'"
      :options="optionsUsage"
      class="header__select"
    />
    <MultipleSelectMatType :title="`Тип материала`" />
    <MultipleSelectStatusGroup :title="'Статус'" />
    <MultipleSelect />
  </div>
</template>

<script>
export default {
  name: 'TableHeader',
  computed: {
    switchTable () {
      return this.$store.getters.getSwitch
    },
    batchFilter: {
      get () {
        return this.$store.getters.getBatchFilter
      },
      set (value) {
        this.$store.commit('setBatchFilter', value)
      }
    },
    materialFilter: {
      get () {
        return this.$store.getters.getMaterialFilter
      },
      set (value) {
        this.$store.commit('setMaterialFilter', value)
      }
    },
    selectedMatType: {
      get () {
        return this.$store.getters.getSelectedMatTypes
      },
      set (value) {
        this.$store.commit('updateSelectedMatType', value)
      }
    },
    selectedStatus: {
      get () {
        return this.$store.getters.getSelectedStatus
      },
      set (value) {
        this.$store.commit('updateSelectedStatus', value)
      }
    },
    selectedUsage: {
      get () {
        return this.$store.getters.getSelectedUsage
      },
      set (value) {
        this.$store.commit('updateSelectedUsage', value)
      }
    },
    selectedUnitGroup: {
      get () {
        return this.$store.getters.getSelectedUnitGroup
      },
      set (value) {
        this.$store.commit('updateSelectedUnitGroup', value)
      }
    },
    optionsUnits () { return this.$store.getters.getOptionsUnits },
    optionsUnitMaterials () { return [{ id: 0, name: 'Все' }, ...this.$store.getters.getUnitGroup] },
    optionsMatType () { return this.$store.getters.getOptionsMatType },
    optionsUsage () { return this.$store.getters.getOptionsUsage },
    optionsStatus () { return this.$store.getters.getOptionsStatus }

  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  width: 100%;
  border-bottom: 2px solid var(--color-border-1);
  &__wrap-select {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 10px;
  }
  &__switch {
    margin-right: auto;
  }
}
</style>
