import { ActionTree } from 'vuex';
import { Location, LocationState } from './types';
import { RootState } from '../../types';

const findLocation = (locationId: number, locations: Location[]): Location | undefined => locations
  .find(item => item.locationId === locationId);
const injectLink = (locationId: number, locations: Location[]): Location | undefined => {
  const location = findLocation(locationId, locations);
  if (!location) {
    return undefined;
  }
  const linkIds = location.linkIds || [];
  const links = linkIds
    .map(linkId => findLocation(linkId, locations))
    .map(link => (link
      ? {
        locationId: link.locationId,
        locationName: link.locationName,
      }
      : {}
    ));
  return {
    ...location,
    links,
  };
};

const actions: ActionTree<LocationState, RootState> = {
  fetchLocation: (
    {
      commit,
      state,
    },
    locationId: number,
  ): Promise<Location> => new Promise((resolve) => {
    commit('setLoading', true);
    setTimeout(() => {
      const result = injectLink(locationId, state.locations);
      commit('selectLocation', result);
      commit('setLoading', false);
      return resolve(result);
    }, 0);
  }),
  saveLocation: (
    {
      commit,
      state,
    },
    location: Location,
  ): Promise<Location> => new Promise((resolve) => {
    setTimeout(() => {
      const {
        locationId,
        locationName,
        description,
      } = location;
      commit('setLocation', {
        locationId,
        locationName,
        description,
      });
      const result = injectLink(locationId || 0, state.locations);
      return resolve(result);
    }, 0);
  }),
  fetchLocations: (
    {
      commit,
      state,
    },
    value: string = '',
  ): Promise<Location[]> => new Promise((resolve) => {
    commit('setLoading', true);
    setTimeout(() => {
      commit('filterLocations', value);
      commit('setLoading', false);
      return resolve(state.filtered);
    }, 0);
  }),
  addLink: (
    {
      commit,
      state,
    },
    {
      locationId,
      linkId,
    }: {
      locationId: number,
      linkId: number,
    },
  ): Promise<Location> => new Promise((resolve) => {
    setTimeout(() => {
      const location = state.locations.find(item => (item.locationId === locationId));
      const linkIds = (location && location.linkIds) || [];
      commit('setLocation', {
        locationId,
        linkIds: [
          ...linkIds.filter(link => link !== linkId),
          linkId,
        ],
      });
      const result = injectLink(locationId, state.locations);
      commit('selectLocation', result);
      return resolve(result);
    }, 0);
  }),
  deleteLink: (
    {
      commit,
      state,
    },
    {
      locationId,
      linkId,
    }: {
      locationId: number,
      linkId: number,
    },
  ): Promise<Location> => new Promise((resolve) => {
    setTimeout(() => {
      const location = state.locations.find(item => (item.locationId === locationId));
      const linkIds = (location && location.linkIds) || [];
      commit('setLocation', {
        locationId,
        linkIds: linkIds.filter(link => link !== linkId),
      });
      const result = injectLink(locationId, state.locations);
      commit('selectLocation', result);
      return resolve(result);
    }, 0);
  }),
};

export default actions;
