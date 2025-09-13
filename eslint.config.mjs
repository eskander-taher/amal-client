import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		plugins: {
			"unused-imports": unusedImports,
		},
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			
			// TODO: Re-enable these rules after development phase is complete
			// Temporarily disabled for development convenience
			"no-unused-vars": "off", // TODO: Enable later for production
			"@typescript-eslint/no-unused-vars": "off", // TODO: Enable later for production
			"@next/next/no-img-element": "off", // TODO: Enable later and replace with next/image
			"unused-imports/no-unused-imports": "off", // TODO: Enable later for production
			"unused-imports/no-unused-vars": "off", // TODO: Enable later for production
			"jsx-a11y/alt-text": "off", // TODO: Enable later and add proper alt texts for accessibility
			"react/no-unescaped-entities": "off", // TODO: Enable later and escape HTML entities properly
			
			// Keep these commented out for reference when re-enabling:
			// "unused-imports/no-unused-imports": "error",
			// "unused-imports/no-unused-vars": [
			// 	"warn",
			// 	{
			// 		vars: "all",
			// 		varsIgnorePattern: "^_",
			// 		args: "after-used",
			// 		argsIgnorePattern: "^_",
			// 	},
			// ],
		},
	},
];

export default eslintConfig;
