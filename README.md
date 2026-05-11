# TO-DO-app
React Native TODO app with Firebase - featuring task management, custom lists, drag-and-drop, and user profiles with profile photos.

## Features

- **Task Management** - Create, edit, delete, and toggle tasks with due dates, due times, reminders, repeat rules (daily/weekly/monthly/yearly), and notes
- **Task Ordering** - Drag-and-drop reorder via PanResponder; tasks persist their order in Firestore
- **Smart Repeats** - Advanced repeat options: multi-day weekly, last-day-of-month monthly, repeat end dates
- **Local Notifications** - Schedule and cancel task reminders with expo-notifications; handles repeat scheduling natively
- **Time Picker** - Platform-specific time picker (iOS spinner, Android dialog)
- **Custom Lists** - Create, edit, and delete custom task lists with custom icons and colors
- **User Profiles** - Firebase Auth with email/password + Google OAuth via @react-native-google-signin, profile photos via Firebase Storage
- **Bottom Panel** - Slide-up task detail panel with calendar picker, reminder, and note modals
- **Search** - Filter tasks by keyword across all lists
- **Pull-to-Refresh** - Sync tasks from Firestore with pull gesture
- **EAS Build** - Configured for Expo Application Services (development, preview, production builds)
- **Optimistic Updates** - UI updates instantly with Firestore sync and rollback on failure

## Getting Started

1. Install dependencies:
   `npm install`

2. Copy `.env.example` to `.env` and fill in Firebase config values

3. Run the app:
   `npm start`

### Building with EAS

Development build: `eas build --profile development --platform all`
Preview build: `eas build --profile preview --platform all`
Production build: `eas build --profile production --platform all`

## Environment

Firebase settings are read from `EXPO_PUBLIC_*` environment variables (see `.env.example`). These are exposed to the app at build time via Expo.

## Expo prebuild
"Check for app config fields that may not be synced in a non-CNG project."

This project keeps native folders (`android/` and/or `ios/`) and uses `app.json` config fields. To keep native projects synced with app config, run prebuild whenever config changes and in CI/build pipelines:

`npx expo prebuild`

## File Structure

```
├── app/                    # Expo Router screens (file-based routing)
│   ├── (auth)/            # Auth screens (login, signup, forgotPassword, emailVerification)
│   ├── (protected)/       # Protected screens (main, settings)
│   └── _layout.tsx       # Root layout
├── assets/                # Images and icons
├── components/            # Reusable React components
│   ├── Index/             # Components for main index screen
│   ├── Modals/            # Modal components (calendar, reminder, repeat, note)
│   ├── (auth)/           # Auth-related components (buttons, GoogleIcon)
├── constants/            # App constants (list definitions)
├── context/               # React contexts (TasksContext, CustomListsContext)
├── src/                   # Firebase, auth, and notification utilities
│   ├── auth/             # Google Sign-In helper
│   ├── firebase/         # Firestore CRUD operations
│   ├── context/          # AuthContext
│   └── notifications/    # Notification service and useNotifications hook
├── styles/               # Style files grouped by feature
│   ├── app/              # App-level styles
│   ├── auth/             # Auth styles
│   ├── components/       # Component styles
│   └── modals/           # Modal-specific styles
├── types/                # TypeScript type definitions
└── android/              # Native Android project
```

## Testing

Run lint and typecheck:
`npm run lint`
`npm run typecheck`

No unit/e2e tests currently configured.
