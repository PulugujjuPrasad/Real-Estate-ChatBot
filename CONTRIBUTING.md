# Contributing to AI Real Estate Concierge

Welcome! We are thrilled that you want to contribute to this project. This project follows strict enterprise engineering standards.

## 🛠️ Getting Started

### Local Setup
1. Clone the repo: `git clone ...`
2. Install backend dependencies: `cd src/server && npm install`
3. Install frontend dependencies: `cd src/client && npm install`
4. Seed the database: `npm run seed`
5. Start the project: `npm run dev`

### Development Workflow
We use a strict feature-branch workflow:
1. Create a branch: `git checkout -b feature/your-feature-name`
2. Implement your changes following the **Clean Architecture** patterns.
3. Write unit tests for every new piece of logic.
4. Submit a Pull Request with a detailed description of the change.

## 📜 Coding Standards
- **Language**: JavaScript (ES6+)
- **Style**: Prettier / ESLint (Standard config)
- **Architecture**: SOLID Principles
- **Commits**: Conventional Commits (`feat:`, `fix:`, `docs:`, `perf:`)
