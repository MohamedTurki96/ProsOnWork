import { IQuery, SerializeableQuery } from '@pros-on-work/utils'

import { FeedbackGetDTO } from '../../dtos/feedback/feedback-get.dto';

@SerializeableQuery({ resource: 'feedback', action: 'list' })
export class FeedbackGetQuery implements IQuery<FeedbackGetDTO> {
  constructor(readonly payload: FeedbackGetDTO) {}
}
