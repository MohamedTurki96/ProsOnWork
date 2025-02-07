interface QueryObject {
  [key: string]: string | string[];
}

export function queryToObject(searchParams: URLSearchParams) {
  return Array.from(searchParams).reduce((acc, [key, value]) => {
    if (acc[key]) {
      // If the key already exists, turn it into an array if not already
      acc[key] = Array.isArray(acc[key])
        ? [...acc[key], value]
        : [acc[key], value];
    } else {
      // Otherwise, just add the key-value pair
      acc[key] = value;
    }
    return acc;
  }, {} as QueryObject);
}
