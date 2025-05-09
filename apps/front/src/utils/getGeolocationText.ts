import { Address } from '../core/Interface/interface';

export async function getGeolocationText(
  geolocation?: Address,
): Promise<string> {
  if (!geolocation || !geolocation?.latitude || !geolocation?.longitude) {
    return '';
  }

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${geolocation.latitude}&lon=${geolocation.longitude}&format=json`,
  );

  if (response.ok) {
    const data = await response.json();

    return data.display_name;
  }

  return '';
}

export function stringToAddress(address: string): Address {
  const [longitude, latitude] = address.split('|').map(Number);

  if (isNaN(latitude) || isNaN(longitude)) {
    throw new Error('Address not valid');
  }

  return {
    latitude,
    longitude,
  };
}

export function addressToString(address: Address): string {
  return `${address.longitude}|${address.latitude}`;
}
