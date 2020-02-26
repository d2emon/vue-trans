import {
  Database,
  Session,
} from './models';

export default new Database(
  'Trans',
  new Session('Trans'),
);
