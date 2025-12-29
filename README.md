# Zeller React Native Code Challenge

A React Native application for managing users with GraphQL API integration and local SQLite database for offline support.

## Features

- ✅ Fetch users from GraphQL API (`listZellerCustomers`)
- ✅ Store users in local SQLite database for offline access
- ✅ Display users from local database (not directly from network)
- ✅ Add, update, and delete users locally
- ✅ Form validation with react-hook-form:
  - Name: required, alphabets and spaces only, max 50 characters
  - Email: optional, must be valid format if provided
  - Real-time validation feedback
- ✅ Filter users by role (Admin, Manager, All)
- ✅ Search users by name
- ✅ Pull-to-refresh functionality
- ✅ Pager View with swipeable tabs (All ↔ Admin ↔ Manager)
- ✅ Smooth tab animations
- ✅ iOS and Android support

## Prerequisites

- Node.js >= 20
- React Native development environment set up
  - For iOS: Xcode and CocoaPods
  - For Android: Android Studio and Android SDK
- Yarn or npm

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd assignment
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. For iOS, install CocoaPods dependencies:

**Important:** Use Bundler to manage CocoaPods (recommended to avoid version conflicts):

```bash
# First, install Ruby dependencies via Bundler
cd ios
bundle install
# Then install CocoaPods dependencies
bundle exec pod install
cd ..
```

This uses the CocoaPods version specified in the Gemfile, which avoids conflicts with system Ruby.

## Running the App

### Start Metro Bundler

```bash
yarn start
# or
npm start
```

### Run on iOS

```bash
yarn ios
# or
npm run ios
```

### Run on Android

```bash
yarn android
# or
npm run android
```

## Styling with NativeWind

This project uses **NativeWind v4** (Tailwind CSS for React Native) for styling. All components use utility classes instead of StyleSheet.

### Key Features:
- **Responsive Design**: Text sizes and layouts adapt to different screen sizes
- **Utility-First**: Use Tailwind classes like `flex-1`, `bg-white`, `text-primary`, etc.
- **Type-Safe**: TypeScript support with proper type definitions

### Custom Colors:
- `primary`: #6C5CE7 (purple)
- `secondary`: #00B894 (green)
- `error`: #D63031 (red)
- `gray-50` through `gray-400`: Various gray shades

### Responsive Text:
- Text components use `numberOfLines` and `flex-shrink` to prevent overflow on small screens
- Font sizes are set using inline styles for precise control while maintaining responsive behavior

## Project Structure

```
assignment/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx       # Reusable button component
│   │   ├── FormTextInput.tsx # Form input with react-hook-form
│   │   ├── FormField.tsx    # Form field wrapper
│   │   ├── RoleSelector.tsx # Role selector with react-hook-form
│   │   ├── Avatar.tsx      # Avatar component with initials
│   │   ├── Badge.tsx       # Badge component (includes RoleBadge)
│   │   ├── IconButton.tsx  # Icon-only button component
│   │   ├── Card.tsx        # Reusable card container
│   │   ├── EmptyState.tsx  # Empty state component
│   │   ├── LoadingSpinner.tsx # Loading spinner component
│   │   ├── ConfirmDialog.tsx # Confirmation dialog helper
│   │   ├── UserItem.tsx     # User list item component
│   │   ├── SearchBar.tsx    # Search input component
│   │   ├── TabBar.tsx       # Tab navigation with animations
│   │   └── index.ts         # Component exports
│   ├── screens/             # Screen components
│   │   ├── UserListScreen.tsx    # Main user list with filters
│   │   └── UserFormScreen.tsx    # Add/Edit user form
│   ├── services/            # Business logic
│   │   ├── graphql.ts       # GraphQL API client
│   │   └── database.ts      # SQLite database operations
│   ├── context/             # React Context providers
│   │   └── UserContext.tsx  # User state management
│   ├── navigation/          # Navigation setup
│   │   └── AppNavigator.tsx # Stack navigator
│   ├── hooks/               # Custom React hooks
│   │   ├── useToast.ts     # Toast notification hook
│   │   ├── useUserActions.ts # User actions hook
│   │   ├── useFilteredUsers.ts # User filtering hook
│   │   ├── useDebounce.ts  # Debounce hook for search optimization
│   │   └── index.ts        # Hook exports
│   ├── constants/           # Application constants
│   │   └── index.ts        # Colors, durations, validation rules
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   └── utils/               # Utility functions
│       ├── validation.ts   # Form validation logic (legacy, kept for tests)
│       ├── validationRules.ts # Reusable validation rules for react-hook-form
│       ├── validationHelpers.ts # Validation helper utilities
│       ├── errorHelpers.ts # Error handling utilities
│       ├── helpers.ts      # General utility functions
│       ├── roleNormalizer.ts # Role normalization utility
│       └── uuid.ts         # UUID generator
├── aws-exports.js           # AWS AppSync configuration
├── schema.gql              # GraphQL schema
└── App.tsx                  # Root component
```

## Testing

### Unit Tests

Run tests with:

```bash
yarn test
# or
npm test
```

Test files are located in:
- `src/utils/__tests__/validation.test.ts` - Form validation tests
- `src/services/__tests__/graphql.test.ts` - GraphQL service tests

### Manual Testing

See [TESTING.md](./TESTING.md) for a comprehensive testing guide including:
- Unit test instructions
- Manual testing checklist
- Feature-specific testing scenarios
- Troubleshooting tips

## Key Technologies

- **React Native 0.83.1** - Mobile framework
- **TypeScript** - Type safety
- **NativeWind v4** - Tailwind CSS for React Native (utility-first styling)
- **react-hook-form** - Form state management and validation
- **React Navigation** - Navigation library
- **react-native-pager-view** - Swipeable pager for tabs
- **react-native-quick-sqlite** - Local database
- **react-native-vector-icons** - Icon library (Ionicons)
- **react-native-toast-message** - Toast notifications
- **graphql-request** - GraphQL client
- **React Context API** - State management

## Reusable Components & Hooks

The project includes several reusable components, custom hooks, and helper functions for better code organization and optimization:

### Custom Hooks
- **`useToast`** - Centralized toast notification hook (showSuccess, showError, showInfo)
- **`useUserActions`** - User CRUD operations hook (handleDelete, handleSave, navigateToEdit, navigateToAdd)
- **`useFilteredUsers`** - Optimized user filtering hook with memoization
- **`useDebounce`** - Debounce hook for search optimization (reduces excessive filtering)

### Form Components
- **`FormTextInput`** - Text input with react-hook-form Controller integration, validation, and error display
- **`FormField`** - Wrapper component for form fields with label, error, and helper text
- **`RoleSelector`** - Role selection component (Admin/Manager) with react-hook-form integration

### UI Components
- **`Button`** - Reusable button component with variants (primary, secondary, outline, ghost, danger) and sizes (sm, md, lg)
- **`Avatar`** - Avatar component displaying user initials in a colored circle
- **`Badge`** / **`RoleBadge`** - Badge component for labels/tags (includes specialized RoleBadge)
- **`IconButton`** - Icon-only button component with variants (default, danger, ghost)
- **`Card`** - Reusable card container component with optional elevation
- **`EmptyState`** - Empty state component with icon, title, and message
- **`LoadingSpinner`** - Loading indicator component with customizable message
- **`ConfirmDialog`** - Confirmation dialog helper (replaces Alert.alert)
- **`SearchBar`** - Search input component
- **`TabBar`** - Tab navigation with animations
- **`UserItem`** - User list item component (memoized for performance)

### Helper Functions & Constants
- **`validationRules.ts`** - Reusable validation rules for react-hook-form (name, email, and helper functions)
- **`validationHelpers.ts`** - Validation helper utilities (duplicate name checking, combined validators)
- **`errorHelpers.ts`** - Error handling utilities (error message formatting, common error messages)
- **`helpers.ts`** - General utility functions (normalizeString, compareStrings, debounce, getInitials)
- **`roleNormalizer.ts`** - Role normalization utility function
- **`uuid.ts`** - UUID generator (React Native compatible)
- **`constants/index.ts`** - Application-wide constants (colors, durations, validation rules, etc.)

## Usage

### Viewing Users

- The app opens to the user list screen
- Swipe left/right or tap tabs to switch between All, Admin, and Manager views
- Pull down to refresh and sync with the API
- Use the search bar to filter users by name

### Adding a User

1. Tap the "+ Add" button in the top right
2. Fill in the form:
   - Name (required): Only letters and spaces, max 50 characters
   - Email (optional): Must be valid format if provided
   - Role: Select Admin or Manager
3. Tap "Save" to add the user

### Editing a User

1. Tap on a user in the list
2. Modify the fields
3. Tap "Save" to update

### Deleting a User

1. Tap the "×" button on a user item
2. Confirm deletion in the alert dialog

## API Configuration

The GraphQL API configuration is in `aws-exports.js`. The endpoint and API key are already configured for the Zeller API.

## Database

The app uses SQLite for local storage. The database is automatically initialized on first launch. All user operations (add, update, delete) are performed on the local database. The app syncs with the API when you pull to refresh.

## Notes

- The app displays users from the local database, not directly from the network
- New users are added locally only (no API mutation)
- Pull-to-refresh syncs data from the API to the local database
- The pager view allows smooth swiping between Admin and Manager lists
- Tab animations follow the reference design

### Deprecation Warnings

You may see deprecation warnings in the console:
- **SafeAreaView warning**: This comes from `@react-navigation/stack` library internally. Our code correctly uses `react-native-safe-area-context`. This will be resolved when React Navigation updates.
- **InteractionManager warning**: This also comes from `@react-navigation/stack` library. It's a library-level deprecation, not an issue with our code.

These warnings don't affect functionality and will be resolved when the React Navigation library updates to use the new APIs.

## Troubleshooting

### CocoaPods Not Found / Ruby Dependency Issues

If you see "CocoaPods - Version found: N/A" or Ruby dependency errors:
- **Use Bundler** (recommended): The project uses Bundler to manage CocoaPods versions and avoid system Ruby conflicts:
  ```bash
  cd ios
  bundle install
  bundle exec pod install
  cd ..
  ```
- If Bundler is not installed:
  ```bash
  gem install bundler
  cd ios
  bundle install
  bundle exec pod install
  cd ..
  ```
- The "N/A" warning is often just a detection issue - the installation will work fine using `bundle exec pod install`

### iOS Build Issues

If you encounter CocoaPods issues:
```bash
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install
cd ..
```

### Android Build Issues

**jcenter() Error with SQLite:**
If you encounter `Could not find method jcenter()` error:
- The project uses `react-native-quick-sqlite` which doesn't have this issue
- Make sure to run `yarn install` or `npm install` after pulling the latest changes
- Clean and rebuild Android:
  ```bash
  cd android
  ./gradlew clean
  cd ..
  yarn android
  ```
- For iOS, reinstall pods:
  ```bash
  cd ios
  rm -rf Pods Podfile.lock
  bundle exec pod install
  cd ..
yarn ios
```

**ChoreographerCompat Error with react-native-screens:**
If you encounter `Unresolved reference 'ChoreographerCompat'` error:
- This is a version compatibility issue. The project uses `react-native-screens@4.11.1` which is compatible with React Native 0.83.1
- Make sure to run `yarn install` after pulling the latest changes
- Clean and rebuild:
  ```bash
  cd android
  ./gradlew clean
  cd ..
  yarn android
  ```

Make sure you have:
- Android SDK installed
- Android emulator running or device connected
- Proper environment variables set

### Database Issues

If the database doesn't initialize:
- Clear app data and reinstall
- Check that SQLite native modules are properly linked
- The project uses `react-native-quick-sqlite` - make sure it's installed: `yarn install`

### Icon Issues

If icons don't display:
- For iOS: Run `cd ios && bundle exec pod install && cd ..`
- For Android: Icons should work automatically with auto-linking
- If icons still don't show, rebuild the app: `yarn android` or `yarn ios`

## License

This project is part of the Zeller React Native Code Challenge.
