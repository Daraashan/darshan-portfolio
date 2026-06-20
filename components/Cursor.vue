<template>
  <div>
    <div class="cursor-dot" :style="{ transform: `translate(${x}px, ${y}px)` }" />
    <div class="cursor-ring" :style="{ transform: `translate(${rx}px, ${ry}px)`, opacity: visible ? 1 : 0 }" :class="{ excited: catExcited }" />
    <div class="cursor-cat" :style="{ transform: `translate(${rx - 12}px, ${ry - 28}px) scaleX(${facingLeft ? -1 : 1})`, opacity: (visible && (hovering || catExcited)) ? 1 : 0 }" :class="{ excited: catExcited }">{{ catExcited ? '😻' : (walking ? '🐱' : '😺') }}</div>
    <template v-if="catExcited">
      <span v-for="h in hearts" :key="h.id" class="heart" :style="{ left: h.x + 'px', top: h.y + 'px', '--dx': h.dx + 'px', '--dy': h.dy + 'px' }">{{ h.emoji }}</span>
    </template>
  </div>
</template>
<script setup lang="ts">
const x = ref(-100), y = ref(-100), rx = ref(-100), ry = ref(-100)
const visible = ref(false), hovering = ref(false), walking = ref(false), facingLeft = ref(false)
const HEART_EMOJIS = ['💕','🐾','✨','💗','🐟','💛']
const hearts = ref<{id:number;x:number;y:number;dx:number;dy:number;emoji:string}[]>([])
let lastX = -100, walkTimer: any
watch(catExcited, (on) => {
  if (!on) { hearts.value = []; return }
  hearts.value = Array.from({length:10},(_,i) => ({id:i,x:rx.value+16,y:ry.value+16,dx:(Math.random()-.5)*120,dy:-(40+Math.random()*80),emoji:HEART_EMOJIS[Math.floor(Math.random()*HEART_EMOJIS.length)]}))
})
onMounted(() => {
  let targetX = -100, targetY = -100
  const loop = () => { rx.value += (targetX-rx.value)*.1; ry.value += (targetY-ry.value)*.1; requestAnimationFrame(loop) }
  loop()
  window.addEventListener('mousemove', (e) => {
    x.value=e.clientX-4; y.value=e.clientY-4; targetX=e.clientX-16; targetY=e.clientY-16; visible.value=true
    facingLeft.value=e.clientX<lastX; lastX=e.clientX; walking.value=true; clearTimeout(walkTimer); walkTimer=setTimeout(()=>{walking.value=false},150)
  })
  window.addEventListener('mouseleave', () => { visible.value=false })
  document.addEventListener('mouseover', (e) => { hovering.value=!!(e.target as HTMLElement).closest('a, button') })
  document.addEventListener('mouseout', (e) => { if((e.target as HTMLElement).closest('a, button')) hovering.value=false })
})
</script>
<style>
body{cursor:none!important} a,button{cursor:none!important}
.cursor-dot{position:fixed;top:0;left:0;width:8px;height:8px;border-radius:50%;background:var(--text);pointer-events:none;z-index:99999;mix-blend-mode:difference}
.cursor-ring{position:fixed;top:0;left:0;width:32px;height:32px;border-radius:50%;border:1px solid var(--text);pointer-events:none;z-index:99998;mix-blend-mode:difference;transition:opacity .3s ease}
.cursor-ring.excited{animation:ringPulse .3s ease-in-out infinite;border-color:#ff69b4;mix-blend-mode:normal}
.cursor-cat{position:fixed;top:0;left:0;font-size:22px;pointer-events:none;z-index:100000;transition:opacity .2s ease;animation:catBob .3s ease-in-out infinite}
.cursor-cat.excited{animation:catExcited .2s ease-in-out infinite;font-size:28px}
.heart{position:fixed;font-size:16px;pointer-events:none;z-index:100001;animation:heartFloat 1s ease-out forwards}
@keyframes catBob{0%,100%{margin-top:0}50%{margin-top:-3px}}
@keyframes catExcited{0%{transform:rotate(-15deg) scale(1.1)}50%{transform:rotate(15deg) scale(1.2)}100%{transform:rotate(-15deg) scale(1.1)}}
@keyframes ringPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.4}}
@keyframes heartFloat{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(var(--dx),var(--dy)) scale(.5);opacity:0}}
</style>
