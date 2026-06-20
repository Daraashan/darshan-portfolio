export default defineEventHandler(async () => {
  const res = await $fetch<any>('https://api.open-meteo.com/v1/forecast?latitude=12.9716&longitude=77.5946&current=temperature_2m,weathercode,windspeed_10m&timezone=Asia%2FKolkata')
  const code = res.current.weathercode
  const temp = Math.round(res.current.temperature_2m)
  const weatherIcon = (c: number) => { if (c===0) return '☀️'; if (c<=3) return '⛅'; if (c<=48) return '🌫️'; if (c<=67) return '🌧️'; if (c<=77) return '❄️'; if (c<=82) return '🌦️'; return '⛈️' }
  const weatherDesc = (c: number) => { if (c===0) return 'clear'; if (c<=3) return 'partly cloudy'; if (c<=48) return 'foggy'; if (c<=67) return 'rainy'; if (c<=77) return 'snowy'; if (c<=82) return 'showers'; return 'stormy' }
  return { temp, icon: weatherIcon(code), desc: weatherDesc(code), city: 'Bangalore' }
})
