import {
  TableInterface,
} from '../types';
import {
  AutoIncrementField,
  IntegerField,
  LookupField,
} from '../models';

const tbLocationsLookup = undefined;
const tbTransportLookup = undefined;

export const createTransportLinksDb = (locations: TableInterface) => ({
  id: new AutoIncrementField(),
  transportId: new IntegerField(),
  locationId: new IntegerField(),
  locationName: new LookupField(
    locations,
    'id',
    'locationName',
    'locationId',
    128,
  ),
});

export const createTransportLinksDbHere = (
  locations: TableInterface,
  transport: TableInterface,
) => ({
  id: new AutoIncrementField(),
  transportId: new IntegerField(),
  locationId: new IntegerField(),
  transCode: new LookupField(
    locations,
    'id',
    'transCode',
    'transportId',
    255,
  ),
  weight: new LookupField(
    transport,
    'id',
    'weight',
    'transportId',
  ),
});
