import {
  Table,
  DetailTable,
  Field,
  AutoIncrementField,
  IntegerField,
  LookupField,
  StringField,
} from '../models';
import {
  DatabaseInterface,
  TableInterface,
  DataSourceInterface,
} from '../types';
import data from './data/links';

export const name = 'links.db';

export const fields = (locationsLookup: TableInterface): {[s:string]: Field} => ({
  locationId: new IntegerField(),
  connectId: new IntegerField(),
  connectName: new LookupField(
    locationsLookup,
    'id',
    'locationName',
    'connectId',
    255,
  ),
});

class Links extends DetailTable {
  connectName: (id: number) => {};

  constructor(
    database: DatabaseInterface,
    locations: DataSourceInterface,
    locationsLookup: TableInterface,
  ) {
    super(
      database,
      'Location',
      'id',
      locations,
      'links.db',
      fields(locationsLookup),
    );

    this.ids = Object.keys(data).map(Number);
    this.connectName = this.lookup(
      locationsLookup,
      'locationName',
    );
  }

  get = (id: number): {} => ({
    connectId: data[id].connectId,
    connectName: this.connectName(data[id].connectId),
    locationId: data[id].locationId,
  });
}

export default links;
