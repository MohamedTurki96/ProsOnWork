import { useEffect, useMemo, useState } from 'react';

import { Api, HttpClient, QueryParamsType } from '../api';
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

export class ProsOnWorkHttpClient extends HttpClient {
  protected addObjectQueryParam(query: QueryParamsType, key: string): string {
    const obj = query[key];

    return Object.keys(obj)
      .map((prop) => {
        const value = obj[prop];
        if (Array.isArray(value)) {
          return value
            .map((v: any, idx: number) =>
              this.encodeQueryParam(`${key}[${prop}[${idx}]]`, v),
            )
            .join('&');
        }

        return this.encodeQueryParam(`${key}[${prop}]`, value);
      })
      .join('&');
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];

    return value
      .map((v: any, index: number) =>
        this.encodeQueryParam(`${key}[${index}]`, v),
      )
      .join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => 'undefined' !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : typeof query[key] == 'object'
            ? this.addObjectQueryParam(query, key)
            : this.addQueryParam(query, key),
      )
      .join('&');
  }
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
      new ProsOnWorkHttpClient({
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
