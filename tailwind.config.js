import defaultTheme from "tailwindcss/defaultTheme"
import forms from "@tailwindcss/forms"
import shadcnConfig from "shadcn/ui/tailwind.config"

/** @type {import('tailwindcss').Config} */
export default {
  ...shadcnConfig,
  content: [
    ...shadcnConfig.content,
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    ...shadcnConfig.theme,
    extend: {
      ...shadcnConfig.theme.extend,
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        ...shadcnConfig.theme.extend.colors,
        primary: {
          ...shadcnConfig.theme.extend.colors.primary,
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },
    },
  },

  plugins: [...shadcnConfig.plugins, forms],
}
