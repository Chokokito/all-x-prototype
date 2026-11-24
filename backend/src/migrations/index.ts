import * as migration_20261124_123523_initial from './20261124_123523_initial';

export const migrations = [
  {
    up: migration_20261124_123523_initial.up,
    down: migration_20261124_123523_initial.down,
    name: '20261124_123523_initial'
  },
];
