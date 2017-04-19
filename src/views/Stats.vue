<script>
  import Api from '../assets/js/Api';
  import Chart from '../assets/js/Chart';

  import Alert from '../assets/js/Alert';
  import Event from '../events/all';

  import vgHeader from '../components/Header.vue';

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
          labels: [],
          datasets: []
        },

        logged: false,
        connected: true,
        graphicOk: false,
      }
    },

    components: {
      vgHeader,
      StatsChart: Chart.bar,
      StatsLine: Chart.line,
      StatsDoughnut: Chart.doughnut,
      StatsPie: Chart.pie,
      StatsBubble: Chart.bubble
    },

    methods: {
      handleGetVeggies(obj) {
        const fixedArray = [];
        const eventsArray = [];

        for (let item in obj) {
          switch(obj[item].type) {
            case 'fixo':
              fixedArray.push(obj[item]);
            break;

            case 'evento':
              eventsArray.push(obj[item]);
            break;
          }
        }

        this.makeGraphic(fixedArray, eventsArray);
      },

      makeGraphic(fixed, event) {
        this.buildPie(fixed, event);

        console.warn(fixed);
        console.warn(event);

        this.graphicOk = true;
      },

      buildPie(fixed, event) {
        this.datacollection.labels = ['Fixo', 'Eventos'];
        this.datacollection.datasets.push({
          label: 'Data One',
          backgroundColor: '#F87979',
          data: [fixed.length, event.length]
        });
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
    <vg-header
      :logged="logged"
      :connected="connected">
    </vg-header>

  <div class="card pie" v-if="graphicOk">
    <div class="card-image">
      <div class="image is-4by3">
        <stats-pie
          :data="datacollection"
          :options="options"
          :width="200"
          :height="200">
        </stats-pie>
      </div>
    </div>

    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="http://bulma.io/images/placeholders/96x96.png" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">John Smith</p>
          <p class="subtitle is-6">@johnsmith</p>
        </div>
      </div>

      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
        <a>#css</a> <a>#responsive</a>
        <br>
        <small>11:09 PM - 1 Jan 2016</small>
      </div>
    </div>
  </div>

    <!-- <stats-line
      :data="datacollection"
      :options="options"
      :width="400"
      :height="200">
    </stats-line> -->

    <!-- <stats-doughnut
      :data="datacollection"
      :options="options"
      :width="400"
      :height="200">
    </stats-doughnut> -->

    <!-- <stats-chart
      :data="datacollection"
      :options="options"
      :width="400"
      :height="200">
    </stats-chart> -->

    <!-- <stats-bubble
      :data="datacollection"
      :options="options"
      :width="400"
      :height="200">
    </stats-bubble> -->
  </div>
</template>

<style scoped lang="scss">
  .is-4by3 {
    padding: 10px 0;
    background-color: #DEDEDE;
  }

  .card {
    &.pie { max-width: 20%; }
  }
</style>