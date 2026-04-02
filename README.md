# Humori

**Humori** is a modern, minimalist mood tracking application built with **React Native** and **Expo**. It helps users monitor their emotional well-being over time with a clean interface and insightful statistics.

## 🚀 Features

- **Daily Mood Tracking**: Easily record your mood with intuitive emoji-based selections.
- **Detailed Statistics**: Visualize your emotional patterns over time with interactive charts.
- **Local Persistence**: Your data is stored securely on your device using `AsyncStorage`.
- **Haptic Feedback**: Enhanced user experience with tactile responses during interactions.
- **Responsive Design**: Optimized for both iOS and Android platforms.
- **Modern Animations**: Smooth transitions and animations powered by `react-native-reanimated`.

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) (SDK 54)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: React Native StyleSheet
- **Icons**: [Expo Vector Icons](https://docs.expo.dev/guides/icons/) & SVG support
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Data Visualization**: [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit)
- **Storage**: [Async Storage](https://react-native-async-storage.github.io/async-storage/)

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) app installed on your physical device or an emulator/simulator

### Installation

1.  **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd mood
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Running the App

Start the development server:

```bash
npm start
```

Once the server is running:

- **iOS**: Press `i` to open in iOS Simulator (requires macOS and Xcode).
- **Android**: Press `a` to open in Android Emulator (requires Android Studio).
- **Physical Device**: Scan the QR code displayed in the terminal using the Expo Go app.
- **Web**: Press `w` to open in your browser.

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

This project is private and intended for personal development.
