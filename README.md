# To-Do-List PWA App

## Description
This project is a **To-Do List** application built with **React**, **TypeScript**, and **Firebase**. The application uses **Google Auth** API and **Firestore** for online data synchronization. Additionally, the app is styled using **TailwindCSS**, and utilizes pre-built component libraries like **shadcn/ui** and **Magic UI** for a sleek and responsive design.

## Features
- **Task Management**: Create, edit, delete, and mark tasks as completed.
- **Google Authentication**: Log in with your Google account to synchronize tasks online.
- **Offline Functionality**: The app works even without an internet connection, and tasks are automatically synchronized once the connection is restored.
- **PWA Installation**: You can install the app directly on your device from the browser.
- **Modern UI Design**: The UI is styled using **TailwindCSS**, and pre-built components from **shadcn/ui** and **Magic UI** to ensure a professional and user-friendly interface.

## Technologies Used
- **React**: JavaScript library for building dynamic and performant user interfaces.
- **TypeScript**: Superset of JavaScript providing static typing to improve code reliability and maintainability.
- **TailwindCSS**: A utility-first CSS framework used for custom, responsive design.
- **shadcn/ui**: A pre-built component library that integrates seamlessly with TailwindCSS, providing robust, accessible UI components.
- **Magic UI**: Another pre-built component library offering elegant and interactive components for building responsive UIs quickly.
- **Firebase**: Used for:
    - **Firestore**: Real-time database management to store and synchronize tasks.
    - **Google Auth**: Authentication through Google accounts to secure access and data synchronization.
- **PWA (Progressive Web App)**: Enables the app to work offline and be installed on the user's device, providing a native-like experience.

## Installation and Usage

### Prerequisites
- **Node.js** installed on your machine (v16 or newer is recommended).
- A Google account for task synchronization via **Google Auth**.
- A **Firebase** project set up with **Firestore** and **Google Auth** enabled.

### Installation Steps

1. **Clone the repository**:
```bash
git clone https://github.com/Malcovys/To-Do-List-App-PWA.git
cd To-Do-List-App-PWA
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure Firebase**:
    - Create a project in Firebase.
    - Enable **Firestore** and **Google Auth** in the Firebase console.
    - Add your Firebase configuration to a `.env` file at the project root.
    - Example environment variables:
```env
VITE_FIRE_BASE_API_KEY=your-api-key
VITE_FIRE_BASE_AUTH_DOMAIN=your-auth-domain
VITE_FIRE_BASE_PROJECT_ID=your-project-id
VITE_FIRE_BASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIRE_BASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIRE_BASE_APP_ID=your-app-id
```

4. **Run the app in development mode**:
```bash
npm run dev
```

### Running the Production Build

To fully activate the PWA features (installation and offline mode), it is necessary to build and run the app in production mode.

1. **Generate a production build**:
```bash
npm run build
```

2. **Serve the build locally**:
```bash
npm run preview
```

3. **Check the PWA features**:
    - Open the app in a PWA-compatible browser (such as Chrome or Edge).
    - You should see an option to install the app (an icon in the address bar or an option in the menu).

### Important Note

PWA features, including the ability to install the app on your device and use offline mode, are only available after building the app in production mode. The development mode (`npm run dev`) does not support these features.

## Authors
- **Malcovys** - Lead developer and project author.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
