import { ICommand, SerializeableCommand } from '@pros-on-work/utils'

import { ReservationUpdateDTO } from '../../dtos/booking/reservation.dto'

@SerializeableCommand({ resource: 'reservation', action: 'update' })
export class ReservationUpdateCommand implements ICommand<ReservationUpdateDTO> {
  constructor(readonly payload: ReservationUpdateDTO) {}
}
