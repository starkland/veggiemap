import Vue from 'vue';

import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'

export default Line.extend({
  props: {
    data: {
      require: true
    },
    options: {
      require: true
    }
  },

  mounted () {
    this.renderChart(this.data, {
      responsive: true,
      maintainAspectRatio: false
    });
  }
});