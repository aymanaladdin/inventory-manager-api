import express from 'express';
import { loadApp, startApp } from './loader';

async function main() {
  const app = express();

  await loadApp({ app });
  startApp({ app });
}

main().catch(err => {
  console.log('Failed to start:', err);
  process.exit(1);
});