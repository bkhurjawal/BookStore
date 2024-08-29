# Book Shelf App

## Overview

The Book Shelf App is a React Native application that displays a list of books, allowing users to filter by category and search by title. The app is designed to be scalable and easy to maintain, using the Context API for state management and Axios for API requests.

## Features

- **Book List:** Displays a list of books fetched from an API.
- **Filtering:** Filter books by category or search by title.
- **Pagination:** Paginate through the list of books.
- **Book Details:** View detailed information about a selected book.

## Technical Specifications

- **React Native:** The app is built using React Native, allowing it to run on both iOS and Android devices.
- **TypeScript:** TypeScript is used for type safety and better developer experience.
- **Context API:** Used for global state management, including the book list and filter state.
- **Axios:** Used for making HTTP requests to the API.
- **Jest:** Testing framework used for unit tests.

## Project Structure

```
/src
│
├── /components
│   ├── Pagination.tsx
│
├── /context
│   ├── BookContext.js
│
│
├── /screens
│   ├── BookList.tsx
│   ├── FilterScreen.tsx
│   └── BookDetail.tsx

│
├── /utils
│   ├── constants.ts
│   └── utilFunctions.ts
│
└── App.tsx
```

### Context API Usage

The Context API is used to manage the state of the book list and filtering options. The `BookContext` is created in the `/context/BookContext.tsx` file and provides the global state and functions to update the state.

### Axios for API Requests

Axios is used to fetch data from the API. The API URL is stored in a constants file (`/utils/constants.ts`), and the API requests are made in the `BookProvider`.

## Running the Project Locally

### Prerequisites

- **Node.js:** Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **React Native CLI:** You need the React Native CLI to run the project. Install it globally using the following command:

  ```bash
  npm install -g react-native-cli
  ```

- **Xcode:** (For iOS) Make sure Xcode is installed and set up.
- **Android Studio:** (For Android) Make sure Android Studio is installed and set up.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bkhurjawal/BookStore.git
   ```

2. Navigate to the project directory:

   ```bash
   cd BookStore
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

### Running Tests

To run the unit tests:

```bash
npm test
```
