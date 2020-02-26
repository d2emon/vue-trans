import { MutationTree } from 'vuex';
import { Location } from './types';

const mutations: MutationTree<Location> = {
  setName(state: Location, name: string) { state.name = name; },
  setLocation(state:Location, location: Location) {
    state.locationId = location.locationId;
    state.description = location.description;
    state.name = location.name;
  },
  setDescription(state: Location, description: string) { state.description = description; },
};

export default mutations;
