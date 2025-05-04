import { ICommand, SerializeableCommand } from '@pros-on-work/utils'

import { ReclamationCreateDTO } from '../../dtos/feedback/reclamation.dto'

@SerializeableCommand({ resource: 'reclamation', action: 'create' })
export class ReclamationCreateCommand implements ICommand<ReclamationCreateDTO> {
  constructor(readonly payload: ReclamationCreateDTO) {}
}
