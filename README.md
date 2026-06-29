# Humori

Humori is a playful premium mood-tracking mobile app built with Expo and React Native.
It helps users create a simple daily emotional check-in, review trends over time, and stay engaged through gentle progression mechanics.

## Overview

Humori started as a lightweight mood journal and has evolved into a more polished mobile product with:

- a guided onboarding flow
- a daily mood check-in with emoji-based cards
- optional contextual notes
- emotional trends and charts
- a progression-oriented "Universo" tab
- local-first privacy with data stored on device
- a dedicated settings screen for support, privacy summary, version info, and data deletion

The in-app copy is written in Portuguese from Portugal (`pt-PT`).

## Core Features

- **Daily Check-In**: one emotional entry per day with a fast, tactile flow
- **Mood Notes**: optional notes to add context to each day
- **Trend Analysis**: weekly, monthly, and all-time views with summary cards and charts
- **Mood Calendar**: visual overview of emotional history
- **Universe Progression**: streaks, progress highlights, and badge-oriented motivation
- **Onboarding Experience**: friendly first-run flow before entering the app
- **Settings Area**: app info, support entry point, privacy summary, and safe data reset
- **Accessibility Pass**: key buttons, filters, and interactive cards include accessibility labels, hints, and states
- **Responsive UI**: tuned for mobile layouts, including smaller smartphone screens

## Tech Stack

- **Framework**: [Expo](https://expo.dev/) `~54.0.35`
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Storage**: [Async Storage](https://react-native-async-storage.github.io/async-storage/)
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Haptics**: [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)
- **Charts**: [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit)
- **Fonts**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) and [Fredoka](https://fonts.google.com/specimen/Fredoka) via `@expo-google-fonts`
- **Icons**: [Expo Vector Icons](https://docs.expo.dev/guides/icons/) and `react-native-svg`

## App Structure

```text
src/
├── app/
│   ├── (screens)/      # Main screen implementations
│   ├── (tabs)/         # Tab routes: Início, Tendências, Universo
│   ├── _layout.tsx     # Root app layout
│   ├── index.tsx       # Entry routing (onboarding/app)
│   ├── onboarding.tsx  # First-run onboarding screen
│   └── settings.tsx    # Settings screen
├── assets/
│   ├── emojis/
│   └── images/
├── components/
│   ├── common/
│   └── features/
├── constants/          # Colors, theme, layout, moods, storage keys
├── helpers/            # Onboarding, updates, progress, utilities
├── hooks/              # Screen-specific logic hooks
├── services/           # Persistence layer
├── store/              # Zustand store
├── types/              # Shared TypeScript types
└── utils/
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- [npm](https://www.npmjs.com/)
- [Expo Go](https://expo.dev/go), Android Emulator, or iOS Simulator

### Installation

```bash
git clone <repository-url>
cd humori
npm install
```

### Run The Project

```bash
npm start
```

Then you can:

- press `a` to open Android
- press `i` to open iOS
- press `w` to open web
- scan the QR code with Expo Go on a device

## Available Scripts

- `npm start` - start the Expo development server
- `npm run android` - launch the app on Android
- `npm run ios` - launch the app on iOS
- `npm run web` - launch the web target
- `npm run lint` - run Expo ESLint checks
- `npm run reset-project` - run the local reset script

## Configuration Notes

- Expo app config lives in `app.json`
- The app uses `expo-router` as the main entry point via `expo-router/entry`
- Local data is persisted on-device, so no backend is required for the current version
- OTA updates are enabled through `expo-updates`

## Current Product Direction

Humori is currently focused on:

- a polished and approachable mobile UI
- local-first privacy
- soft gamification rather than competitive mechanics
- clear emotional tracking without account creation

## License

This project is currently intended for private development and product iteration.
