// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// import { defineConfig } from 'vite';

// export default defineConfig({
//   // other configuration options
//   optimizeDeps: {
//     include: ['aws-sdk'], // Ensure aws-sdk is included in optimizeDeps
    
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@aws-sdk/client-lambda', '@aws-sdk/credential-provider-cognito-identity'],
  },
});
