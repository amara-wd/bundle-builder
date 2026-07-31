# Frontend Bundle Builder

This project was developed as a frontend take-home assignment. It is a responsive, data-driven bundle builder built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**, allowing users to configure a custom home security system with live pricing, variant selection, persistent storage, and a synchronized review panel.


## Live Demo

https://amara-bundle-builder.netlify.app/

## GitHub Repository

https://github.com/amara-wd/bundle-builder

---

## Features

### Multi-Step Bundle Builder
- 4-step accordion workflow
- Step navigation with Next button
- Expand/collapse accordion sections
- Selected item count for each step

### Product Configuration
- Data-driven UI rendered from local JSON
- Product images
- Optional discount badges
- Compare-at pricing
- Quantity steppers
- Variant/color selection with image thumbnails
- Independent quantity tracking for every variant

### Review Panel
- Live summary grouped by category
- Separate entries for selected variants
- Quantity steppers synchronized with product cards
- Shipping information
- Satisfaction guarantee
- Financing information
- Savings calculation
- Checkout modal
- Save system for later

### Persistence
- Configuration saved using Local Storage
- Product selections
- Active variants
- Selected plan
- Configuration restored after page refresh

### Responsive Design
- Desktop layout matching the provided Figma
- Responsive tablet and mobile layouts

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Local Storage

---


## Getting Started

### Clone the repository

```bash
git clone https://github.com/amara-wd/bundle-builder.git
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

---

## Implementation Notes

- The application is fully data-driven using a local JSON file.
- Product variants maintain independent quantities.
- Review panel stays synchronized with product selections.
- Bundle configuration is persisted using Local Storage.
- The monthly subscription plan is displayed separately from the hardware total, matching the pricing behavior shown in the design.

---


## Author

**Amara Inayat**

Full-Stack Web Developer
