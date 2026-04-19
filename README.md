# Alpha Point Limited — Official Website

**"Building Beyond Boundaries"**

Premium construction and project development company based in Abuja, Nigeria.

---

## Tech Stack

- **React 19** + **Vite 8** (via `@vitejs/plugin-react`)
- **React Router DOM v7** (multi-page SPA routing)
- **Framer Motion** (page transitions, hero animations, modals)
- **GSAP + ScrollTrigger** (scroll-based reveals)
- **Tailwind CSS v4** (utility classes via `@tailwindcss/vite`)
- **React Hook Form + Zod** (contact form validation)
- **EmailJS** (serverless form delivery to alphapointnig@yahoo.com)
- **Lucide React** (icons)
- **Google Fonts:** Bebas Neue (display) + Barlow (body)

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example env file and fill in your EmailJS credentials:

```bash
cp .env.example .env
```

Then edit `.env`:

```
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**How to get EmailJS credentials:**
1. Sign up at https://www.emailjs.com (free)
2. Add an Email Service (Gmail, Yahoo, etc.) and copy the Service ID
3. Create a Template with variables: from_name, from_email, from_phone, service_type, message
4. Copy the Template ID and your Account Public Key

### 3. Run the development server

```bash
npm run dev
```

Open http://localhost:5173

---

## Build for Production

```bash
npm run build
```

Build output is in the `dist/` folder.

Preview the production build locally:

```bash
npm run preview
```

---

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

When prompted:
- Framework: Vite
- Build command: npm run build
- Output directory: dist

Then add environment variables in the Vercel dashboard:
- VITE_EMAILJS_SERVICE_ID
- VITE_EMAILJS_TEMPLATE_ID
- VITE_EMAILJS_PUBLIC_KEY

### Option B — Vercel Dashboard

1. Push this repo to GitHub
2. Go to vercel.com/new and import the repo
3. Set build command to `npm run build`, output to `dist`
4. Add env vars in Project Settings -> Environment Variables
5. Deploy

The `vercel.json` at the root ensures client-side routing works correctly.

---

## Site Structure

```
/           -> Home page (hero, stats, services, portfolio teaser, CTA, testimonials)
/about      -> Company history, timeline, values, team
/services   -> All 5 services with detailed sections
/portfolio  -> Project gallery with category filter and modal
/contact    -> Contact form + company info panel
```

---

## Contact

- **Phone:** 08160124685
- **Email:** alphapointnig@yahoo.com
- **WhatsApp:** https://wa.me/2348160124685
- **Location:** Abuja, Federal Capital Territory, Nigeria
