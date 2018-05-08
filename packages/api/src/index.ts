import { emptyDir, outputJson } from 'fs-extra';

import { Careers } from './data/careers';
import { CaseStudies } from './data/case-studies';
import { Clients } from './data/clients';
import { Services } from './data/services';
import { Team } from './data/team';

const files = [
  { name: 'careers', data: Careers },
  { name: 'case-studies', data: CaseStudies },
  { name: 'clients', data: Clients },
  { name: 'services', data: Services },
  { name: 'team', data: Team }
];

emptyDir('./dist')
  .then(_ =>
    files.forEach(file => outputJson(`./dist/${file.name}.json`, file.data))
  )
  .catch(console.error);
