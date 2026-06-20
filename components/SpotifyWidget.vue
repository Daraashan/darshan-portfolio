<template>
  <a v-if="track" :href="track.url" target="_blank" class="spotify-widget">
    <img v-if="track.image" :src="track.image" class="spotify-art" />
    <div class="spotify-info">
      <span class="spotify-status">
        <span v-if="track.playing" class="spotify-bars"><span /><span /><span /></span>
        <span v-else class="spotify-idle">♪</span>
        {{ track.playing ? 'now playing' : 'last played' }}
      </span>
      <span class="spotify-title">{{ track.title }}</span>
      <span class="spotify-artist">{{ track.artist }}</span>
    </div>
  </a>
</template>
<script setup lang="ts">
const { data: track } = await useFetch('/api/spotify')
</script>
<style scoped>
.spotify-widget{display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--border);border-radius:8px;max-width:280px;transition:border-color .15s}
.spotify-widget:hover{border-color:#1db954}
.spotify-art{width:44px;height:44px;border-radius:4px;object-fit:cover;flex-shrink:0}
.spotify-info{display:flex;flex-direction:column;gap:2px;overflow:hidden;min-width:0}
.spotify-status{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#1db954;display:flex;align-items:center;gap:5px}
.spotify-title{font-size:13px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.spotify-artist{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.spotify-bars{display:flex;align-items:flex-end;gap:1.5px;height:10px}
.spotify-bars span{display:block;width:2px;background:#1db954;border-radius:1px;animation:bar 1s ease-in-out infinite}
.spotify-bars span:nth-child(1){animation-delay:0s;height:6px}
.spotify-bars span:nth-child(2){animation-delay:.2s;height:10px}
.spotify-bars span:nth-child(3){animation-delay:.4s;height:4px}
@keyframes bar{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1)}}
</style>
