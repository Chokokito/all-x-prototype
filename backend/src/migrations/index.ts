import * as migration_20261124_123523_initial from './20261124_123523_initial';
import * as migration_20261124_194155_contact_requests from './20261124_194155_contact_requests';
import * as migration_20261125_120818_doc_feedback from './20261125_120818_doc_feedback';
import * as migration_20261125_125951_user_avatar from './20261125_125951_user_avatar';

export const migrations = [
  {
    up: migration_20261124_123523_initial.up,
    down: migration_20261124_123523_initial.down,
    name: '20261124_123523_initial',
  },
  {
    up: migration_20261124_194155_contact_requests.up,
    down: migration_20261124_194155_contact_requests.down,
    name: '20261124_194155_contact_requests',
  },
  {
    up: migration_20261125_120818_doc_feedback.up,
    down: migration_20261125_120818_doc_feedback.down,
    name: '20261125_120818_doc_feedback',
  },
  {
    up: migration_20261125_125951_user_avatar.up,
    down: migration_20261125_125951_user_avatar.down,
    name: '20261125_125951_user_avatar'
  },
];
