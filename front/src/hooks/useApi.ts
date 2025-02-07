import { useMemo } from 'react';
import { Api, HttpClient } from '../api';

export function useApi() {
  return useMemo<Api<unknown>>(
    () =>
      new Api(
        new HttpClient({
          baseApiParams: {
            credentials: 'include',
            headers: {
              Accept: 'application/json',
            },
          },
        }),
      ),
    [],
  );
}
