import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { join } from 'path';
import { config, requestHandler, errorHandler } from 'raven';

const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require('./dist/server/main');

config(process.env.SENTRY_DSN, {
  environment: process.env.ENVIRONMENT
}).install();

enableProdMode();

const app = express();
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

app.use(requestHandler());
app.use(compression());
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        'https://www.google-analytics.com',
        'https://connect.facebook.net'
      ],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: [
        "'self'",
        'https://res.cloudinary.com',
        'https://hkfd.cdn.prismic.io',
        'https://www.google-analytics.com',
        'https://www.google.com',
        'https://www.google.co.uk',
        'https://*.doubleclick.net',
        'https://www.facebook.com'
      ],
      connectSrc: [
        "'self'",
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

app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));
app.get('*', (req, res) => res.render('index', { req }));

app.use(errorHandler());

app.listen(PORT);
