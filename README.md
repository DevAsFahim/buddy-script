# 🚀 BuddyScript - Social Connectivity Platform

BuddyScript is a full-stack social media application designed for seamless user interaction. It features a robust authentication system, dynamic post feeds, and a sophisticated nested commenting system built for performance and scalability.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Redux Toolkit (RTK Query), TypeScript, Sonner (Toasts).
- **Backend:** Node.js, Express.js, Mongoose (MongoDB).
- **Validation:** Zod (Schema Validation) & Express-Validator.
- **Security:** JWT (JSON Web Tokens), Bcrypt (Password Hashing).

---

## 🏗️ Core Features & Implementation

### 1. Advanced Authentication & Persistence
- **JWT Authorization:** Secure login/registration flow with token-based access control.
- **Manual Rehydration Strategy:** Instead of relying on heavy third-party persistence libraries, BuddyScript uses a manual rehydration strategy. On application load, the Redux store initializes by checking `localStorage` for an existing token and user object. This ensures a lightning-fast, flicker-free user experience across page refreshes.
- **Global BaseQuery Injection:** A centralized RTK Query configuration automatically injects the `Authorization: Bearer <token>` header into every outgoing API request, keeping the component logic clean and focused.

### 2. Intelligent Commenting System
- **Recursive Threading:** Implemented a recursive UI component architecture that allows for "Infinite Nesting." The frontend logically parses a flat array of comments from the database into "Root Comments" and "Replies" using `parentId` references.
- **Reactive State Management:** Utilized RTK Query's `tagTypes` (`Comments`, `Posts`) to provide "Optimistic-style" updates. The UI automatically invalidates and re-fetches data the moment a user submits a comment, ensuring the feed is always synchronized with the server.

### 3. Dynamic User Identity
- **Auto-Generated Avatars:** Integrated the **DiceBear API** to provide every user with a unique, consistent visual identity upon registration. Avatars are generated using the user's email as a unique seed.
- **Global "GetMe" Synchronization:** A dedicated `/user/me` endpoint allows the application to verify session validity and fetch fresh profile data on every mount, protecting against unauthorized access.

---

## 📝 Key Engineering Decisions

| Decision | Reason |
| :--- | :--- |
| **RTK Query over Axios** | RTK Query provides built-in caching, automated re-fetching, and declarative loading/error states, reducing frontend boilerplate code by nearly 40%. |
| **Manual Auth Rehydration** | Chosen to maintain full control over the application startup sequence and avoid the "race conditions" often found in automated persistence libraries. |
| **Flat Comment Schema** | Storing comments in a flat MongoDB collection with `parentId` pointers is significantly more performant for indexing and deep-nesting than embedding comments inside Post documents. |
| **Zod Schema Validation** | Enforcing strict data shapes on both the Frontend and Backend ensures a "Single Source of Truth," drastically reducing runtime "undefined" errors. |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Atlas or Local Instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/DevAsFahim/buddy-script.git](https://github.com/DevAsFahim/buddy-script.git)

### 2. Setup Frontend
```bash
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the React development server
npm run dev


---
**Developed with ❤️ by [[Dev As Fahim]](https://github.com/your-username)**