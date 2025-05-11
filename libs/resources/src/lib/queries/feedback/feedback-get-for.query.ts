import { IQuery, SerializeableQuery } from '@pros-on-work/utils'

import { FeedbackGetForDTO } from '../../dtos/feedback/feedback-get-for.dto';

@SerializeableQuery({ resource: 'feedback', action: 'get-for' })
export class FeedbackGetForQuery implements IQuery<FeedbackGetForDTO> {
  constructor(readonly payload: FeedbackGetForDTO) {}
}
