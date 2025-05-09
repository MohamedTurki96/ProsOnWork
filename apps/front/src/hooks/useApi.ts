import { useEffect, useMemo, useState } from 'react';

import { Api, HttpClient } from '../api';
import { Api as FileApi, HttpClient as FileHttpClient } from '../api/file';

export function useLocalStorage(key = 'access_token') {
  const [value, setValue] = useState<string | null>(() =>
    localStorage.getItem(key),
  );

  useEffect(() => {
    // fires in *other* tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key) setValue(e.newValue);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key]);

  // optional: keep this tab in sync if you call setItem here
  const saveValue = (value: string | null) => {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
    setValue(value); // update immediately in this tab
  };

  return [value, saveValue] as const;
}

export function useApi() {
  const [token] = useLocalStorage();

  return useMemo<Api<unknown>>(() => {
    const headers: Record<string, string> = {
      Accept: 'application/json',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return new Api(
      new HttpClient({
        baseApiParams: {
          credentials: 'include',
          headers,
        },
      }),
    );
  }, []);
}

export function useFileApi() {
  return useMemo<FileApi<unknown>>(() => new FileApi(new FileHttpClient()), []);
}
