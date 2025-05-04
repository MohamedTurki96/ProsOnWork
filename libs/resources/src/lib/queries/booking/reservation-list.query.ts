import { IQuery, SerializeableQuery } from "@pros-on-work/utils";

import { ReservationListDTO } from "../../dtos/booking/reservation-list.dto";



@SerializeableQuery({ resource: "reservation", action: "list" })
export class ReservationListQuery implements IQuery<ReservationListDTO> {
  constructor(readonly payload: ReservationListDTO) {}
}
