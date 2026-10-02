# Software Company Website

A modern, responsive software company website built with **Next.js, Supabase, and Cloudinary**. The website is focused on showcasing company services, case studies, projects, team/about information, and pricing.

## 🚀 Tech Stack & Tools

| Technology   | Purpose                   |
| ------------ | ------------------------- |
| Next.js      | Frontend, routing & SEO   |
| TypeScript   | Type-safe development     |
| Tailwind CSS | Responsive UI & styling   |
| Supabase     | Database & authentication |
| Cloudinary   | Project/service images    |
| Vercel       | Deployment                |

## 🎯 Main Purpose

The website is designed as a professional company portfolio and marketing platform.

### Main Sections

* 🏠 Home
* 🛠️ Services
* 📁 Case Studies
* 👥 About Company
* 💰 Pricing
* 📞 Contact
* 🔐 Admin Dashboard

## 🗂️ Website Structure

```text
/
├── /services
├── /case-studies
├── /case-studies/[slug]
├── /about
├── /pricing
├── /contact
├── /login
└── /admin
    ├── /services
    ├── /case-studies
    └── /pricing
```

## 🧩 Core Features

### Services

Admin can create and manage:

* Service title
* Description
* Service icon/image
* Features
* Technologies
* Starting price (optional)

### Case Studies

Each case study can include:

* Project title
* Client/company name
* Project description
* Challenge
* Solution
* Technologies used
* Project results
* Featured image
* Gallery images
* Project URL
* SEO-friendly slug

### Pricing

Pricing plans can be managed from the admin panel.

Example:

| Plan       |  Price | Features        |
| ---------- | -----: | --------------- |
| Starter    |   $499 | Basic website   |
| Business   |   $999 | Website + CMS   |
| Enterprise | Custom | Custom software |

### About

Company information including:

* Company introduction
* Mission & vision
* Team
* Skills
* Technologies
* Company statistics

### Contact

Visitors can submit:

* Name
* Email
* Phone
* Company
* Message

Contact submissions are stored in Supabase for admin management.

## 🗄️ Database

Main Supabase tables:

```text
profiles
services
case_studies
pricing_plans
contact_messages
```

Basic relationships:

```text
profiles
   │
   └── admin

services
   └── service information

case_studies
   └── projects / portfolio

pricing_plans
   └── pricing packages

contact_messages
   └── customer inquiries
```

## 🖼️ Cloudinary

Cloudinary is used for:

* Service images
* Case study thumbnails
* Project galleries
* Team images
* Company/website assets

Only image URLs and required Cloudinary identifiers are stored in Supabase.

## 🔐 Admin Dashboard

Only authorized admins can manage website content.

```text
Admin Login
     ↓
Dashboard
     ↓
┌─────────────┐
│ Services    │
│ Case Studies│
│ Pricing     │
│ Messages    │
└─────────────┘
```

Admins can:

* Create/update/delete services
* Create/update/delete case studies
* Manage pricing plans
* View contact messages
* Upload/manage images

## 📱 Design Requirements

* Fully responsive
* Mobile-first
* Modern SaaS/software-company design
* Fast page loading
* Accessible components
* SEO-friendly pages
* Clean animations
* Professional typography
* Dark/light theme optional

## 🔍 SEO

Each service and case study should have:

* SEO-friendly slug
* Meta title
* Meta description
* Open Graph image
* Structured metadata where appropriate

Example:

```text
/services/web-development
/case-studies/ecommerce-platform
```

## 🔒 Security

* Protect admin routes
* Use Supabase Row Level Security (RLS)
* Never expose service-role keys
* Validate contact forms
* Sanitize user input
* Keep Cloudinary API secrets server-side
* Restrict admin operations to authorized users

## ⚙️ Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## 📁 Suggested Project Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── services/
│   ├── case-studies/
│   ├── about/
│   ├── pricing/
│   ├── contact/
│   └── admin/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ServiceCard.tsx
│   ├── CaseStudyCard.tsx
│   ├── PricingCard.tsx
│   └── ContactForm.tsx
├── lib/
│   ├── supabase/
│   └── cloudinary/
├── types/
└── styles/
```

## 🚀 Development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## 📌 Project Goal

Build a professional software company website that clearly communicates **what the company does, what it has built, how much its services cost, and how potential clients can get in touch**.

The architecture should remain simple, scalable, SEO-friendly, and easy to manage through the admin dashboard.
