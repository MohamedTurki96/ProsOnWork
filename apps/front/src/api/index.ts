/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginRequest {
  /**
   * @format email
   * @example "john@example.com"
   */
  email: string;
  /**
   * @format password
   * @example "securePass123"
   */
  password: string;
}

export interface RegisterRequest {
  /** @example "John Doe" */
  name: string;
  /**
   * @format email
   * @example "john@example.com"
   */
  email: string;
  /**
   * @format password
   * @example "securePass123"
   */
  password: string;
  /** @example true */
  isClient: boolean;
}

export type StoreCategoryRequest = any;

export type StoreProductRequest = any;

/** Request body for updating an existing category */
export type UpdateCategoryRequest = any;

export type UpdateProductRequest = any;

/** A collection of category resources */
export interface CategoryCollection {
  data?: CategoryResource[];
}

/** Represents a category */
export interface CategoryResource {
  /** @example 1 */
  id: number;
  /** @example "Electronics" */
  name: string;
  /** Represents a media file */
  icon: MediaResource;
  /** Represents a media file */
  image: MediaResource;
}

export interface LoginResource {
  /** The access token for the logged-in user */
  access_token?: string;
  user?: UserResource;
}

/** Represents a media file */
export interface MediaResource {
  /** @example 1 */
  id: number;
  /** @example "image.png" */
  filename: string;
  /** @example "/storage/media/image.png" */
  filePath: string;
  /** @example "image/png" */
  fileType?: string;
  /** @example 204800 */
  size?: number;
}

export interface ProductResource {
  /** @example 1 */
  id: number;
  serviceProvider: UserResource;
  /** Represents a category */
  category: CategoryResource;
  /** @example "Web Development Service" */
  name: string;
  /** @example "Custom website development for businesses." */
  description: string;
  address: Address;
  /** @example 5 */
  border: number | null;
  /** @example true */
  isActive: boolean;
  /**
   * @format double
   * @example 49.99
   */
  price: number;
  /** different pricing types */
  priceType: PriceTypeEnum;
  /** different product types */
  type: ProductTypeEnum;
  /** @example ["Hosting","Domain"] */
  includes: string[];
  faq: FaqResource[];
  images: MediaResource[];
  videos: MediaResource[];
}

export interface FaqResource {
  /** @example "Do you provide support?" */
  question?: string;
  /** @example "Yes, we provide 24/7 support." */
  answer?: string;
}

/**
 * different pricing types
 * @example "HOUR"
 */
export enum PriceTypeEnum {
  HOUR = 'HOUR',
  PACKAGE = 'PACKAGE',
}

/**
 * different product types
 * @example "SERVICE"
 */
export enum ProductTypeEnum {
  SERVICE = 'SERVICE',
  EQUIPMENT = 'EQUIPMENT',
}

export interface UserResource {
  /** @example 1 */
  id: number;
  /** @example "John Doe" */
  name: string;
  /** @example "john@example.com" */
  email: string;
  /** Possible roles for a user */
  role: UserRoleEnum;
  address: Address;
  phone?: string;
  /** Represents a media file */
  avatar?: MediaResource;
  /** @format date-time */
  createdAt?: string;
}

/** Possible roles for a user */
export enum UserRoleEnum {
  CLIENT = 'CLIENT',
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
  ADMIN = 'ADMIN',
}

export interface Address {
  /** @format double */
  longitude: number;
  /** @format double */
  latitude: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = 'http://localhost:8000';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data.data;
    });
  };
}

/**
 * @title ProsOnWork
 * @version 0.0.1
 * @baseUrl http://localhost:8000
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  authentication = {
    /**
     * No description
     *
     * @tags Authentication
     * @name Register
     * @summary Register a new user
     * @request POST:/api/auth/register
     */
    register: (data: RegisterRequest, params: RequestParams = {}) =>
      this.http.request<void, void>({
        path: `/api/auth/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name Login
     * @summary User login
     * @request POST:/api/auth/login
     */
    login: (data: LoginRequest, params: RequestParams = {}) =>
      this.http.request<LoginResource, void>({
        path: `/api/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name Me
     * @summary Get authenticated user details
     * @request GET:/api/auth/me
     * @secure
     */
    me: (params: RequestParams = {}) =>
      this.http.request<UserResource, void>({
        path: `/api/auth/me`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name Logout
     * @summary Logout the user
     * @request POST:/api/auth/logout
     * @secure
     */
    logout: (params: RequestParams = {}) =>
      this.http.request<void, void>({
        path: `/api/auth/logout`,
        method: 'POST',
        secure: true,
        ...params,
      }),
  };
  category = {
    /**
     * No description
     *
     * @tags Category
     * @name ListCategories
     * @summary Get all categories
     * @request GET:/api/categories
     */
    listCategories: (params: RequestParams = {}) =>
      this.http.request<CategoryCollection, any>({
        path: `/api/categories`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Category
     * @name StoreCategory
     * @summary Create a new category
     * @request POST:/api/categories
     */
    storeCategory: (data: StoreCategoryRequest, params: RequestParams = {}) =>
      this.http.request<CategoryResource, void>({
        path: `/api/categories`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Category
     * @name GetCategory
     * @summary Get a specific category
     * @request GET:/api/categories/{id}
     */
    getCategory: (id: number, params: RequestParams = {}) =>
      this.http.request<CategoryResource, void>({
        path: `/api/categories/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Category
     * @name UpdateCategory
     * @summary Update a category
     * @request PUT:/api/categories/{id}
     */
    updateCategory: (id: number, data: UpdateCategoryRequest, params: RequestParams = {}) =>
      this.http.request<CategoryResource, void>({
        path: `/api/categories/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Category
     * @name DeleteCategory
     * @summary Delete a category
     * @request DELETE:/api/categories/{id}
     */
    deleteCategory: (id: number, params: RequestParams = {}) =>
      this.http.request<void, void>({
        path: `/api/categories/${id}`,
        method: 'DELETE',
        ...params,
      }),
  };
  products = {
    /**
     * No description
     *
     * @tags Products
     * @name ListProducts
     * @summary Retrieve a list of products
     * @request GET:/api/products
     */
    listProducts: (
      query?: {
        /**
         * Longitude of the location for filtering products
         * @format float
         */
        longitude?: number;
        /**
         * Latitude of the location for filtering products
         * @format float
         */
        latitude?: number;
        /** Search query for filtering products */
        q?: string;
        /** Rating filter, can accept multiple values */
        rating?: number[];
        /** Filter by categories, can accept multiple values */
        categories?: number[];
        /**
         * Minimum price for filtering products
         * @format float
         */
        minPrice?: number;
        /**
         * Maximum price for filtering products
         * @format float
         */
        maxPrice?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<ProductResource[], any>({
        path: `/api/products`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name StoreProduct
     * @summary Create a new product
     * @request POST:/api/products
     */
    storeProduct: (data: StoreProductRequest, params: RequestParams = {}) =>
      this.http.request<ProductResource, void>({
        path: `/api/products`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name GetProduct
     * @summary Retrieve a specific product
     * @request GET:/api/products/{id}
     */
    getProduct: (id: number, params: RequestParams = {}) =>
      this.http.request<ProductResource, void>({
        path: `/api/products/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name UpdateProduct
     * @summary Update a product
     * @request PUT:/api/products/{id}
     */
    updateProduct: (id: number, data: UpdateProductRequest, params: RequestParams = {}) =>
      this.http.request<ProductResource, void>({
        path: `/api/products/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name DeleteProduct
     * @summary Delete a product
     * @request DELETE:/api/products/{id}
     */
    deleteProduct: (id: number, params: RequestParams = {}) =>
      this.http.request<void, void>({
        path: `/api/products/${id}`,
        method: 'DELETE',
        ...params,
      }),
  };
}
