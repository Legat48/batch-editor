<template>
  <v-tabs
    v-model="selectedValue"
    class="tabs"
    :height="height"
    color="colorText2"
    background-color="transparent"
    grow
  >
    <v-tab
      v-for="item in options"
      :key="item.id"
      :tab-value="item.id"
    >
      {{ item.name }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
      require: true
    },
    height: {
      type: String,
      default: '45px',
      require: true
    },
    // eslint-disable-next-line vue/require-default-prop
    options: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      tab: null
    }
  },
  computed: {
    selectedValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>
<style lang="scss">
</style>

<style>
.v-tabs.tabs {
  flex: none !important;
}
.tabs .v-tab {
  font-weight: 700;
  font-size: 32px;
}
</style>
