# Heckford Angular

[![CircleCI](https://circleci.com/bb/heckford/heckford-angular.svg?style=svg&circle-token=e02291a7d209b31a48a0ba16ca8b2da4a7226160)](https://circleci.com/bb/heckford/heckford-angular)

## Usage

Run `yarn serve` for a dev server. Navigate to `http://localhost:4200/`. Use the `-prod` flag for a production build.

## Updating

### Angular CLI

Global:

```
yarn global remove @angular/cli
yarn cache clean
yarn global add @angular/cli@latest
```

Local:

```
rm -rf node_modules dist
yarn add --dev @angular/cli@latest
yarn
```

### Angular

Run `ng update`

## Testing

### Unit Tests

Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## E2E Tests

Run `yarn e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
