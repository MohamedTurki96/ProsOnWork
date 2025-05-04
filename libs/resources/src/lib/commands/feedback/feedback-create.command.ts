import { ICommand, SerializeableCommand } from '@pros-on-work/utils';

import { FeedbackCreateDTO } from '../../dtos/feedback/feedback.dto';

@SerializeableCommand({ resource: 'feedback', action: 'create' })
export class FeedbackCreateCommand implements ICommand<FeedbackCreateDTO> {
  constructor(readonly payload: FeedbackCreateDTO) {}
}
