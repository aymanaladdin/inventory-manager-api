import express from 'express';
import { loadApp, startApp } from './loader';

try {
  const app = express();

  loadApp({ app });
  startApp({ app });
}

catch (err) {
  console.log('Failed to start:', err);
}