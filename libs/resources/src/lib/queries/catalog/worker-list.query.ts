import { IQuery, SerializeableQuery } from "@pros-on-work/utils";

import { WorkerListDTO } from "../../dtos/catalog/worker-list.dto";



@SerializeableQuery({ resource: "worker", action: "list" })
export class WorkerListQuery implements IQuery<WorkerListDTO> {
  constructor(readonly payload: WorkerListDTO) {}
}
