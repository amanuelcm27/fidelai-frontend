# FidelAI Frontend

> **Amharic AI Data Marketplace & Crowdsourcing Platform** — A modern Next.js frontend for dataset collection, annotation, quality control, and marketplace selling.

---

## 🚀 Tech Stack

| Category | Technology |
| --- | --- |
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | shadcn/ui, Lucide React |
| **Toasts** | Sonner |
| **Animations** | Framer Motion |
| **3D Visuals** | Three.js, React Three Fiber |
| **Forms** | React Hook Form + Zod |
| **HTTP Client** | Axios |
| **Data Fetching** | TanStack React Query |
| **Charts** | Recharts |
| **Theming** | next-themes (dark/light) |
| **Utilities** | clsx, tailwind-merge |

---

## 📁 Project Structure

```
fidelai-frontend/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public pages (landing, about, pricing, etc.)
│   ├── (auth)/                   # Auth pages (login, register, onboarding)
│   ├── (dashboard)/              # Protected dashboard pages
│   │   ├── contributor/          # Contributor console & upload
│   │   ├── annotator/            # Annotator tasks & workspace
│   │   ├── expert/               # Expert review & adjudication
│   │   ├── buyer/                # Marketplace browsing & library
│   │   └── admin/                # Admin console
│   ├── api/                      # API route handlers (BFF)
│   ├── globals.css               # Global styles & design tokens
│   └── layout.tsx                # Root layout with providers
│
├── components/                   # Reusable UI components
│   ├── ui/                       # Base UI primitives (Button, Card, Input, Modal)
│   ├── layout/                   # Navbar, Sidebar, Footer
│   ├── landing/                  # Landing page sections
│   ├── dashboard/                # Dashboard stats & tables
│   ├── workspace/                # Annotation & review panels
│   ├── charts/                   # Recharts-based chart components
│   ├── forms/                    # Auth, upload, settings forms
│   └── common/                   # Loading, error, empty states
│
├── features/                     # Domain feature modules
│   ├── auth/                     # Authentication logic
│   ├── onboarding/               # 3-step onboarding
│   ├── contributor/              # Contributor features
│   ├── annotator/                # Annotator features
│   ├── expert/                   # Expert features
│   ├── buyer/                    # Buyer features
│   ├── marketplace/              # Search & filtering
│   ├── datasets/                 # Dataset details
│   ├── notifications/            # Alerts & notifications
│   └── admin/                    # Admin analytics
│
├── context/                      # React Context Providers
│   ├── auth-context.tsx          # Authentication state
│   ├── role-context.tsx          # Role-based access control
│   ├── theme-context.tsx         # Dark/light mode
│   └── notification-context.tsx  # In-app notifications
│
├── lib/                          # Shared utilities
│   ├── api/                      # API re-exports
│   ├── hooks/                    # TanStack Query hooks
│   ├── utils/                    # Utility functions (cn, formatDate, etc.)
│   ├── constants/                # App constants, roles, routes
│   └── validators/               # Zod schemas
│
├── services/                     # API integration layer
│   ├── api-client.ts             # Axios instance with interceptors
│   └── endpoints.ts              # Django backend endpoint definitions
│
├── types/                        # TypeScript type definitions
│   └── index.ts                  # User, Dataset, Task, Marketplace types
│
├── middleware.ts                  # Route protection & role redirects
├── .env.local                    # Environment variables
└── package.json                  # Dependencies & scripts
```

---

## 🛣️ Routing

### Public Routes
| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/about` | Platform information |
| `/pricing` | Dataset pricing plans |
| `/contact` | Support & communication |
| `/documentation` | API & dataset docs |

### Auth Routes
| Route | Description |
| --- | --- |
| `/login` | User login |
| `/register` | User registration |
| `/onboarding` | 3-step profile setup |

### Dashboard Routes (Protected)
| Route | Role | Description |
| --- | --- | --- |
| `/contributor` | Contributor | Dashboard |
| `/contributor/upload` | Contributor | Upload datasets |
| `/annotator` | Annotator | Task overview |
| `/annotator/tasks` | Annotator | Task queue |
| `/annotator/workspace` | Annotator | Annotation workspace |
| `/expert` | Expert | Review dashboard |
| `/expert/workspace` | Expert | Adjudication workspace |
| `/buyer` | Buyer | Browse marketplace |
| `/buyer/library` | Buyer | Purchased datasets |
| `/admin` | Admin | Admin console |

---

## 🏗️ Architecture Decisions

### Feature-Based Modules
Each domain has its own folder under `features/` containing components, hooks, and logic. This enables:
- **Independent development** — team members can work on separate features
- **Easy code ownership** — clear boundaries between modules
- **Scalability** — new features can be added without touching existing code

### Context Providers
Four global context providers manage cross-cutting concerns:
- `AuthProvider` — JWT-based authentication state
- `RoleProvider` — Role-based access control
- `ThemeProvider` — Dark/light mode via `next-themes`
- `NotificationProvider` — In-app notification management

### API Integration Layer
- `services/api-client.ts` — Pre-configured Axios instance with JWT interceptors
- `services/endpoints.ts` — Centralized endpoint definitions matching Django backend
- `lib/hooks/` — TanStack Query hooks for data fetching with caching

### Middleware
- `middleware.ts` — Protects dashboard routes, redirects unauthenticated users to login

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd fidelai-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your API URL
```

### Development

```bash
# Start the dev server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
# Production build
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

---

## 🔧 Environment Variables

| Variable | Description | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Django backend API base URL | `http://localhost:8000/api` |

---

## 👥 Team Development

This project is structured for **team collaboration**:

1. **Feature isolation** — Each feature module is self-contained
2. **Shared components** — Reusable UI via `components/`
3. **Type safety** — Centralized types in `types/`
4. **Consistent patterns** — Shared hooks, validators, and API utilities
5. **Clear conventions** — Barrel exports, consistent naming, module boundaries

---

## 📄 License

Private — All rights reserved.
