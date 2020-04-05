<template>
  <v-app>
    <v-app-bar app color="accent">
      <v-icon class="mr-1">mdi-weather-sunny</v-icon>
      <div class="app-title mr-5 flex-fill">Weather now</div>
      <v-text-field
        append-icon="search"
        @keyup.enter="getCity()"
        :loading="loading"
        v-model="cityName"
        label="Enter city name"
        :hide-details="true"
        dense
        color="#444"
      ></v-text-field>
    </v-app-bar>
    <v-content>
      <WeatherCard v-if="city !== null" :city="city" />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import axios from "axios";

import Vue from "vue";
import WeatherCard from "./components/WeatherCard.vue";

export default Vue.extend({
  name: "App",
  data: () => ({
    city: null,
    loading: false,
    timerId: 0,
    cityName: ""
  }),
  components: {
    WeatherCard
  },
  created() {
    const city = localStorage.getItem("city");
    if (city) {
      this.cityName = city;
      this.getCity();
    }
  },
  methods: {
    getCity() {
      this.loading = true;
      axios
        .get(
          process.env.VUE_APP_WEATHER_API +
            this.cityName +
            "&appid=" +
            process.env.VUE_APP_WEATHER_API_KEY
        )
        .then(response => {
          this.loading = false;
          if (response.data.cod === 429) {
            this.$toasted.info(
              "API requests for this subscription have been exceeded"
            );
          } else {
            localStorage.setItem("city", this.cityName);
            this.city = response.data;
          }
        })
        .catch(error => {
          this.loading = false;
          this.$toasted.error("City not found");
        });
    }
  }
});
</script>

<style lang="scss">
* {
  color: #444 !important;
}
.v-content {
  background: url(https://cdn.vuetifyjs.com/images/parallax/material.jpg)
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.v-toolbar__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.v-content__wrap {
  display: flex;
  align-items: start;
  justify-content: center;
}
.app-title {
  min-width: 100px;
}
.toasted-container,
.toasted-container {
  align-items: flex-end;
}
.toasted-custom {
  font-family: "Roboto", sans-serif;
  justify-content: start !important;
}
</style>