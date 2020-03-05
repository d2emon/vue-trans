import { Module } from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { LocationState } from './types';
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

export const state: LocationState = {
  // locationId: 0,
  // name: 'Name',
  // description: 'Description',
  loading: false,
  location: undefined,
  locations: [
    {
      locationId: 1,
      locationName: 'Локация 1',
      description: 'description',
      linkIds: [2],
    },
    {
      locationId: 2,
      locationName: 'Локация 2',
      description: 'description',
      linkIds: [1, 3],
    },
    {
      locationId: 3,
      locationName: 'Локация 3',
      description: 'description',
      linkIds: [2, 4],
    },
    {
      locationId: 4,
      locationName: 'Локация 4',
      description: 'description',
      linkIds: [3],
    },
  ],
  filtered: [],
};

const namespaced: boolean = true;

const module: Module<LocationState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default module;
