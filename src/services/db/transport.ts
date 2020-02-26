import {
  AutoIncrementField,
  IntegerField,
  StringField,
} from '../models';

export default {
  id: new AutoIncrementField(),
  transCode: new StringField(5),
  weight: new IntegerField(),
};
