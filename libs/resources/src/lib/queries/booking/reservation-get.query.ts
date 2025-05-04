import { IQuery, SerializeableQuery } from "@pros-on-work/utils";

import { ReservationGetDTO } from "../../dtos/booking/reservation-get.dto";

@SerializeableQuery({ resource: 'reservation', action: 'read' })
export class ReservationGetQuery implements IQuery<ReservationGetDTO> {
  constructor(readonly payload: ReservationGetDTO) {}
}
