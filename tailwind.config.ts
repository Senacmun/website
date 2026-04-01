import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
		colors: {
			'blue-custom': 'var(--blue-custom)',
			'yellow-custom': '#F39322',
			'light-blue-custom': '#005281',
			'blue-light': '#60A5FA',
			'soft-white': '#E5E7EB',
			'dark-blue': '#022c43'
		},
  		screens: {
  			'2sm': '770px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
	plugins: [
		require("tailwindcss-animate"),
		// keep text-shadow utilities available but do not apply globally; used only for SenaMUN V via drop-shadow utility
	],
};
export default config;
