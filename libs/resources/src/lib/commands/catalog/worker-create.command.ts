import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { WorkerCreateDTO } from "../../dtos/catalog/worker.dto";



@SerializeableCommand({ resource: "worker", action: "create" })
export class WorkerCreateCommand implements ICommand<WorkerCreateDTO> {
  constructor(readonly payload: WorkerCreateDTO) {}
}
