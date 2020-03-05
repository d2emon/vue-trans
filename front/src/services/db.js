// var mongoose = require('mongoose')

// var mongoUri = 'mongodb://localhost/trans'

class Db {
  /*
  mongoose.connect(mongoUri, {
    useMongoClient: true
  })
  var db = mongoose.connection

  db.on('error', function (err) {
    alert('connection error:' + err.message)
  })
  db.once('open', function callback () {
    // alert('Connected to DB!')
  })
  return db
   */
}

const db = new Db();

// var Schema = mongoose.Schema

// Schemas
class locationModel {
  title = {type: 'String', required: true};
  description = 'String';
  getLinks = () => linkModel.find({
    /* { $or: [
      { 'fromLocation._id': this.id },
      { 'toLocation._id': this.id }
    ]} */
  }),
  fromHere = (location) => location && linkModel.find({})
    .then(() => {
      if (!this.fromLocation) return false;
      return (location.id === this.fromLocation.id)
    })
}

class linkModel {
  fromLocation = locationModel;
  toLocation = locationModel;
}

class transportModel {
  title = 'String'
  weight = 'Number'
  // IndexFieldNames = 'Weight'
  locations = [locationModel]
}

/*
  object dsLocations: TDataSource
    DataSet = tbLocations
  end

  object tbLinks: TTable
    IndexName = 'Location'
    MasterFields = 'Id'
    MasterSource = dsLocations
    TableName = 'links.db'
    object tbLinksConnectName: TStringField
      FieldKind = fkLookup
      FieldName = 'ConnectName'
      LookupDataSet = tbLocationsLookup
      LookupKeyFields = 'Id'
      LookupResultField = 'LocationName'
      KeyFields = 'ConnectId'
    end
  end

  object dsLinks: TDataSource
    DataSet = tbLinks
  end

  object dsTransport: TDataSource
    DataSet = tbTransport
  end

  object tbTransportLinks: TTable
    IndexName = 'Transport'
    MasterFields = 'Id'
    MasterSource = dsTransport
    TableName = 'transportlinks.db'
    object tbTransportLinksId: TAutoIncField
      FieldName = 'Id'
      ReadOnly = True
    end
    object tbTransportLinksTransportId: TIntegerField
      FieldName = 'TransportId'
    end
    object tbTransportLinksLocationId: TIntegerField
      FieldName = 'LocationId'
    end
    object tbTransportLinksLocationName: TStringField
      FieldKind = fkLookup
      FieldName = 'LocationName'
      LookupDataSet = tbLocationsLookup
      LookupKeyFields = 'Id'
      LookupResultField = 'LocationName'
      KeyFields = 'LocationId'
      Lookup = True
    end
  end

  object dsTransportLinks: TDataSource
    DataSet = tbTransportLinks
  end

  object tbTransportHere: TTable
    IndexName = 'Location'
    MasterFields = 'Id'
    MasterSource = dsLocations
    TableName = 'transportlinks.DB'
    object tbTransportHereId: TAutoIncField
      FieldName = 'Id'
      ReadOnly = True
    end
    object tbTransportHereTransportId: TIntegerField
      FieldName = 'TransportId'
      Required = True
    end
    object tbTransportHereLocationId: TIntegerField
      FieldName = 'LocationId'
      Required = True
    end
    object tbTransportHereTransCode: TStringField
      FieldKind = fkLookup
      FieldName = 'TransCode'
      LookupDataSet = tbTransportLookup
      LookupKeyFields = 'Id'
      LookupResultField = 'TransCode'
      KeyFields = 'TransportId'
      Size = 32
      Lookup = True
    end
    object tbTransportHereWeight: TIntegerField
      FieldKind = fkLookup
      FieldName = 'Weight'
      LookupDataSet = tbTransportLookup
      LookupKeyFields = 'Id'
      LookupResultField = 'Weight'
      KeyFields = 'TransportId'
      Lookup = True
    end
  end

  object tbTransportLookup: TTable
    IndexFieldNames = 'Weight'
    TableName = 'transport.db'
    object tbTransportLookupId: TAutoIncField
      FieldName = 'Id'
      ReadOnly = True
    end
    object tbTransportLookupTransCode: TStringField
      FieldName = 'TransCode'
      Size = 5
    end
    object tbTransportLookupWeight: TIntegerField
      FieldName = 'Weight'
    end
  end

  object dsTransportHere: TDataSource
    DataSet = tbTransportHere
  end
 */

// validation
// Article.path('title').validate(function (v) {
//   return v.length > 5 && v.length < 70;
// });

export default {
  database: db,
  locationModel,
  linkModel,
  transportModel,
}
