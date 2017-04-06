<script>
  import Chart from '../assets/js/Chart';

  export default {
    name: 'vgChart',

    data() {
      return {
        options: {
          responsive: false,
          maintainAspectRatio: false
        },

        datacollection: {
          labels: ['January', 'February'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [40, 20]
            }
          ]
        }
      }
    },

    components: {
      StatsChart: Chart.bar,
      StatsLine: Chart.line,
      StatsDoughnut: Chart.doughnut,
      StatsPie: Chart.pie,
      StatsBubble: Chart.bubble
    }
  }
</script>

<template>
  <div>
    <stats-chart
      :data="datacollection"
      :options="options"
      :width="400"
      :height="200">
    </stats-chart>

    <stats-line
      :data="datacollection"
      :options="options"
      :width="400"
      :height="200">
    </stats-line>

    <stats-doughnut
      :data="datacollection"
      :options="options"
      :width="400"
      :height="200">
    </stats-doughnut>

    <stats-pie
      :data="datacollection"
      :options="options"
      :width="400"
      :height="200">
    </stats-pie>

    <stats-bubble
      :data="datacollection"
      :options="options"
      :width="400"
      :height="200">
    </stats-bubble>
  </div>
</template>

<style scoped>
  /**/
</style>