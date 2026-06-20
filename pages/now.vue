<template>
  <main>
    <nav>
      <a href="/" class="nav-back">← Darshan</a>
      <span class="nav-updated">Updated June 2026</span>
    </nav>
    <section class="now-hero">
      <h1 class="now-title">Now</h1>
      <p class="now-sub">What I'm actually doing at this point in time.</p>
    </section>
    <div class="now-body">
      <div v-for="block in blocks" :key="block.label" class="now-block">
        <span class="now-label">{{ block.label }}</span>
        <ul class="now-list">
          <li v-for="item in block.items" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
    <footer>
      <span>Inspired by <a href="https://nownownow.com" target="_blank" class="footer-link">nownownow.com</a></span>
    </footer>
  </main>
</template>
<script setup lang="ts">
const blocks = [
  { label: 'Building',       items: ['tokenmaxxing'] },
  { label: 'Reading',        items: ['nothing new'] },
  { label: 'Thinking about', items: ['how to retard max'] },
]
</script>
<style scoped>
main{max-width:640px;margin:0 auto;padding:0 24px 80px}
nav{display:flex;justify-content:space-between;align-items:center;padding:40px 0 0}
.nav-back{font-size:14px;color:var(--muted);transition:color .15s}
.nav-back:hover{color:var(--text)}
.nav-updated{font-size:12px;color:var(--muted)}
.now-hero{padding:80px 0 56px}
.now-title{font-family:var(--font-serif);font-size:clamp(40px,8vw,64px);font-weight:400;letter-spacing:-.02em;line-height:1;margin-bottom:12px}
.now-sub{font-size:15px;color:var(--muted)}
.now-body{display:flex;flex-direction:column}
.now-block{padding:32px 0;border-top:1px solid var(--border);display:grid;grid-template-columns:140px 1fr;gap:24px;align-items:start}
.now-label{font-size:13px;color:var(--muted);padding-top:2px}
.now-list{list-style:none;display:flex;flex-direction:column;gap:10px}
.now-list li{font-size:15px;color:var(--text);line-height:1.5}
footer{padding-top:64px;font-size:13px;color:var(--muted)}
.footer-link{text-decoration:underline;text-underline-offset:3px}
@media(max-width:480px){.now-block{grid-template-columns:1fr;gap:10px}}
</style>
