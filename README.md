# Humori

**Humori** is a React Native MVP designed to help children log their daily mood and add a short note, while giving parents a simple way to review emotional trends over time.

Built with **Expo**, **TypeScript**, and **React Native**, the app focuses on simplicity, clarity, and a smooth user experience.

## ✨ Why I built this

I created Humori as a personal project for my 8-year-old son, who enjoys selecting his mood and adding a note every day.

The goal was to build a lightweight family tool that makes it easier to track emotions, identify weekly patterns, and better understand what may not be going well.

## 🚀 Features

- **Daily Mood Tracking**: Log one mood per day with an intuitive emoji-based flow.
- **Mood Notes**: Add a short note to capture the context behind each emotion.
- **Weekly Insights**: Review emotional trends over time with simple charts and statistics.
- **Local Persistence**: Data is stored locally on the device using `AsyncStorage`.
- **Haptic Feedback**: Small tactile interactions for a more engaging experience.
- **Responsive UI**: Optimized for both iOS and Android.
- **Smooth Animations**: Powered by `react-native-reanimated`.

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) (SDK 54)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: React Native StyleSheet
- **Icons**: [Expo Vector Icons](https://docs.expo.dev/guides/icons/) and SVG support
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Charts**: [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit)
- **Storage**: [Async Storage](https://react-native-async-storage.github.io/async-storage/)

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) installed on a physical device, or an emulator/simulator

### Installation

```bash
git clone <repository-url>
cd mood
npm install
```

### Running the app

```bash
npm start
```

Then you can:

- Press `i` to open the app in the iOS Simulator.
- Press `a` to open the app in the Android Emulator.
- Scan the QR code with Expo Go on a physical device.
- Press `w` to open the app in the browser.

## 📂 Project Structure

```text
src/
├── app/             # Expo Router screens and layouts
│   ├── (screens)/   # Individual app screens
│   ├── (tabs)/      # Tab-based navigation configuration
│   └── _layout.tsx  # Root layout
├── assets/          # Emojis, images, and fonts
├── components/      # Reusable UI components
│   ├── common/      # Shared components
│   └── features/    # Domain-specific components
├── constants/       # App constants and configuration
├── helpers/         # Utility functions
├── hooks/           # Custom React hooks
├── services/        # Storage and external services
├── store/           # Zustand stores
└── types/           # TypeScript types
```

## 📜 Available Scripts

- `npm start`: Starts the Expo development server.
- `npm run ios`: Runs the app in the iOS Simulator.
- `npm run android`: Runs the app in the Android Emulator.
- `npm run web`: Runs the app in the browser.
- `npm run lint`: Runs ESLint for code quality checks.

## 📄 License

This project is a personal MVP and is intended for private development.
