export interface Component {}

// Session
export interface SessionInterface extends Component {
  active: boolean,
  name: string,
  open(): void,
  close(): void,
}

// Models
export interface DatabaseInterface extends Component {
  connected: boolean,
  name: string,
  driverName: string,
  params: {[s: string]: string},
  session: SessionInterface,
}

// Field
export interface FieldInterface {
  readOnly?: boolean,
  size?: number,
}

export interface LookupFieldInterface extends FieldInterface {
  lookupDataSet: TableInterface,
  lookupKeyFields: string,
  lookupResultField: string,
  keyFields: string,
  size?: number,
  lookup: boolean,
}

// Table
export interface TableInterface extends Component {
  database: DatabaseInterface,
  session: SessionInterface,
  indexFieldNames?: string,
  indexName?: string,
  masterFields?: string,
  masterSource?: DataSourceInterface,
  tableName: string,
  fields: { [s: string]: FieldInterface; },

  open(): void;
  get(id: number): { [s: string]: any } | undefined;
  all(): ({} | undefined)[];
}

// DataSource
export interface DataSourceInterface extends Component {
  dataSet: TableInterface,
}

// Main
export interface DataModule extends Component {
  oldCreateOrder: boolean,
  dataSources?: { [s: string]: DataSourceInterface },

  disconnect(): void,
}
