# Pulsopus APP
React + TypeScript + Vite + SWC

## Environment vars
This project uses the following environment variables:

| Name        | Description                 | Default Value |
|-------------|-----------------------------|---------------|
| CLIENT_URL  | link to pulsopus client     | *             |
| APP_URL     | link to pulsopus app        | *             |
| API_URL     | link to pulsopus api        | *             |

#### Technologies
`react + typescript`, `material`, `mobx`, `d3`

```sh
pulsopus-app
├── dist/   # Output folder from build
├── node_modules/   # Library root
├── public/
├── src/
│   ├── api/        # API-related files
│   ├── assets/     # Static assets (images, fonts, etc.)
│   ├── components/ # React components
│   ├── config/     # Configuration file
│   ├── constants/  # Application constants
│   ├── contexts/   # React contexts for state management
│   ├── entities/   # Data entities and models
│   ├── helpers/    # Utility functions and helpers
│   ├── hooks/      # Custom React hooks
│   ├── icons/      # Icon components
│   ├── interfaces/ # TypeScript interfaces
│   ├── models/     # Data models
│   ├── modules/    # Application modules
│   ├── root/       # Root components and application entry point
│   ├── routes/     # Route definitions
│   ├── stores/     # State management stores
│   ├── theme/      # Theme and styling
│   ├── utils/      # Utility functions
│   ├── .eslintrc.cjs # ESLint configuration
│   ├── main.tsx    # Main application entry file
│   ├── vite-env.d.ts # TypeScript environment definitions for Vite
├── .env        # Environment variables
├── .eslintc.cjs    # ESLint configuration
├── .gitignore      # Git ignore file
├── docker-compose.yaml # Docker Compose configuration
├── Dockerfile      # Docker configuration file
├── index.html      # HTML entry point
├── nginx.conf      # Nginx configuration file
├── package.json    # NPM package configuration
├── README.md       # Project documentation
├── tsconfig.json   # TypeScript configuration
├── tsconfig.node.json # TypeScript node configuration
├── vite.config.ts  # Vite configuration
├── yarn.lock       # Yarn lock file
```

### Installation
```sh
$ yarn install
```

### Running the app
#### dev
```sh
$ yarn dev
```

#### prod
```sh
$ docker-compose up -d --build
```

### see more script [here](./package.json)