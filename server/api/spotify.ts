export default defineEventHandler(async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID!
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!
  if (!refreshToken) return null
  if (!clientId || !clientSecret) return { debug: 'missing_creds', hasId: !!clientId, hasSecret: !!clientSecret }
  // log first/last 4 chars to verify without exposing full values
  return { debug: 'creds_check', idStart: clientId.slice(0,4), idEnd: clientId.slice(-4), secretStart: clientSecret.slice(0,4), secretEnd: clientSecret.slice(-4) }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  let accessToken: string
  try {
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }).toString(),
    })
    const tokenData = await tokenRes.json() as any
    if (!tokenData.access_token) return { debug: 'no_access_token', error: tokenData.error, desc: tokenData.error_description }
    accessToken = tokenData.access_token
  } catch (e: any) {
    return { debug: 'token_fetch_failed', error: e?.message }
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
