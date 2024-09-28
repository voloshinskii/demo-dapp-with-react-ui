import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig({
  plugins: [
    react(),
  ],
  define: {
    global: {},
  },
  resolve: {
    alias: {
      // This is required by "buffer" package to work properly
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser global polyfill
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    outDir: 'docs',
    rollupOptions: {
      plugins: [
        inject({
          // Automatically insert import for buffer where it's used
          modules: { Buffer: ['buffer', 'Buffer'] },
        }),
      ],
    },
  },
  // @ts-ignore
  base: process.env.GH_PAGES ? '/demo-dapp-with-react-ui/' : './',
  server: {
    watch: {
      usePolling: true,
    },
    fs: {
      allow: ['../sdk', './'],
    },
  },
});
