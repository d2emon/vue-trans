import { Module } from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import {
  LocationState,
} from './types';
import { RootState } from '../../types';
import locations from './data';
import transport from './data/transport';

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

export const state: LocationState = {
  // locationId: 0,
  // name: 'Name',
  // description: 'Description',
  loading: false,
  location: undefined,
  locations,
  filtered: [],
  transport,
  currentTransport: [],
};

const module: Module<LocationState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default module;
