/** Used to spread information into the dark room. Anyone thats listening will receive the event, can have multiple listeners */
export interface IEvent<DataDTO = unknown> {
  resource?: string
  action?: string
  payload: DataDTO
}

/** Used to manipulate data, there should be only one listener */
export type ICommand<BodyDTO = unknown> = IEvent<BodyDTO>

/** Used to get data without manipulation, there should be only one listener */
export type IQuery<QueryDTO = unknown> = IEvent<QueryDTO>

export type IQueueJob<QueueJobDTO = unknown> = IEvent<QueueJobDTO>

export interface EventOptions {
  resource: string
  action: string
}
