import { Address } from '../api';

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
