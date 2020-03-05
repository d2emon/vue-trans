export interface Location {
  locationId?: number,
  locationName?: string,
  description?: string,
  links?: Location[],
  linkIds?: number[],
}

export interface LocationState {
  // locationId: number,
  // name: string,
  // description: string,
  loading: boolean,
  location?: Location,
  locations: Location[],
  filtered: Location[],
}
