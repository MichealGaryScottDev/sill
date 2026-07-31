# Orynth Product Submit — recorded flow

URL: https://www.orynth.dev/projects/submit
Account: devorynth@gmail.com (Google)

## Steps (1–13)

1. Click **Product** card (Apps, tools, SaaS…)
2. **Product name** → `#name` (max 40) → **Next**
3. **One line pitch** → `#tagline` (max 50) → **Next**
4. **Where can people try it** → `#websiteUrl` → **Next**
5. **What makes it special** → TipTap (max 500) → **Next**
6. **Logo** → upload SVG/PNG → **Next**
7. **Screenshots** → multi upload → **Next**
8. **Categories** → exactly 3 `#cat-*` → **Next**
9. → **Next** (no Autodev fill)
10. → **Next** (no Autodev fill)
11. **First comment** → TipTap (max 500) → **Next**
12. → **Next**
13. **Submit product** — dashboard approves → clicks **Submit product**
14. **Verify ownership** — download `.txt` → `public/.well-known/ory-verify.txt` → git push + redeploy → click **Verify ownership**

Automation: `src/orynth-submit.ts` (Playwright). Logo SVG → PNG via
`setInputFiles`. Dashboard approval submits; ownership verify follows.

## This ship

```json
{
  "productName": "Sill",
  "oneLinePitch": "Know what each gig is really worth.",
  "websiteUrl": "https://sill.loomship.xyz",
  "whatMakesItSpecial": "Sill is a real-time earnings dashboard for working musicians. Sync your gig calendar, see payouts, commute times, and expenses in one view. It automatically calculates your true hourly rate after travel and expenses. A Mapbox-based map shows which gigs are worth the drive. Local-first storage keeps your data in your browser.",
  "logoAbsolutePath": "C:\\Users\\noahw\\Downloads\\CodingProjects\\OrynthAutoDev\\projects\\sill\\listing\\logo.svg",
  "screenshotAbsolutePaths": [
    "C:\\Users\\noahw\\Downloads\\CodingProjects\\OrynthAutoDev\\projects\\sill\\listing\\screenshots\\01-home.png",
    "C:\\Users\\noahw\\Downloads\\CodingProjects\\OrynthAutoDev\\projects\\sill\\listing\\screenshots\\02-dashboard.png"
  ],
  "categories": [
    "Data Science & Analytics",
    "Productivity",
    "SaaS"
  ],
  "categoryIds": [
    "cat-data-science",
    "cat-productivity",
    "cat-saas"
  ],
  "firstComment": "Hey Orynth, I built Sill because I was tired of taking gigs that paid well on paper but barely broke even after driving an hour each way. The true hourly rate calc changed how I book. It uses Mapbox to visualize commute overlays, so I can see at a glance which nights are actually worth it. Let me know what you think, especially if you play shows too."
}
```
