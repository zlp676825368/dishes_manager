<template>
  <div>
    <ve-line :data="chartData"></ve-line>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
export default {
  components: { VeLine },
  data () {
    return {
      chartData: {
        columns: ['date', '测试'],
        rows: [
          { 'date': '01-01', '测试': 1231 },
          { 'date': '01-02', '测试': 1223 },
          { 'date': '01-03', '测试': 2123 },
          { 'date': '01-04', '测试': 4123 },
          { 'date': '01-05', '测试': 3123 },
          { 'date': '01-06', '测试': 5123 }
        ]
      }
    }
  }
}
</script>