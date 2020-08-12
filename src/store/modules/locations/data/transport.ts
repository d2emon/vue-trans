import { TransportData } from '@/store/modules/locations/types';
import locations, {locationIdBySlug} from './index';
import transportLinks from './transportLinks';

const tramIds = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
];
const busIds = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
];

const linkIdsByTransportId = (routeId: string): number[] => {
  const slugs: string[] = transportLinks[routeId] || [];
  return slugs.map(locationIdBySlug);
}

const trams: TransportData[] = tramIds.map((routeId: string, transportId: number) => ({
  transportId: transportId + 1,
  transportType: 'Трамвай',
  routeId,
  linkIds: linkIdsByTransportId(routeId),
}));
const buses: TransportData[] = busIds.map((routeId: string, transportId: number) => ({
  transportId: transportId + 101,
  transportType: 'Автобус',
  routeId,
  linkIds: linkIdsByTransportId(routeId),
}));

const transport: TransportData[] = [
  ...trams,
  ...buses,
];

export default transport;
