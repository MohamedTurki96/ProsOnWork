/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** @default "createdAt" */
export enum WalletListSortProperty {
  CreatedAt = 'createdAt',
}

export enum PaymentStatus {
  Pending = 'pending',
  Completed = 'completed',
  Failed = 'failed',
}

/** @default "createdAt" */
export enum PaymentListSortProperty {
  CreatedAt = 'createdAt',
}

export enum PaymentType {
  CashIn = 'cashIn',
  CashOut = 'cashOut',
  Reservation = 'reservation',
}

export enum ReclamationStatus {
  Open = 'open',
  InProgress = 'inProgress',
  Resolved = 'resolved',
}

/** @default "createdAt" */
export enum ReclamationListSortProperty {
  CreatedAt = 'createdAt',
}

export enum ReservationStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Canceled = 'canceled',
}

/** @default "createdAt" */
export enum ReservationListSortProperty {
  CreatedAt = 'createdAt',
}

export enum PriceType {
  Hour = 'hour',
  Package = 'package',
}

export enum ProductType {
  Service = 'service',
  Equipment = 'equipment',
}

/** @default "createdAt" */
export enum ProductListSortProperty {
  CreatedAt = 'createdAt',
}

/** @default "createdAt" */
export enum WorkerListSortProperty {
  CreatedAt = 'createdAt',
}

/** @default "createdAt" */
export enum ShopListSortProperty {
  CreatedAt = 'createdAt',
}

/** @default "createdAt" */
export enum CategoryListSortProperty {
  CreatedAt = 'createdAt',
}

export enum UserPlan {
  Basic = 'basic',
  Business = 'business',
  Premium = 'premium',
}

/** @default "desc" */
export enum QuerySortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

/** @default "createdAt" */
export enum UserListSortProperty {
  CreatedAt = 'createdAt',
}

export enum UserRole {
  Admin = 'admin',
  Client = 'client',
  ServiceProvider = 'serviceProvider',
}

export interface UserListWhereDTO {
  name?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
}

export interface UserListSortDTO {
  property?: UserListSortProperty;
  order?: QuerySortOrder;
}

export interface PaginationMetaDTO {
  totalItems: number;
  nextOffset?: number;
  hasMoreItems: boolean;
  hasPrevItems: boolean;
  currentOffset: number;
  prevOffset?: number;
}

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  /** @format date-time */
  emailVerifiedAt?: string;
  phone?: string;
  role: UserRole;
  plan?: UserPlan;
  avatarId?: number;
  address?: string;
  /** @format date-time */
  createdAt: string;
}

export interface UserListResultDTO {
  meta: PaginationMetaDTO;
  items: UserDTO[];
}

export interface UserPlans {
  basic: number;
  business: number;
  premium: number;
}

export interface UserUpdateDTO {
  name?: string;
  phone?: string;
  avatarId?: number;
  address?: string;
}

export interface UserCreateDTO {
  name: string;
  email: string;
  password: string;
  phone?: string;
  plan?: UserPlan;
  isClient: boolean;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface UserLoginResultDTO {
  user: UserDTO;
  token: string;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

export interface RequestPasswordResetDTO {
  email: string;
}

export interface ResetPasswordDTO {
  token: string;
  newPassword: string;
}

export interface VerifyEmailDTO {
  /**
   * Email verification token
   * @example "ef39b48a-2e45-4c66-9b11-0e1f2aab4e9a"
   */
  token: string;
}

export interface CategoryListWhereDTO {
  name?: string;
}

export interface CategoryListSortDTO {
  property?: CategoryListSortProperty;
  order?: QuerySortOrder;
}

export interface CategoryDTO {
  id: number;
  name: string;
  iconId?: number;
  imageId?: number;
  /** @format date-time */
  createdAt: string;
}

export interface CategoryListResultDTO {
  meta: PaginationMetaDTO;
  items: CategoryDTO[];
}

export interface CategoryCreateDTO {
  name: string;
  iconId?: number;
  imageId?: number;
}

export interface CategoryUpdateDTO {
  name?: string;
  iconId?: number;
  imageId?: number;
}

export interface ShopListWhereDTO {
  name?: string;
}

export interface ShopListSortDTO {
  property?: ShopListSortProperty;
  order?: QuerySortOrder;
}

export interface ShopDTO {
  id: number;
  name: string;
  address?: string;
  ownerId: number;
  /** @format date-time */
  createdAt: string;
}

export interface ShopListResultDTO {
  meta: PaginationMetaDTO;
  items: ShopDTO[];
}

export interface ShopCreateDTO {
  name: string;
  address?: string;
  ownerId: number;
}

export interface ShopUpdateDTO {
  name?: string;
  address?: string;
}

export interface WorkerListWhereDTO {
  name?: string;
  phone?: string;
}

export interface WorkerListSortDTO {
  property?: WorkerListSortProperty;
  order?: QuerySortOrder;
}

export interface WorkerDTO {
  id: number;
  name: string;
  phone?: string;
  avatarId?: string;
  shopId: number;
  /** @format date-time */
  createdAt: string;
}

export interface WorkerListResultDTO {
  meta: PaginationMetaDTO;
  items: WorkerDTO[];
}

export interface WorkerCreateDTO {
  name: string;
  phone?: string;
  avatarId?: string;
  shopId: number;
}

export interface WorkerUpdateDTO {
  name?: string;
  phone?: string;
  avatarId?: string;
  shopId?: number;
}

export interface ProductListWhereDTO {
  q?: string;
  latitude?: number;
  longitude?: number;
  minPrice?: number;
  maxPrice?: number;
  categories?: number[];
  rating?: number[];
}

export interface ProductListSortDTO {
  property?: ProductListSortProperty;
  order?: QuerySortOrder;
}

export interface FaqDTO {
  question: string;
  answer: string;
}

export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  includes?: string[];
  medias?: number[];
  faq?: FaqDTO[];
  type: ProductType;
  priceType: PriceType;
  categoryId: number;
  shopId: number;
  workers: WorkerDTO[];
  /** @format date-time */
  createdAt: string;
}

export interface ProductListResultDTO {
  meta: PaginationMetaDTO;
  items: ProductDTO[];
}

export interface ProductCreateDTO {
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  includes?: string[];
  medias?: number[];
  faq?: FaqDTO[];
  type: ProductType;
  priceType: PriceType;
  categoryId: number;
  shopId: number;
  workers: number[];
}

export interface ProductUpdateDTO {
  name?: string;
  description?: string;
  price?: number;
  isActive?: boolean;
  includes?: string[];
  faq?: FaqDTO[];
  medias?: number[];
  type?: ProductType;
  priceType?: PriceType;
  categoryId?: number;
  workers?: number[];
}

export interface ReservationListWhereDTO {
  userId?: number;
  productId?: number;
}

export interface ReservationListSortDTO {
  property?: ReservationListSortProperty;
  order?: QuerySortOrder;
}

export interface ReservationDTO {
  id: number;
  userId: number;
  productId: number;
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  endDate: string;
  status: ReservationStatus;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  canceledAt?: string;
  /** @format date-time */
  acceptedAT?: string;
}

export interface ReservationListResultDTO {
  meta: PaginationMetaDTO;
  items: ReservationDTO[];
}

export interface ReservationCreateDTO {
  userId: number;
  productId: number;
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  endDate: string;
}

export interface FeedbackCreateDTO {
  userId: number;
  productId: number;
  parentId?: number;
  rating?: number;
  comment?: string;
}

export interface FeedbackDTO {
  id: number;
  userId: number;
  productId: number;
  parentId?: number;
  comment?: string;
  rating?: number;
  replies?: FeedbackDTO[];
  /** @format date-time */
  createdAt: string;
}

export interface FeedbackGetForProductResultDTO {
  items: FeedbackDTO[];
}

export interface ReclamationListWhereDTO {
  comment?: string;
}

export interface ReclamationListSortDTO {
  property?: ReclamationListSortProperty;
  order?: QuerySortOrder;
}

export interface ReclamationDTO {
  id: number;
  userId: number;
  productId: number;
  comment: string;
  status: ReclamationStatus;
  /** @format date-time */
  createdAt: string;
}

export interface ReclamationListResultDTO {
  meta: PaginationMetaDTO;
  items: ReclamationDTO[];
}

export interface ReclamationCreateDTO {
  userId: number;
  productId: number;
  comment: string;
}

export interface PaymentListWhereDTO {
  type?: PaymentType;
  walletId?: number;
}

export interface PaymentListSortDTO {
  property?: PaymentListSortProperty;
  order?: QuerySortOrder;
}

export interface PaymentDTO {
  id: number;
  walletId: number;
  type: PaymentType;
  amount: number;
  status: PaymentStatus;
  /** @format date-time */
  createdAt: string;
}

export interface PaymentListResultDTO {
  meta: PaginationMetaDTO;
  items: PaymentDTO[];
}

export interface PaymentCreateCashInDTO {
  amount: number;
}

export interface WalletListWhereDTO {
  userId?: number;
}

export interface WalletListSortDTO {
  property?: WalletListSortProperty;
  order?: QuerySortOrder;
}

export interface WalletDTO {
  id: number;
  userId: number;
  balance: number;
  /** @format date-time */
  createdAt: string;
}

export interface WalletListResultDTO {
  meta: PaginationMetaDTO;
  items: WalletDTO[];
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

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
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
  public baseUrl: string = 'http://localhost:4000';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

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
    const keys = Object.keys(query).filter(
      (key) => 'undefined' !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string'
        ? JSON.stringify(input)
        : input,
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

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
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

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
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

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === 'undefined' || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
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
 * @title ProsOnWork Gateway
 * @version undefined
 * @baseUrl http://localhost:4000
 * @contact
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  users = {
    /**
     * No description
     *
     * @tags Users
     * @name ListUsers
     * @request GET:/users
     * @secure
     */
    listUsers: (
      query?: {
        where?: UserListWhereDTO;
        sort?: UserListSortDTO;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<UserListResultDTO, void>({
        path: `/users`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UpdateOwnUser
     * @request PUT:/users
     * @secure
     */
    updateOwnUser: (data: UserUpdateDTO, params: RequestParams = {}) =>
      this.http.request<UserDTO, void>({
        path: `/users`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name Register
     * @request POST:/users
     */
    register: (data: UserCreateDTO, params: RequestParams = {}) =>
      this.http.request<UserDTO, any>({
        path: `/users`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name Me
     * @request GET:/users/me
     * @secure
     */
    me: (params: RequestParams = {}) =>
      this.http.request<UserDTO, void>({
        path: `/users/me`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name Plans
     * @request GET:/users/plans
     */
    plans: (params: RequestParams = {}) =>
      this.http.request<UserPlans, any>({
        path: `/users/plans`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name GetUser
     * @request GET:/users/{id}
     * @secure
     */
    getUser: (id: number, params: RequestParams = {}) =>
      this.http.request<UserDTO, void>({
        path: `/users/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name Login
     * @request POST:/auth/login
     */
    login: (data: UserLoginDTO, params: RequestParams = {}) =>
      this.http.request<UserLoginResultDTO, any>({
        path: `/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name ChangePassword
     * @request POST:/auth/change-password
     * @secure
     */
    changePassword: (data: ChangePasswordDTO, params: RequestParams = {}) =>
      this.http.request<object, void>({
        path: `/auth/change-password`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name RequestReset
     * @request POST:/auth/request-password-reset
     */
    requestReset: (data: RequestPasswordResetDTO, params: RequestParams = {}) =>
      this.http.request<object, any>({
        path: `/auth/request-password-reset`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name ResetPassword
     * @request POST:/auth/reset-password
     */
    resetPassword: (data: ResetPasswordDTO, params: RequestParams = {}) =>
      this.http.request<object, any>({
        path: `/auth/reset-password`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name VerifyEmail
     * @request POST:/auth/verify-email
     */
    verifyEmail: (data: VerifyEmailDTO, params: RequestParams = {}) =>
      this.http.request<object, any>({
        path: `/auth/verify-email`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  categories = {
    /**
     * No description
     *
     * @tags Categories
     * @name List
     * @request GET:/categories
     */
    list: (
      query?: {
        where?: CategoryListWhereDTO;
        sort?: CategoryListSortDTO;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<CategoryListResultDTO, any>({
        path: `/categories`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name Create
     * @request POST:/categories
     * @secure
     */
    create: (data: CategoryCreateDTO, params: RequestParams = {}) =>
      this.http.request<CategoryDTO, void>({
        path: `/categories`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name Update
     * @request PUT:/categories/{id}
     * @secure
     */
    update: (id: number, data: CategoryUpdateDTO, params: RequestParams = {}) =>
      this.http.request<CategoryDTO, void>({
        path: `/categories/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name Delete
     * @request DELETE:/categories/{id}
     * @secure
     */
    delete: (id: number, params: RequestParams = {}) =>
      this.http.request<void, void>({
        path: `/categories/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name Get
     * @request GET:/categories/{id}
     */
    get: (id: number, params: RequestParams = {}) =>
      this.http.request<CategoryDTO, any>({
        path: `/categories/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  shops = {
    /**
     * No description
     *
     * @tags Shops
     * @name List
     * @request GET:/shops
     * @secure
     */
    list: (
      query?: {
        where?: ShopListWhereDTO;
        sort?: ShopListSortDTO;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<ShopListResultDTO, void>({
        path: `/shops`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Shops
     * @name Create
     * @request POST:/shops
     * @secure
     */
    create: (data: ShopCreateDTO, params: RequestParams = {}) =>
      this.http.request<ShopDTO, void>({
        path: `/shops`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Shops
     * @name Update
     * @request PUT:/shops/{id}
     * @secure
     */
    update: (id: number, data: ShopUpdateDTO, params: RequestParams = {}) =>
      this.http.request<ShopDTO, void>({
        path: `/shops/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Shops
     * @name Get
     * @request GET:/shops/{id}
     */
    get: (id: number, params: RequestParams = {}) =>
      this.http.request<ShopDTO, any>({
        path: `/shops/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  workers = {
    /**
     * No description
     *
     * @tags Workers
     * @name List
     * @request GET:/workers
     * @secure
     */
    list: (
      query?: {
        where?: WorkerListWhereDTO;
        sort?: WorkerListSortDTO;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<WorkerListResultDTO, void>({
        path: `/workers`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workers
     * @name Create
     * @request POST:/workers
     * @secure
     */
    create: (data: WorkerCreateDTO, params: RequestParams = {}) =>
      this.http.request<WorkerDTO, void>({
        path: `/workers`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workers
     * @name Update
     * @request PUT:/workers/{id}
     * @secure
     */
    update: (id: number, data: WorkerUpdateDTO, params: RequestParams = {}) =>
      this.http.request<WorkerDTO, void>({
        path: `/workers/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workers
     * @name Get
     * @request GET:/workers/{id}
     */
    get: (id: number, params: RequestParams = {}) =>
      this.http.request<WorkerDTO, any>({
        path: `/workers/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  products = {
    /**
     * No description
     *
     * @tags Products
     * @name List
     * @request GET:/products
     */
    list: (
      query?: {
        where?: ProductListWhereDTO;
        sort?: ProductListSortDTO;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<ProductListResultDTO, any>({
        path: `/products`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name Create
     * @request POST:/products
     * @secure
     */
    create: (data: ProductCreateDTO, params: RequestParams = {}) =>
      this.http.request<ProductDTO, void>({
        path: `/products`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name Update
     * @request PUT:/products/{id}
     * @secure
     */
    update: (id: number, data: ProductUpdateDTO, params: RequestParams = {}) =>
      this.http.request<ProductDTO, void>({
        path: `/products/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name Get
     * @request GET:/products/{id}
     */
    get: (id: number, params: RequestParams = {}) =>
      this.http.request<ProductDTO, any>({
        path: `/products/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  reservations = {
    /**
     * No description
     *
     * @tags Reservations
     * @name List
     * @request GET:/reservations
     * @secure
     */
    list: (
      query?: {
        where?: ReservationListWhereDTO;
        sort?: ReservationListSortDTO;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<ReservationListResultDTO, void>({
        path: `/reservations`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reservations
     * @name Create
     * @request POST:/reservations
     * @secure
     */
    create: (data: ReservationCreateDTO, params: RequestParams = {}) =>
      this.http.request<ReservationDTO, void>({
        path: `/reservations`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reservations
     * @name Get
     * @request GET:/reservations/{id}
     * @secure
     */
    get: (id: number, params: RequestParams = {}) =>
      this.http.request<ReservationDTO, void>({
        path: `/reservations/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reservations
     * @name Accept
     * @request PUT:/reservations/{id}/accept
     * @secure
     */
    accept: (id: number, params: RequestParams = {}) =>
      this.http.request<ReservationDTO, void>({
        path: `/reservations/${id}/accept`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reservations
     * @name Cancel
     * @request PUT:/reservations/{id}/cancel
     * @secure
     */
    cancel: (id: number, params: RequestParams = {}) =>
      this.http.request<ReservationDTO, void>({
        path: `/reservations/${id}/cancel`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  feedback = {
    /**
     * No description
     *
     * @tags Feedback
     * @name Create
     * @request POST:/feedback
     */
    create: (data: FeedbackCreateDTO, params: RequestParams = {}) =>
      this.http.request<FeedbackDTO, any>({
        path: `/feedback`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feedback
     * @name ListByProduct
     * @request GET:/feedback/product/{productId}
     */
    listByProduct: (productId: number, params: RequestParams = {}) =>
      this.http.request<FeedbackGetForProductResultDTO, any>({
        path: `/feedback/product/${productId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feedback
     * @name GetFeedbackFor
     * @request GET:/feedback/product/{productId}/users/{userId}
     */
    getFeedbackFor: (
      productId: number,
      userId: number,
      params: RequestParams = {},
    ) =>
      this.http.request<FeedbackDTO, any>({
        path: `/feedback/product/${productId}/users/${userId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  reclamations = {
    /**
     * No description
     *
     * @tags Reclamations
     * @name List
     * @request GET:/reclamations
     * @secure
     */
    list: (
      query?: {
        where?: ReclamationListWhereDTO;
        sort?: ReclamationListSortDTO;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<ReclamationListResultDTO, void>({
        path: `/reclamations`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reclamations
     * @name Create
     * @request POST:/reclamations
     * @secure
     */
    create: (data: ReclamationCreateDTO, params: RequestParams = {}) =>
      this.http.request<ReclamationDTO, void>({
        path: `/reclamations`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reclamations
     * @name Get
     * @request GET:/reclamations/{id}
     * @secure
     */
    get: (id: number, params: RequestParams = {}) =>
      this.http.request<ReclamationDTO, void>({
        path: `/reclamations/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reclamations
     * @name Progress
     * @request PUT:/reclamations/{id}/progress
     * @secure
     */
    progress: (id: number, params: RequestParams = {}) =>
      this.http.request<ReclamationDTO, void>({
        path: `/reclamations/${id}/progress`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reclamations
     * @name Solve
     * @request PUT:/reclamations/{id}/solve
     * @secure
     */
    solve: (id: number, params: RequestParams = {}) =>
      this.http.request<ReclamationDTO, void>({
        path: `/reclamations/${id}/solve`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  payments = {
    /**
     * No description
     *
     * @tags Payments
     * @name List
     * @request GET:/payments
     * @secure
     */
    list: (
      query?: {
        where?: PaymentListWhereDTO;
        sort?: PaymentListSortDTO;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<PaymentListResultDTO, void>({
        path: `/payments`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payments
     * @name AcceptCashout
     * @request PUT:/payments/{id}/accept-cashout
     * @secure
     */
    acceptCashout: (id: number, params: RequestParams = {}) =>
      this.http.request<PaymentDTO, void>({
        path: `/payments/${id}/accept-cashout`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payments
     * @name DeclineCashout
     * @request PUT:/payments/{id}/decline-cashout
     * @secure
     */
    declineCashout: (id: number, params: RequestParams = {}) =>
      this.http.request<PaymentDTO, void>({
        path: `/payments/${id}/decline-cashout`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payments
     * @name CreateCashIn
     * @request POST:/payments/cash-in
     * @secure
     */
    createCashIn: (data: PaymentCreateCashInDTO, params: RequestParams = {}) =>
      this.http.request<PaymentDTO, void>({
        path: `/payments/cash-in`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  wallets = {
    /**
     * No description
     *
     * @tags Wallets
     * @name List
     * @request GET:/wallets
     * @secure
     */
    list: (
      query?: {
        where?: WalletListWhereDTO;
        sort?: WalletListSortDTO;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<WalletListResultDTO, void>({
        path: `/wallets`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Wallets
     * @name GetByUser
     * @request GET:/wallets/users
     * @secure
     */
    getByUser: (params: RequestParams = {}) =>
      this.http.request<WalletDTO, void>({
        path: `/wallets/users`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Wallets
     * @name Get
     * @request GET:/wallets/{id}
     * @secure
     */
    get: (id: number, params: RequestParams = {}) =>
      this.http.request<WalletDTO, void>({
        path: `/wallets/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
