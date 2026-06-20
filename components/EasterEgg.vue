<template>
  <Teleport to="body">
    <div v-if="active" class="egg-overlay" aria-hidden="true">
      <span v-for="cat in cats" :key="cat.id" class="egg-cat" :style="{left:cat.x+'vw',animationDuration:cat.dur+'s',animationDelay:cat.delay+'s',fontSize:cat.size+'px'}">{{ cat.emoji }}</span>
    </div>
    <Transition name="toast">
      <div v-if="toastVisible" class="egg-toast">🐱 you know the secret</div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
const active = ref(false), toastVisible = ref(false)
const cats = ref<{id:number;x:number;dur:number;delay:number;size:number;emoji:string}[]>([])
const EMOJIS = ['🐱','😺','😸','🐈','😻','🐾']
let buffer = ''
function trigger() {
  if (active.value) return
  active.value = true; toastVisible.value = true
  cats.value = Array.from({length:28},(_,i) => ({id:i,x:Math.random()*98,dur:1.4+Math.random()*1.2,delay:Math.random()*1.0,size:20+Math.random()*22,emoji:EMOJIS[Math.floor(Math.random()*EMOJIS.length)]}))
  setTimeout(()=>{active.value=false;cats.value=[]},3500)
  setTimeout(()=>{toastVisible.value=false},2200)
}
onMounted(() => {
  window.addEventListener('keydown',(e)=>{
    if(['INPUT','TEXTAREA'].includes((e.target as HTMLElement).tagName)) return
    buffer=(buffer+e.key).slice(-4).toLowerCase()
    if(buffer==='cook') trigger()
  })
})
</script>
<style scoped>
.egg-overlay{position:fixed;inset:0;pointer-events:none;z-index:999990;overflow:hidden}
.egg-cat{position:absolute;top:-60px;animation:fall linear forwards;display:block;user-select:none}
@keyframes fall{0%{top:-60px;transform:rotate(-10deg)}50%{transform:rotate(10deg)}100%{top:110vh;transform:rotate(-10deg)}}
.egg-toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:999995;background:var(--text);color:var(--bg);font-size:13px;padding:10px 20px;border-radius:999px;pointer-events:none;white-space:nowrap}
.toast-enter-active,.toast-leave-active{transition:opacity .3s,transform .3s}
.toast-enter-from,.toast-leave-to{opacity:0;transform:translateX(-50%) translateY(8px)}
</style>
