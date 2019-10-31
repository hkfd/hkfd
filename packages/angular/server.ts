import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { join } from 'path';
import { Client } from 'memjs';
import { config, requestHandler, errorHandler } from 'raven';

interface CacheResponse extends express.Response {
  sendResponse?: (body?: any) => express.Response;
}

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./server/main');

config(process.env.SENTRY_DSN, {
  environment: process.env.ENVIRONMENT
}).install();

enableProdMode();

const app = express();
const memCache = Client.create(process.env.MEMCACHIER_SERVERS);
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

app.use(requestHandler());
app.use(compression());
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [`'self'`],
      scriptSrc: [
        `'self'`,
        `'unsafe-inline'`,
        'https://www.google-analytics.com',
        'https://connect.facebook.net'
      ],
      styleSrc: [`'self'`, `'unsafe-inline'`],
      imgSrc: [
        `'self'`,
        'https://res.cloudinary.com',
        'https://*.prismic.io',
        'https://www.google-analytics.com',
        'https://www.google.com',
        'https://www.google.co.uk',
        'https://*.doubleclick.net',
        'https://www.facebook.com'
      ],
      connectSrc: [
        `'self'`,
        'https://*.hkfd.co.uk',
        'https://hkfd-api-staging.firebaseapp.com',
        'https://hkfd-email-staging.firebaseapp.com',
        'https://hkfd.cdn.prismic.io',
        'https://api.sendgrid.com',
        'https://sentry.io',
        'https://www.google-analytics.com',
        'https://*.doubleclick.net'
      ],
      frameSrc: ['https://www.youtube.com'],
      mediaSrc: ['https://res.cloudinary.com']
    }
  })
);

const cacheRequest: express.RequestHandler = (
  req,
  res: CacheResponse,
  next
) => {
  const CACHE_KEY = `__CACHE__${req.originalUrl || req.url}`;

  return memCache.get(CACHE_KEY, (_err, data) => {
    if (data) return res.send(data.toString());

    res.sendResponse = res.send;
    res.send = body => {
      memCache.set(CACHE_KEY, body, { expires: 60 * 60 }, next);
      return res.sendResponse ? res.sendResponse(body) : body;
    };

    return next();
  });
};

app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

app.get(
  '*.*',
  express.static(join(DIST_FOLDER, 'browser'), {
    maxAge: '1y'
  })
);
app.get('*', cacheRequest, (req, res) => res.render('index', { req }));

app.use(errorHandler());

const server = app.listen(PORT);

module.exports = server;
