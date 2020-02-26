import { ActionTree } from 'vuex';
import { Link } from './types';
import { RootState } from '../../types';

const actions: ActionTree<Link, RootState> = {
  fetchLink: ({ commit }, linkId: number): Promise<any> => Promise
    .resolve({
      linkId,
      locationId: 0,
      connectId: 0,
      name: 'Name',
    })
    .then((link: Link) => commit('setLocation', location)),
};

export default actions;
