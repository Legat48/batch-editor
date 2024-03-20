<template>
  <v-menu v-model="menu" :close-on-content-click="false">
    <template #activator="{ on, attrs }">
      <v-btn
        ref="openBtn"
        color="colorBg2"
        v-bind="attrs"
        class="multiple-select__btn"
        v-on="on"
      >
        <div class="multiple-select__wrap-top-btn">
          <div class="multiple-select__title">
            Группа агрегатов
          </div>
          <svg
            class="multiple-select__add-icon"
            width="14.000000"
            height="14.000000"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path id="Vector" d="M14 8L8 8L8 14L6 14L6 8L0 8L0 6L6 6L6 0L8 0L8 6L14 6L14 8Z" fill="#323232" fill-opacity="1.000000" fill-rule="nonzero" />
          </svg>

          <div class="multiple-select__btn-text">
            Добавить
          </div>
        </div>
        <div class="multiple-select__wrap-bot-btn">
          <button
            v-for=" item of valueArr"
            :key="item.id"
            v-ripple
            class="multiple-select__item-arr"
            @click.stop="deleteElem(item.id)"
          >
            {{ item.name }}
            <div class="multiple-select__wrap-del-icon">
              <svg
                class="multiple-select__del-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path d="M28 2L2.00004 28" stroke="#fff" stroke-width="3.29174" stroke-linecap="round" />
                <path d="M2 2L28 28" stroke="#fff" stroke-width="3.29174" stroke-linecap="round" />
              </svg>
            </div>
          </button>
        </div>
      </v-btn>
    </template>
    <v-list>
      <div class="multiple-select__wrap" @keyup.enter="valid && applyСhanges()">
        <div class="multiple-select__title-add">
          Добавить группу агрегатов
        </div>
        <div class="multiple-select__wrap-btn-select">
          <button
            v-for="item of optionsUnitGroup"
            :key="item.id"
            v-ripple
            :class="{'multiple-select__btn-input_active' : item.id === selectedUnitGroup}"
            class="multiple-select__btn-input"
            @click="selectedUnitGroup = item.id"
          >
            {{ item.name }}
          </button>
        </div>

        <button v-ripple class="multiple-select__btn-change" :class="{'multiple-select__btn-change_disabled': !valid}" @click="applyСhanges()">
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
  data () {
    return {
      menu: false,
      selectedUnitGroup: null
    }
  },
  computed: {
    valueArr () {
      return this.$store.getters.getUnitGroupFilter
    },
    valid () {
      return this.selectedUnitGroup !== null
    },
    optionsUnitGroup () {
      // eslint-disable-next-line prefer-const
      let arr = this.$store.getters.getUnitGroup
      if (this.valueArr && this.valueArr.length > 0) {
        arr = this.$store.getters.getUnitGroup.filter(e => !this.valueArr.some(j => e.name === j.name))
      }
      return arr
    }
  },
  watch: {
    menu (value) {
      console.log('value', value)
    }
  },
  mounted () {
  },
  methods: {
    deleteElem (id) {
      const newArr = this.valueArr.filter(e => e.id !== id)
      this.$store.commit('setUnitGroupFilter', newArr)
    },
    applyСhanges () {
      const newArr = JSON.parse(JSON.stringify(this.valueArr))
      newArr.push({
        group_id: this.selectedUnitGroup,
        group_name: this.optionsUnitGroup.find(e => e.id === this.selectedUnitGroup).name,
        id: this.selectedUnitGroup,
        name: this.optionsUnitGroup.find(e => e.id === this.selectedUnitGroup).name
      })
      this.$store.commit('setUnitGroupFilter', newArr)
      this.menu = false
    }
  }
}
</script>

<style lang="scss" scoped>
.multiple-select {
  &__wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }
  &__wrap-top-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
  }
  &__title {
    margin-right: auto;
    font-size: 16px;
    font-weight: 500;
    color: var(--color-text-1);
  }
  &__title-add {
    border-bottom: 1px solid var(--color-border-1);
    padding-bottom: 4px;
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    color: var(--color-text-1);
  }
  &__btn {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    align-items: stretch;
    gap: 6px;
    padding: 0px !important;
    border-radius: 4px !important;
    height: sizeIncr(78, 78) !important;
    width: sizeIncr(200, 320);
    font-weight: 500 !important;
    font-size: 14px !important;
    color: var(--color-text-1) !important;
    background-color: var(--color-bg-2) !important;
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
  &__btn-text {
    font-size: 16px;
  }

  &__wrap-btn-select {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 6px 0;
    width: 100%;
    max-width: 500px;
  }
  &__btn-input {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 120px;
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
    height: 17px;
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
  &__wrap-bot-btn {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    border-radius: 4px;
    padding: 1px 4px;
    width: 100%;
    height: 40px !important;
    background-color: var(--color-bg-white-1);
    overflow: auto;
  }
  &__item-arr {
    position: relative;
    z-index: 3;
    border-radius: 120px;
    padding: 4px 25px 4px 10px;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-white-1);
    background-color: var(--color-btn-1);
  }
  &__wrap-del-icon {
    position: absolute;
    inset: 0 0 0 auto;
    display: flex;
    align-items: center;
    padding: 0 5px 0 2px;
  }
  &__del-icon {
    width: 20px;
    height: 12px;
  }
  .v-menu__content  {
    border-radius: 4px !important;
    overflow: hidden !important;
  }
}
</style>

<style lang="scss">
.multiple-select__btn .v-btn__content {
  flex: none !important;
  flex-direction: column !important;
  gap: 5px;
  padding: 4px sizeIncr(10, 15) sizeIncr(10, 15);
  width: 100%;
  height: 100%;
}
</style>
