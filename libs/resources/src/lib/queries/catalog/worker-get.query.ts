import { IQuery, SerializeableQuery } from "@pros-on-work/utils"

import { WorkerGetDTO } from "../../dtos/catalog/worker.dto";

@SerializeableQuery({ resource: "worker", action: "read" })
export class WorkerGetQuery implements IQuery<WorkerGetDTO> {
  constructor(readonly payload: WorkerGetDTO) {}
}
