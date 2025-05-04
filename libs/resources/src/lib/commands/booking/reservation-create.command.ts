import { ICommand, SerializeableCommand } from '@pros-on-work/utils'

import { ReservationCreateDTO } from '../../dtos/booking/reservation.dto'

@SerializeableCommand({ resource: 'reservation', action: 'create' })
export class ReservationCreateCommand implements ICommand<ReservationCreateDTO> {
  constructor(readonly payload: ReservationCreateDTO) {}
}
