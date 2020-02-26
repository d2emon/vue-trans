import { MutationTree } from 'vuex';
import { Link } from './types';
import { Location } from '../locations/types';

const mutations: MutationTree<Link> = {
  setName(state: Link, name: string) { state.name = name; },
  /*
  setLocation(state:Location, location: Location) {
    state.locationId = location.locationId;
    state.description = location.description;
    state.name = location.name;
  },
  setDescription(state: Location, description: string) { state.description = description; },
   */
};

export default mutations;
