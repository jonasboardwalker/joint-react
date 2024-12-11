# React Vite Kit

A highly customizable React template built with Vite, TypeScript, Tailwind CSS, ESLint, and Prettier. This template is designed for rapid development and enforces strict code quality standards, including rules for TypeScript, React, Tailwind CSS, and Prettier formatting.

## Features

- **Vite**: Fast and efficient development environment for quick builds and optimized production code.
- **React with TypeScript**: Scalable and maintainable React code with type safety provided by TypeScript.
- **Tailwind CSS**: Utility-first CSS framework for quickly building responsive, styled UIs.
- **ESLint**: Configured with TypeScript, React, Tailwind CSS, and import sorting plugins to ensure clean and consistent code.
- **Prettier**: Integrated for code formatting, keeping code visually clean and consistent.
- **Import Sorting**: Automatic import sorting using `simple-import-sort` plugin.
- **No Default Exports**: Enforces named exports to ensure consistent import patterns across the codebase.

## Quick Start

Clone this template with `npx degit` and install dependencies to get started:

```bash
npx degit jonasboardwalker/react-vite-kit my-new-app
cd my-new-app
yarn install
```

To start the development server:

```bash
yarn dev
```

This will launch the app on `http://localhost:5173`, where you can see live changes as you develop.

## Installation

### 1. Clone the Repository

To use this template as a base for your project, clone it using `npx degit`:

```bash
npx degit jonasboardwalker/react-vite-kit my-new-app
```

### 2. Navigate to the Project Directory and Install Dependencies

```bash
cd my-new-app
yarn install
```

### 3. Running the Development Server

Start the development server with:

```bash
yarn dev
```

This command runs the app on `http://localhost:5173` with hot-reloading for instant feedback.

### 4. Additional Scripts

- **`yarn build`**: Builds the app for production.
- **`yarn preview`**: Previews the production build.
- **`yarn lint`**: Runs ESLint to check for issues in the codebase.

## Project Structure

The basic project structure includes:

```plaintext
my-new-app/
├── src/
│ ├── app.tsx # Main App component
│ ├── index.css # Global styles
│ ├── main.tsx # Entry point for React
│ └── vite-env.d.ts # Vite environment variables
├── public/ # Static assets
│ └── vite.svg
├── .vscode/
│ └── settings.json # VS Code-specific settings for consistent formatting and linting
├── .gitignore
├── .prettierrc.json # Prettier configuration
├── eslint.config.js # ESLint configuration
├── index.html # Main HTML file
├── package.json # Project metadata and dependencies
├── postcss.config.js # PostCSS configuration for Tailwind
├── README.md # Project documentation
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.app.json # TypeScript configuration for the application
├── tsconfig.json # Base TypeScript configuration
├── tsconfig.node.json # TypeScript configuration for Node.js
├── vite.config.ts # Vite configuration
└── yarn.lock
```

## ESLint and Prettier Configuration

This project has extensive ESLint rules and Prettier integration to ensure code quality and consistency. Here are some key configuration highlights:

- **Disallow Default Exports**: Enforces named exports only (`import/no-default-export`) to promote consistent import patterns.
- **React Rules**: Includes rules for React hooks and JSX best practices.
- **TypeScript Rules**: Configures ESLint to work with TypeScript for strong type checking.
- **Tailwind CSS**: Includes `eslint-plugin-tailwindcss` to enforce Tailwind best practices and class sorting.
- **Import Sorting**: Uses `simple-import-sort` to automatically sort imports alphabetically.
- **Prettier**: Integrated with ESLint for consistent code formatting on save.

### Custom ESLint Rules in `eslint.config.js`

Key rules in the ESLint configuration:

- **`no-console`**: Warnings for console statements.
- **`@typescript-eslint/no-unused-vars`**: Warnings for unused variables.
- **`react-hooks/rules-of-hooks`**: Enforces React hook rules.
- **`react-hooks/exhaustive-deps`**: Ensures correct dependency arrays in React hooks.
- **`tailwindcss/classnames-order`**: Ensures Tailwind classes are ordered consistently.
- **`prettier/prettier`**: Applies Prettier formatting as part of ESLint checks.

### VS Code Integration

For the best experience, use Visual Studio Code with the following settings:

1. Create a `.vscode/settings.json` file with:

   ```json
   {
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": "explicit"
     },
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "eslint.enable": true,
     "eslint.run": "onType",
     "eslint.validate": [
       "javascript",
       "javascriptreact",
       "typescript",
       "typescriptreact"
     ]
   }
   ```

2. Recommended Extensions:
   - **ESLint**: For inline linting feedback.
   - **Prettier - Code Formatter**: For code formatting.
   - **Tailwind CSS IntelliSense**: Provides autocompletion and syntax highlighting for Tailwind CSS.

## Tailwind CSS Setup

The project includes Tailwind CSS configured with PostCSS. Tailwind’s utility classes are available in all components.

To extend the Tailwind configuration, modify `tailwind.config.js`:

```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Troubleshooting

If you encounter issues with ESLint not showing inline warnings or not applying rules correctly:

1. **Restart the ESLint Server**: `Cmd+Shift+P` (or `Ctrl+Shift+P` on Windows) > **ESLint: Restart ESLint Server**
2. **Ensure VS Code Settings Are Configured Correctly** (see above).
3. **Run ESLint Manually**: Run `yarn lint` in the terminal to verify ESLint works from the command line.

## Contributing

Feel free to fork this template and modify it as needed for your projects. Contributions are welcome to improve or expand this template.

---

This `README.md` provides clear guidance on setup, usage, and key features of your template. Let me know if there’s anything specific you’d like to add or clarify!
