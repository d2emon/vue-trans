import {
  AutoIncrementField,
  StringField,
} from '../models';

export default {
  id: new AutoIncrementField(),
  locationName: new StringField(128),
  description: new StringField(128),
};
