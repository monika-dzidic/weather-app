<template>
  <v-card class="mt-4 mx-2">
    <div class="d-flex align-center justify-space-between accent">
      <v-card-title class="headline">{{ city.name | uppercase }}</v-card-title>
      <WeatherIcon class="pr-4" :icon="city.weather[0].icon" :description="city.weather[0].main"></WeatherIcon>
    </div>

    <v-divider></v-divider>

    <v-card-text class="d-flex justify-center align-center">
      <div class="mr-2" v-if="city.sys.sunrise">
        <v-icon>mdi-weather-sunset-up</v-icon>
        {{city.sys.sunrise | time}}
      </div>
      <div v-if="city.sys.sunset">
        <v-icon>mdi-weather-sunset-down</v-icon>
        {{city.sys.sunset | time}}
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-text v-if="forecasts[currentForecastIndex]">
      <div class="d-flex align-center justify-space-between">
        <v-card-title>{{forecasts[currentForecastIndex].date | date}}</v-card-title>
        <div>
          <v-btn icon :disabled="currentForecastIndex === 0" @click="--currentForecastIndex">
            <v-icon color="accent">mdi-chevron-left</v-icon>
          </v-btn>

          <v-btn
            icon
            :disabled="currentForecastIndex === (forecasts.length - 1)"
            @click="++currentForecastIndex"
          >
            <v-icon color="accent">mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </div>

      <Forecast :forecast="forecasts[currentForecastIndex].data"></Forecast>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import WeatherIcon from "./WeatherIcon.vue";
import Forecast from "./Forecast.vue";
import axios from "axios";

export default Vue.extend({
  props: ["city"],
  data: () => ({
    forecasts: [] as any,
    currentForecastIndex: 0
  }),
  components: {
    WeatherIcon,
    Forecast
  },
  created() {
    this.getForecast();
  },
  watch: {
    city() {
      this.getForecast();
    }
  },
  methods: {
    getForecast() {
      axios
        .get(
          process.env.VUE_APP_FORECAST_API +
            this.city.name +
            "&units=metric" +
            "&appid=" +
            process.env.VUE_APP_WEATHER_API_KEY
        )
        .then(response => {
          if (response.data.cod === 429) {
            this.$toasted.info(
              "API requests for this subscription have been exceeded"
            );
          } else {
            this.prepareForecast(response.data.list);
          }
        })
        .catch(error => {
          this.$toasted.error("Forecast not available");
        });
    },

    prepareForecast(forecasts: any[]) {
      const availableDates: any[] = [];

      forecasts.forEach(forecast => {
        const date = forecast.dt_txt.split(" ")[0];
        const found = availableDates.find(f => f.date === date);

        if (found) {
          found.data.push(forecast);
        } else {
          availableDates.push({
            date,
            data: [forecast]
          });
        }
      });

      if (availableDates[0].data.length === 1) {
        availableDates.shift();
      }
      this.forecasts = availableDates;
    }
  }
});
</script>

<style lang="scss">
.v-card {
  width: 50%;
}

@media screen and (max-width: 768px) {
  .v-card {
    width: 90% !important;
  }
}
</style>