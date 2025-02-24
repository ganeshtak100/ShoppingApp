# Shopping App

A React Native e-commerce application with features like product listing, cart management, and deep linking support.

## Features

- Product listing with infinite scroll and search functionality
- Detailed product view with image and description
- Shopping cart management
- Share products via deep links
- Smooth animations and transitions
- Shimmer loading effects
- Pull-to-refresh support

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ganeshtak100/ShoppingApp.git
cd ShoppingApp

2. Install dependencies:
yarn install
# or
npm install

3. Install iOS dependencies:
```bash
cd ios
pod install
cd ..
``` 
## Running the App
### iOS
```bash
yarn ios
# or
npm run ios


Running the App
iOS
bash
Run
yarn ios# ornpm run ios
Android
bash
Run
yarn android
# or
npm run android
yarn android# ornpm run android

Custom URL scheme: shoppingapp://app/product/{productId}


Project Structure
plaintext

src/── components/      # Reusable components├
        assets/         #assets like image and svg
     ── navigation/      # Navigation configuration
     ── screens/         # Screen components├
     ── services/        # API services├──
      store/          # Redux store and slices├── 
      types/          # TypeScript types└── 
      utils/          # Utility functions
Tech Stack
React Native
TypeScript
Redux Toolkit
React Navigation
Axios
```

