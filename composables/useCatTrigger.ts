export const catExcited = ref(false)
export function triggerCat() {
  catExcited.value = true
  setTimeout(() => { catExcited.value = false }, 2500)
}
