const editing = ref(false)
export function useEditMode() {
  onMounted(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'e' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName))
        editing.value = !editing.value
    }
    window.addEventListener('keydown', handler)
    onUnmounted(() => window.removeEventListener('keydown', handler))
  })
  return { editing }
}
