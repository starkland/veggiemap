<script>
  import Api from '../assets/js/Api';
  import Chart from '../assets/js/Chart';

  import Alert from '../assets/js/Alert';
  import Event from '../events/all';

  export default {
    name: 'vgChart',

    mounted() {
      this.api = new Api();

      this.api.getVeggies();

      Event.$on('get_veggies', this.handleGetVeggies);
      Event.$on('api_error', this.handleError);
    },

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
    },

    methods: {
      handleGetVeggies(obj) {
        console.warn('A requisição me retornou isso:', obj);
      },

      handleError(obj) {
        console.warn('Error: ', obj);

        this.alert = new Alert({
          title: 'OPS!',
          text: `Tivemos um erro, e pedimos para que você tente novamente em alguns intantes.`,
          btnText: 'ok'
        });

        this.alert.error();
      }
    },

    beforeDestroy() {
      Event.$off('get_veggies');
      Event.$off('api_error');
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