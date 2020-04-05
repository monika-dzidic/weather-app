<template>
  <div>
    <v-tabs :icons-and-text="true" :grow="true" :show-arrows="true">
      <v-tabs-slider color="accent"></v-tabs-slider>

      <v-tab v-for="tab in tabs" :key="tab.id" :href="`#tab-${tab.id}`">
        {{ tab.name }}
        <v-icon>{{tab.icon}}</v-icon>
      </v-tab>

      <v-tab-item v-for="tab in tabs" :key="tab.id" :value="'tab-' + tab.id" class="py-4">
        <v-sparkline
          :label-size="6"
          :lineWidth="1"
          :smooth="6"
          :show-labels="true"
          :value="tab.data"
          color="#444"
        ></v-sparkline>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["forecast"],
  data: () => ({
    tabs: [
      {
        id: 0,
        name: "Temperature (°C)",
        icon: "mdi-thermometer",
        data: [] as any
      },
      {
        id: 1,
        name: "Humidity (%)",
        icon: "mdi-water-percent",
        data: [] as any
      },
      { id: 2, name: "Wind (m/s)", icon: "mdi-weather-windy", data: [] as any }
    ]
  }),
  created() {
    this.groupValues();
  },
  watch: {
    forecast(newValue, oldValue) {
      this.groupValues();
    }
  },
  methods: {
    groupValues() {
      this.tabs[0].data = [];
      this.tabs[1].data = [];
      this.tabs[2].data = [];

      this.forecast.forEach((f: any) => {
        this.tabs[0].data.push(f.main.temp);
        this.tabs[1].data.push(f.main.humidity);
        this.tabs[2].data.push(f.wind.speed);
      });
    }
  }
});
</script>