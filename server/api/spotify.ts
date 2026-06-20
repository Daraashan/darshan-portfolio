export default defineEventHandler(async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID!
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!
  if (!refreshToken) return { playing: false, error: 'no_refresh_token' }
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const tokenRes = await $fetch<{ access_token: string }>('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }).toString(),
  })
  const accessToken = tokenRes.access_token
  const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (res.status === 204 || res.status > 400) {
    const recent = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const recentData = await recent.json() as any
    const track = recentData?.items?.[0]?.track
    if (!track) return { playing: false }
    return { playing: false, title: track.name, artist: track.artists.map((a: any) => a.name).join(', '), album: track.album.name, image: track.album.images?.[1]?.url, url: track.external_urls.spotify }
  }
  const data = await res.json() as any
  const track = data?.item
  if (!track) return { playing: false }
  return { playing: data.is_playing, title: track.name, artist: track.artists.map((a: any) => a.name).join(', '), album: track.album.name, image: track.album.images?.[1]?.url, url: track.external_urls.spotify }
})
