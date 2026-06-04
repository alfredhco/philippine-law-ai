// ─── AI Base Layer ────────────────────────────────────────────────────────────
// Handles API calling, streaming, context memory, and mock fallback.
// All AI modules import from here — never call fetch directly.

export const MODEL   = 'claude-sonnet-4-6'
export const MAX_TOK = 1500
export const HISTORY_LIMIT = 12  // messages kept in context window

// ─── Env detection ────────────────────────────────────────────────────────────
export const hasApiKey = () => !!import.meta.env.VITE_ANTHROPIC_API_KEY
export const getApiKey = () => import.meta.env.VITE_ANTHROPIC_API_KEY ?? ''

// ─── Base system prompt ───────────────────────────────────────────────────────
export const BASE_SYSTEM = `Ikaw si Bar Coach — isang expert Philippine bar examination AI assistant na nagsasalita ng Taglish (Filipino-English mix). Ang iyong purpose ay tulungan ang mga bar candidates na mag-aral ng Philippine law nang mas epektibo.

STYLE RULES:
- Magsalita sa natural na Taglish — kalahating Filipino, kalahating English
- Legal terms (article numbers, case names, doctrines) ay sa English PALAGI
- Gumamit ng "Counsel" bilang address sa user
- Be direct, precise, at encouraging
- Structure responses with markdown: **bold** para sa key terms, bullet lists para sa elements, > para sa key rules

CONTENT RULES:
- Cite SPECIFIC articles, section numbers, and case names (G.R. Nos.)
- Apply the BAR EXAM STANDARD — practical application, not theory lang
- For every rule, give an example application
- Flag common bar exam traps and misconceptions
- Always mention prescriptive periods, thresholds, and exceptions when relevant`

// ─── Subject-aware system prompt extension ────────────────────────────────────
export const SUBJECT_CONTEXTS = {
  'civil-law':      'Focused topic: **Civil Law**. Pag-aralan ang Civil Code, obligations, contracts, property, succession, at family relations. Key codal: Arts. 1-2270 Civil Code.',
  'criminal-law':   'Focused topic: **Criminal Law**. RPC provisions, special penal laws, at criminal liability. Key: Arts. 1-365 RPC, RA 9165, RA 10591.',
  'political-law':  'Focused topic: **Political Law**. 1987 Constitution, administrative law, election law, LGC. Key: Art. III (Bill of Rights), Art. VIII (Judiciary).',
  'remedial-law':   'Focused topic: **Remedial Law**. 2019 Amended Rules of Civil Procedure, 2019 Rules on Evidence, criminal procedure. Key: Rules 1-141 ROC.',
  'commercial-law': 'Focused topic: **Commercial Law**. Revised Corporation Code (RA 11232), NIL, Insurance Code, Securities Regulation Code (RA 8799).',
  'taxation-law':   'Focused topic: **Taxation Law**. NIRC as amended by TRAIN (RA 10963), local government taxation (LGC Sec. 128-196), tax remedies.',
  'labor-law':      'Focused topic: **Labor Law**. Labor Code (PD 442 as amended), labor standards, labor relations, NLRC Rules, social legislation.',
  'legal-ethics':   'Focused topic: **Legal Ethics**. Code of Professional Responsibility, 2004 Rules on Notarial Practice, disbarment jurisprudence.',
  'legal-writing':  'Focused topic: **Legal Writing**. Statutory construction, IRAC method, pleadings drafting, persuasive legal writing.',
  'all':            '',
}

export function buildSystemPrompt(subject = 'all', moduleExtra = '') {
  const subjectCtx = SUBJECT_CONTEXTS[subject] ?? ''
  return [BASE_SYSTEM, subjectCtx, moduleExtra].filter(Boolean).join('\n\n')
}

// ─── Conversation history manager ────────────────────────────────────────────
export function createHistory() {
  let messages = []
  return {
    add(role, content)   { messages.push({ role, content }); if (messages.length > HISTORY_LIMIT) messages = messages.slice(-HISTORY_LIMIT) },
    get()                { return [...messages] },
    clear()              { messages = [] },
    last()               { return messages[messages.length - 1] ?? null },
    length()             { return messages.length },
  }
}

// ─── Real API: streaming request ─────────────────────────────────────────────
export async function streamClaude({ system, messages, onChunk, onDone, onError } = {}) {
  const key = getApiKey()
  if (!key) return false  // caller handles fallback

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model: MODEL, max_tokens: MAX_TOK, stream: true, system, messages }),
    })

    if (!res.ok) { onError?.(new Error(`API ${res.status}`)); return false }

    const reader  = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop()

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const raw = line.slice(6).trim()
        if (raw === '[DONE]') continue
        try {
          const evt = JSON.parse(raw)
          if (evt.type === 'content_block_delta' && evt.delta?.type === 'text_delta') onChunk(evt.delta.text)
          if (evt.type === 'message_stop') onDone?.()
        } catch {}
      }
    }
    return true
  } catch (err) {
    onError?.(err)
    return false
  }
}

// ─── Real API: single request (non-streaming) ─────────────────────────────────
export async function callClaude({ system, messages }) {
  const key = getApiKey()
  if (!key) return null

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: MODEL, max_tokens: MAX_TOK, system, messages }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.content?.[0]?.text ?? null
  } catch { return null }
}

// ─── Mock streamer — simulates word-by-word reveal ───────────────────────────
export async function streamMock(text, onChunk, onDone, wordsPerChunk = 1) {
  const tokens = text.match(/\S+|\s+/g) ?? []
  let buf = ''
  for (const token of tokens) {
    buf += token
    if (buf.split(/\s+/).filter(Boolean).length >= wordsPerChunk || /\n/.test(token)) {
      onChunk(buf)
      buf = ''
      await sleep(28 + Math.random() * 22)
    }
  }
  if (buf) onChunk(buf)
  await sleep(80)
  onDone?.()
}

// ─── Utility ──────────────────────────────────────────────────────────────────
export const sleep = (ms) => new Promise(r => setTimeout(r, ms))

export function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)] }

// Detect the likely subject from message text
export function detectSubject(text) {
  const t = text.toLowerCase()
  if (/civil code|obligat|contract|succession|property|sale|family|art\.\s*\d{3,}/.test(t)) return 'civil-law'
  if (/rpc|penal|crime|homicide|murder|theft|robbery|felony|accused/.test(t)) return 'criminal-law'
  if (/constitution|bill of rights|due process|equal protection|congress|president|sc ruling|sc held/.test(t)) return 'political-law'
  if (/rule \d+|rules of court|evidence|hearsay|pleading|jurisdiction|appeal|certiorari/.test(t)) return 'remedial-law'
  if (/corporation|negotiable|insurance|securities|partnership|nil|sec|rcc/.test(t)) return 'commercial-law'
  if (/tax|nirc|vat|income|bir|assessment|tin|estate tax|donor/.test(t)) return 'taxation-law'
  if (/labor|employee|dismissal|nlrc|termination|wages|overtime|union/.test(t)) return 'labor-law'
  if (/disbarment|attorney|lawyer|ethics|cpr|canon|privileged|notarial/.test(t)) return 'legal-ethics'
  return 'all'
}
