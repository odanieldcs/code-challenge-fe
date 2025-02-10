import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';
import path from 'path';

const vitestConfig = defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [path.resolve(__dirname, 'vitest.setup.ts')],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules',
        'dist',
        '**/*.d.ts',
        'src/types/**',
        '**/App.tsx',
        '**/main.tsx',
        '**/*.types.ts',
        '**/index.ts',
        '**/test/**',
        '**/*.spec.ts',
        '**/*.test.ts',
        'vite.config.ts',
        'vitest.config.ts',
      ],
    },
  },
});

export default mergeConfig(viteConfig, vitestConfig);
