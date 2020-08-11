const links: { [id: string]: string[] } = {
  dramteatr: [
    'pushkina-lenina',
  ],
  '1l-lenina': [
    '2l-lenina',
  ],
  '2l-lenina': [
    '1l-lenina',
    '3l-lenina',
  ],
  '3l-lenina': [
    '2l-lenina',
    '4l-lenina',
  ],
  '4l-lenina': [
    '3l-lenina',
    '5l-lenina',
  ],
  '5l-lenina': [
    '4l-lenina',
    '5l-k-marksa',
    '6l-lenina',
  ],
  '5l-k-marksa': [
    '5l-lenina',
    '5l-shevchenko',
    '6l-k-marksa',
  ],
  '5l-shevchenko': [
    '5l-k-marksa',
    '6l-shevchenko',
  ],
  '6l-lenina': [
    '5l-lenina',
    '6l-k-marksa',
    '7l-lenina',
  ],
  '6l-k-marksa': [
    '5l-k-marksa',
    '6l-lenina',
    '6l-shevchenko',
    '7l-k-marksa',
  ],
  '6l-shevchenko': [
    '5l-shevchenko',
    '6l-k-marksa',
    '7l-shevchenko',
  ],
  '7l-lenina': [
    '6l-lenina',
    '7l-k-marksa',
    'pushkina-lenina',
  ],
  '7l-k-marksa': [
    '6l-k-marksa',
    '7l-lenina',
    '7l-shevchenko',
    'pushkina-k-marksa',
  ],
  '7l-shevchenko': [
    '6l-shevchenko',
    '7l-k-marksa',
    '9l-shevchenko',
  ],
  'pushkina-lenina': [
    '7l-lenina',
    'dramteatr',
    'pushkina-k-marksa',
    '9l-lenina',
  ],
  'pushkina-k-marksa': [
    '7l-k-marksa',
    'pushkina-lenina',
    '9l-k-marksa',
  ],
  '9l-lenina': [
    'pushkina-lenina',
    '9l-k-marksa',
    '10l-lenina',
  ],
  '9l-k-marksa': [
    'pushkina-k-marksa',
    '9l-lenina',
    '9l-shevchenko',
    '10l-k-marksa',
  ],
  '9l-shevchenko': [
    '7l-shevchenko',
    '9l-k-marksa',
    '10l-shevchenko',
  ],
  '10l-lenina': [
    '9l-lenina',
    '10l-k-marksa',
    '11l-lenina',
  ],
  '10l-k-marksa': [
    '9l-k-marksa',
    '10l-lenina',
    '10l-shevchenko',
    '11l-k-marksa',
  ],
  '10l-shevchenko': [
    '9l-shevchenko',
    '10l-k-marksa',
    '11l-shevchenko',
  ],
  '11l-lenina': [
    '10l-lenina',
    '11l-k-marksa',
    '12l-lenina',
  ],
  '11l-k-marksa': [
    '10l-k-marksa',
    '11l-lenina',
    '11l-shevchenko',
    '12l-k-marksa',
  ],
  '11l-shevchenko': [
    '10l-shevchenko',
    '11l-k-marksa',
    '12l-shevchenko',
  ],
  '12l-lenina': [
    '11l-lenina',
    '12l-k-marksa',
    '13l-lenina',
  ],
  '12l-k-marksa': [
    '11l-k-marksa',
    '12l-lenina',
    '12l-shevchenko',
    '13l-k-marksa',
  ],
  '12l-shevchenko': [
    '11l-shevchenko',
    '12l-k-marksa',
    '13l-shevchenko',
  ],
  '12l-1-donetskaya': [
    '13l-1-donetskaya',
    '12l-sovetskaya',
  ],
  '12l-sovetskaya': [
    '12l-shevchenko',
    'pl-sovetskaya',
  ],
  '13l-lenina': [
    '12l-lenina',
    '13l-k-marksa',
  ],
  '13l-k-marksa': [
    '12l-k-marksa',
    '13l-lenina',
    '13l-shevchenko',
  ],
  '13l-shevchenko': [
    '12l-shevchenko',
    '13l-k-marksa',
    '13l-1-donetskaya',
  ],
  '13l-1-donetskaya': [
    '12l-1-donetskaya',
    '13l-shevchenko',
  ],
  'pl-sovetskaya': [
    '12l-1-donetskaya',
    'centralnyy-rynok',
  ],
  'centralnyy-rynok': [
    'pl-sovetskaya',
    'oboronnaya-novosvetlovskaya',
  ],
  'oboronnaya-novosvetlovskaya': [
    'centralnyy-rynok',
    'kinoteatr-ukraina',
  ],
  'kinoteatr-ukraina': [
    'oboronnaya-novosvetlovskaya',
    'stadion-avangard',
  ],
  'stadion-avangard': [
    'kinoteatr-ukraina',
    'dk-stroiteley',
  ],
  'dk-stroiteley': [
    'stadion-avangard',
    '5-shkola',
  ],
  '5-shkola': [
    'dk-stroiteley',
    'taksopark',
  ],
  taksopark: [
    '5-shkola',
    'akkumulyatornyy-zavod',
  ],
  'akkumulyatornyy-zavod': [
    'taksopark',
    'inzhenernyy-korpus',
  ],
  'inzhenernyy-korpus': [
    'akkumulyatornyy-zavod',
    'gostinitsa-turist',
  ],
  'gostinitsa-turist': [
    'inzhenernyy-korpus',
    'ostraya-mogila',
  ],
  'ostraya-mogila': [
    'gostinitsa-turist',
  ],
};

export default links;
