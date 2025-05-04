import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { WorkerUpdateCommandDTO } from "../../dtos/catalog/worker.dto";



@SerializeableCommand({ resource: 'worker', action: 'update' })
export class WorkerUpdateCommand implements ICommand<WorkerUpdateCommandDTO> {
  constructor(readonly payload: WorkerUpdateCommandDTO) {}
}
