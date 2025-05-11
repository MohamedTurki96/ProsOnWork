import { IQuery, SerializeableQuery } from '@pros-on-work/utils';

@SerializeableQuery({ resource: 'plans', action: 'read' })
export class PlansGetQuery implements IQuery {
  readonly payload: unknown;
  constructor() {}
}
