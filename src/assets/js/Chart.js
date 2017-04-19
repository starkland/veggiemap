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
    this.renderChart(this.data, this.props);
  }
});

const line = VueCharts.Line.extend({
  props: props,

  mounted () {
    this.renderChart(this.data, this.props);
  }
});

const doughnut = VueCharts.Doughnut.extend({
  props: props,

  mounted () {
    this.renderChart(this.data, this.props);
  }
});

const pie = VueCharts.Pie.extend({
  props: props,

  mounted () {
    this.renderChart(this.data, this.props);
  }
});

const bubble = VueCharts.Bubble.extend({
  props: props,

  mounted () {
    this.renderChart(this.data, this.props);
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