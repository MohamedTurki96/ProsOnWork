import { IQuery, SerializeableQuery } from "@pros-on-work/utils";

import { ReclamationGetDTO } from "../../dtos/feedback/reclamation-get.dto";

@SerializeableQuery({ resource: 'reclamation', action: 'read' })
export class ReclamationGetQuery implements IQuery<ReclamationGetDTO> {
  constructor(readonly payload: ReclamationGetDTO) {}
}