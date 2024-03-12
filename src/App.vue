<script>
import LineChart from "./components/LineChart.vue";
import { fetchCurrency } from '../src/helpers/fetchCurrency';

export default {
  head() {
    return {
      title: this.title,
    };
  },
  components: {
    LineChart,
  },
  data() {
    return {
      currency: "EUR",
      prices: {
        "BTC": [],
        "USD": [],
        "EUR": [],
      },
      timer: null,
    };
  },

  watch: {
    currency() {
      clearInterval(this.timer);
      this.fetch();
      this.timer = setInterval(() => {
        this.fetch();
      }, 30 * 1000);
    },
  },

  mounted() {
    this.fetch();
    this.startTimer();
  },

  methods: {
    async fetch() {
      const data = await fetchCurrency(this.currency);
      if (!data) return;
      let key = Object.keys(data)[0];
      let arr = this.prices[this.currency];
      arr.push(data[key].bid);
      if (arr.length > 5) {
        arr.shift();
      }
      this.prices = { ...this.prices, [this.currency]: arr };
    },

    startTimer() {
      this.timer = setInterval(() => {
        this.fetch();
      }, 30 * 1000);
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
          <LineChart v-bind:data="prices" v-bind:currency="currency" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
