# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**TravelWithUsUI** is a React + Vite travel application focused on user authentication (login/registration). The project is a modern SPA with client-side routing, form validation, and responsive UI design.

- **Framework**: React 19.2.6
- **Build Tool**: Vite 8.0.12
- **Routing**: React Router DOM 7.17.0
- **Icons**: React Icons 5.6.0
- **Styling**: CSS (no CSS framework, vanilla CSS with flexbox/grid)

## Development Commands

```bash
# Development server with hot module reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code with ESLint
npm run lint
```

## Project Architecture

### Directory Structure
```
src/
  ├── App.jsx              # Main app component with routing setup
  ├── Login.jsx            # Login page with form validation
  ├── Register.jsx         # Registration page with form validation
  ├── LeftPanel.jsx        # Shared left sidebar component (image + overlay)
  ├── main.jsx             # React DOM root with BrowserRouter wrapper
  ├── assets/
  │   └── images/
  │       └── charminar.jpg
  ├── App.css              # Login/Register form styling
  ├── Login.css            # (check if separate, appears merged with App.css)
  ├── Register.css         # (check if separate, appears merged with App.css)
  └── index.css            # Global styles, CSS variables, responsive defaults
```

### Key Architectural Patterns

#### Routing (React Router DOM v7)
- **Root wrapper**: BrowserRouter in `main.jsx`
- **Routes defined**: App.jsx uses `<Routes>` and `<Route>` components
- **Current routes**:
  - `/` → Register page (default)
  - `/login` → Login page
  - `/register` → Register page

#### Component Structure
- **Page components**: Login.jsx, Register.jsx
- **Shared components**: LeftPanel.jsx (displays travel imagery with title/description overlay)
- **State management**: React hooks only (useState), no external state library
- **Form handling**: Local state with controlled inputs, client-side validation

#### Form Validation Pattern
Both Login and Register use identical validation approach:
1. Local state object for form data (`formData`)
2. Local state object for errors (`errors`)
3. `handleChange()` clears field errors as user types
4. `validateForm()` returns boolean, populates errors
5. Error messages displayed inline below fields

Login form validates: username, password (required)
Register form validates: fullName, username, email (format), phone, password (min 6 chars), confirmPassword (match)

#### Styling Approach
- **No CSS framework** (no Tailwind, Bootstrap, etc.)
- CSS variables defined in `:root` for color theming and typography
- Flexbox layouts throughout
- Responsive design with `@media (max-width: 1024px)` breakpoints
- Gradient backgrounds used in Auth pages
- Component-specific CSS files (App.css, Login.css, Register.css) imported into JSX

### Design Patterns

**LeftPanel Component**:
- Reusable layout component accepting `title` and `description` props
- Displays fixed background image with dark overlay
- Used on both Login and Register pages with different text

**Form Validation Pattern**:
- Validation runs on form submission, not real-time
- Error state clears when user starts typing in a field
- Errors persist even if field becomes temporarily valid

## Important Notes

- **No API integration yet**: handleLogin() and handleRegister() log to console, need backend API calls added
- **No authentication state persistence**: No LocalStorage/SessionStorage implemented for auth tokens
- **No protected routes**: All routes are publicly accessible
- **CSS is vanilla**: Watch for specificity issues when adding new styles; no scoped CSS
- **React Router v7 API**: Uses new import syntax from 'react-router-dom' (not from 'react-router')

## ESLint Configuration

- Uses flat config format (eslint.config.js)
- Extends: @eslint/js recommended, react-hooks recommended, react-refresh/vite
- Ignores: dist/ directory
- No TypeScript (JSX only)

## Environment & Entry Points

- **HTML entry**: index.html (single root div with id="root")
- **JS entry**: src/main.jsx (createRoot and BrowserRouter setup)
- **Vite config**: Simple default config in vite.config.js
