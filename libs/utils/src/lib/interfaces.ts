// eslint-disable-next-line @typescript-eslint/ban-types
export interface Type<T = any> extends Function {
  new (...args: any[]): T
}

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> }

type NonFunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

export interface BasePermission {
  eventKey: string
  hasAccess: boolean
}

export interface BaseRole {
  permissions: BasePermission[]
  key: string
}
