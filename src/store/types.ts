export interface RootState {

}

export interface Session {
  active: boolean,
  sessionName: string,
}

export interface Database {
  connected: boolean,
  databaseName: string,
  driverName: string,
  params: {},
  sessionName: string,
}

export interface Table {
  databaseName: string,
  sessionName: string,
  tableName: string,
  masterFields?: string,
  masterSource?: Table,
  indexFieldNames?: string,
  indexName?: string,
}

interface AutoIncField {
  fieldName: string,
  readOnly: boolean,
}

interface StringField {
  fieldName: string,
  size: number,
  fieldKind?: any,
  lookupDataSet?: Table,
  lookupKeyFields?: string,
  lookupResultField?: string,
  keyFields?: string,
  lookup?: boolean,
}

interface IntegerField {
  fieldName: string,
  size: number,
}

export interface Locations extends Table {
  id: AutoIncField,
  locationName: StringField,
  description: StringField,
}

export interface Links extends Table {
  id: AutoIncField,
  locationId: IntegerField,
  connectId: IntegerField,
  connectName: StringField,
}

export interface LocationsLookup extends Table {
  id: AutoIncField,
  locationName: StringField,
  description: StringField,
}

export interface Transport extends Table {
  id: AutoIncField,
  transCode: StringField,
  weight: IntegerField,
}

export interface TransportLinks extends Table {
  id: AutoIncField,
  transportId: IntegerField,
  locationId: IntegerField,
  locationName: StringField,
}

export interface TransportHere extends Table {
  id: AutoIncField,
  transportId: IntegerField,
  locationId: IntegerField,
  transCode: StringField,
  weight: IntegerField,
}

export interface TransportLookup extends Table {
  id: AutoIncField,
  transCode: StringField,
  weight: IntegerField,
}

export interface DataModule {
  session: Session,
  database: Database,
  locations: Locations,
  links: Links,
  locationsLookup: LocationsLookup,
  transport: Transport,
  transportLinks: TransportLinks,
  transportHere: TransportHere,
  transportLookup: TransportLookup,
}
