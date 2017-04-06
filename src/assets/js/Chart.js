import VueCharts from 'vue-chartjs';

// ====

let props = {
  data: {
    type: Object,
    require: true
  },

  options: {
    type: Object,
    require: true
  }
};

const bar = VueCharts.Bar.extend({
  props: props,

  mounted () {
    this.renderChart(this.data, {
      responsive: true,
      maintainAspectRatio: false
    });
  }
});

const line = VueCharts.Line.extend({
  props: props,

  mounted () {
    this.renderChart(this.data, {
      responsive: true,
      maintainAspectRatio: false
    });
  }
});

const doughnut = VueCharts.Doughnut.extend({
  props: props,

  mounted () {
    this.renderChart(this.data, {
      responsive: true,
      maintainAspectRatio: false
    });
  }
});

const pie = VueCharts.Pie.extend({
  props: props,

  mounted () {
    this.renderChart(this.data, {
      responsive: true,
      maintainAspectRatio: false
    });
  }
});

const bubble = VueCharts.Bubble.extend({
  props: props,

  mounted () {
    this.renderChart(this.data, {
      responsive: true,
      maintainAspectRatio: false
    });
  }
});

// ====

export default {
  bar,
  line,
  doughnut,
  pie,
  bubble
};