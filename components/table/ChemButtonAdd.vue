<template>
  <v-menu v-model="menu" :close-on-content-click="false">
    <template #activator="{ on, attrs }">
      <v-btn
        ref="openBtn"
        color="primary"
        dark
        v-bind="attrs"
        class="chem-button-add__btn"
        :class="{'chem-button-add__btn_disabled': noClick}"
        v-on="on"
      >
        <div class="chem-button-add__btn-wrap">
          <svg
            class="chem-button-add__add-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path d="M14 2V26" stroke="white" stroke-width="2.4" stroke-linecap="round" />
            <path d="M2 14L26 14" stroke="white" stroke-width="2.4" stroke-linecap="round" />
          </svg>
          Добавить
        </div>
      </v-btn>
    </template>
    <v-list>
      <div class="chem-button-add__wrap" @keyup.enter="valid && applyСhanges()">
        <div class="chem-button-add__title">
          Добавить элемент {{ optionsElem.find(e => e.id === selectedElem)?.name }} {{ optionsElem.find(e => e.id === selectedElem) ? `(${optionsElem.find(e => e.id === selectedElem).element_abbr})` : '' }} :
        </div>
        <!-- <TableSelect
          v-model="selectedElem"
          :title="'Элемент:'"
          :options="optionsElem"
        /> -->
        <div class="chem-button-add__wrap-btn-select">
          <button
            v-for="item of optionsElem"
            :key="item.id"
            v-ripple
            :class="{'chem-button-add__btn-input_active' : item.id === selectedElem}"
            class="chem-button-add__btn-input"
            @click="selectedElem = item.id"
          >
            {{ item.name }} ({{ item.element_abbr }})
          </button>
        </div>
        <BaseLabel
          v-model="elementContent"
          :title="`Содержание элемента`"
          :placeholder="'n %'"
          :is-number="true"
          :help="'Введите и подтвердите изменение %'"
        />
        <BaseLabel
          v-model="elementAssimilation"
          :title="`Усвоение`"
          :placeholder="'n %'"
          :is-number="true"
          :help="'Введите и подтвердите изменение %'"
        />

        <button v-ripple class="chem-button-add__btn-change" :class="{'chem-button__btn-change_disabled': !valid}" @click="applyСhanges()">
          <v-icon color="#fff">
            mdi-check
          </v-icon>
          Применить
        </button>
      </div>
    </v-list>
  </v-menu>
</template>

<script>

export default {
  name: 'ChemButtonAdd',
  props: {
    value: {
      type: Array,
      require: true
    },
    noClick: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menu: false,
      elementName: '',
      selectedElem: 999,
      elementContent: '0.01',
      elementAssimilation: '100'
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
    },
    valid () {
      return this.selectedElem !== 999 && Number(this.elementContent) >= 0.01
    },
    optionsElem () {
      let arr = Object.values(this.$store.getters.getСhemElements)
      if (this.arrValue) {
        arr = arr.filter(e => !this.arrValue.some(j => e.element_num === j.element_num && j.element_content > 0)) // можно смело добавить дублирующий элемент, если есть обнуленный другой хим элемент
      }
      return arr
    }
  },
  watch: {
    menu (value) {
      if (!value) {
        this.elementName = ''
        this.selectedElem = 999
        this.elementContent = '0.01'
        this.elementAssimilation = '100'
      }
    }
  },
  mounted () {
  },
  methods: {
    deleteElem (id) {
      this.arrValue = this.value.filter(e => e.element_num !== id)
    },
    applyСhanges () {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const newArr = JSON.parse(JSON.stringify(this.arrValue))
      newArr.push({
        element_num: this.$store.getters.getСhemElements[`element_${this.selectedElem}`].element_num,
        element_name: this.$store.getters.getСhemElements[[`element_${this.selectedElem}`]].element_name,
        element_abbr: this.$store.getters.getСhemElements[[`element_${this.selectedElem}`]].element_abbr,
        element_content: this.elementContent,
        element_assim: this.elementAssimilation
      })
      this.arrValue = newArr
      this.menu = false
    }
  }
}
</script>

<style lang="scss" scoped>
.chem-button-add {
  &__wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }
  &__title {
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
    border-radius: 120px !important;
    height: sizeIncr(30, 30) !important;
    font-weight: 500 !important;
    font-size: 14px !important;
    color: var(--color-text-white-1) !important;
    background-color: var(--color-btn-1) !important;
    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    letter-spacing:  normal !important;
    text-transform: none !important;
    @include transition;
    &_disabled {
      pointer-events: none;
    }
  }
  &__btn-change {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 100%;
    color: var(--color-text-white-1);
    border-radius: 120px !important;
    background-color: var(--color-ready) !important;
    @include transition;
    &_disabled {
      background-color: var(--color-btn-2) !important;
      opacity: 0.6;
      pointer-events: none;
    }
  }
  &__btn-wrap {
    display: flex;
    align-items: stretch;
    gap: 3px;
  }
  &__wrap-btn-select {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 6px 0;
    width: 100%;
    max-width: 500px;
  }
  &__btn-input {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 8px;
    height: sizeIncr(35, 35);
    font-weight: 500;
    font-size: sizeIncr(14, 16);
    background-color: var(--color-btn-deactive-1);
    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    @include transition;
    &_active {
      color: var(--color-text-white-1);
      background-color: var(--color-btn-1)
    }
  }
  &__icon {
    margin-right: 13px;
    width: 24px;
    height: 24px;
  }
  &__add-icon {
    width: 19px;
    height: 16px;
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
  .v-menu__content  {
    border-radius: 4px !important;
    overflow: hidden !important;
  }
}
</style>
