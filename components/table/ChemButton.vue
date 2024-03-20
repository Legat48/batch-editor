<template>
  <v-menu v-if="item.element_content > 0" v-model="menu" :close-on-content-click="false" offset-y>
    <template #activator="{ on, attrs }">
      <v-btn
        ref="openBtn"
        :color="change ? 'colorReady' :'colorBtn1'"
        dark
        v-bind="attrs"
        class="chem-button__btn"

        :class="{'chem-button__btn_disabled': noClick,
                 'chem-button__btn_change': change}"
        v-on="on"
      >
        {{ item.element_abbr }} {{ item.element_content }}%
        <svg
          v-if="!noClick"
          v-ripple
          class="chem-button__del-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          @click.stop="deleteElem(item.element_num)"
        >
          <path d="M28 2L2.00004 28" stroke="#fff" stroke-width="3.29174" stroke-linecap="round" />
          <path d="M2 2L28 28" stroke="#fff" stroke-width="3.29174" stroke-linecap="round" />
        </svg>
      </v-btn>
    </template>
    <v-list>
      <div class="chem-button__wrap" @keyup.enter="valid && applyСhanges()">
        <BaseLabel
          v-model="elementContent"
          :title="'Изменить содержание'"
          :placeholder="'n %'"
          :is-number="true"
          :help="'Введите и подтвердите изменение %'"
        />
        <BaseLabel
          v-model="elementAssimilation"
          :title="'Изменить усвоение'"
          :placeholder="'n %'"
          :is-number="true"
          :help="'Введите и подтвердите изменение %'"
        />
        <button v-ripple class="chem-button__btn-change" :class="{'chem-button__btn-change_disabled': !valid}" @click="applyСhanges()">
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
  name: 'ChemButton',
  props: {
    value: {
      type: Array,
      require: true
    },
    item: {
      type: Object,
      required: true
    },
    noClick: {
      type: Boolean,
      default: false
    },
    change: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menu: false,
      elementContent: '',
      elementAssimilation: ''
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
      return Number(this.elementContent) >= 0.01
    }
  },
  mounted () {
    this.elementContent = this.item.element_content
    this.elementAssimilation = this.item.element_assim
  },
  methods: {
    deleteElem (id) {
      this.arrValue = this.value.filter(e => e.element_num !== id)
    },
    applyСhanges () {
      const newArr = JSON.parse(JSON.stringify(this.arrValue))
      const index = this.arrValue.findIndex(e => e === this.item)
      if (index >= 0) {
        newArr[index].element_content = this.elementContent
        newArr[index].element_assim = this.elementAssimilation
        this.arrValue = newArr
      }
      this.menu = false
    }
  }
}
</script>

<style lang="scss">
.chem-button {
  &__wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }
  &__title {
    margin-bottom: 15px;
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
    @include transition;
    &_change {
    background-color: var(--color-ready) !important;

    }
    &_disabled {
      pointer-events: none;
    }
  }
  &__icon {
    margin-right: 13px;
    width: 24px;
    height: 24px;
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
  &__item {
    display: flex;
    align-items: center;
    height: 40px;
  }
  &__text {
    font-weight: 500;
    font-size: 14px;
    color: var(--color-text-1);
  }
  &__svg {
    width: 14px;
    height: 14px;
  }
  &__del-icon {
    padding-right: 10px;
    position: relative;
    right: -10px;
    width: 24px;
    height: 14px;
  }
}
.v-menu__content  {
  border-radius: 4px !important;
  overflow: hidden !important;
}
</style>
