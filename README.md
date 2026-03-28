# Athflo

Athflo is a mobile-first wellness check-in app for sports teams.

- Athletes complete quick daily check-ins
- Coaches monitor team status, trends, and support alerts
- Demo data is persisted locally (no backend required)

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- LocalStorage-based demo session + mock auth

## Features

- Role-based flow: Athlete and Coach experiences
- Athlete dashboard with readiness pulse, streak, and quick mission
- Multi-step athlete check-in flow
- Athlete history and profile pages
- Coach dashboard with live team stats
- Coach roster, athlete detail views, alerts, and trends
- Personalized athlete name from login email

## Local Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

- http://localhost:3000

If port 3000 is busy, Next.js will automatically use the next available port.

## Scripts

```bash
npm run dev      # Start dev server
npm run lint     # Run ESLint
npm run build    # Create production build
npm run start    # Start production server
```

## App Routes

Public:

- `/login`

Athlete:

- `/athlete`
- `/athlete/check-in`
- `/athlete/history`
- `/athlete/profile`

Coach:

- `/coach`
- `/coach/team`
- `/coach/team/[athleteId]`
- `/coach/alerts`
- `/coach/trends`

## Demo Behavior

- Role is inferred from login email:
	- Email containing `coach` routes to coach experience
	- All others route to athlete experience
- Athlete first name is derived from email (for example, `maya.rivera@team.edu` -> `Maya Rivera`)
- Check-ins update both athlete and coach views via shared local storage

## Deployment (Vercel)

This app is deployment-ready on Vercel.

1. Push this repo to GitHub
2. Import project in Vercel
3. Use default Next.js build settings
4. Deploy

No environment variables are required for the current demo implementation.

## Notes

- This project currently uses mock auth and local persistence for demo speed.
- Refreshing the browser preserves stored demo state until local storage is cleared.
