<template>
  <form class="login" @submit.prevent="submit">
    <div class="login__title">
      <svg
        class="login__title-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="41"
        height="41"
        viewBox="0 0 41 41"
        fill="none"
      >
        <path d="M20.0477 40.1823V35.8771H35.7994V4.30525H20.0477V0H35.7994C36.9927 0 38.0066 0.419044 38.8409 1.25713C39.6772 2.09331 40.0953 3.10934 40.0953 4.30525V35.8771C40.0953 37.073 39.6772 38.089 38.8409 38.9252C38.0066 39.7633 36.9927 40.1823 35.7994 40.1823H20.0477ZM15.7517 30.1367L12.7102 27.0886L17.5417 22.2438H0V17.9385H17.5417L12.7102 13.0937L15.7517 10.0456L25.7756 20.0911L15.7517 30.1367Z" fill="#167FFB" />
      </svg>
      Вход
    </div>
    <label for="login" class="login__label">
      <input
        ref="login"
        v-model="login"
        class="login__input"
        placeholder="Логин"
        required
      >
      <p class="login__label-info" :class="{'login__label-info_error' : loginError}">
        Введите корректно логин
      </p>
    </label>
    <label for="password" class="login__label">
      <div class="login__wrap-input">
        <input
          id="password"
          v-model="password"
          class="login__input"
          :type="show ? 'text' : 'password'"
          placeholder="Пароль"
          required
        >
        <div v-ripple class="login__input-btn btn" @click.prevent="show = !show">
          <v-icon v-show="show">
            mdi-eye
          </v-icon>
          <v-icon v-show="!show">
            mdi-eye-off
          </v-icon>
        </div>
      </div>
      <p class="login__label-info" :class="{'login__label-info_error' : passError}">
        Введите корректный пароль
      </p>
    </label>

    <button
      ref="submitButton"
      v-ripple
      :class="{'login__btn_disabled' :!valid}"
      class="login__btn btn"
      @click.prevent="submit"
      @submit.prevent="submit"
    >
      <v-icon class="login__btn-icon" dense>
        mdi-login
      </v-icon>
      Войти
    </button>
    <p v-if="error" class="login__error">
      {{ error }}
    </p>
  </form>
</template>

<script>

export default {
  name: 'BaseLogin',
  props: {
    modal: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: false,
      login: '',
      password: '',
      valid: false,
      error: '',
      loginError: false,
      passError: false
    }
  },
  computed: {

  },
  watch: {
    var (value) {
      this.validateLogin(value)
    },
    password (value) {
      this.validatePassword(value)
    }
  },
  methods: {
    validateEmail (login) {
      this.loginError = login.length < 3
      this.updateValid()
    },
    validatePassword (password) {
      this.passError = password.length < 3
      this.updateValid()
    },
    updateValid () {
      this.valid = !this.loginError && !this.passError && this.login && this.password
    },
    async submit () {
      this.error = ''
      if (this.valid) {
        this.valid = false
        const data = {
          user: this.login,
          pw: this.password
        }
        const result = await this.$store.dispatch('fetchLogin', data)
        if (result === true) {
          this.valid = false
          await this.$store.dispatch('fetchCatalogs')
          await this.$store.dispatch('fetchMatBatchList')
          this.$router.push('/')
        } else {
          this.valid = true
          this.error = result
          this.$refs.submitButton.classList.add('error')
          setTimeout(() => {
            this.$refs.submitButton.classList.remove('error')
          }, 1000)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: sizeIncr(16, 40);
  &__header {
    position: absolute;
    inset: 0 0 auto 0;
  }
  &__wrap-btn {
    margin-top: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 30px;
  }
  &__title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 24px;
    color: var(--color-text-2);
  }
  &__title-icon {
    width: 30px;
    height: 30px;
  }
  &__text {
    font-size: sizeIncr(14, 18);
    line-height: 120%;
    color: var(--color-text-1);
  }
  &__label {
    position: relative;
    padding: 12px 15px 12px;
    margin-bottom: 20px;
    border-radius: 10px;
    width: 100%;
    min-width: 330px;
    background-color: var(--color-bg-1);
    opacity: 0.8;
    @include transition;
    &:focus-within {
      opacity: 1;
      .login__label-info {
        opacity: 1;
      }
    }
  }
  &__label-info {
    position: absolute;
    margin: 0;
    inset: auto auto 0 18px;
    font-size: 10px;
    color: #A6A9B6;
    opacity: 0;
    @include transition;
    &_error {
      opacity: 1;
      color: #EA0C0E;
    }
  }
  &__wrap-input {
    position: relative;
    width: 100%;
  }
  &__input {
    width: 100%;
    color: var(--color-text-1);
  }
  &__input-btn {
    position: absolute;
    inset: 0 0 auto auto;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    height: 42px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: var(--color-text-white-1);
    background-color: var(--color-btn-1);
    box-shadow: 3px 0px 28px rgba(0, 0, 0, 0.01);
    .login__btn-icon {
      color: var(--color-text-white-1);
    }
    &_disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
  &__btn-icon {
    margin-right: 5px;
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
  &__btn.error {
    .login__btn-icon {
      color: #ff0000 !important;
    }
    border-color: #ff0000!important;
    color: #ff0000 !important;
    background-color: transparent !important;
    box-shadow: 0 0 0 4px #ff0000 !important;
    animation: shake 0.5s infinite;
  }
}
@keyframes shake {
  0% { transform: translate(0, 0); }
  25% { transform: translate(-5px, 0); }
  50% { transform: translate(5px, 0); }
  75% { transform: translate(-5px, 0); }
  100% { transform: translate(5px, 0); }
}
</style>
