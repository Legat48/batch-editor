<template>
  <label
    class="label"
    :class="{'label_active' : !!inputValue,
             'label_color' : color,
             'label_deactivated' : deactivated,
             'label_error': !rules && !deactivated}"
  >
    <div v-if="title" class="label__title">
      {{ title }}
    </div>
    <div class="label__wrap-input">
      <div v-if="search" class="label__search">
        <svg
          class="label__search-icon"
          width="17.489990"
          height="17.489990"
          viewBox="0 0 17.49 17.49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <path id="Vector" d="M12.5 11L11.71 11L11.43 10.73C12.41 9.58997 13 8.10999 13 6.5C13 2.91003 10.09 0 6.5 0C2.91 0 0 2.91003 0 6.5C0 10.09 2.91 13 6.5 13C8.10999 13 9.59 12.41 10.73 11.4301L11 11.71L11 12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01001 11 2 8.98999 2 6.5C2 4.01001 4.01001 2 6.5 2C8.98999 2 11 4.01001 11 6.5C11 8.98999 8.98999 11 6.5 11Z" fill="#323232" fill-opacity="1.000000" fill-rule="nonzero" />
        </svg>
      </div>

      <input
        v-if="!textarea"
        v-model="inputValue"
        class="label__input"
        :type="password && !show ?'password' : isNumber ? 'number' : 'text'"
        :step="step"
        :placeholder="placeholder"
        required
      >
      <textarea
        v-if="textarea"
        id=""
        v-model="inputValue"
        class="label__input label__input_textarea"
        :placeholder="placeholder"
        required
        name=""
      />
      <button v-if="reset && inputValue" v-ripple class="label__input-btn" @click.prevent="inputValue = ''">
        <v-icon>
          mdi-close
        </v-icon>
      </button>
      <button v-if="password" v-ripple class="label__input-btn" @click.prevent="show = !show">
        <v-icon v-show="show">
          mdi-eye
        </v-icon>
        <v-icon v-show="!show">
          mdi-eye-off
        </v-icon>
      </button>
    </div>
    <p class="label__label-info" :class="{'label__label-info_error' : !rules}">
      {{ rules ? help : textError }}
    </p>
  </label>
</template>

<script>

export default {
  name: 'BaseLabel',
  props: {
    value: {
      type: [String, Number, null],
      default: '',
      require: true
    },
    isNumber: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Ввод'
    },
    title: {
      type: String,
      default: ''
    },
    reset: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    help: {
      type: String,
      default: ''
    },
    textError: {
      type: String,
      default: ''
    },
    rules: {
      type: Boolean,
      default: true
    },
    color: {
      type: Boolean,
      default: false
    },
    password: {
      type: Boolean,
      default: false
    },
    textarea: {
      type: Boolean,
      default: false
    },
    deactivated: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false,
      valid: false,
      lastStep: 1,
      lastValue: null,
      labelError: false
    }
  },
  computed: {
    inputValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    },
    step () {
      if (this.isNumber) {
        const decimalDigits = this.countDecimalDigits(this.value)
        if (this.lastValue && Math.round(Math.abs(this.value - this.lastValue) * 100) !== this.lastStep * 100) {
          this.setLastStep(null)
        }
        this.setLastValue(this.value)
        if (decimalDigits <= 0 && this.lastStep !== 0.1) {
          return 1
        } else if ((decimalDigits === 1 && this.lastStep !== 0.01) || this.lastStep === 0.1) {
          this.setLastStep(0.1)
          return 0.1
        } else {
          this.setLastStep(0.01)
          return 0.01
        }
      }
      return 1
    }
  },
  watch: {
    inputValue (value) {
      this.validate(value)
    }
  },
  methods: {
    setLastValue (value) {
      this.lastValue = value
    },
    setLastStep (step) {
      this.lastStep = step
    },
    validate  (login) {
      this.loginError = login && login.length < 3
      this.updateValid()
    },
    updateValid () {
      this.valid = !this.labelError && this.inputValue
    },
    countDecimalDigits (number) {
      return `${number}`.split(/[,.]/)[1] ? `${number}`.split(/[,.]/)[1].length : 0
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  position: relative;
  display: flex;
  flex-direction: column;
  &_color {
    padding: 4px sizeIncr(10, 15) sizeIncr(10, 15);
    border-radius: 4px;
    width: sizeIncr(150, 240);
    background-color: var(--color-bg-2);
    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.15);
    .label__title {
      font-size: sizeIncr(16, 16);
    }
    .label__wrap-input {
      height: 32px;
      background-color: var(--color-bg-white-1) !important;
    }
  }
  .label__wrap-input {
    opacity: 0.7;
    @include transition;
  }
  &_active {
    opacity: 1;
    @include transition;
    .label__label-info {
      opacity: 1;
    }
    .label__wrap-input {
      border: 1px solid var(--color-border-1);
      background-color: transparent;
      opacity: 1;
      box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.1);
    }
  }
  &_error {
    .label__wrap-input {
      color: #EA0C0E;
      border-color: #EA0C0E;
    }
    .label__input {
      color: #EA0C0E;
    }
    .label__label-info {
      &_error {
        opacity: 1;
        color: #EA0C0E;
      }
    }
  }
  &_deactivated {
    pointer-events: none;
    cursor: auto;
    opacity: 0.7;
  }
  &:focus-within {
    .label__wrap-input {
    opacity: 1;
    @include transition;
    }
    opacity: 1;
    .label__label-info {
      opacity: 1;
    }
  }
  &__title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 4px;
    font-weight: 500;
    font-size: 20px;
    color: var(--color-text-1);
  }
  &__text {
    font-size: sizeIncr(14, 18);
    line-height: 120%;
    color: var(--color-text-1);
  }
  &__label-info {
    position: absolute;
    margin: 0;
    inset: auto auto 0 40px;
    font-size: 10px;
    color: #A6A9B6;
    opacity: 0;
    @include transition;

  }
  &__wrap-input {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 0 40px;
    width: 100%;
    height: 50px;
    border: 1px solid transparent;
    background-color: var(--color-bg-1);
  }
  &__input {
    width: 100%;
    color: var(--color-text-1);
    resize: none;
  }
  &__input-btn {
    position: absolute;
    inset: 0 0 0 auto;
    display: flex;
    align-items: center;
    padding: 0 5px;
  }
  &__error {
    position: absolute;
    margin-bottom: 0;
    inset: auto 0 0 0;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #EA0C0E;
  }
  &__search {
    position: absolute;
    inset: 0 auto 0 10px;
    display: flex;
    align-items: center;
  }
  &__search-icon {
    width: 17px;
    height: 17px;
  }
}
</style>
