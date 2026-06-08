# Transport On Demand (TOD) — Admin & Management System

A public transport management system developed as a Final Year Project (FYP), with a legacy prototype and a modern full-stack rebuild.

---

## Repository Structure

```
TOD_Admin/
├── tod_fyp/          # Original FYP prototype (HTML/CSS/JS + Firebase)
└── tod-web-ng/       # Enhanced MEAN-stack rebuild (Angular + Node.js + Firebase)
```

---

## tod_fyp — Original FYP Prototype

> Built circa 2020 as the Final Year Award Project for the Transport On Demand system.

### Tech Stack

| Layer       | Technology                                      |
|-------------|------------------------------------------------|
| Frontend    | HTML5, CSS3, Bootstrap, jQuery, JavaScript     |
| Backend     | Firebase (Firestore, Auth, Functions, Storage) |
| Hosting     | Firebase Hosting                               |

### User Roles

| Role            | Description                                              |
|-----------------|----------------------------------------------------------|
| System Admin    | Full platform control — routes, buses, companies, users  |
| CGR Admin       | Government railway authority admin panel                 |
| Bus Company     | Company self-registration, drivers, conductors, buses    |
| Passenger       | Booking, reviews, promotions                             |

### Features

- Admin authentication (sign-in, sign-up, forgot password)
- Dashboard with system overview
- Bus management — add, manage, review buses
- Route management — add, view, and manage bus routes
- Time slot management
- Company management — add and manage bus companies
- Driver & conductor management
- Passenger management
- Promotions — add, modify, view
- Booking management — confirmed bookings per bus company
- Reviews — admin-level bus review moderation
- Report generation
- Bus company self-registration portal
- Bus company sign-in and main panel

### Project Structure

```
tod_fyp/
├── index.html                  # Entry point
├── firebase.json               # Firebase hosting config
├── firestore.rules             # Firestore security rules
├── firestore.indexes.json
├── storage.rules
├── database.rules.json
├── package.json
├── functions/                  # Firebase Cloud Functions
├── js/                         # Core JavaScript modules
│   ├── index.js
│   ├── database.js
│   ├── bus.js
│   ├── buscompany.js
│   ├── busroutes.js
│   ├── bustimeslots.js
│   ├── busBoookings.js
│   ├── company.js
│   ├── conductors.js
│   ├── promotions.js
│   ├── report.js
│   ├── reviewBus.js
│   └── user.js
├── View/
│   ├── AdminView/              # All admin panel HTML pages
│   │   ├── AdminSignIn.html
│   │   ├── dashboard-home.html
│   │   ├── admin-new-panel.html
│   │   ├── manage-buses.html
│   │   ├── manage-drivers.html
│   │   ├── manage-conductors.html
│   │   ├── manage-passenger.html
│   │   ├── manage-reviews.html
│   │   ├── manage-timeslot.html
│   │   ├── admin-add-a-bus.html
│   │   ├── admin-add-bus-routes.html
│   │   ├── admin-add-company.html
│   │   ├── admin-add-time-slot.html
│   │   ├── admin-routes.html
│   │   ├── admin-timeslots.html
│   │   ├── admin-view-routes.html
│   │   ├── admin-view-timeslots.html
│   │   ├── add-promotion-and-view.html
│   │   ├── modify-promotions.html
│   │   ├── bus-comapny-panel.html
│   │   ├── bus-company-sign-in.html
│   │   ├── bus-review-admin.html
│   │   ├── cgr-admin-panel.html
│   │   ├── cgr-sign-in.html
│   │   ├── confirmed-bookings-bus-admin.html
│   │   ├── report-bus-admin.html
│   │   └── admin-profile-update.html
│   └── BusCompany/             # Bus company portal HTML pages
│       ├── bus-company-sign-In.html
│       ├── bus-company-main-page.html
│       ├── bus-company-self-register.html
│       ├── bus-company-nav-bar.html
│       ├── bus-company-driver-register.html
│       └── bus-company-conductor-register.html
├── Database/                   # Database schema / seed data
└── design_files/               # UI mockups and design assets
```

### Running the Prototype

1. Install Firebase CLI: `npm install -g firebase-tools`
2. `cd tod_fyp && npm install`
3. `firebase login`
4. `firebase serve` — serves locally on `http://localhost:5000`

---

## tod-web-ng — MEAN Stack Rebuild

> A real-world-ready, production-grade enhancement of the original FYP, rebuilt with a modern MEAN stack architecture.

### Tech Stack

| Layer       | Technology                                    |
|-------------|-----------------------------------------------|
| Frontend    | Angular 17+, TypeScript, SCSS                 |
| Backend     | Node.js, Express.js                           |
| Database    | Firebase Firestore (via Firebase Admin SDK)   |
| Auth        | Firebase Authentication                       |
| API Style   | RESTful API                                   |

### Architecture

```
tod-web-ng/
├── frontend/         # Angular SPA
└── rest-api/         # Express.js REST API
```

### Features

- JWT-based authentication with route guards
- Modular Angular feature modules
- RESTful API with Express.js
- Firebase Firestore as the database (via Admin SDK)
- CORS-enabled API with environment-based configuration
- Lazy-loaded Angular routes
- Shared services, guards, and interceptors

### Frontend Structure (Angular)

```
frontend/src/app/
├── app.component.*         # Root component
├── app.routes.ts           # App-level routing
├── app.config.ts           # App configuration
├── firebase.config.ts      # Firebase client config
├── core/                   # Singleton services & infrastructure
│   ├── guards/             # Auth route guards
│   ├── interceptors/       # HTTP interceptors (auth headers, etc.)
│   └── services/           # Core services (auth, etc.)
├── features/               # Feature modules (lazy loaded)
│   ├── auth/               # Login / registration pages
│   ├── dashboard/          # Main dashboard
│   ├── buses/              # Bus management
│   ├── bus-routes/         # Route management
│   ├── timeslots/          # Time slot management
│   ├── companies/          # Bus company management
│   ├── drivers/            # Driver management
│   ├── conductors/         # Conductor management
│   ├── passengers/         # Passenger management
│   ├── promotions/         # Promotions management
│   ├── reviews/            # Review moderation
│   └── public/             # Public-facing pages
└── shared/                 # Shared components, pipes, directives
```

### REST API Structure (Express.js)

```
rest-api/src/
├── app.js                  # Express app setup
├── server.js               # Server entry point
├── config/                 # Environment & Firebase Admin config
├── routes/                 # Route definitions
│   ├── auth.routes.js
│   ├── buses.routes.js
│   ├── routes.routes.js
│   ├── timeslots.routes.js
│   ├── companies.routes.js
│   ├── drivers.routes.js
│   ├── conductors.routes.js
│   └── promotions.routes.js
├── controllers/            # Request handlers
└── middleware/             # Auth middleware, error handlers
```

### API Endpoints (Base: `/api`)

| Method | Endpoint         | Description              |
|--------|-----------------|--------------------------|
| GET    | `/api/health`   | Health check             |
| POST   | `/api/auth/...` | Authentication           |
| GET/POST/PUT/DELETE | `/api/buses` | Bus CRUD |
| GET/POST/PUT/DELETE | `/api/routes` | Route CRUD |
| GET/POST/PUT/DELETE | `/api/timeslots` | Timeslot CRUD |
| GET/POST/PUT/DELETE | `/api/companies` | Company CRUD |
| GET/POST/PUT/DELETE | `/api/drivers` | Driver CRUD |
| GET/POST/PUT/DELETE | `/api/conductors` | Conductor CRUD |
| GET/POST/PUT/DELETE | `/api/promotions` | Promotion CRUD |

### Running the MEAN Stack App

**REST API**
```bash
cd tod-web-ng/rest-api
npm install
# Create a .env file with:
# FRONTEND_URL=http://localhost:4200
# FIREBASE_PROJECT_ID=your-project-id
# (+ Firebase Admin SDK credentials)
npm run dev       # Development with nodemon
npm start         # Production
```

**Angular Frontend**
```bash
cd tod-web-ng/frontend
npm install
ng serve          # Runs on http://localhost:4200
ng build          # Production build
```

---

## Comparison

| Feature              | tod_fyp (Original)        | tod-web-ng (Rebuild)            |
|----------------------|---------------------------|---------------------------------|
| Year                 | ~2020                     | 2024+                           |
| Frontend             | HTML/jQuery/Bootstrap     | Angular 17+ / TypeScript        |
| Backend              | Firebase Functions        | Express.js REST API             |
| Database access      | Firebase SDK (client)     | Firebase Admin SDK (server)     |
| Architecture         | Multi-page app (MPA)      | Single-page app (SPA) + API     |
| Auth                 | Firebase Auth (client)    | Firebase Auth + server guards   |
| Code structure       | Script-based              | Modular / component-based       |

---

## System Users

| Role         | Access Level                                                  |
|--------------|---------------------------------------------------------------|
| System Admin | Full access — all entities, reports, user management          |
| CGR Admin    | Government transport authority oversight                      |
| Bus Company  | Manage own buses, drivers, conductors, timeslots, bookings    |
| Passenger    | Book tickets, view routes, leave reviews                      |

---

## Author

Devin Chandula — Final Year Project, Transport On Demand (TOD) System
