<template>
  <TableBatch v-if="switchTable === 0" />
  <TableMaterial v-else />
</template>
<script>
import { createdDate } from '~/helpers/createdDate'
export default {
  name: 'TableTable',
  props: {
    type: {
      type: Number,
      require: true,
      default: 0
    }
  },
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
    content () {
      if (this.switchTable === 0) {
        return this.$store.getters.getFilterBatches
      } else if (this.switchTable === 1) {
        return this.$store.getters.getFilterMaterials
      } else { // на будущее
        return this.$store.getters.getFilterMaterials
      }
    }
  },
  mounted () {
  },
  methods: {
    createdDate (date) {
      return createdDate(date)
    }
  }
}
</script>
