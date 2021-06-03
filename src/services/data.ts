import {
  DataModule,
} from './types';
import {
  DataSource,
} from './models';
import database from './database';
import * as linksDb from './db/links';
import locationsDb from './db/locations';
import transportDb from './db/transport';
import {
  createTransportLinksDb,
  createTransportLinksDbHere,
} from './db/transportLinks';

// Tables
const tbLocationsLookup = database.addTable(
  'locationName',
  'locations.db',
  locationsDb,
);

const tbTransportLookup = database.addTable(
  'weight',
  'transport.db',
  transportDb,
);

// Data sources
const transport = new DataSource(
  database.addTable(
    'weight',
    'transport.db',
    transportDb,
  ),
);

const locations = new DataSource(
  database.addTable(
    undefined,
    'locations.db',
    locationsDb,
  ),
);

// Main
class DmData implements DataModule {
  oldCreateOrder = false;

  tables = {
    locations: locations.dataSet,
    locationsLookup: tbLocationsLookup,
    transport: transport.dataSet,
    transportHere: transport.dataSet,
    transportLookup: tbLocationsLookup,
  };

  dataSources = {
    links: new DataSource(
      database.addDetailTable(
        'Location',
        'id',
        locations,
        linksDb.name,
        linksDb.fields(tbLocationsLookup),
        // linksDb.data,
        // (id: number) => undefined,
      ),
    ),
    locations,
    transportHere: new DataSource(
      database.addDetailTable(
        'Location',
        'id',
        locations,
        'transportlinks.db',
        createTransportLinksDbHere(
          locations.dataSet,
          transport.dataSet,
        ),
      ),
    ),
    transportLinks: new DataSource(
      database.addDetailTable(
        'Transport',
        'id',
        transport,
        'transportlinks.db',
        createTransportLinksDb(locations.dataSet),
      ),
    ),
  };

  // Components
  session = database.session;

  database = database;

  constructor() {
    this.session.open();
    this.database.open();
    this.dataSources.locations.dataSet.open();
    tbLocationsLookup.open();
    this.dataSources.links.dataSet.open();
    transport.dataSet.open();
    tbTransportLookup.open();
    this.dataSources.transportLinks.dataSet.open();
    this.dataSources.transportHere.dataSet.open();
  }

  disconnect() {
    this.session.close();
  }
}

export default DmData;
