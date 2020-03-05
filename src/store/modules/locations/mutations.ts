import Vue from 'vue';
import { MutationTree } from 'vuex';
import { Location, LocationState } from './types';

const mutations: MutationTree<LocationState> = {
  /*
  setName(state: Location, name: string) { state.name = name; },
  setLocation(state:Location, location: Location) {
    state.locationId = location.locationId;
    state.description = location.description;
    state.name = location.name;
  },
  setDescription(state: Location, description: string) { state.description = description; },
   */
  setLoading: (state: LocationState, value: boolean) => Vue.set(
    state,
    'loading',
    value,
  ),
  selectLocation: (state: LocationState, value: Location) => Vue.set(
    state,
    'location',
    value,
  ),
  setLocation: (state: LocationState, value: Location) => {
    const {
      locationId,
    } = value;
    const location = state.locations.find(item => (item.locationId === locationId));
    if (location) {
      Vue.set(
        state.locations,
        state.locations.indexOf(location),
        {
          ...location,
          ...value,
        },
      );
    }
  },
  filterLocations: (state: LocationState, value: string) => Vue.set(
    state,
    'filtered',
    state.locations.filter((location: Location) => {
      const search = value.toLowerCase();
      return search
        ? (location.locationName || '').toLowerCase().indexOf(search) > -1
        : true;
    }),
  ),
};

export default mutations;
