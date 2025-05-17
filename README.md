# Radius Learning Management System

![License](https://img.shields.io/badge/license-MIT-blue) ![Next.js](https://img.shields.io/badge/Next.js-13.5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-green) ![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-yellow) ![NeonDB](https://img.shields.io/badge/NeonDB-PostgreSQL-lightgrey)

A fully AI-powered, serverless learning management system (LMS) that allows users to generate personalized study materials—notes, flashcards, quizzes, and Q&A—based on their syllabus details, skill level, and preferred style.

---

## Table of Contents

1. [Demo and Screenshots](#demo-and-screenshots)
2. [Features](#features)
3. [Tech Stack and Architecture](#tech-stack-and-architecture)
4. [Getting Started](#getting-started)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Inngest Workflows](#inngest-workflows)
8. [Security and Payment Integration](#security-and-payment-integration)
9. [Why These Choices](#why-these-choices)
10. [Contributing](#contributing)
11. [License](#license)

---

## Demo and Screenshots

Live Demo: [https://radius-lms.vercel.app/](https://radius-lms.vercel.app/)

![Landing](https://github.com/user-attachments/assets/c93ec37a-d8c2-490e-9e33-a5871dd61826)
![DashBoard](https://github.com/user-attachments/assets/d6ed23b3-8a4d-4cd9-96bc-5e525dcb6676)

---

## Features

- **Personalized Study Materials**: Generate notes, flashcards, quizzes, and Q&A for any topic.
- **AI-Driven**: Powered by OpenAI Gemini 2.0 Pro for dynamic content generation.
- **Serverless Architecture**: Inngest functions for asynchronous tasks.
- **Secure Authentication**: Clerk for user management.
- **Payment and Billing**: Stripe integration for subscription and portal management.
- **Component Library**: shadcn/ui + Tailwind CSS for consistent styling.

---

## Tech Stack and Architecture

```plaintext
Next.js (App Router)
├── Tailwind CSS + shadcn/ui
├── Inngest (Serverless functions)
├── NeonDB (PostgreSQL)
│   └── Drizzle ORM for type-safe queries
├── Clerk for Auth and User Context
├── Stripe for Payments
└── OpenAI Gemini 2.0 Pro model
```

1. **Next.js**: Framework for SSR/ISR and API routes. Enables fast page loads and SEO benefits.
2. **Tailwind CSS and shadcn/ui**: Utility-first CSS with prebuilt component primitives for rapid UI development.
3. **Inngest**: Orchestrates background tasks, such as AI content generation, decoupling long-running jobs from HTTP requests.
4. **NeonDB (PostgreSQL)**: Highly performant, serverless Postgres database. Chosen for ACID compliance, relational schema, and robust JSON support.
5. **Drizzle ORM**: Lightweight, type-safe ORM that integrates seamlessly with PostgreSQL and Next.js.
6. **Clerk**: Managed auth solution offering SSO, MFA, and session management out-of-the-box.
7. **Stripe**: Industry-standard payments API, managing subscriptions and customer billing portals.
8. **OpenAI Gemini 2.0 Pro**: Latest large language model for content creation.

---

## Getting Started

1. **Clone the repo**:

   ```bash
   git clone https://github.com/HemantBatra873/radius-lms.git
   cd radius-lms
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment variables**:
   Copy `.env.example` to `.env` and fill in:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   STRIPE_SECRET_KEY=
   DATABASE_URL=
   INNGEST_API_KEY=
   ```

4. **Run locally**:

   ```bash
   npm run dev
   ```

---

## Database Schema

Defined in `configs/schema.ts` using Drizzle ORM:

```ts
import { pgTable, serial, varchar, boolean, json, integer, text } from 'drizzle-orm/pg-core';

export const USER_TABLE = pgTable('users', {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  email: varchar().unique().notNull(),
  isMember: boolean().default(false),
  customerId: varchar(),
});

export const STUDY_MATERIAL_TABLE = pgTable('studyMaterial', {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  courseType: varchar().notNull(),
  topic: varchar().notNull(),
  difficultyLevel: varchar().default('Easy'),
  courseLayout: json(),
  createdBy: varchar().notNull(),
  status: varchar().default('Generating'),
});
// ... other tables omitted for brevity
```

---

## API Endpoints

All API routes live under `src/app/api/`

### 1. List and Fetch Courses

```ts
// src/app/api/courses/route.ts
export async function POST(req) { /* fetch all courses by user */ }
export async function GET(req) { /* fetch single course by courseId */ }
```

### 2. Create Course and Outline

```ts
import { courseOutlineAiModel } from '@/configs/AiModel';

export async function POST(req) {
  const { courseId, courseType, topic, difficultyLevel, createdBy } = await req.json();
  const PROMPT = `Generate a study material for ${topic} ... All in JSON format.`;

  // Generate outline via AI
  const aiResp = await courseOutlineAiModel.sendMessage(PROMPT);
  const outline = JSON.parse(aiResp.response.text());

  // Save to DB
  const [dbResult] = await db.insert(STUDY_MATERIAL_TABLE)
    .values({ courseId, courseType, topic, difficultyLevel, createdBy, courseLayout: outline })
    .returning();

  // Trigger notes generation
  await inngest.send({ name: 'notes.generate', data: { course: dbResult } });

  return NextResponse.json(dbResult);
}
```

### 3. Study Type Content

```ts
// src/app/api/study-type-content/route.ts
export async function POST(req) {
  const { courseId, chapters, type } = await req.json();
  const prompt = type === 'Flashcards'
    ? `Generate flashcards for ${chapters}...`
    : type === 'Quiz'
      ? `Generate quiz on ${chapters}...`
      : `Generate Q&A for ${chapters}...`;

  const [record] = await db.insert(STUDY_TYPE_CONTENT_TABLE)
    .values({ courseId, type, status: 'Generating' })
    .returning();

  await inngest.send({ name: 'studyType.content', data: { prompt, courseId, recordId: record.id } });
  return NextResponse.json({ id: record.id });
}
```

...and similarly for payment and content retrieval routes.

---

## Inngest Workflows

Defined in `src/inggest/functions.ts`:

- **helloWorld**: Test endpoint
- **createUser**: Persist user in DB
- **GenerateNotes**: AI-powered chapter notes generation
- **GenerateStudyTypeContent**: Produces flashcards, quizzes, Q&A

Served via:

```ts
import { serve } from 'inngest/next';
export const { GET, POST, PUT } = serve({ client: inngest, functions });
```

---

## Security and Payment Integration

### Authentication (Clerk)

- Protect API routes with Clerk middleware
- JWT-based session management
- Support for SSO and MFA

### Payments (Stripe)

```ts
export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { customerId } = await req.json();
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: process.env.NEXT_PUBLIC_BASE_URL
  });
  return NextResponse.json(session);
}
```

---

## Why These Choices?

| Component       | Reasoning                                                                                                        |
|-----------------|-----------------------------------------------------------------------------------------------------------------|
| **PostgreSQL**  | ACID compliance, relational integrity, JSON support for AI-generated outlines. NeonDB offers serverless scaling. |
| **Drizzle ORM** | Type-safe, lightweight, modern integration with Next.js.                                                        |
| **Inngest**     | Efficient background processing for long-running AI tasks.                                                      |
| **Clerk**       | Comprehensive auth solution with built-in security best practices.                                              |
| **Stripe**      | Industry-standard for subscription and billing management.                                                      |
| **Gemini 2.0**  | High-quality LLM for educational content generation.                                                            |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
