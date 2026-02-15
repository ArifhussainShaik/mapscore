# GBP Audit Tool ⚡️

A fast, data-driven Google Business Profile audit tool that generates scored reports with prioritized fixes, competitor comparisons, and downloadable PDFs — in 30 seconds.

![GBP Audit Tool](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js) ![License](https://img.shields.io/badge/license-private-red?style=flat-square)

## ✨ Features

- **100-Point Audit Scoring** — Comprehensive analysis across 8 categories (Basic Info, Photos, Reviews, Posts, Q&A, Attributes, Products/Services, Competitive)
- **Business Autocomplete** — Real-time Google Places API integration with debounced search
- **Detailed Reports** — Category breakdowns with issue detection and prioritized fix recommendations
- **PDF Export** — Print-ready 3-page PDF reports with one click
- **User Authentication** — Google OAuth & Email login via NextAuth.js
- **Dashboard** — Track saved audits, monitoring alerts, and scores over time
- **Competitor Comparison** — Gauge & performance rings comparing your profile vs competitors

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** DaisyUI 5 + Custom CSS with glassmorphism design
- **Auth:** NextAuth.js (Google OAuth + Email)
- **Database:** MongoDB Atlas
- **APIs:** Google Places Autocomplete, Google Business Profile
- **Payments:** Dodo Payments

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/ArifhussainShaik/GBP-audit-tool.git
cd GBP-audit-tool
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required variables:
| Variable | Description |
|----------|-------------|
| `NEXTAUTH_SECRET` | Random string for session encryption |
| `GOOGLE_ID` | Google OAuth Client ID |
| `GOOGLE_SECRET` | Google OAuth Client Secret |
| `GOOGLE_PLACES_API_KEY` | Google Places API key for autocomplete |
| `MONGODB_URI` | MongoDB Atlas connection string |

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### 4. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
app/
├── page.js                    # Landing page with search bar
├── dashboard/page.js          # User dashboard with saved audits
├── audit/[id]/page.js         # Audit report page
├── audit/[id]/pdf/page.js     # Print-ready PDF view
├── api/
│   ├── places/autocomplete/   # Google Places API proxy
│   ├── payments/              # Dodo payment integration
│   └── webhooks/              # Payment webhooks
components/
├── SearchBar.jsx              # Business search with autocomplete
├── ButtonSignin.js            # Auth-aware login button
└── ...
libs/
├── auth.js                    # NextAuth configuration
├── mongo.js                   # MongoDB connection
└── auditEngine.js             # Scoring & issue detection engine
```

## 👤 Author

**Shaik Arif Hussain**
- GitHub: [@ArifhussainShaik](https://github.com/ArifhussainShaik)
- Email: shaikarifhussain.ak@gmail.com

## 📄 License

This project is private and not open-sourced.
