import { Location } from '@/store/modules/locations/types';
import names from './names';
import links from './links';

const slugs: string[] = [
  '1l-lenina',
  '2l-lenina',
  '3l-lenina',
  '4l-lenina',
  '5l-lenina',
  '6l-lenina',
  '7l-lenina',
  'pushkina-lenina',
  '9l-lenina',
  '10l-lenina',
  '11l-lenina',
  '12l-lenina',
  '13l-lenina',
  '14l-krasnoarmeyskaya',
  '15l-krasnoarmeyskaya',
  '16l-krasnoarmeyskaya',
  '17l-krasnoarmeyskaya',
  '18l-krasnoarmeyskaya',
  '19l-krasnoarmeyskaya',
  '20l-krasnoarmeyskaya',
  '21l-krasnoarmeyskaya',
  '22l-krasnoarmeyskaya',
  '5l-k-marksa',
  '6l-k-marksa',
  '7l-k-marksa',
  'pushkina-k-marksa',
  '9l-k-marksa',
  '10l-k-marksa',
  '11l-k-marksa',
  '12l-k-marksa',
  '13l-k-marksa',
  '14l-oktyabrskaya',
  '15l-oktyabrskaya',
  '16l-oktyabrskaya',
  '17l-oktyabrskaya',
  '18l-oktyabrskaya',
  '19l-oktyabrskaya',
  '20l-oktyabrskaya',
  '21l-oktyabrskaya',
  '22l-oktyabrskaya',
  '5l-shevchenko',
  '6l-shevchenko',
  '7l-shevchenko',
  '8l-shevchenko',
  '9l-shevchenko',
  '10l-shevchenko',
  '11l-shevchenko',
  '12l-shevchenko',
  '13l-shevchenko',
  '14l-frunze',
  '15l-frunze',
  '16l-frunze',
  '17l-frunze',
  '18l-frunze',
  '19l-frunze',
  '20l-frunze',
  '21l-frunze',
  '22l-frunze',
  '23l-frunze',
  '24l-frunze',
  '25l-frunze',
  '12l-1-donetskaya',
  '13l-1-donetskaya',
  '12l-sovetskaya',
  'pl-sovetskaya',
  'centralnyy-rynok',
  'oboronnaya-novosvetlovskaya',
  'kinoteatr-ukraina',
  'stadion-avangard',
  'dk-stroiteley',
  '5-shkola',
  'taksopark',
  'akkumulyatornyy-zavod',
  'inzhenernyy-korpus',
  'gostinitsa-turist',
  'ostraya-mogila',
  'dramteatr',
];

const linksBySlug = (slug: string): number[] => {
  const itemLinks: string[] = links[slug] || [];
  return itemLinks.map((linkSlug: string) => slugs.indexOf(linkSlug) + 1);
};

const locations: Location[] = slugs
  .map((slug: string, locationId: number): Location => ({
    locationId: locationId + 1,
    locationName: names[slug] || slug,
    description: names[slug] || slug,
    linkIds: linksBySlug(slug),
  }))
  .sort((l1: Location, l2: Location): number => {
    const name1 = l1.locationName || '';
    const name2 = l2.locationName || '';
    if (name1 > name2) {
      return 1;
    }
    if (name1 < name2) {
      return -1;
    }
    return 0;
  });

export default locations;
