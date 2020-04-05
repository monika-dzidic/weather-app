<template>
  <div class="d-flex align-center">
    <span class="mr-2">{{description}}</span>
    <img :src="currentIcon" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    currentIcon: ""
  }),
  props: ["icon", "description"],
  created() {
    this.getIcon(this.icon);
  },
  watch: {
    icon: function(newValue, oldVale) {
      this.getIcon(newValue);
    }
  },
  methods: {
    getIcon(code: "") {
      this.currentIcon = `http://openweathermap.org/img/w/${code}.png`;
    }
  }
});
</script>