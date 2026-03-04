# SwiftBite Express

SwiftBite Express is a React and TypeScript food delivery website UI. It includes restaurant discovery, menu browsing, cart, and orders screens using demo data.

Live DEMO- https://swiftbite-express.netlify.app/
## What is inside

Pages
1. Home
2. Restaurant
3. Menu
4. Cart
5. Orders
6. About

Core UI features
1. Dark mode toggle using app context
2. Cart state management add remove update quantity clear cart
3. Promo code flow in cart UI
4. Demo orders timeline and order details

Note
This project is a front end UI with mock data. There is no backend API connected by default.

## Tech stack

1. React 18
2. TypeScript
3. Vite
4. Tailwind CSS
5. React Router
6. Radix UI components
7. Material UI
8. Lucide icons

## Requirements

1. Node.js LTS recommended
2. npm or pnpm

## Setup and run

1. Install dependencies
   npm install

2. Important
   This export keeps React as a peer dependency. If the app fails with a React or React DOM missing error, install them once:
   npm install react react-dom

3. Start development server
   npm run dev

4. Open the URL shown in your terminal
   Usually http://localhost:5173

## Build for production

1. Build
   npm run build

2. Preview the production build
   npx vite preview

## Project structure

index.html
src
  main.tsx            App entry
  styles              Global styles
  app
    App.tsx           Main app shell
    Root.tsx          Layout wrapper
    routes.ts         App routes
    context
      AppContext.tsx  Dark mode and cart state
    pages             Page screens
    components        Reusable UI components

## Customize

1. Routes
   Edit src app routes.ts to change navigation.

2. Data
   Demo data is defined inside some pages. Example HomePage.tsx contains a restaurant list.

3. Theme
   Dark mode state lives in AppContext.tsx. You can persist it with localStorage if you want.

## Common issues

1. npm is not recognized
   Install Node.js LTS then reopen your terminal.

2. React missing error
   Run
   npm install react react-dom

3. Port already in use
   Run
   npm run dev -- --port 5174

## Credits and licenses

See ATTRIBUTIONS.md for third party credits including shadcn ui components and Unsplash images.
