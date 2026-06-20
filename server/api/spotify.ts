export default defineEventHandler(async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID!
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!
  if (!clientId || !clientSecret || !refreshToken) return null

  const basic = btoa(`${clientId}:${clientSecret}`)
  let accessToken: string
  try {
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }).toString(),
    })
    const tokenData = await tokenRes.json() as any
    if (!tokenData.access_token) return null
    accessToken = tokenData.access_token
  } catch {
    return null
  }

  const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (res.status === 204 || res.status >= 400) {
    const recent = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (!recent.ok) return null
    const recentData = await recent.json() as any
    const track = recentData?.items?.[0]?.track
    if (!track) return null
    return { playing: false, title: track.name, artist: track.artists.map((a: any) => a.name).join(', '), image: track.album.images?.[1]?.url, url: track.external_urls.spotify }
  }

  const data = await res.json() as any
  const track = data?.item
  if (!track) return null
  return { playing: data.is_playing, title: track.name, artist: track.artists.map((a: any) => a.name).join(', '), image: track.album.images?.[1]?.url, url: track.external_urls.spotify }
})
