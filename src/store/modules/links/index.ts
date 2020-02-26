import { Module } from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { Link } from './types';
import { RootState } from '../../types';

// Link
/*
  object tbLinks: TTable
    DatabaseName = 'Trans'
    SessionName = 'Trans'
    IndexName = 'Location'
    MasterFields = 'Id'
    MasterSource = dsLocations
    TableName = 'links.db'
    Left = 16
    Top = 104
    object tbLinksId: TAutoIncField
      FieldName = 'Id'
      ReadOnly = True
    end
    object tbLinksLocationId: TIntegerField
      FieldName = 'LocationId'
    end
    object tbLinksConnectId: TIntegerField
      FieldName = 'ConnectId'
    end
    object tbLinksConnectName: TStringField
      FieldKind = fkLookup
      FieldName = 'ConnectName'
      LookupDataSet = tbLocationsLookup
      LookupKeyFields = 'Id'
      LookupResultField = 'LocationName'
      KeyFields = 'ConnectId'
      Size = 255
      Lookup = True
    end
  end
  object dsLinks: TDataSource
    DataSet = tbLinks
    Left = 80
    Top = 104
  end
 */

export const state: Link = {
  linkId: 0,
  locationId: 0,
  connectId: 0,
  name: 'Name',
};

const namespaced: boolean = true;

const module: Module<Link, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default module;
