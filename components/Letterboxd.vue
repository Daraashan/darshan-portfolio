<template>
  <div v-if="films?.length" class="lb-grid">
    <a v-for="film in films" :key="film.url" :href="film.url" target="_blank" class="lb-card">
      <div class="lb-poster">
        <img v-if="film.image" :src="film.image" :alt="film.title" />
        <div v-else class="lb-poster-empty">{{ film.title[0] }}</div>
      </div>
      <div class="lb-info">
        <span class="lb-title">{{ film.title }}</span>
        <span class="lb-year">{{ film.year }}</span>
        <span class="lb-rating">{{ film.rating }}</span>
      </div>
    </a>
  </div>
</template>
<script setup lang="ts">
const { data: films } = await useFetch('/api/letterboxd')
</script>
<style scoped>
.lb-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}
.lb-card{display:flex;flex-direction:column;gap:6px;transition:opacity .15s}
.lb-card:hover{opacity:.75}
.lb-poster{aspect-ratio:2/3;border-radius:4px;overflow:hidden;background:var(--border)}
.lb-poster img{width:100%;height:100%;object-fit:cover;display:block}
.lb-poster-empty{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--muted)}
.lb-info{display:flex;flex-direction:column;gap:2px}
.lb-title{font-size:11px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lb-year{font-size:10px;color:var(--muted)}
.lb-rating{font-size:10px;color:var(--text)}
@media(max-width:480px){.lb-grid{grid-template-columns:repeat(3,1fr)}}
</style>
