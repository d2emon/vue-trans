import { Module } from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { Location } from './types';
import { RootState } from '../../types';

// Location
/*
  object tbLocations: TTable
    DatabaseName = 'Trans'
    SessionName = 'Trans'
    TableName = 'locations.db'
    Left = 16
    Top = 56
    object tbLocationsId: TAutoIncField
      FieldName = 'Id'
      ReadOnly = True
    end
    object tbLocationsLocationName: TStringField
      FieldName = 'LocationName'
      Size = 128
    end
    object tbLocationsDescription: TStringField
      FieldName = 'Description'
      Size = 128
    end
  end
  object dsLocations: TDataSource
    DataSet = tbLocations
    Left = 80
    Top = 56
  end
 */

export const state: Location = {
  locationId: 0,
  name: 'Name',
  description: 'Description',
};

const namespaced: boolean = true;

const module: Module<Location, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default module;
