<template>
  <div class="modal-edit" @click.stop @keyup.enter="submit()">
    <div class="modal-edit__header">
      <div class="modal-edit__title-wrap">
        <svg
          v-if="dialogObg.icon === 'add'"
          class="modal-edit__title-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="39"
          height="39"
          viewBox="0 0 39 39"
          fill="none"
        >
          <path d="M19.5 2V37" stroke="#167FFB" stroke-width="3.13333" stroke-linecap="round" />
          <path d="M2 19.5L37 19.5" stroke="#167FFB" stroke-width="3.13333" stroke-linecap="round" />
        </svg>
        <svg
          v-if="dialogObg.icon === 'edit'"
          class="modal-edit__title-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="47"
          height="47"
          viewBox="0 0 47 47"
          fill="none"
        >
          <path
            d="M5.875 33.7813V41.125H13.2188L34.8779 19.4658L27.5342 12.1221L5.875 33.7813ZM40.5571 13.7867C41.3208 13.0229 41.3208 11.7892 40.5571 11.0254L35.9746 6.44293C35.2108 5.67918 33.9771 5.67918 33.2133 6.44293L29.6296 10.0267L36.9733 17.3704L40.5571 13.7867Z"
            fill="#167FFB"
          />
        </svg>
        <svg
          v-if="dialogObg.icon === 'copy'"
          v-ripple
          class="modal-edit__title-icon"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="copyBatchesModal(row)"
        >
          <path
            d="M19 4H7C5.9 4 5 4.9 5 6V20H7V6H19V4ZM22 8H11C9.9 8 9 8.9 9 10V24C9 25.1 9.9 26 11 26H22C23.1 26 24 25.1 24 24V10C24 8.9 23.1 8 22 8ZM22 24H11V10H22V24Z"
            fill="#167FFB"
          />
        </svg>
        <h2 class="modal-edit__title">
          {{ dialogObg.title }}
        </h2>
      </div>
      <button v-ripple class="modal-edit__close" @click.prevent="dialogOpen = false">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path d="M28 2L2.00004 28" stroke="#167FFB" stroke-width="3.29174" stroke-linecap="round" />
          <path d="M2 2L28 28" stroke="#167FFB" stroke-width="3.29174" stroke-linecap="round" />
        </svg>
      </button>
    </div>
    <BaseTabs v-if="dialogObg.icon === 'add'" v-model="choiseMatType" :height="'70px'" :options="choiseMatTypeArr" />
    <div v-if="dialogObg.obgUnit.buttonsMaterial" class="modal-edit__wrap-buttons">
      <TableButtons
        v-if="dialogObg.obgUnit.buttonsMaterial"
        v-model="selectedMaterial"
        :title="'Выбор материала*'"
        :options="optionsMaterial"
        class="modal-edit__buttons"
        :type="getMatTypeName()"
      />
    </div>
    <div v-if="dialogObg.obgUnit" class="modal-edit__wrap-select">
      <TableSelect
        v-if="dialogObg.obgUnit.optionsAggregate"
        v-model="selectedUnits"
        :title="'Агрегат:'"
        :options="optionsUnits"
        class="modal-edit__select"
      />
      <TableSelect
        v-if="dialogObg.obgUnit.optionsMatType"
        v-model="type_id"
        :title="'Тип материала*:'"
        :options="optionsMatType"
        class="modal-edit__select"
      />
      <div
        v-if="dialogObg.obgUnit.optionsMaterial && (dialogObg.icon === 'edit' || dialogObg.icon === 'copy')"
        class="modal-edit__sub-select"
      >
        <div class="modal-edit__select-title">
          Материал:
        </div>
        <div class="modal-edit__select-text">
          {{ selectedMaterial !== null ? optionsMaterial.find(e => e.id === selectedMaterial).name: '' }}
        </div>
      </div>
      <TableSelect
        v-if="dialogObg.obgUnit.optionsStatus"
        v-model="selectedStatus"
        :title="'Статус:'"
        :options="optionsStatus"
        class="modal-edit__select"
      />
      <TableSelect
        v-if="dialogObg.obgUnit.optionsUsageTag"
        v-model="selectedUsageTag"
        :title="'Признак использования:'"
        :options="optionsUsageTag"
        class="modal-edit__select"
      />
      <TableSelect
        v-if="dialogObg.obgUnit.optionsPathArr"
        v-model="selectedPath"
        :title="'Шаблон партии:'"
        :options="optionsBatches"
        class="modal-edit__select"
      />
    </div>
    <div class="modal-edit__wrap-buttons modal-edit__wrap-buttons_type-2">
      <ChemButtons
        v-if="dialogObg.obgUnit.buttonsElem"
        v-model="elemInfo"
        :old-obg="elemInfoOld"
        :options="elemInfo"
        class="modal-edit__buttons"
      />
      <UnitGroupButtons
        v-if="dialogObg.obgUnit.buttonsUnitGroup"
        v-model="unitGroupInfo"
        :options="unitGroupInfo"
        :no-del="type === 'material'"
        class="modal-edit__buttons"
      />
    </div>
    <div v-if="dialogObg.obgUnit" class="modal-edit__wrap-label">
      <BaseLabel
        v-if="dialogObg.obgUnit.inputPathNumber"
        v-model="batch_no"
        :title="'Номер партии*'"
        :deactivated="dialogObg.icon === 'add' && !selectedMaterial"
        :placeholder="'Номер'"
        :help="'Введите номер партии'"
        :rules="!!batch_no && batch_no.length > 0"
        :text-error="'Обязательно введите номер партии'"
      />
      <BaseLabel
        v-if="dialogObg.obgUnit.inputBatchNoExtra"
        v-model="batch_no_extra"
        :title="'Дополнительный номер партии'"
        :deactivated="dialogObg.icon === 'add' && !selectedMaterial"
        :placeholder="'Название'"
        :help="'Дополнительный номер партии'"
        :text-error="'Дополнительный номер партии'"
      />
      <BaseLabel
        v-if="dialogObg.obgUnit.inputBatchScada"
        v-model="batch_no_scada"
        :title="'Название на SCADA*'"
        :deactivated="dialogObg.icon === 'add' && !selectedMaterial"
        :placeholder="'Название'"
        :help="'Название отражаемое на SCADA'"
        :rules="!!batch_no_scada && batch_no_scada.length > 0"
        :text-error="'Введите название которое отражается на SCADA'"
      />
      <BaseLabel
        v-if="dialogObg.obgUnit.inputMaterialFullName"
        v-model="name"
        :title="'Полное имя материала*'"
        :placeholder="'Название'"
        :help="'Введите полное имя материала'"
        :rules="true"
      />
      <BaseLabel
        v-if="dialogObg.obgUnit.inputMaterialName"
        v-model="abbr"
        :title="'Имя материала'"
        :placeholder="'Имя'"
        :help="'Введите имя материала'"
        :rules="!!abbr && abbr.length > 1"
        :text-error="'Обязательно имя материала'"
        :error="errorNumberPart"
      />
      <BaseLabel
        v-if="dialogObg.obgUnit.inputBatchLength && choiseMatType === 2"
        v-model="len"
        :title="'Длина бухты, м.'"
        :deactivated="dialogObg.icon === 'add' && !selectedMaterial"
        :placeholder="'м.'"
        :is-number="true"
        :help="'Длина всей партии'"
        :rules="!len || /^[0-9.,]+$/.test(len)"
        :text-error="'Вводите только цифры'"
      />
      <BaseLabel
        v-if="dialogObg.obgUnit.inputPathWeight && choiseMatType !== 3"
        v-model="wght"
        :title="'Вес'"
        :deactivated="dialogObg.icon === 'add' && !selectedMaterial"
        :placeholder="'кг'"
        :is-number="true"
        :help="'Введите общий вес партии'"
        :rules="!wght || /^[0-9.,]+$/.test(wght)"
        :text-error="'Вводите только цифры'"
      />
      <BaseLabel
        v-if="dialogObg.obgUnit.inputWeightMeterWire && choiseMatType === 2"
        v-model="run_meter_wght"
        :title="'Масса погонного метра проволоки, г/м'"
        :deactivated="dialogObg.icon === 'add' && !selectedMaterial"
        :placeholder="'г/м'"
        :is-number="true"
        :help="'Введите массу погонного метра проволоки, г/м'"
        :rules="!run_meter_wght || /^[0-9.,]+$/.test(run_meter_wght)"
        :text-error="'Вводите только цифры'"
      />
      <BaseLabel
        v-if="dialogObg.obgUnit.inputWeightMeterFiller && choiseMatType === 2"
        v-model="run_meter_wght_fill"
        :deactivated="dialogObg.icon === 'add' && !selectedMaterial"
        :title="'Масса погонного метра наполнителя, г/м'"
        :placeholder="'г/м'"
        :is-number="true"
        :help="'Введите массу погонного метра наполнителя, г/м'"
        :rules="!run_meter_wght_fill || /^[0-9.,]+$/.test(run_meter_wght_fill)"
        :text-error="'Вводите только цифры'"
      />
      <BaseLabel
        v-if="dialogObg.obgUnit.inputWeightMeterWireDefault && choiseMatType === 2"
        v-model="run_meter_wght_default"
        :is-number="true"
        :title="'Масса погонного метра проволоки по умолчанию, г/м'"
        :placeholder="'г/м'"
        :help="'Введите массу погонного метра проволоки по умолчанию, г/м'"
        :rules="!run_meter_wght_default || /^[0-9.,]+$/.test(run_meter_wght_default)"
        :text-error="'Вводите только цифры'"
      />
      <BaseLabel
        v-if="dialogObg.obgUnit.inputWeightMeterFillerDefault && choiseMatType === 2"
        v-model="run_meter_wght_filler_default"
        :is-number="true"
        :title="'Масса погонного метра наполнителя по умолчанию, г/м'"
        :placeholder="'г/м'"
        :help="'Введите массу погонного метра наполнителя по умолчанию, г/м'"
        :rules="!run_meter_wght_filler_default || /^[0-9.,]+$/.test(run_meter_wght_filler_default)"
        :text-error="'Вводите только цифры'"
      />
      <BaseLabel
        v-if="dialogObg.obgUnit.inputWeightDefault && choiseMatType === 2"
        v-model="dflt_wght"
        :is-number="true"
        :title="'Масса по умолчанию, кг'"
        :placeholder="'кг'"
        :help="'Введите массу по умолчанию, кг'"
        :rules="!dflt_wght || /^[0-9.,]+$/.test(dflt_wght)"
        :text-error="'Вводите только цифры'"
      />

      <BaseLabel
        v-if="dialogObg.obgUnit.inputFillingFactor && choiseMatType === 2"
        v-model="fill_factor"
        :deactivated="dialogObg.icon === 'add' && !selectedMaterial"
        :title="'Коэффициент наполнения, %'"
        :is-number="true"
        :placeholder="'%'"
        :help="'Укажите коэффициент наполнения, %'"
        :rules="!fill_factor || /^[0-9.,]+$/.test(fill_factor)"
        :text-error="'Вводите только цифры'"
      />
      <BaseLabel
        v-if="dialogObg.obgUnit.inputСost"
        v-model="cost"
        :is-number="true"
        :title="'Цена за единицу, у.е.'"
        :placeholder="''"
        :help="'Укажите цену'"
        :rules="!cost || /^[0-9.,]+$/.test(cost)"
        :text-error="'Вводите только цифры'"
      />
      <BaseLabel
        v-if="dialogObg.obgUnit.inputMatDensity && choiseMatType === 2"
        v-model="mat_density"
        :title="'Плотность материала, кг/м3'"
        :is-number="true"
        :placeholder="''"
        :help="'Укажите плотность'"
        :rules="!cost || /^[0-9.,]+$/.test(cost)"
        :text-error="'Вводите только цифры'"
      />
      <BaseLabel
        v-if="dialogObg.obgUnit.inputBatchMatDensity && choiseMatType === 2"
        v-model="batch_mat_density"
        :title="'Плотность материала, кг/м3'"
        :deactivated="dialogObg.icon === 'add' && !selectedMaterial"
        :is-number="true"
        :placeholder="''"
        :help="'Укажите плотность'"
        :rules="!cost || /^[0-9.,]+$/.test(cost)"
        :text-error="'Вводите только цифры'"
      />
      <BaseLabel
        v-if="dialogObg.obgUnit.inputComment"
        v-model="comment"
        :deactivated="dialogObg.icon === 'add' && !selectedMaterial"
        :title="'Примечание'"
        :placeholder="'Комментарии'"
        :help="'Введите дополнительную информацию'"
        :textarea="true"
      />
    </div>
    <div class="modal-edit__footer">
      <button v-ripple class="modal-edit__btn modal-edit__btn_cancel btn" @click.prevent="dialogOpen = false">
        Отменить
      </button>
      <button
        ref="submitButton"
        v-ripple
        class="modal-edit__btn btn"
        :class="{'modal-edit__btn_disabled' : !valid || ($store.getters['dialog/getDialogObg'].type === 'batch' && dialogObg.icon === 'add' && selectedMaterial === null && !batch_no && (batch_no && batch_no.length < 1 )&& !batch_no_extra && (batch_no_extra && batch_no_extra.length < 1))}"
        @click="submit()"
        @submit="submit()"
      >
        Применить
      </button>
      <p v-if="error" class="modal-edit__error">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
// import validFormModal from '~/helpers/validFormModal'
export default {
  name: 'ModalEdit',
  data () {
    return {
      valid: true,
      error: '',
      type: '',
      choiseMatType: 2,
      choiseMatTypeArr: [
        {
          id: 1,
          name: 'Сыпучие'
        },
        {
          id: 2,
          name: 'Проволока'
        },
        {
          id: 3,
          name: 'Газ'
        }],
      idBatch: null,
      batch_no_extra: null,
      batch_no_scada: null,
      batch_create_unitid: null,
      idMaterial: null,
      batch_no: null,
      wght: null,
      len: null,
      run_meter_wght: null,
      run_meter_wght_fill: null,
      fill_factor: null,
      dflt_wght: null,
      comment: null,
      type_id: null,
      name: null,
      abbr: null,
      cost: null,
      id_level3: null,
      run_meter_wght_default: null,
      run_meter_wght_filler_default: null,
      batch_mat_density: null,
      mat_density: null,
      usage_tag: null,
      hdl_type_id: null,
      packaged_output: null,
      errorIdMaterial: '',
      selectedUnits: 0,
      selectedMatType: 1,
      selectedUsage: 0,
      selectedStatus: 1, // по дефолту единичка - используется
      selectedMaterial: null,
      selectedPath: 0,
      selectedUsageTag: 1,
      optionsUsageTag: [{ id: 0, name: 'Не используется' }, { id: 1, name: 'Используется' }],
      errorNumberPart: '',
      elemInfo: [],
      elemInfoOld: {},
      unitGroupInfo: [],
      unitGroupOld: {}
    }
  },
  computed: {
    dialogObg () {
      return this.$store.getters['dialog/getDialogObg']
    },
    dialogOpen: {
      get () {
        return this.$store.getters['dialog/getDialogOpen']
      },
      set () {
        this.$store.commit('dialog/closeDialog')
      }
    },
    optionsUnits () { return this.$store.getters.getOptionsUnits },
    optionsMatType () { return this.$store.getters.getOptionsMatType },
    optionsUsage () { return this.$store.getters.getOptionsUsage },
    optionsMaterial () {
      let arr = this.$store.getters.getMaterials
      // если выбран тип материала
      if (this.choiseMatType && arr && arr.length > 0) {
        if (this.dialogObg.icon === 'add') { // это если идёт добавление новой партии, убираем пусто и не используемое
          arr = this.$store.getters.getMaterials.filter(e => e.usage_tag === 1)
          arr = this.$store.getters.getMaterials.filter(e => e.name && !e.name.toLowerCase().includes('пусто'))
        }
        return arr.filter(e => e.type_id === this.choiseMatType)
      }
      return arr
    },
    optionsStatus () {
      return [{ id: 1, name: 'Создана', text: 'I' },
        { id: 2, name: 'Израсходована', text: 'C' },
        { id: 3, name: 'Отменена', text: 'F' },
        { id: 4, name: 'Назначена', text: 'A' }]
    },
    optionsBatches () {
      return [{ id: 0, name: 'Нет' }, ...this.$store.getters.getBatches.map((e) => {
        return {
          ...e,
          name: e.batch_no
        }
      })]
    }
  },
  watch: {
    choiseMatType () {
      if (this.dialogObg.icon === 'add') {
        this.selectedMaterial = null
        if (this.dialogObg.icon === 'add' && this.choiseMatType === 2) {
          this.run_meter_wght = null
          this.run_meter_wght_fill = null
          this.fill_factor = null
          this.mat_density = null
        }
      }
    },
    selectedPath (newVal) {
      this.copyBatch(newVal)
    },
    selectedMaterial (value) {
      if (this.dialogObg.icon === 'add' && this.choiseMatType === 2) {
        const material = this.$store.getters.getMaterials.find(e => e.id === value)
        if (material) {
          this.run_meter_wght = material.run_meter_wght_default
          this.run_meter_wght_fill = material.run_meter_wght_filler_default
          this.fill_factor = material.fill_factor
          this.mat_density = material.mat_density
        }
      }
    },
    batch_no (value) {
      if (this.dialogObg.icon === 'add' && value) {
        if (!this.batch_no_scada || (value && this.batch_no_scada === value.slice(0, -1))) {
          this.batch_no_scada = value
        }
      }
    }
  },
  mounted () {
    this.updateInfoForm(this.$store.getters['dialog/getDialogObg'])
  },
  methods: {
    // Отправка на сервер
    async submit () {
      this.valid = false
      const data = {}
      let result = false
      if (this.$store.getters['dialog/getDialogObg'].type === 'material') {
        // Отправка сначала хим элементов
        let successfulAns = true // маркер удачной работы элементов
        for (const e of this.elemInfo) {
          // отправляем на сервер элемент если он изменился или добавили новый
          if ((this.elemInfoOld[`element_${e.element_num}`] && (e.element_abbr !== this.elemInfoOld[`element_${e.element_num}`].element_abbr || e.element_content !== this.elemInfoOld[`element_${e.element_num}`].element_content || e.element_assim !== this.elemInfoOld[`element_${e.element_num}`].element_assim)) || !this.elemInfoOld[`element_${e.element_num}`]) {
            successfulAns = await this.$store.dispatch('modifyChemistryMaterial', {
              mat_id: this.idMaterial, //  # Ид материала
              element_num: e.element_num, //  # Номер элемента в период. таблице.
              element_content: e.element_content, //  # Содержание элемента в партии,
              element_assim: e.element_assim // # Усвоение элемента при добавлении в расплав
            })
          }
        }
        // обнулить элемент в базе если его удалили из списка

        for (const e of Object.values(this.elemInfoOld)) {
          if (this.elemInfo && !this.elemInfo.some(j => j.element_num === e.element_num)) {
            successfulAns = await this.$store.dispatch('modifyChemistryMaterial', {
              mat_id: this.idMaterial, //  # Ид материала
              element_num: e.element_num, //  # Номер элемента в период. таблице.
              element_content: 0, //  # Содержание элемента в партии,
              //  % (0...100). Nullable (если null - обнулить элемент)
              elem_assim: e.element_assim // # Усвоение элемента при добавлении в расплав
            })
          }
        }
        // Отправка групп агрегатов
        for (const e of this.unitGroupInfo) {
          // отправляем на сервер элемент если он изменился или добавили новый
          if ((this.unitGroupOld[`id_${e.unit_group_id}`] && e.unit_group_id !== this.unitGroupOld[`id_${e.unit_group_id}`].unit_group_id) || !this.unitGroupOld[`id_${e.unit_group_id}`]) {
            successfulAns = await this.$store.dispatch('modifyUnitGroupMaterial', {
              mat_id: this.idMaterial, //  # Ид материала
              unit_group_id: e.unit_group_id //  Ид группы агрегатов.
            })
          }
        }

        if (!successfulAns) {
          this.$refs.submitButton.classList.add('error')
          setTimeout(() => {
            this.$refs.submitButton.classList.remove('error')
          }, 1000)
          // eslint-disable-next-line no-useless-return
          return
        }
        // Отправляем весь материал на фиксацию
        data.id = this.idMaterial
        data.type_id = this.type_id
        data.name = this.name
        data.abbr = this.abbr
        data.cost = this.cost
        data.dflt_wght = this.dflt_wght
        data.id_level3 = this.id_level3
        data.run_meter_wght_default = this.run_meter_wght_default
        data.run_meter_wght_filler_default = this.run_meter_wght_filler_default
        data.mat_density = this.mat_density
        data.usage_tag = this.selectedUsageTag
        data.fill_factor = this.fill_factor
        data.hdl_type_id = this.hdl_type_id
        data.packaged_output = this.packaged_output
        result = await this.$store.dispatch('submitFormMaterial', data)
      } else if (this.$store.getters['dialog/getDialogObg'].type === 'batch') {
        // Отправка сначала хим элементов
        let successfulAns = true // маркер удачной работы элементов
        for (const e of this.elemInfo) {
          // отправляем на сервер элемент если он изменился или добавили новый
          if ((this.elemInfoOld[`element_${e.element_num}`] && (e.element_abbr !== this.elemInfoOld[`element_${e.element_num}`].element_abbr || e.element_content !== this.elemInfoOld[`element_${e.element_num}`].element_content || e.element_assim !== this.elemInfoOld[`element_${e.element_num}`].element_assim)) || !this.elemInfoOld[`element_${e.element_num}`]) {
            successfulAns = await this.$store.dispatch('modifyChemistryBatch', {
              batch_id: this.idBatch, //  # Ид партии
              batch_create_unitid: this.batch_create_unitid, //  # второе ид партии
              element_num: e.element_num, //  # Номер элемента в период. таблице.
              element_content: e.element_content, //  # Содержание элемента в партии
              element_assim: Number(e.element_assim) ? Number(e.element_assim) : null // # Усвоение элемента при добавлении в расплав
            })
          }
        }

        for (const e of Object.values(this.elemInfoOld)) {
        // обнулить элемент в базе если его удалили из списка
          if (this.elemInfo && !this.elemInfo.some(j => j.element_num === e.element_num)) {
            successfulAns = await this.$store.dispatch('modifyChemistryBatch', {
              batch_id: this.idBatch, //  # Ид партии
              batch_create_unitid: this.batch_create_unitid, //  # второе ид партии
              element_num: e.element_num, //  # Номер элемента в период. таблице.
              element_content: 0, //  # Содержание элемента в партии,
              elem_assim: e.elem_assimilation // # Усвоение элемента при добавлении в расплав,
            })
          }
        }

        // обнулить элемент в базе если его удалили из списка
        for (const e of Object.values(this.unitGroupOld)) {
          if (this.unitGroupInfo && !this.unitGroupInfo.some(j => j.unit_group_id === e.unit_group_id)) {
            successfulAns = await this.$store.dispatch('delUnitGroupBatch', {
              batch_id: this.idBatch, //  # Ид партии
              batch_create_unitid: this.batch_create_unitid, //  # второе ид партии
              unit_group_id: e.unit_group_id //  Ид группы агрегатов.
            })
          }
        }

        // Отправка групп агрегатов
        for (const e of Object.values(this.unitGroupInfo)) {
          // отправляем на сервер элемент если он изменился или добавили новый
          if ((this.unitGroupOld[`id_${e.unit_group_id}`] && e.unit_group_id !== this.unitGroupOld[`id_${e.unit_group_id}`].unit_group_id) || !this.unitGroupOld[`id_${e.unit_group_id}`]) {
            successfulAns = await this.$store.dispatch('modifyUnitGroupBatch', {
              batch_id: this.idBatch, //  # Ид партии
              batch_create_unitid: this.batch_create_unitid, //  # второе ид партии
              unit_group_id: e.unit_group_id //  Ид группы агрегатов.
            })
          }
        }
        if (!successfulAns) {
          this.$refs.submitButton.classList.add('error')
          setTimeout(() => {
            this.$refs.submitButton.classList.remove('error')
          }, 1000)
          return
        }

        data.id = this.idBatch
        data.batch_create_unitid = this.batch_create_unitid
        data.batch_no_extra = this.batch_no_extra
        data.batch_no_scada = this.batch_no_scada
        data.mat_id = this.selectedMaterial
        data.batch_no = this.batch_no
        data.wght = this.wght
        data.len = this.len
        data.batch_mat_density = this.batch_mat_density
        data.status = this.optionsStatus.find((item) => {
          return item.id === this.selectedStatus
        }).text
        data.run_meter_wght = this.run_meter_wght
        data.run_meter_wght_fill = this.run_meter_wght_fill
        data.fill_factor = this.fill_factor
        data.comment = this.comment
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        result = await this.$store.dispatch('submitFormBatch', data)
      }
      if (result === true) {
        this.$store.commit('setLoading', true)
        await this.$store.dispatch('fetchCatalogs')
        await this.$store.dispatch('fetchMatBatchList')
        this.dialogOpen = false
        this.$store.commit('setLoading', false)
      } else {
        this.error = result.message
        if (result.code === -32010) {
          this.$store.dispatch('fetchUnlogin')
          this.$store.commit('setUser', null)
          localStorage.removeItem('user')
          this.$router.push('/login')
        }
        this.$refs.submitButton.classList.add('error')
        setTimeout(() => {
          this.$refs.submitButton.classList.remove('error')
        }, 1000)
      }
      this.valid = false
    },
    async submitMatElem (data) {
      return await this.$store.dispatch('modifyChemistryMaterial', data)
    },
    // синхронизация полей с входящими данными открытия формы
    updateInfoForm (newInfo) {
      this.type = ''
      this.choiseMatType = 2
      this.loaded = true
      this.batch_no_extra = null
      this.batch_no_scada = null
      this.idBatch = null
      this.batch_create_unitid = null
      this.idMaterial = null
      this.batch_no = null
      this.wght = null
      this.len = null
      this.run_meter_wght = null
      this.run_meter_wght_fill = null
      this.run_meter_wght_default = null
      this.run_meter_wght_filler_default = null
      this.dflt_wght = null
      this.mat_density = null
      this.batch_mat_density = null
      this.fill_factor = null
      this.comment = null
      this.id = null
      this.type_id = null
      this.name = null
      this.abbr = null
      this.cost = null
      this.id_level3 = null
      this.usage_tag = null
      this.hdl_type_id = null
      this.packaged_output = null
      this.errorIdMaterial = ''
      this.selectedMaterial = null
      this.selectedUnits = 0
      this.selectedMatType = 0
      this.selectedUsage = 0
      this.selectedPath = 0
      this.selectedUsageTag = 0
      this.errorNumberPart = ''
      this.elemInfo = []
      this.elemInfoOld = {}
      this.unitGroupInfo = []
      this.unitGroupOld = {}
      if (newInfo.type === 'material') {
        this.type = 'material'
        this.editMaterial(newInfo.id)
      } else if (newInfo.type === 'batch') {
        this.type = 'batch'
        if (newInfo.icon === 'edit') {
          this.editBatch(newInfo.id)
        }
      }
      this.loaded = false
    },
    editBatch (id) {
      const batch = this.$store.getters.getBatches.find(e => `${e.id}${e.batch_create_unitid}` === id)
      this.choiseMatType = batch.type_id
      this.idBatch = batch.id
      this.batch_create_unitid = batch.batch_create_unitid
      this.selectedMaterial = batch.mat_id
      this.batch_no_extra = batch.batch_no_extra
      this.batch_no = batch.batch_no
      this.selectedUnits = batch.unit_id ? batch.unit_id : 0
      this.batch_mat_density = batch.batch_mat_density
      this.wght = batch.wght
      this.selectedStatus = this.optionsStatus.find(item => item.text === batch.status).id
      this.len = batch.len
      this.run_meter_wght = batch.run_meter_wght
      this.run_meter_wght_fill = batch.run_meter_wght_fill
      this.fill_factor = batch.fill_factor
      this.comment = `${batch.comment ? batch.comment : ''}`
      this.elemInfo = batch.elemInfo || []
      // для сравнения входящего и получившегося массива элементов
      let arrOldElem = []
      if (batch.elemInfo) {
        arrOldElem = JSON.parse(JSON.stringify(batch.elemInfo))
      }
      const obgElemOld = {}
      arrOldElem.forEach((e) => {
        obgElemOld[`element_${e.element_num}`] = e
      })
      this.elemInfoOld = obgElemOld
      // группы агрегатов
      this.unitGroupInfo = batch.unitGroupInfo || []
      // для сравнения входящего и получившегося массива
      let arrOldUnitGroup = []
      if (batch.unitGroupInfo) {
        arrOldUnitGroup = JSON.parse(JSON.stringify(batch.unitGroupInfo))
      }
      const obgUnitGroupOld = {}
      arrOldUnitGroup.forEach((e) => {
        obgUnitGroupOld[`id_${e.group_id}`] = e
      })
      this.unitGroupOld = obgUnitGroupOld
    },
    editMaterial (id) {
      const material = this.$store.getters.getMaterials.find(e => e.id === id)
      this.choiseMatType = material.type_id
      this.idMaterial = material.id
      this.type_id = material.type_id
      this.name = material.name
      this.abbr = material.abbr
      this.cost = material.cost
      this.dflt_wght = material.dflt_wght
      this.id_level3 = material.id_level3
      this.run_meter_wght_default = material.run_meter_wght_default
      this.run_meter_wght_filler_default = material.run_meter_wght_filler_default
      this.mat_density = material.mat_density
      this.fill_factor = material.fill_factor
      this.selectedUsageTag = material.usage_tag
      this.hdl_type_id = material.hdl_type_id
      this.packaged_output = material.packaged_output
      this.elemInfo = material.elemInfo || []
      // для сравнения входящего и получившегося массива элементов
      let arrOldElem = []
      if (material.elemInfo) {
        arrOldElem = JSON.parse(JSON.stringify(material.elemInfo))
      }
      const obgElemOld = {}
      arrOldElem.forEach((e) => {
        obgElemOld[`element_${e.element_num}`] = e
      })
      this.elemInfoOld = obgElemOld
      // группы материалов
      this.unitGroupInfo = material.unitGroupInfo || []
      // для сравнения входящего и получившегося массива
      let arrOldUnitGroup = []
      if (material.unitGroupInfo) {
        arrOldUnitGroup = JSON.parse(JSON.stringify(material.unitGroupInfo))
      }
      const obgUnitGroupOld = {}
      arrOldUnitGroup.forEach((e) => {
        obgUnitGroupOld[`id_${e.group_id}`] = e
      })
      this.unitGroupOld = obgUnitGroupOld
    },
    getMatTypeName () {
      const matTypeObject = this.choiseMatTypeArr.find(e => e.id === this.choiseMatType)
      return matTypeObject ? matTypeObject.name : 'не найдено'
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-edit {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: sizeIncr(5, 10);
  z-index: 204;
  padding: sizeIncr(80, 80) sizeIncr(18, 36) sizeIncr(18, 36);
  overflow-y: auto;
  min-width: #{$minvw}px;
  max-height: 100%;
  border: 2px solid var(--color-border-1);
  border-radius: 4px;
  background-color: var(--color-bg-white-1);
  box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%);

  &__header {
    position: absolute;
    inset: 0 0 auto 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 0 sizeIncr(18, 36);
    height: 70px;
    border-bottom: 1px solid var(--color-border-1);
  }

  &__title-wrap {
    display: flex;
    align-items: center;
    padding-right: 10px;
  }

  &__title-icon {
    margin-right: 13px;
    width: 40px;
    height: 40px;
    color: var(--color-text-1) !important;
  }

  &__title {
    font-weight: 600;
    font-size: sizeIncr(18, 24);
    line-height: 110%;
    font-size: 40px;
    font-weight: 500;
    color: var(--color-text-2);
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100px;
    svg {
      width: 30px;
      height: 30px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 75vh;
    max-height: 100%;
    min-width: 30vw;
    max-width: 1230px;
    padding: 20px 40px;
  }

  &__buttons {
    margin-bottom: 8px;
  }

  &__wrap-select {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 12px;
  }

  &__wrap-buttons {
    display: flex;
    width: 100%;
    max-width: 70vw;
    gap: 12px;
    &_type-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 100%;
      width: 100%;
    }
  }

  &__wrap-label {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    padding: 15px 0 0 0;
    margin-top: auto;
  }

  &__sub-select {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 5px 15px 12px;
    border-radius: 9px;
    width: sizeIncr(150, 240);
    height: 78px;
    color: var(--color-text-1);
    background-color: var(--color-bg-2);
    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.15);
  }

  &__select-title {
    font-size: sizeIncr(14, 16);
    font-weight: 500;
  }

  &__select-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 33px;
    border-radius: 5px;
    padding: 5px;
    background-color: var(--color-bg-white-1);
    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.15);
  }

  &__btn {
    display: flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 20px;
    font-weight: 500;
    color: var(--color-text-white-1);
    background-color: var(--color-btn-1);
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    @include transition;

    &:hover {
      background-color: var(--color-active);
      box-shadow: 0 0 0 4px var(--color-btn-1);
    }

    &:active {
      background-color: var(--color-active);
      box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    }

    &_disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    &_cancel {
      color: var(--color-text-1);
      background-color: var(--color-bg-2);

      &:hover {
        color: var(--color-text-white-1);
        background-color: var(--color-btn-1);
        box-shadow: 0 0 0 4px var(--color-btn-1);
      }

      &:active {
        color: var(--color-text-white-1);
        background-color: var(--color-btn-1);
        box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
      }
    }
  }

  &__btn.error {
    border-color: #ff0000 !important;
    color: #ff0000 !important;
    background-color: transparent !important;
    box-shadow: 0 0 0 4px #ff0000 !important;

    animation: shake 0.5s infinite;
  }

  &__wrap-mat-type {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    height: 100%;
  }

  &__btn-mat-type {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    width: sizeIncr(160, 310);
    height: sizeIncr(90, 105);
    font-weight: 500;
    font-size: sizeIncr(18, 26);
    background-color: var(--color-btn-deactive-1);
    box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.25);

    &:active,
    &:hover,
    &:focus {
      color: var(--color-text-white-1);
      background-color: var(--color-btn-1);
    }
  }

  &__error {
    position: absolute;
    inset: auto 35px -6px auto;
    font-weight: 500;
    font-size: 18px;
    color: var(--color-error)
  }
}

@keyframes shake {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(-5px, 0);
  }

  50% {
    transform: translate(5px, 0);
  }

  75% {
    transform: translate(-5px, 0);
  }

  100% {
    transform: translate(5px, 0);
  }
}

.transition-modal-form-enter-active,
.transition-modal-form-leave-active {
  @include transition
}

.transition-modal-form-enter,
.transition-modal-form-leave-to {
  opacity: 0;
}
</style>
