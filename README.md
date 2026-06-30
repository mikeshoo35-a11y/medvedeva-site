# Medvedeva consulting site

Product documentation (`1-scope` … `5-dev`) and the Next.js app in `6-code/`.

## Local development

```bash
cd 6-code
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Import this repo in [Vercel](https://vercel.com/new).
2. Set **Root Directory** to `6-code`.
3. Add environment variables (Project → Settings → Environment Variables):

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Resend API key for contact form email |
| `RESEND_FROM_EMAIL` | Yes | Verified sender address in Resend |
| `OWNER_NOTIFICATION_EMAIL` | No | Defaults to site owner email in code |

4. Deploy. Vercel auto-detects Next.js and runs `npm run build` in `6-code/`.

## Repository layout

| Folder | Purpose |
|--------|---------|
| `1-scope` … `5-dev` | Product specs, design, backlog |
| `6-code` | Next.js application (deploy this folder) |
