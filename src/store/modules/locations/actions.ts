import { ActionTree } from 'vuex';
import { Location } from './types';
import { RootState } from '../../types';

const actions: ActionTree<Location, RootState> = {
  fetchLocation: ({ commit }, locationId: number): Promise<any> => Promise
    .resolve({
      locationId,
      name: 'Name',
      description: 'Desription',
    })
    .then((location: Location) => commit('setLocation', location)),
};

export default actions;
