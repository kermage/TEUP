import { defineConfig, type LibraryOptions } from 'vite';
import dts from 'vite-plugin-dts';

const forBrowser = process.env.BROWSER ? true : false;
const emptyOutDir = !forBrowser;
const minify = forBrowser;
const lib: LibraryOptions = {
	entry: [forBrowser ? 'src/builds/browser.ts' : 'src/builds/module.ts'],
	formats: [forBrowser ? 'umd' : 'es'],
	name: 'TEUP',
	fileName: (_, name) => `${name}.js`,
};
const plugins = forBrowser ? [] : [dts({ rollupTypes: true })];
const config = process.env.STATIC
	? {
			base: process.env.BASE_URL || '/',
			build: { emptyOutDir },
		}
	: {
			build: {
				lib,
				emptyOutDir,
				minify,
			},
			plugins,
		};

// https://vitejs.dev/config/
export default defineConfig(config);
