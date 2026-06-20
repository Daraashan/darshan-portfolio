<template>
  <main>
    <!-- NAV -->
    <nav>
      <span class="nav-name">Darshan</span>
      <div class="nav-links">
        <a href="#work">experience</a>
        <a href="#photos">photos</a>
        <a href="#about">about</a>
        <a href="#writing">writing</a>
        <a href="/now" class="nav-now">now →</a>
        <button class="theme-toggle" @click="toggleTheme">{{ dark ? '☀︎' : '☽' }}</button>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero">
      <img src="/avatar.jpeg" class="hero-avatar" alt="Darshan" />
      <h1 class="hero-name">Darshan</h1>
      <p class="hero-line">exploring &amp; cooking</p>
      <p class="hero-bio">love tokenmaxxing</p>
      <a href="/now" class="now-pill">
        <span class="now-dot" />
        <span>what I'm doing now →</span>
      </a>
      <div class="hero-live">
        <SpotifyWidget />
        <WeatherWidget />
      </div>
    </section>

    <!-- EXPERIENCE -->
    <section id="work" class="section" ref="workRef" :class="{ visible: workVisible }">
      <div class="section-heading-row">
        <h2 class="section-heading">Experience</h2>
        <span v-if="editing" class="drag-hint">drag to reorder</span>
      </div>
      <div class="work-list">
        <div v-for="(p, i) in projects" :key="p.title" class="work-item"
          :class="{ dragging: dragIndex === i, dragover: dragOverIndex === i && dragIndex !== i, draggable: editing }"
          :draggable="editing"
          @dragstart="onDragStart(i)" @dragover.prevent="onDragOver(i)" @dragend="onDragEnd" @drop="onDrop(i)">
          <span v-if="editing" class="drag-handle">⠿</span>
          <div class="work-item-left">
            <span class="work-title">{{ p.title }}</span>
            <span class="work-desc">{{ p.desc }}</span>
          </div>
          <span class="work-year">{{ p.year }}</span>
        </div>
      </div>
    </section>

    <!-- PHOTOS -->
    <section id="photos" class="section" ref="photosRef" :class="{ visible: photosVisible }">
      <h2 class="section-heading">Photos</h2>
      <p class="section-sub">A few things I've seen.</p>
      <div class="photo-grid">
        <div v-for="(photo, i) in photos" :key="i" class="photo-cell polaroid" :class="photo.size" :style="{ '--tilt': photo.tilt + 'deg' }" @click="lightboxIndex = i">
          <img v-if="photo.src" :src="photo.src" :alt="photo.alt" loading="lazy" />
          <div v-else class="photo-placeholder"><span>add photo</span></div>
        </div>
      </div>
    </section>

    <!-- LIGHTBOX -->
    <Teleport to="body">
      <Transition name="lb">
        <div v-if="lightboxIndex !== null" class="lightbox" @click.self="lightboxIndex = null">
          <button class="lb-close" @click="lightboxIndex = null">✕</button>
          <button class="lb-prev" @click="lightboxIndex = (lightboxIndex - 1 + photos.length) % photos.length">‹</button>
          <img :src="photos[lightboxIndex].src" class="lb-img" />
          <button class="lb-next" @click="lightboxIndex = (lightboxIndex + 1) % photos.length">›</button>
        </div>
      </Transition>
    </Teleport>

    <!-- LETTERBOXD -->
    <section class="section" ref="filmsRef" :class="{ visible: filmsVisible }">
      <h2 class="section-heading">Watching</h2>
      <p class="section-sub">Recently on <a href="https://letterboxd.com/darshanfinn" target="_blank" class="lb-link">Letterboxd</a>.</p>
      <Letterboxd />
    </section>

    <!-- ABOUT -->
    <section id="about" class="section" ref="aboutRef" :class="{ visible: aboutVisible }">
      <h2 class="section-heading">About</h2>
      <div class="about-body">
        <p>Somewhere between the launches. I work in growth and go-to-market, mostly lead-gen and outbound, building the systems that bring deals in and then quietly run themselves.</p>
      </div>
    </section>

    <!-- WRITING -->
    <section id="writing" class="section" ref="writingRef" :class="{ visible: writingVisible }">
      <h2 class="section-heading">Writing</h2>
      <p class="empty-note">Nothing published yet.</p>
    </section>

    <!-- RECOMMENDATIONS -->
    <section class="section" ref="recsRef" :class="{ visible: recsVisible }">
      <h2 class="section-heading">Recommendations</h2>
      <p class="section-sub">Things I think everyone should experience.</p>
      <div class="recs-list">
        <div v-for="rec in recs" :key="rec.title" class="rec-item" @click="toggleRec(rec.title)">
          <span class="rec-type">{{ rec.type }}</span>
          <div class="rec-body">
            <Transition name="rec-swap" mode="out-in">
              <span v-if="openRec === rec.title" class="rec-quote" :key="currentQuote(rec)">{{ currentQuote(rec) }}</span>
              <div v-else class="rec-titles" :key="'t-' + rec.title">
                <span class="rec-title">{{ rec.title }}</span>
                <span class="rec-meta">{{ rec.meta }}</span>
              </div>
            </Transition>
          </div>
          <span class="rec-hint">{{ openRec === rec.title ? 'tap for more' : '↗' }}</span>
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section id="contact" class="section" ref="contactRef" :class="{ visible: contactVisible }">
      <h2 class="section-heading">Contact</h2>
      <div class="contact-list">
        <button class="contact-item" @click="copyEmail">
          <span class="contact-label">Email</span>
          <span class="contact-val">darshanruparel420@gmail.com <span class="copy-hint">{{ copied ? 'copied ✓' : 'click to copy' }}</span></span>
        </button>
        <a href="https://x.com/darshanfin" target="_blank" class="contact-item">
          <span class="contact-label">Twitter</span>
          <span class="contact-val">@darshanfin</span>
        </a>
        <a href="https://www.linkedin.com/in/darshan-ruparel/" target="_blank" class="contact-item">
          <span class="contact-label">LinkedIn</span>
          <span class="contact-val">/in/darshan-ruparel</span>
        </a>
        <a href="https://github.com/Daraashan" target="_blank" class="contact-item">
          <span class="contact-label">GitHub</span>
          <span class="contact-val">@Daraashan</span>
        </a>
      </div>
    </section>

    <footer>
      <span>Darshan · {{ new Date().getFullYear() }}</span>
      <div class="footer-right">
        <button class="pspsps-btn" @click="onPspsps">pss pss pss 🐱</button>
        <a href="/now" class="footer-now">now →</a>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
const { editing } = useEditMode()
function onPspsps() { triggerCat() }

const dark = ref(false)
onMounted(() => {
  dark.value = localStorage.getItem('theme') === 'dark'
  document.documentElement.setAttribute('data-theme', dark.value ? 'dark' : 'light')
})
function toggleTheme() {
  dark.value = !dark.value
  const t = dark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', t)
  localStorage.setItem('theme', t)
}

const copied = ref(false)
function copyEmail() {
  navigator.clipboard.writeText('darshanruparel420@gmail.com')
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

function useFade() {
  const el = ref<HTMLElement | null>(null)
  const visible = ref(false)
  onMounted(() => {
    if (!el.value) return
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { visible.value = true; ob.disconnect() } }, { threshold: 0.08 })
    ob.observe(el.value)
  })
  return { el, visible }
}

const { el: workRef, visible: workVisible } = useFade()
const { el: photosRef, visible: photosVisible } = useFade()
const { el: filmsRef, visible: filmsVisible } = useFade()
const { el: aboutRef, visible: aboutVisible } = useFade()
const { el: writingRef, visible: writingVisible } = useFade()
const { el: recsRef, visible: recsVisible } = useFade()
const { el: contactRef, visible: contactVisible } = useFade()

const DEFAULT_PROJECTS = [
  { title: 'Sales & GTM',             desc: 'Pazy · Full-time',        year: 'Sep 2025 – Now' },
  { title: 'Founding SDR',            desc: 'DevDynamics · Full-time', year: 'Jul 2024 – Sep 2025' },
  { title: 'Sales & Marketing Intern',desc: 'Exotel · Internship',     year: 'Feb 2024 – Jul 2024' },
]
const projects = ref(DEFAULT_PROJECTS)
onMounted(() => {
  const saved = localStorage.getItem('projects-order')
  if (saved) { try { projects.value = JSON.parse(saved) } catch {} }
})

const dragIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)
function onDragStart(i: number) { dragIndex.value = i }
function onDragOver(i: number) { dragOverIndex.value = i }
function onDragEnd() { dragIndex.value = null; dragOverIndex.value = null }
function onDrop(toIndex: number) {
  const from = dragIndex.value
  if (from === null || from === toIndex) return
  const arr = [...projects.value]
  const [moved] = arr.splice(from, 1)
  arr.splice(toIndex, 0, moved)
  projects.value = arr
  localStorage.setItem('projects-order', JSON.stringify(arr))
  dragIndex.value = null; dragOverIndex.value = null
}

const photos = [
  { src: '/photos/1.jpeg', alt: '', size: 'tall',  tilt: -1.5 },
  { src: '/photos/2.jpeg', alt: '', size: '',       tilt:  1.2 },
  { src: '/photos/3.jpeg', alt: '', size: '',       tilt: -0.8 },
  { src: '/photos/4.jpeg', alt: '', size: 'wide',   tilt:  0.6 },
  { src: '/photos/5.jpeg', alt: '', size: '',       tilt: -1.8 },
]

const recs = [
  { type: 'Film', title: 'Good Will Hunting', meta: 'Gus Van Sant · 1997', quotes: [
    "It's not your fault.",
    "You're not perfect, sport. And let me save you the suspense: this girl you met, she isn't perfect either.",
    "Some people can't believe in themselves until someone else believes in them first.",
    "Do you like apples? Well I got her number. How do you like them apples?",
  ]},
  { type: 'Song', title: "I Forgot More Than You'll Ever Know", meta: 'Bob Dylan', quotes: [
    "I forgot more than you'll ever know about her.",
    "You think you know her but you don't know a thing.",
    "The memories I've lost outweigh all you've found.",
  ]},
  { type: 'Book', title: 'Steve Jobs', meta: 'Walter Isaacson', quotes: [
    "Stay hungry, stay foolish.",
    "Creativity is just connecting things.",
    "People who are crazy enough to think they can change the world are the ones who do.",
    "Real artists ship.",
    "The journey is the reward.",
  ]},
]
const openRec = ref<string | null>(null)
const recIndexes = ref<Record<string, number>>({})
function toggleRec(title: string) {
  if (openRec.value === title) {
    const rec = recs.find(r => r.title === title)!
    recIndexes.value[title] = ((recIndexes.value[title] ?? 0) + 1) % rec.quotes.length
  } else {
    openRec.value = title
  }
}
function currentQuote(rec: typeof recs[0]) {
  return rec.quotes[recIndexes.value[rec.title] ?? 0]
}

const lightboxIndex = ref<number | null>(null)
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (lightboxIndex.value === null) return
    if (e.key === 'Escape') lightboxIndex.value = null
    if (e.key === 'ArrowRight') lightboxIndex.value = (lightboxIndex.value + 1) % photos.length
    if (e.key === 'ArrowLeft') lightboxIndex.value = (lightboxIndex.value - 1 + photos.length) % photos.length
  })
})
</script>

<style scoped>
main{max-width:640px;margin:0 auto;padding:0 24px 80px}
nav{display:flex;justify-content:space-between;align-items:center;padding:40px 0 0}
.nav-name{font-family:var(--font-serif);font-size:16px}
.nav-links{display:flex;gap:24px;align-items:center}
.nav-links a{font-size:13px;color:var(--muted);transition:color .15s}
.nav-links a:hover{color:var(--text)}
.nav-now{color:var(--text)!important}
.theme-toggle{background:none;border:none;cursor:pointer;font-size:15px;color:var(--muted);padding:0;line-height:1;transition:color .15s}
.theme-toggle:hover{color:var(--text)}
.hero{padding:100px 0 80px}
.hero-avatar{width:52px;height:52px;border-radius:50%;object-fit:cover;margin-bottom:20px;display:block}
.hero-name{font-family:var(--font-serif);font-size:clamp(48px,10vw,80px);font-weight:400;line-height:1;letter-spacing:-.02em;margin-bottom:12px}
.hero-line{font-size:18px;color:var(--muted);margin-bottom:28px}
.hero-bio{font-size:15px;color:var(--muted);line-height:1.7;max-width:400px;margin-bottom:28px}
.now-pill{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--border);border-radius:999px;padding:7px 14px;font-size:13px;color:var(--muted);transition:color .15s,border-color .15s}
.now-pill:hover{color:var(--text);border-color:#ccc}
.now-dot{width:6px;height:6px;border-radius:50%;background:#22c55e;animation:pulse 2.5s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.hero-live{margin-top:24px;display:flex;flex-direction:column;gap:12px}
.section{padding:64px 0;border-top:1px solid var(--border);opacity:0;transform:translateY(20px);transition:opacity .55s ease,transform .55s ease}
.section.visible{opacity:1;transform:translateY(0)}
.section-heading{font-family:var(--font-serif);font-size:22px;font-weight:400}
.section-heading-row{display:flex;align-items:baseline;gap:12px;margin-bottom:8px}
.section-sub{font-size:14px;color:var(--muted);margin-bottom:28px}
.drag-hint{font-size:11px;color:var(--muted)}
.work-list{display:flex;flex-direction:column}
.work-item{display:flex;justify-content:space-between;align-items:baseline;gap:24px;padding:16px 0;border-bottom:1px solid var(--border)}
.work-item-left{display:flex;flex-direction:column;gap:4px}
.work-title{font-size:15px;color:var(--text)}
.work-desc{font-size:13px;color:var(--muted)}
.work-year{font-size:13px;color:var(--muted);white-space:nowrap;flex-shrink:0}
.drag-handle{font-size:16px;color:var(--muted);cursor:grab;user-select:none;margin-right:8px;flex-shrink:0}
.work-item.dragging{opacity:.35}
.work-item.dragover{border-bottom-color:var(--text);border-bottom-width:2px}
.photo-grid{display:grid;grid-template-columns:1fr 1fr 1fr;grid-auto-rows:180px;gap:16px;padding:16px 8px}
.photo-cell.tall{grid-row:span 2}
.photo-cell.wide{grid-column:span 2}
.polaroid{background:#fff;padding:8px 8px 28px;box-shadow:0 2px 8px rgba(0,0,0,.10),0 1px 2px rgba(0,0,0,.06);transform:rotate(var(--tilt));transition:transform .25s ease,box-shadow .25s ease;cursor:pointer;overflow:visible}
.polaroid:hover{transform:rotate(0deg) scale(1.04);box-shadow:0 8px 24px rgba(0,0,0,.15);z-index:2}
.polaroid img{width:100%;height:100%;object-fit:cover;display:block}
.photo-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f0ece6}
.photo-placeholder span{font-size:11px;color:#bbb}
.lightbox{position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:99999;display:flex;align-items:center;justify-content:center}
.lb-img{max-width:90vw;max-height:90vh;object-fit:contain;border-radius:2px}
.lb-close{position:absolute;top:24px;right:28px;background:none;border:none;color:#fff;font-size:20px;cursor:pointer;opacity:.6;transition:opacity .15s}
.lb-close:hover{opacity:1}
.lb-prev,.lb-next{position:absolute;background:none;border:none;color:#fff;font-size:48px;cursor:pointer;opacity:.4;transition:opacity .15s;padding:0 24px;top:50%;transform:translateY(-50%)}
.lb-prev{left:0}.lb-next{right:0}
.lb-prev:hover,.lb-next:hover{opacity:1}
.lb-enter-active,.lb-leave-active{transition:opacity .2s}
.lb-enter-from,.lb-leave-to{opacity:0}
.lb-link{text-decoration:underline;text-underline-offset:3px}
.about-body{display:flex;flex-direction:column;gap:16px}
.about-body p{font-size:15px;color:var(--muted);line-height:1.75}
.empty-note{font-size:14px;color:var(--muted)}
.recs-list{display:flex;flex-direction:column}
.rec-item{display:flex;align-items:center;gap:24px;padding:16px 0;border-bottom:1px solid var(--border);cursor:pointer;transition:opacity .15s}
.rec-item:hover{opacity:.7}
.rec-type{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;width:40px;flex-shrink:0}
.rec-body{display:flex;flex-direction:column;gap:3px;flex:1;min-width:0}
.rec-titles{display:flex;flex-direction:column;gap:3px}
.rec-title{font-size:15px;color:var(--text)}
.rec-meta{font-size:13px;color:var(--muted)}
.rec-quote{font-size:15px;color:var(--text);font-family:var(--font-serif);font-style:italic;line-height:1.5}
.rec-hint{font-size:12px;color:var(--muted);flex-shrink:0}
.rec-swap-enter-active,.rec-swap-leave-active{transition:opacity .2s,transform .2s}
.rec-swap-enter-from{opacity:0;transform:translateY(4px)}
.rec-swap-leave-to{opacity:0;transform:translateY(-4px)}
.contact-list{display:flex;flex-direction:column}
.contact-item{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid var(--border);transition:color .15s;width:100%;background:none;border-top:none;border-left:none;border-right:none;cursor:pointer;font-family:var(--font-sans);font-size:inherit;color:inherit;text-align:left}
.contact-item:hover{color:var(--text)}
.contact-label{font-size:13px;color:var(--muted)}
.contact-val{font-size:14px;display:flex;align-items:center;gap:10px}
.copy-hint{font-size:11px;color:var(--muted);opacity:0;transition:opacity .2s}
.contact-item:hover .copy-hint{opacity:1}
footer{padding-top:48px;font-size:13px;color:var(--muted);display:flex;justify-content:space-between;align-items:center}
.footer-right{display:flex;align-items:center;gap:16px}
.footer-now{color:var(--text);transition:opacity .15s}
.footer-now:hover{opacity:.6}
.pspsps-btn{background:none;border:1px solid var(--border);border-radius:999px;padding:5px 12px;font-size:12px;color:var(--muted);font-family:var(--font-sans);transition:color .15s,border-color .15s}
.pspsps-btn:hover{color:var(--text);border-color:#ccc}
@media(max-width:480px){.nav-links{display:none}.hero{padding:80px 0 60px}.photo-grid{grid-template-columns:1fr 1fr;grid-auto-rows:140px}.photo-cell.wide{grid-column:span 2}}
</style>
