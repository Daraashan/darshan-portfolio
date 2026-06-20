<template>
  <div class="weather-widget">
    <span class="clock">{{ time }}</span>
    <span class="divider">·</span>
    <template v-if="weather">
      <span class="weather-icon">{{ weather.icon }}</span>
      <span class="weather-temp">{{ weather.temp }}°C</span>
      <span class="weather-desc">{{ weather.desc }} in Bangalore</span>
    </template>
  </div>
</template>
<script setup lang="ts">
const { data: weather } = await useFetch('/api/weather')

const time = ref('')
function updateTime() {
  time.value = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
}
onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})
</script>
<style scoped>
.weather-widget{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--muted)}
.clock{color:var(--text);font-variant-numeric:tabular-nums}
.divider{opacity:.4}
.weather-icon{font-size:15px}
.weather-temp{color:var(--text)}
</style>
