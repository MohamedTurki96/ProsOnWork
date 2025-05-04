import { ICommand, SerializeableCommand } from '@pros-on-work/utils'

import { ReclamationUpdateDTO } from '../../dtos/feedback/reclamation.dto'

@SerializeableCommand({ resource: 'reclamation', action: 'update' })
export class ReclamationUpdateCommand implements ICommand<ReclamationUpdateDTO> {
  constructor(readonly payload: ReclamationUpdateDTO) {}
}
