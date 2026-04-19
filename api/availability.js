/**
 * GET /api/availability
 * Returns available 1-hour consultation slots for the next 21 days.
 * Reads emmakleen@gmail.com's Google Calendar free/busy via OAuth2.
 */

import { google } from 'googleapis'

const CLIENT_ID     = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN
const CALENDAR_ID   = process.env.GOOGLE_CALENDAR_ID

// Business hours — WAT (Africa/Lagos = UTC+1)
const BUSINESS_START_HOUR = 9   // 9:00 AM WAT
const BUSINESS_END_HOUR   = 17  // 5:00 PM WAT (last slot = 4:00 PM)
const SLOT_MS             = 60 * 60 * 1000
const BUFFER_HOURS        = 2
const WAT_MS              = 1 * 60 * 60 * 1000 // UTC+1

function isWeekend(d) {
  const day = d.getUTCDay()
  return day === 0 || day === 6
}

function daySlots(dayUTC) {
  // dayUTC: Date at UTC midnight for a calendar day
  // 9AM WAT = 8AM UTC, 4PM WAT = 3PM UTC (last 1hr slot)
  const slots = []
  for (let h = BUSINESS_START_HOUR; h < BUSINESS_END_HOUR; h++) {
    const start = new Date(dayUTC)
    start.setUTCHours(h - 1, 0, 0, 0) // WAT→UTC
    slots.push({ start, end: new Date(start.getTime() + SLOT_MS) })
  }
  return slots
}

function timeLabel(utc) {
  const d = new Date(utc.getTime() + WAT_MS)
  const h = d.getUTCHours(), m = d.getUTCMinutes()
  const ampm = h >= 12 ? 'PM' : 'AM'
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`
}

function dateKey(utc) {
  const d = new Date(utc.getTime() + WAT_MS)
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`
}

function overlaps(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && aEnd > bStart
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET')    return res.status(405).json({ error: 'Method not allowed' })

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN || !CALENDAR_ID) {
    return res.status(500).json({
      error: 'Google Calendar not configured. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, GOOGLE_CALENDAR_ID in environment variables.',
    })
  }

  try {
    const auth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, 'https://developers.google.com/oauthplayground')
    auth.setCredentials({ refresh_token: REFRESH_TOKEN })
    const calendar = google.calendar({ version: 'v3', auth })

    const daysAhead  = Math.min(parseInt(req.query.days || '21', 10), 30)
    const now        = new Date()
    const cutoff     = new Date(now.getTime() + BUFFER_HOURS * SLOT_MS)

    const rangeStart = new Date(now)
    rangeStart.setUTCHours(0, 0, 0, 0)
    const rangeEnd = new Date(rangeStart.getTime() + daysAhead * 24 * 60 * 60 * 1000)

    const fb = await calendar.freebusy.query({
      requestBody: {
        timeMin:  rangeStart.toISOString(),
        timeMax:  rangeEnd.toISOString(),
        timeZone: 'Africa/Lagos',
        items:    [{ id: CALENDAR_ID }],
      },
    })

    const busy = (fb.data.calendars[CALENDAR_ID]?.busy || []).map(b => ({
      start: new Date(b.start),
      end:   new Date(b.end),
    }))

    const slots = []
    for (let i = 0; i < daysAhead; i++) {
      const day = new Date(rangeStart.getTime() + i * 24 * 60 * 60 * 1000)
      if (isWeekend(day)) continue
      for (const s of daySlots(day)) {
        if (s.start < cutoff) continue
        if (busy.some(b => overlaps(s.start, s.end, b.start, b.end))) continue
        slots.push({ start: s.start.toISOString(), end: s.end.toISOString(), label: timeLabel(s.start), dateKey: dateKey(s.start) })
      }
    }

    return res.status(200).json({ slots })
  } catch (err) {
    console.error('[availability]', err.message)
    if (err.code === 401 || String(err.message).includes('invalid_grant')) {
      return res.status(401).json({ error: 'Google auth failed. Refresh token may have expired.' })
    }
    return res.status(500).json({ error: err.message || 'Failed to load availability.' })
  }
}
