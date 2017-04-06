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
      Chart
    }
  }
</script>

<template>
  <div>
    <chart
      :data="datacollection"
      :options="options"
      :width="400"
      :height="200">
    </chart>
  </div>
</template>

<style scoped>
  /**/
</style>