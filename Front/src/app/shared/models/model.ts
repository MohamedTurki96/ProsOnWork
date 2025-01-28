export interface GeoLocation {
  latitude: number
  longitude: number
}

export interface Category {
  id: string;
  name: string;
  listing: number;
  logo: string;
  img: string;
}

export interface Service {
  work: string;
  service: string;
  country: string;
  points: string;
  price1: string;
  price2: string;
  img1: string;
  img2: string;
  like: boolean;
}

export interface User {}
