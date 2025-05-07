import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'http://localhost:5076/openapi/v1.json',
  output: 'src/api/gen/',
  plugins: ['@hey-api/client-fetch']
});
