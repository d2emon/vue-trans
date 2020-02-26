import {
  DatabaseInterface,
  SessionInterface,
  TableInterface,
  FieldInterface,
  DataSourceInterface,
  LookupFieldInterface,
} from './types';

export class Session implements SessionInterface {
  name: string;

  active = true;

  constructor(
    name: string = 'Trans',
  ) {
    this.name = name;
  }

  open() {
    this.active = true;
  }

  close() {
    this.active = false;
  }
}

export class Table implements TableInterface {
  active: boolean;

  database: DatabaseInterface;

  session: SessionInterface;

  indexFieldNames: string | undefined;

  tableName: string;

  fields: {};

  ids = [1];

  constructor(
    database: DatabaseInterface,
    indexFieldNames: string | undefined,
    tableName: string,
    fields: { [s:string]: FieldInterface },
  ) {
    this.active = false;

    this.database = database;
    this.session = database.session;
    this.indexFieldNames = indexFieldNames;
    this.tableName = tableName;
    this.fields = fields;
  }

  open(): void {
    this.active = true;
  }

  get(id: number): {} | undefined {
    return (this.ids.indexOf(id) >= 0) ? {} : undefined;
  }

  all(): ({} | undefined)[] {
    return this.ids.map(this.get);
  }

  lookup = (
    table: TableInterface,
    resultField: string,
  ) => (id: number): any => {
    const row = table.get(id);
    if (row === undefined) return null;
    const rowData: {[s: string]: any} = row;
    return row[resultField];
  }
}

export class DetailTable extends Table {
  indexFieldNames: string | undefined;

  indexName: string | undefined;

  masterFields: string | undefined;

  masterSource: DataSource | undefined;

  constructor(
    database: DatabaseInterface,
    indexName: string | undefined,
    masterFields: string | undefined,
    masterSource: DataSource | undefined,
    tableName: string,
    fields: { [s:string]: FieldInterface },
  ) {
    super(
      database,
      undefined,
      tableName,
      fields,
    );
    this.indexName = indexName;
    this.masterFields = masterFields;
    this.masterSource = masterSource;
  }
}

export class DataSource implements DataSourceInterface {
  dataSet: TableInterface;

  constructor(dataSet: TableInterface) {
    this.dataSet = dataSet;
  }
}

export class Database implements DatabaseInterface {
  name: string;

  tables: [TableInterface?];

  session: SessionInterface;

  connected = true;

  driverName = 'STANDARD';

  params = {
    path: 'DB',
    defaultDriver: 'PARADOX',
  };

  constructor(
    name: string = 'Trans',
    session: SessionInterface,
  ) {
    this.name = name;
    this.session = session;
    this.tables = [];
  }

  open() {
    this.connected = true;
  }

  addTable(
    indexFieldNames: string | undefined,
    tableName: string,
    fields: { [s:string]: FieldInterface },
    // ids: number[],
    // get: (id: number) => {},
  ): TableInterface {
    const table = new Table(
      this,
      indexFieldNames,
      tableName,
      fields,
      // ids,
      // get,
    );
    this.tables.push(table);
    return table;
  }

  addDetailTable(
    indexName: string | undefined,
    masterFields: string | undefined,
    masterSource: DataSource | undefined,
    tableName: string,
    fields: { [s:string]: FieldInterface },
    // ids: number[],
    // get: (id: number) => {},
  ): TableInterface {
    const table = new DetailTable(
      this,
      indexName,
      masterFields,
      masterSource,
      tableName,
      fields,
      // ids,
      // get,
    );
    this.tables.push(table);
    return table;
  }
}

export class Field implements FieldInterface {
  readOnly = false;
}

export class AutoIncrementField extends Field {
  readOnly = true;
}

export class IntegerField extends Field {}

export class StringField extends Field {
  size: number | undefined;

  constructor(
    size: number | undefined,
  ) {
    super();
    this.size = size;
  }
}

export class LookupField extends StringField implements LookupFieldInterface {
  keyFields: string;

  lookup: boolean;

  lookupDataSet: TableInterface;

  lookupKeyFields: string;

  lookupResultField: string;

  constructor(
    lookupDataSet: TableInterface,
    lookupKeyFields: string,
    lookupResultField: string,
    keyFields: string,
    size?: number | undefined,
  ) {
    super(size);
    this.lookup = true;
    this.lookupDataSet = lookupDataSet;
    this.lookupKeyFields = lookupKeyFields;
    this.lookupResultField = lookupResultField;
    this.keyFields = keyFields;
  }
}
