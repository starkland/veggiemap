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
          labels: ['Event', 'Fixed'],
          datasets: [
            {
              label: 'By Type',
              backgroundColor: '#F87979',
              data: []
            }
          ]
        },

        graphics: {
          byType: false,
        },

        logged: false,
        connected: true
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
        let result = Object.keys(obj).map((e) => obj[e]);
        this.buildData(result);
      },

      buildData(array) {
        const total = array.length;

        const eventArray = [];
        const fixedArray = [];

        array.forEach((item) => {
          switch(item.type) {
            case 'evento':
              eventArray.push(item);
            break;

            case 'fixo':
              fixedArray.push(item);
            break;
          }
        });

        this.buildGraphic('event', eventArray);
        this.buildGraphic('fixed', fixedArray);
      },

      buildGraphic(type, array) {
        switch(type) {
          case 'event':
            this.datacollection.datasets[0].data[0] = array.length;
          break;

          case 'fixed':
            this.datacollection.datasets[0].data[1] = array.length;
          break;
        }

        this.graphics.byType = true;
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

    <div class="columns">
      <div class="column is-half">
        <div class="card pie" v-if="graphics.byType">
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
                <div class="image is-48x48">
                  <i class="fa fa-pie-chart" aria-hidden="true"></i>
                </div>
              </div>
              <div class="media-content">
                <p class="title is-4">Por tipos</p>
                <p class="subtitle is-6">Atualmente com eventos e fixo.</p>
              </div>
            </div>

            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris..
            </div>
          </div>
        </div>
      </div>

      <div class="column is-half">
        <div class="card pie">
          <div class="card-image">
            <div class="image is-4by3">
              <stats-line
                :data="datacollection"
                :options="options"
                :width="400"
                :height="200">
              </stats-line>
            </div>
          </div>
        </div>
      </div>


    </div>



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

  .fa {
    font-size: 48px;
  }
</style>