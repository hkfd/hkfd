import { emptyDir, outputJson } from 'fs-extra';

import { CASE_STUDIES } from './data/case-studies';
import { CLIENTS } from './data/clients';
import { SERVICES } from './data/services';
import { TEAM } from './data/team';

export * from './api';

const files = [
  { name: 'case-studies', data: CASE_STUDIES },
  { name: 'clients', data: CLIENTS },
  { name: 'services', data: SERVICES },
  { name: 'team', data: TEAM }
];

emptyDir('./dist')
  .then(_ =>
    files.forEach(file => outputJson(`./dist/${file.name}.json`, file.data))
  )
  .catch(console.error);
