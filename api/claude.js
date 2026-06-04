// Serverless proxy — keeps the Anthropic API key server-side only.
// The client posts to /api/claude; this forwards to Anthropic and streams back.

export const config = { maxDuration: 60 }

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(503).json({ error: 'AI service not configured' })
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    })

    // Pass status + headers through
    res.status(upstream.status)
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json')

    if (!upstream.ok) {
      const err = await upstream.json()
      return res.json(err)
    }

    // Stream the response body back to the client
    const reader = upstream.body.getReader()
    const decoder = new TextDecoder()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      res.write(decoder.decode(value, { stream: true }))
    }
    res.end()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
