import { useMemo } from 'react';

import { Api, HttpClient } from '../api';
import { Api as FileApi, HttpClient as FileHttpClient } from '../api/file';

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

export function useFileApi() {
  return useMemo<FileApi<unknown>>(() => new FileApi(new FileHttpClient()), []);
}
