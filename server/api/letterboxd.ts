export default defineEventHandler(async () => {
  const username = process.env.LETTERBOXD_USERNAME || 'darshanfinn'
  const rss = await $fetch<string>(`https://letterboxd.com/${username}/rss/`, { responseType: 'text' })
  const items = [...rss.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 6)
  return items.map((m) => {
    const block = m[1]
    const title = block.match(/<letterboxd:filmTitle>(.*?)<\/letterboxd:filmTitle>/)?.[1] || ''
    const year = block.match(/<letterboxd:filmYear>(.*?)<\/letterboxd:filmYear>/)?.[1] || ''
    const rating = block.match(/<letterboxd:memberRating>(.*?)<\/letterboxd:memberRating>/)?.[1] || ''
    const url = block.match(/<link>(.*?)<\/link>/)?.[1] || ''
    const imgMatch = block.match(/<img[^>]+src="([^"]+)"/)
    const image = imgMatch?.[1] || ''
    const stars = rating ? '★'.repeat(Math.round(parseFloat(rating))) + (parseFloat(rating) % 1 ? '½' : '') : ''
    return { title, year, rating: stars, url, image }
  })
})
