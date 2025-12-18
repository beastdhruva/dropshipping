import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath as fToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import bootstrap from './src/main.server';
// @ts-ignore
import apiRoutes from './api/routes';
import fs from 'fs';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  // Create uploads directory if it doesn't exist
  const uploadsDir = join(serverDistFolder, '../uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Body parser middleware
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // Serve uploads folder
  server.use('/uploads', express.static(uploadsDir));

  // API routes
  server.use('/api', apiRoutes);

  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = parseInt(process.env['PORT'] || '8000', 10);

  // Start up the Node server
  const server = app();
  server.listen(port, '0.0.0.0', () => {
    console.log(`Node Express server listening on http://0.0.0.0:${port}`);
  });
}

run();
