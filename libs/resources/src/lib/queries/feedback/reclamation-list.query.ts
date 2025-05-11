import { IQuery, SerializeableQuery } from '@pros-on-work/utils';

import { ReclamationListDTO } from '../../dtos/feedback/reclamation-list.dto';


@SerializeableQuery({ resource: 'reclamation', action: 'list' })
export class ReclamationListQuery implements IQuery<ReclamationListDTO> {
  constructor(readonly payload: ReclamationListDTO) {}
}
