<template>
  <transition name="transition-modal-form">
    <div v-if="dialogOpen && dialogObg" class="modal-form">
      <ModalEdit ref="modalContent" class="modal-form__wrap" />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalForm',
  data () {
    return {
      loaded: true
    }
  },
  computed: {
    dialogObg () {
      return this.$store.getters['dialog/getDialogObg']
    },
    dialogOpen: {
      get () {
        return this.$store.getters['dialog/getDialogOpen']
        // return true
      },
      set () {
        this.$store.commit('dialog/closeDialog')
      }
    }
  },
  watch: {
    selectedPath (newVal) {
      this.copyBatch(newVal)
    },
    // блокировка скролла страницы
    dialogOpen (newVal) {
      // this.$refs.modalContent.updateInfoForm()
      if (newVal) {
        this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        this.disableScroll()
      } else {
        setTimeout(this.enableScroll, 300)
        this.restoreScrollPosition()
      }
    }
  },
  mounted () {
    this.loaded = false
    // console.count('openForm')
  },
  methods: {
    disableScroll () {
      // document.body.style.overflow = 'visible'
      // document.body.style.position = 'fixed'
      // document.body.style.top = `-${this.scrollPosition}px`
      // document.body.style.width = '100%'
    },
    // rgb(0, 143, 251)
    // rgb(0, 227, 150)
    // rgb(254, 176, 25)
    // rgb(255, 69, 96)
    // rgb(119, 93, 208)

    // rgb(51, 178, 223)
    // rgb(84, 110, 122)
    // rgb(212, 82, 110)
    // rgb(19, 216, 170)
    // rgb(165, 151, 139)
    // rgb(43, 144, 143)
    // rgb(249, 163, 164)
    // rgb(144, 238, 126)
    // rgb(244, 128, 36)
    // rgb(105, 210, 231)

    enableScroll () {
      // document.body.style.overflow = ''
      // document.body.style.position = ''
      // document.body.style.top = ''
      // document.body.style.width = ''
    },
    restoreScrollPosition () {
      setTimeout(() => {
        window.scrollTo(0, this.scrollPosition)
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-form {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: sizeIncr(65, 94);
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  z-index: 202;
  &__wrap {
    min-width: 82vw;
    min-height: 80vh;
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
