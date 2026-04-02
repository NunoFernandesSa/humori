# Humori

**Humori** is a **React Native** and **Expo** MVP that helps children log their daily mood and notes, while giving parents a simple way to review weekly emotional trends.

## 🚀 Features

- **Daily Mood Tracking**: Log your mood once per day using an intuitive emoji-based flow.
- **Mood Notes**: Add a short note to capture context behind each emotion.
- **Weekly Insights**: Review emotional patterns over time with simple statistics and charts.
- **Local Persistence**: Data is stored locally on the device using `AsyncStorage`.
- **Haptic Feedback**: Enjoy tactile feedback for a more engaging experience.
- **Responsive Design**: Optimized for both iOS and Android.
- **Smooth Animations**: Built with `react-native-reanimated` for polished transitions.

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) (SDK 54)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: React Native StyleSheet
- **Icons**: [Expo Vector Icons](https://docs.expo.dev/guides/icons/) and SVG support
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Data Visualization**: [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit)
- **Storage**: [Async Storage](https://react-native-async-storage.github.io/async-storage/)

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) installed on your physical device, or an emulator/simulator

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd mood
```

2. Install dependencies:

```bash
npm install
```

### Running the App

Start the development server:

```bash
npm start
```

Once the server is running:

- **iOS**: Press `i` to open the app in the iOS Simulator.
- **Android**: Press `a` to open the app in the Android Emulator.
- **Physical Device**: Scan the QR code with the Expo Go app.
- **Web**: Press `w` to open the app in your browser.

## 📂 Project Structure

```text
src/
├── app/             # Expo Router screens and layouts
│   ├── (screens)/   # Individual app screens
│   ├── (tabs)/      # Tab-based navigation configuration
│   └── _layout.tsx  # Root layout
├── assets/          # Emojis, images, and fonts
├── components/      # Reusable UI components
│   ├── common/      # Shared components (Buttons, Headers, etc.)
│   └── features/    # Domain-specific components (Mood, Stats)
├── constants/       # App constants and configuration
├── helpers/         # Utility functions
├── hooks/           # Custom React hooks
├── services/        # External services (Storage)
├── store/           # State management (Zustand stores)
└── types/           # TypeScript interfaces and types
```

## 📜 Available Scripts

- `npm start`: Starts the Expo development server.
- `npm run ios`: Runs the app in the iOS Simulator.
- `npm run android`: Runs the app in the Android Emulator.
- `npm run web`: Runs the app in the web browser.
- `npm run lint`: Runs ESLint for code quality checks.

## 📄 License

This project is a personal MVP and is intended for private development.
