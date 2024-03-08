<script>
import LineChart from "./components/LineChart.vue";
import BarChart from "./components/BarChart.vue";
import {
  fetchDates,
  getCategories,
  getValues,
} from "../src/helpers/fetchDates";

export default {
  head() {
    return {
      title: this.title,
    };
  },
  components: {
    // LineChart,
    BarChart,
    LineChart,
  },
  data() {
    return {
      dates: [],
      startDate: "",
      endDate: "",
      currency: "",
    };
  },

  // AQUI FICA AS FUNCOES QUE SAO FEITAS ASSIM QUE A PAGINA MONTA
  mounted() {},

  // AQUI FICA AS FUNCOES DA PAGINA 2024-03-24
  methods: {
    async fetch() {
      this.dates = await fetchDates(
        new Date(this.startDate),
        new Date(this.endDate),
        this.currency
      );
    },
  },
};
</script>

<template>
  <div>
    <div class="container">
      <img class="logo mb-4" src="./assets/logo.png" alt="RZK" />
      <div class="card p-4">
        <h1 class="text-center mb-4">Conversor de Moedas</h1>
        <div class="mb-3">
          <label for="moedaDestino" class="form-label">Moeda de Destino:</label>
          <select class="form-select" id="moedaDestino" v-model="currency">
            <option value="EUR">Euro</option>
            <option value="USD">Dólar</option>
            <option value="BTC">Bitcoin</option>
          </select>
        </div>
        <div class="mb-3">
          <form class="form-date">
            <label for="data1">Data inicio:</label>
            <input
              v-model="startDate"
              type="date"
              id="data1"
              name="data1"
            /><br /><br />
            <label for="data2">Data final:</label>
            <input
              v-model="endDate"
              type="date"
              id="data2"
              name="data2"
            /><br /><br />
          </form>
          <!-- <BarChart /> -->
          <LineChart v-bind:data="dates" />
        </div>
        <button class="btn btn-primary mt-1" @click="fetch()">Buscar</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
