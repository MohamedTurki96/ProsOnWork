import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { WorkerGetDTO } from "../../dtos/catalog/worker.dto";



@SerializeableCommand({ resource: "worker", action: "delete" })
export class WorkerDeleteCommand implements ICommand<WorkerGetDTO> {
  constructor(readonly payload: WorkerGetDTO) {}
}
