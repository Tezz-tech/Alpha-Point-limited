/**
 * POST /api/book
 *
 * Creates a 1-hour Google Meet consultation event on emmakleen@gmail.com's calendar.
 *
 * What happens automatically after booking:
 *  - Google Calendar creates the event with a unique Google Meet link
 *  - sendUpdates: 'all'  →  Google emails calendar invites to BOTH parties:
 *      • emmakleen@gmail.com  (Alpha Point host)  — invite + Meet link + reminders
 *      • client's email       (the person booking) — invite + Meet link + reminders
 *  - Reminder emails fire at: 24h before, 1h before
 *  - Popup reminder: 15 minutes before
 *
 * Request body:
 *   { start, end, name, email, phone, topic }
 *
 * Response:
 *   { success: true, event: { id, meetLink, htmlLink, start, end, displayTime } }
 */

const { google } = require('googleapis')

const CLIENT_ID     = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN
const CALENDAR_ID   = process.env.GOOGLE_CALENDAR_ID  // emmakleen@gmail.com
const HOST_NAME     = 'Alpha Point Limited'

function isValidISO(str) {
  if (typeof str !== 'string') return false
  return !isNaN(new Date(str).getTime())
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))
}

function buildOAuthClient() {
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  )
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
  return oauth2Client
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' })

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN || !CALENDAR_ID) {
    return res.status(500).json({
      error: 'Google Calendar not configured. Please set the GOOGLE_* environment variables.',
    })
  }

  // ── Input validation ────────────────────────────────────────────────────
  const { start, end, name, email, phone, topic } = req.body || {}

  if (!start || !end || !name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields: start, end, name, email, phone.' })
  }
  if (!isValidISO(start) || !isValidISO(end)) {
    return res.status(400).json({ error: 'Invalid start or end date.' })
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }

  const startDate = new Date(start)
  const endDate   = new Date(end)

  if (endDate <= startDate)     return res.status(400).json({ error: 'End must be after start.' })
  if (startDate < new Date())   return res.status(400).json({ error: 'Cannot book a slot in the past.' })
  if ((endDate - startDate) !== 60 * 60 * 1000) {
    return res.status(400).json({ error: 'Slot must be exactly 1 hour.' })
  }

  const safeName  = String(name).trim().slice(0, 100)
  const safePhone = String(phone).trim().slice(0, 30)
  const safeTopic = String(topic || 'General Consultation').trim().slice(0, 500)

  // ── Race-condition check: is this slot still free? ──────────────────────
  try {
    const auth     = buildOAuthClient()
    const calendar = google.calendar({ version: 'v3', auth })

    const freebusyCheck = await calendar.freebusy.query({
      requestBody: {
        timeMin:  startDate.toISOString(),
        timeMax:  endDate.toISOString(),
        timeZone: 'Africa/Lagos',
        items:    [{ id: CALENDAR_ID }],
      },
    })

    const stillBusy = freebusyCheck.data.calendars[CALENDAR_ID]?.busy || []
    if (stillBusy.length > 0) {
      return res.status(409).json({
        error: 'This slot was just booked. Please choose another time.',
      })
    }

    // ── Display time string for confirmation screen ─────────────────────
    const displayTime = new Intl.DateTimeFormat('en-GB', {
      weekday:    'long',
      year:       'numeric',
      month:      'long',
      day:        'numeric',
      hour:       '2-digit',
      minute:     '2-digit',
      timeZone:   'Africa/Lagos',
      timeZoneName: 'short',
    }).format(startDate)

    // ── Create calendar event ────────────────────────────────────────────
    const eventRes = await calendar.events.insert({
      calendarId:            CALENDAR_ID,
      conferenceDataVersion: 1,       // Required to auto-generate Google Meet link
      sendUpdates:           'all',   // Google emails calendar invites to ALL attendees
      requestBody: {
        summary: `Consultation: ${safeName} — Alpha Point Limited`,

        description: [
          `One-hour consultation with Alpha Point Limited.`,
          ``,
          `👤 Client:  ${safeName}`,
          `📧 Email:   ${email}`,
          `📱 Phone:   ${safePhone}`,
          `💬 Topic:   ${safeTopic}`,
          ``,
          `─────────────────────────────────`,
          `Booked via alphapointlimited.com`,
          `📞 08160124685  |  alphapointnig@yahoo.com`,
        ].join('\n'),

        start: { dateTime: startDate.toISOString(), timeZone: 'Africa/Lagos' },
        end:   { dateTime: endDate.toISOString(),   timeZone: 'Africa/Lagos' },

        // Both parties automatically receive Google Calendar email invites
        attendees: [
          { email: CALENDAR_ID, displayName: HOST_NAME, organizer: true },
          { email: email,       displayName: safeName },
        ],

        // Auto-generate a unique Google Meet video link
        conferenceData: {
          createRequest: {
            requestId:             `alphapoint-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },

        // Email reminders: 24h + 1h before. Popup: 15min before
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'email', minutes: 60 },
            { method: 'popup', minutes: 15 },
          ],
        },

        status:   'confirmed',
        location: 'Google Meet (Online) — Alpha Point Limited, Abuja, Nigeria',
        colorId:  '6', // Tangerine — closest to brand orange
      },
    })

    const event    = eventRes.data
    const meetLink =
      event.conferenceData?.entryPoints?.find(ep => ep.entryPointType === 'video')?.uri ||
      event.hangoutLink ||
      null

    return res.status(200).json({
      success: true,
      event: {
        id:          event.id,
        meetLink,
        htmlLink:    event.htmlLink,
        start:       event.start.dateTime,
        end:         event.end.dateTime,
        summary:     event.summary,
        displayTime,
      },
    })
  } catch (err) {
    console.error('Book API error:', err)

    if (err.code === 401 || (err.message && err.message.includes('invalid_grant'))) {
      return res.status(401).json({
        error: 'Calendar auth failed. Refresh token may have expired — please contact us directly.',
      })
    }
    if (err.code === 403) {
      return res.status(403).json({
        error: 'Calendar permission denied. Please check OAuth credentials.',
      })
    }

    return res.status(500).json({
      error: 'Failed to create booking. Please try again or call 08160124685.',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    })
  }
}
