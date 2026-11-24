import * as migration_20261124_123523_initial from './20261124_123523_initial';
import * as migration_20261124_194155_contact_requests from './20261124_194155_contact_requests';

export const migrations = [
  {
    up: migration_20261124_123523_initial.up,
    down: migration_20261124_123523_initial.down,
    name: '20261124_123523_initial',
  },
  {
    up: migration_20261124_194155_contact_requests.up,
    down: migration_20261124_194155_contact_requests.down,
    name: '20261124_194155_contact_requests'
  },
];
