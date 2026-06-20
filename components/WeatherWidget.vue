<template>
  <div v-if="weather" class="weather-widget">
    <span class="weather-icon">{{ weather.icon }}</span>
    <span class="weather-temp">{{ weather.temp }}°C</span>
    <span class="weather-desc">{{ weather.desc }} in {{ weather.city }}</span>
  </div>
</template>
<script setup lang="ts">
const { data: weather } = await useFetch('/api/weather')
</script>
<style scoped>
.weather-widget{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--muted)}
.weather-icon{font-size:15px}
.weather-temp{color:var(--text)}
</style>
