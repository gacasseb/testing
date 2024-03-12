<template>
  <Line id="my-chart-id" :data="chartData" :options="chartOptions"></Line>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { getCategories, getValues } from "../helpers/fetchDates.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  props: ["data", "currency"],
  watch: {
    data(newValue) {
      this.chartData = Object.assign({}, this.chartData, {
        labels: [1, 2, 3, 4, 5],
        datasets: [
          {
            data: newValue[this.currency].map((price) => price),
          },
        ],
      });
    },
  },
  name: "LineChart",
  components: { Line },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor:'black',
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
};
</script>
